from django.shortcuts import render, HttpResponse
from biblio_app.models import Authors, Books, Genres, Publishers   # подключили классы-таблицы-модели


def index(request):
    return render(
        template_name="biblio_app/templates/books.html",
        request=request
    )


def all_books(request):
    return render(
        template_name="biblio_app/templates/books.html",
        request=request
    )


def all_authors(request):
    return render(
        template_name="biblio_app/templates/authors.html",
        request=request
    )


def all_publishers(request):
    return render(
        template_name="biblio_app/templates/publishers.html",
        request=request
    )


def all_genres(request):
    return render(
        template_name="biblio_app/templates/genres.html",
        request=request
    )


def test_django_orm(request):   # тут помторим на ORM команды к БД
    # CRUD-операции
    # CreateReadUpdateDelete 

    # Create operations
    # способ 1
    new_author = Authors(
        firstname="тест_имя",
        lastname="тест_фамилия",
        patronymic="тест_отчество",
        birthday="2025-12-25"           # поле даты пишется именно в таком формате ГГГГ-ДД-ММ
    )
    new_author.save()                   # вызываем сохранение записи в БД
    print("Новый автор успешно сохранён:", new_author)  # Новый автор успешно сохранён: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=6



    return HttpResponse("смотрите в консоль django")
