"""
URL configuration for lesson_01_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from lesson_01_app.views import hello_world, hello_2, index # подключили функцию из файла views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello_world/', hello_world),     # если кто-то заходит по адресу http://127.0.0.1:8000/hello_world/ то мы запускаем функцию hello_world
    path('hello_2/', hello_2),     # если кто-то заходит по адресу http://127.0.0.1:8000/hello_2/ то мы запускаем функцию hello_world
    path('index/', index),     # если кто-то заходит по адресу http://127.0.0.1:8000/hello_2/ то мы запускаем функцию hello_world
]
