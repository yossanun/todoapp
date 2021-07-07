from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import TaskSerializers
from .models import Task

URL = "http://127.0.0.1:8000/api"

@api_view(['GET'])
def apiList(request):
    api_urls = {
        'List': URL +'/todo-list/',
        'Detail View':URL + '/task-detail/<str:pk>',
        'Create':URL + '/task-create/',
        'Update':URL + '/task-updates/<str:pk>',
        'Delete':URL + '/task-delete/<str:pk>',
    }
    print(api_urls)
    return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializers(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializers(tasks, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializers(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializers(instance=task, data=request.data)
    print(serializer)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    
    return Response(task.title + " successfully delete!")
