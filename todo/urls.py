from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.apiList, name='api-list'),
    path('todo-list/', views.taskList, name='todo-list'),
    path('task-detail/<str:pk>', views.taskDetail, name='task-detail'),
    path('task-create/', views.taskCreate, name='task-create'),
    path('task-updates/<str:pk>', views.taskUpdate, name='task-updates'),
    path('task-delete/<str:pk>', views.taskDelete, name='task-delete'),
]