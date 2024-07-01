from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import weaviate
from datetime import datetime
import json
from .utils import generate_text_with_context, generate_text

# 
# NEW DOCUMENTS VIEWS
# 

@method_decorator(csrf_exempt, name='dispatch')
class CreateDocumentView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            title = data.get('title')
            general_info = data.get('generalInfo', '')
            content = data.get('content', [])  
            exams = data.get('exams', '')
            tags = data.get('tags', '')
            source_url = data.get('sourceUrl')

            created_at = datetime.now().isoformat(timespec='seconds') + 'Z'
            updated_at = datetime.now().isoformat(timespec='seconds') + 'Z'

            client = weaviate.Client("http://localhost:8080")

            document = {
                "title": title,
                "generalInfo": general_info,
                "content": content,
                "exams": exams,
                "tags": tags,
                "sourceUrl": source_url,
                "createdAt": created_at,
                "updatedAt": updated_at,
            }

            client.data_object.create(document, "Document")
            return JsonResponse({'status': 'success', 'Document': document}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class GetAllDocumentsView(View):
    def get(self, request):
        try:
            client = weaviate.Client("http://localhost:8080")
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

            documents = response['data']['Get']['Document']

            items_with_uuid = [
                {
                    'uuid': item['_additional']['id'],
                    'title': item['title'],
                    'generalInfo': item['generalInfo'],
                    'content': item['content'],
                    'exams': item['exams'],
                    'tags': item['tags'],
                    'sourceUrl': item['sourceUrl'],
                    'createdAt': item['createdAt'],
                    'updatedAt': item['updatedAt']
                } for item in documents
            ]

            return JsonResponse({'status': 'success', 'Documents': items_with_uuid}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)     

@method_decorator(csrf_exempt, name='dispatch')
class UpdateDocumentView(View):
    def put(self, request, uuid):
        try:
            data = json.loads(request.body)
            client = weaviate.Client("http://localhost:8080")
            current_item = client.data_object.get_by_id(uuid)

            if not current_item:
                return JsonResponse({'status': 'error', 'message': 'Item not found'}, status=404)

            updated_item = current_item['properties']
            for key, value in data.items():
                updated_item[key] = value

            client.data_object.replace(updated_item, "Document", uuid)

            return JsonResponse({'status': 'success', 'Document': updated_item}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
        
@method_decorator(csrf_exempt, name='dispatch')
class DeleteDocumentView(View):
    def delete(self, request, uuid):
        try:
            client = weaviate.Client("http://localhost:8080")

            current_item = client.data_object.get_by_id(uuid)

            if not current_item:
                return JsonResponse({'status': 'error', 'message': 'Item not found'}, status=404)

            client.data_object.delete(uuid)

            return JsonResponse({'status': 'success', 'Document deleted': uuid}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
        

# 
# TEXTBOOK ITEM VIEWS
# 

@method_decorator(csrf_exempt, name='dispatch')
class CreateTextbookItemView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            title = data.get('title')
            topics = json.dumps(data.get('topics'))  
            source_url = json.dumps(data.get('source_url'))  
            exams = data.get('exams', [])
            categories = data.get('categories', [])

            created_at = datetime.now().isoformat(timespec='seconds') + 'Z'
            updated_at = datetime.now().isoformat(timespec='seconds') + 'Z'

            client = weaviate.Client("http://localhost:8080")

            textbook_item = {
                "title": title,
                "topics": topics,
                "source_url": source_url,
                "exams": exams,
                "categories": categories,
                "createdAt": created_at,
                "updatedAt": updated_at,
            }

            client.data_object.create(textbook_item, "TextbookItem")
            return JsonResponse({'status': 'success', 'Textbook Item': textbook_item}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class GetAllTextbookItemsView(View):
    def get(self, request):
        try:
            client = weaviate.Client("http://localhost:8080")
            response = client.query.get("TextbookItem", ["title", "topics", "sourceUrl", "exams", "categories", "createdAt", "updatedAt"]).with_additional("id").do()
            textbook_items = response['data']['Get']['TextbookItem']
            items_with_uuid = [
                {
                    'uuid': item['_additional']['id'],
                    'title': item['title'],
                    'topics': item['topics'],
                    'exams': item['exams'],
                    'categories': item['categories'],
                    'sourceUrl': item['sourceUrl'],
                    'createdAt': item['createdAt'],
                    'updatedAt': item['updatedAt']
                } for item in textbook_items
            ]

            return JsonResponse({'status': 'success', 'Textbook Items': items_with_uuid}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)     

@method_decorator(csrf_exempt, name='dispatch')
class UpdateTextbookItemView(View):
    def put(self, request, uuid):
        try:
            data = json.loads(request.body)
            client = weaviate.Client("http://localhost:8080")
            current_item = client.data_object.get_by_id(uuid)

            if not current_item:
                return JsonResponse({'status': 'error', 'message': 'Item not found'}, status=404)

            updated_item = current_item['properties']
            for key, value in data.items():
                updated_item[key] = value

            client.data_object.replace(updated_item, "TextbookItem", uuid)

            return JsonResponse({'status': 'success', 'Textbook Item': updated_item}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
        

# 
# CHAT RESPONSE VIEWS
#

@method_decorator(csrf_exempt, name='dispatch')
class GenerateRAGResponseView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt')

            if not prompt:
                raise ValueError("No prompt provided")

            generated_text = generate_text_with_context(prompt)
            return JsonResponse({'status': 'success', 'generated_text': generated_text}, status=200)
        except Exception as e:
            print(f"Error: {e}")  
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class GenerateResponseView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt')
            if not prompt:  
                return JsonResponse({'status': 'error', 'message': 'No prompt provided'}, status=400)

            response_text = generate_text(prompt)
            if response_text == "":
                return JsonResponse({'status': 'error', 'message': 'No content received from Llama server'}, status=500)

            return JsonResponse({'status': 'success', 'response': response_text}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
