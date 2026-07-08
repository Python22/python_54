from django.shortcuts import render, HttpResponse
from biblio_app.models import Authors, Books, Genres, Publishers    # подключили классы-таблицы-модели
from django.http import JsonResponse                                # подключаем класс, который умеет отправлять JSON ответы


def index(request):
    return render(
        template_name="biblio_app/templates/books.html",
        request=request
    )


def all_books(request):
    books = Books.objects.all()                 # получаем коллекцию всех книг из БД
    return render(
        template_name="biblio_app/templates/books.html",        # какой шаблон берём
        request=request,                                        # данные от пришедшего запроса
        context={"books": books, "test": "тестовая строка!!!"}                                # данные про книги, которые может использовать шаблонизатор для построения страницы
    )


def all_authors(request):
    authors = Authors.objects.all()             # нашли всех писателей
    return render(
        template_name="biblio_app/templates/authors.html",
        request=request,
        context={"authors": authors}
    )


def all_publishers(request):
    return render(
        template_name="biblio_app/templates/publishers.html",
        request=request
    )


def all_genres(request):
    all_genres = Genres.objects.all()           # получаем все жанры
    return render(
        template_name="biblio_app/templates/genres.html",
        request=request,
        context={"all_genres": all_genres, "info": "Выберите жанр:"}
    )


def get_books_by_genre_name(request, genre_name):
    all_genres = Genres.objects.all()               # получаем все жанры
    genre = Genres.objects.get(name=genre_name)     # ищем жанр по имени в БД
    books = genre.books.prefetch_related()          # делаем запрос на поиск всех книг у данного жанра
    return render(
        template_name="biblio_app/templates/genres.html",
        request=request,
        context={"all_genres": all_genres, "books": books, "info": genre.name}  # отправляем шаблонизатору коллекцию всех жанров и коллекцию всех книг данного жанра
    )


def get_books_by_author_id(request, author_id):
    author = Authors.objects.get(id=author_id)      # находим конкретного писателя по его id
    print(author)                                   # Сергеевич Александр Пушкин; 2026-07-15; id=1
    books = author.books.prefetch_related()         # получаем колелкцию всех книг данного автора
    print("Все книги данного автора:")
    print(books)                                    # <QuerySet [<Books: Евгений Онегин; год издания-1830; id=1>, <Books: Сказка о царе Салтане; год издания-1825; id=2>, <Books: Сборник тест; год издания-2026; id=7>]> 
    books = list(books.values("title", "year"))     # преобразуем коллекцию объектов Books в список словарей, и затем превращаем QuerySet в обычный питоновский list
    print(books)                                    # [{'title': 'Евгений Онегин', 'year': 1830}, {'title': 'Сказка о царе Салтане', 'year': 1825}, {'title': 'Сборник тест', 'year': 2026}]
    
    return JsonResponse(books, safe=False)          # отправляем json ответ, в теле json будет массив объектов(сериализуем данные)


def test_django_orm(request):   # тут помторим на ORM команды к БД
    # CRUD-операции
    # CreateReadUpdateDelete 

    # Create operations
    # способ 1
    # new_author = Authors(
    #     firstname="тест_имя",
    #     lastname="тест_фамилия",
    #     patronymic="тест_отчество",
    #     birthday="2025-12-25"           # поле даты пишется именно в таком формате ГГГГ-ДД-ММ
    # )
    # new_author.save()                   # вызываем сохранение записи в БД
    # print("Новый автор успешно сохранён:", new_author)  # Новый автор успешно сохранён: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=6

    # способ 2
    # Authors.objects.create(
    #     firstname="тест_имя2",
    #     lastname="тест_фамилия2",
    #     patronymic="тест_отчество2",
    #     birthday="2025-12-25"
    # )   # создали и запомнили запись 
    # print("Новый автор успешно сохранён!")


    # Read operations
    # получить 1 запись
    # some_author = Authors.objects.get(id=2)     # получить писателя по id   SELECT * FROM authors WHERE id = 2
    # # если таких записей нет или их больше одной, то будет исключение
    # print(some_author)                      # Николаевич Лев Толстой; 2026-07-01; id=2
    # print(some_author.firstname)            # Лев    


    # получить все записи
    # all_authors = Authors.objects.all()         # получить все записи и сохранить в список объектов           SELECT * FROM authors
    # print(all_authors)                          # [<Authors: Сергеевич Александр Пушкин; 2026-07-15; id=1>, <Authors: Николаевич Лев Толстой; 2026-07-01; id=2>, <Authors: Михайлович Фёдор Достоевский; 2026-07-04; id=3>, <Authors: Васин Вася None; 2026-07-01; id=4>, <Authors: Петин Петя None; 2026-07-08; id=5>, <Authors: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=6>, <Authors: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=7>, <Authors: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=8>, <Authors: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=9>, <Authors: тест_фамилия тест_имя тест_отчество; 2025-12-25; id=10>]
    
    # for author in all_authors:
    #     print(author, author.firstname, author.lastname, author.patronymic, author.birthday, author.id)


    # получить отфильтрованные записи
    # filtered_books = Books.objects.filter(year=2026)        # получить все книги у которых год издания 2026
    # print(filtered_books)                                   # <QuerySet [<Books: тест 2; год издания-2026; id=6>, <Books: Сборник тест; год издания-2026; id=7>]>    

    # filtered_books = Books.objects.filter(year__lt=2000)    # получить все книги у которых год издания менее 2000
    # print(filtered_books)                                   # <QuerySet [<Books: Евгений Онегин; год издания-1830; id=1>, <Books: Сказка о царе Салтане; год издания-1825; id=2>, <Books: Война и мир; год издания-1862; id=3>, <Books: Преступление и наказание; год издания-1890; id=4>]>    
    # # lt - less than
    # # gt - greater than
    # # lte - less or equal
    # # gte - greater or equal

    # # получить список писателей у книги

    # some_book = Books.objects.get(id=1)             # получаем первую книгу
    # print(some_book)                                # Евгений Онегин; год издания-1830; id=1
    # print(some_book.authors.prefetch_related())     # <QuerySet [<Authors: Сергеевич Александр Пушкин; 2026-07-15; id=1>]>
    # #   .prefetch_related() обязателен при получении данных из другой связанной таблицы

    # some_author = Authors.objects.get(id=1)         # находи первого автора
    # print(some_author)                              # Сергеевич Александр Пушкин; 2026-07-15; id=1
    # print(some_author.books)                        # biblio_app.Books.None     без prefetch_related() будет none
    # print(some_author.books.prefetch_related())     # <QuerySet [<Books: Евгений Онегин; год издания-1830; id=1>, <Books: Сказка о царе Салтане; год издания-1825; id=2>, <Books: Сборник тест; год издания-2026; id=7>]>


    # filtered_books = Books.objects.filter(authors__birthday="2026-07-01")  # получить все книги, у которых у автора день рождения такой
    # print(filtered_books)                           # <QuerySet [<Books: Война и мир; год издания-1862; id=3>, <Books: тест 1; год издания-2020; id=5>, <Books: тест 2; год издания-2026; id=6>, <Books: Сборник тест; год издания-2026; id=7>, <Books: Сборник тест; год издания-2026; id=7>]>


    # Update operations
    # поменять что-то у записей
    # some_author = Authors.objects.get(id=10)        # получаем писателя по его id
    # print(some_author)                              # тест_фамилия тест_имя тест_отчество; 2025-12-25; id=10
    # some_author.firstname = "Вася"                  # меняем значения свойств у найденного писателя
    # some_author.lastname = "Новый"
    # some_author.save()                              # после изменений обязательно вызываем save для сохранения изменений в БД на постоянной основе


    # Delete operations
    # удаление
    # способ 1
    # some_author = Authors.objects.get(id=11)         # получаем писателя по его id   
    # some_author.delete()                             # удаляем объект из БД   
    # print(some_author, "успешно удалён")             # тест_фамилия тест_имя тест_отчество; 2025-12-25; id=None успешно удалён

    # способ 2
    # Authors.objects.get(id=12).delete()                 # находим конкретного и тут же удаляем
    # print("успешно удалили писателя")

    # Удалить абсолютно все записи в таблице Genres
    # Genres.objects.all().delete()

    return HttpResponse("смотрите в консоль django")
