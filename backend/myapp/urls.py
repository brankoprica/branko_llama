# myapp/urls.py
from django.urls import path
from .views import (
    CreateTextbookItemView,
    GetAllTextbookItemsView,
    GenerateRAGResponseView,
    GenerateResponseView,
    UpdateTextbookItemView,
    GetAllDocumentsView,
    CreateDocumentView,
    UpdateDocumentView,
    DeleteDocumentView
)

urlpatterns = [
# Chatbots
    path('rag_response/', GenerateRAGResponseView.as_view(), name='rag_response'),
    path('non_rag_chat/', GenerateResponseView.as_view(), name='generate_response'),

# Documents
    path('all_documents/', GetAllDocumentsView.as_view(), name='get_all_documents'),
    path('create_document/', CreateDocumentView.as_view(), name='create_document'),
    path('document/patch/<uuid:uuid>/', UpdateDocumentView.as_view(), name='edit_documents'),
    path('document/delete/<uuid:uuid>/', DeleteDocumentView.as_view(), name='delete_documents'),


# textbook items (old schema)
    path('create_textbook_item/', CreateTextbookItemView.as_view(), name='create_textbook_item'),
    path('get_all_textbook_items/', GetAllTextbookItemsView.as_view(), name='get_all_textbook_items'),
    path('update_textbook_item/<uuid:uuid>/', UpdateTextbookItemView.as_view(), name='update_textbook_item'),
]
