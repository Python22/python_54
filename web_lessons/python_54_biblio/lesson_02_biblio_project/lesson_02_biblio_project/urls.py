"""
URL configuration for lesson_02_biblio_project project.

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
import biblio_app
import biblio_app.views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('books/', biblio_app.views.all_books, name='books'),   # адрес; вызываемая функция; имя адреса
    path('authors/', biblio_app.views.all_authors, name='authors'),
    path('publishers/', biblio_app.views.all_publishers, name='publishers'),
    path('genres/', biblio_app.views.all_genres, name='genres'),
    path('test_django_orm/', biblio_app.views.test_django_orm, name='test_django_orm'),
    path('get_books_by_author_id/<int:author_id>', biblio_app.views.get_books_by_author_id, name='get_books_by_author_id'),   # если кто-то защёл по адресу http://127.0.0.1:8000/get_books_by_author_id/4
    path('', biblio_app.views.index, name='index'),
]
