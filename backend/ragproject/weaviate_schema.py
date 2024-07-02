import weaviate

def create_schema():
    client = weaviate.Client("http://localhost:8080")

    try:
        # First, attempt to delete the existing 'Document' class if it exists
        client.schema.delete_class("Document")
        client.schema.delete_class("ChatLog")

        print("Existing 'Document' class deleted successfully.")
    except Exception as e:
        print(f"Error deleting existing 'Document' class: {str(e)}")
    
    document_schema = {
        "class": "Document",
        "properties": [
            {
                "name": "title", 
                "dataType": ["text"], 
                "indexInverted": True
            },
            {
                "name": "generalInfo", 
                "dataType": ["text"], 
                "indexInverted": True
            },
            {
                "name": "content",
                "dataType": ["object[]"],
                "indexInverted": True,
                "nestedProperties": [
                    {
                        "name": "sectionTitle", 
                        "dataType": ["text"]
                     },
                    {
                        "name": "sectionContent",
                        "dataType": ["text"]
                    }
                ],
            },
            {
                "name": "exams",
                "dataType": ["text[]"]
            },
            {
                "name": "tags",
                "dataType": ["text[]"]
            },
            {
                "name": "sourceUrl", 
                "dataType": ["text"], 
                "indexInverted": True
            },
            {
                "name": "createdAt", 
                "dataType": ["date"], 
                "indexInverted": True
            },
            {
                "name": "updatedAt", 
                "dataType": ["date"], 
                "indexInverted": True
            }
        ],
        "vectorIndexType": "hnsw",
        "vectorizer": "multi2vec-clip",
        "moduleConfig": {
            "multi2vec-clip": {
                "textFields": [
                    "title", 
                    "generalInfo", 
                    "content.sectionContent",
                    "tags", 
                    "sourceUrl"
                ]
            }
        }

    }

    chat_log_schema = {
        "class": "ChatLog",
        "description": "Stores chat logs with queries and responses",
        "properties": [
            {"name": "query", "dataType": ["text"], "indexInverted": True},
            {"name": "response", "dataType": ["text"], "indexInverted": True},
            {"name": "timestamp", "dataType": ["date"], "indexInverted": True},
            {"name": "feedback", "dataType": ["text"], "indexInverted": True}
        ],
        "vectorIndexType": "hnsw",
        "vectorizer": "multi2vec-clip",
        "moduleConfig": {
            "multi2vec-clip": {
                "textFields": ["query", "response"]
            }
        }
    }


    try:
        client.schema.create_class(document_schema)
        client.schema.create_class(chat_log_schema)
        print("Classes created successfully.")
    except Exception as e:
        print(f"Error creating classes: {str(e)}")

if __name__ == "__main__":
    create_schema()
