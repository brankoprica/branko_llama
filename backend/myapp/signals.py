# myapp/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import TextbookItem, Document
from .utils import save_textbook_item_to_weaviate, save_document_to_weaviate

@receiver(post_save, sender=TextbookItem)
def index_textbook_item(sender, instance, **kwargs):
    save_textbook_item_to_weaviate(instance)

@receiver(post_save, sender=Document)
def index_document(sender, instance, **kwargs):
    save_document_to_weaviate(instance)