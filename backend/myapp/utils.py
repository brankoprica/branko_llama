import os
import weaviate
import logging
import requests
from .models import  Document

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = weaviate.Client("http://localhost:8080")

LLAMA_SERVER_URL = "http://localhost:8081/completion"

def generate_text(prompt):
    """Generate text using the Llama server based on the prompt provided."""
    headers = {'Content-Type': 'application/json'} 
    try:
        response = requests.post(LLAMA_SERVER_URL, json={"prompt": prompt}, headers=headers)
        response.raise_for_status()
        response_data = response.json()
        return response_data.get("content", "")  
    except Exception as e:
        logger.error(f"Error in generate_text: {e}")
        raise e
    
def generate_text_with_context(prompt):
    try:
        related_items = retrieve_related_documents(prompt)
        if not related_items:
            raise ValueError("No related items found")
        
        context = '\n'.join([
            f"General Info: {item['generalInfo']}" + 
            '\n'.join([f"Section Title: {content['sectionTitle']}, Section Content: {content['sectionContent']}" 
                       for content in item.get('content', [])])  # Use .get() to handle missing 'content'
            for item in related_items
        ])
        
        full_prompt = f"{prompt}\n\nContext:\n{context}"
        return generate_text(full_prompt)
    except Exception as e:
        logger.error(f"Error in generate_text_with_context: {e}")
        raise e


# 
# DOCUMENTS
# 

def save_document_to_weaviate(document_instance):
    document = {
        "title": document_instance.title,
        "generalInfo": document_instance.generalInfo,
        "content": [{
            "sectionTitle": document_instance.content.get("sectionTitle", ""),
            "sectionContent": document_instance.content.get("sectionContent", "")
        }],
        "exams": document_instance.exams,
        "tags": document_instance.tags,
        "sourceUrl": document_instance.sourceUrl,
        "createdAt": document_instance.createdAt.isoformat(),
        "updatedAt": document_instance.updatedAt.isoformat(),
    }

    try:
        client.data_object.create(document, "Document")
        logger.info(f"Document saved to Weaviate: {document}")
    except Exception as e:
        logger.error(f"Error saving document to Weaviate: {e}")


def fetch_documents_from_weaviate():
    try:
        response = client.query.get("Document", 
            [
                "title", 
                "generalInfo", 
                "content { sectionTitle, sectionContent }",
                "exams", 
                "tags", 
                "sourceUrl", 
                "createdAt", 
                "updatedAt"
            ]).with_additional("id").do()
        items = response['data']['Get']['Document']
        documents = []
        for item in items:
            documents = Document(
                title=item['title'],
                generalInfo=item['generalInfo'],
                content=item['content'],
                exams=item['exams'],
                tags=item['tags'],
                source_url=item['sourceUrl'],
                created_at=item['createdAt'],
                updated_at=item['updatedAt'],
            )
            documents.append(documents)
        return documents
    except Exception as e:
        logger.error(f"Error in fetch_documents_from_weaviate: {e}")
        raise e

def retrieve_related_documents(query):
    try:
        logger.info(f"Retrieving related documents for query: {query}")
        response = client.query.get("Document", 
            [
                "title", 
                "generalInfo", 
                "content { sectionTitle, sectionContent }",
                "exams", 
                "tags", 
                "sourceUrl", 
                "createdAt", 
                "updatedAt"
            ]).with_near_text({"concepts": [query]}).do()
        print(response)
        documents = response['data']['Get']['Document']
        if not documents:
            logger.info(f"No documents found for query: {query}")
        else:
            logger.info(f"Found documents: {documents}")
        return documents
    except Exception as e:
        logger.error(f"Error in retrieve_related_documents_items: {e}")
        raise e

# 
# TEXTBOOK ITEMS
# 

def retrieve_related_textbook_items(query):
    try:
        response = client.query.get("TextbookItem", ["title", "topics", "sourceUrl", "createdAt", "updatedAt"]).with_near_text({"concepts": [query]}).do()
        return response['data']['Get']['TextbookItem']
    except Exception as e:
        logger.error(f"Error in retrieve_related_textbook_items: {e}")
        raise e


def save_textbook_item_to_weaviate(textbook_item):
    data_object = {
        "title": textbook_item.title,
        "topics": textbook_item.topics,
        "sourceUrl": textbook_item.source_url,
        "createdAt": textbook_item.created_at.isoformat(),
        "updatedAt": textbook_item.updated_at.isoformat()
    }
    print('Saved')

    client.data_object.create(data_object, "TextbookItem")
