from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    cgpa = models.FloatField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
