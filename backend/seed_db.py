import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'student_api.settings')
django.setup()

from students.models import Student

# Clear existing
Student.objects.all().delete()

# Initial students
students_data = [
    {"name": "Rahat Kabir", "department": "Computer Science", "cgpa": 3.92, "is_active": True},
    {"name": "Saba Tasnim", "department": "Electrical Engineering", "cgpa": 3.85, "is_active": True},
    {"name": "Imran Hossain", "department": "Mechanical Engineering", "cgpa": 3.50, "is_active": False},
    {"name": "Ayesha Siddiqua", "department": "Computer Science", "cgpa": 4.00, "is_active": True},
    {"name": "Zahid Hasan", "department": "Civil Engineering", "cgpa": 3.24, "is_active": False},
]

for s in students_data:
    Student.objects.create(**s)

print("Database seeded with 5 initial students!")
