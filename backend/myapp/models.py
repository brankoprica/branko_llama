from django.db import models


class Document(models.Model):
    title = models.CharField(max_length=255)
    generalInfo = models.TextField()
    content = models.JSONField()  
    sourceUrl = models.TextField()
    createdAt = models.DateTimeField()
    updatedAt = models.DateTimeField()

    class Meta:
        managed = False  

    def __str__(self):
        return self.title

class TextbookItem(models.Model):
    title = models.CharField(max_length=255)
    topics = models.TextField()
    source_url = models.TextField()
    exams = models.JSONField(default=list)
    categories = models.JSONField(default=list)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False  

    def __str__(self):
        return self.title
    
class ChatLog(models.Model):
    query = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    feedback = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Query made at {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
    
    
class FineTuningExample(models.Model):
    prompt = models.TextField()
    document = models.FileField(upload_to='documents/')
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
