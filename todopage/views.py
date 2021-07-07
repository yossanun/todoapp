from django.shortcuts import render
from todo.models import Task

# Create your views here.
def todoList(request):
    return render(request, 'todopage/index.html')
