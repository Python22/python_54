from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.decorators import login_required       # подключаем декоратор-функцию, которая будет проверять авторизован пользователь или нет
from posts_app.models import Post, Commentary                   # подключаем наши модели
from django.http import JsonResponse                            # класс для отправки JSON данных


# главная страница
def all_posts_view(request):
    all_posts = Post.objects.all().order_by("-create_date")[:2]    # получаем все посты и сортируем от новых к старым, берём первые 2 поста
    # all_posts = Post.objects.all().order_by("-create_date")    # получаем все посты и сортируем от новых к старым



    return render(
        template_name="posts_app/templates/all_posts.html",        # какой шаблон готовить 
        request=request,
        context={"all_posts": all_posts}                           # коллекция наших первых постов 
    )


# функция подгрузки постов
def get_next_posts(request):
    
    current_page = int(request.GET.get("current_page"))  # узнаём из get данных по ключу номер текущей страницы
    print("требуется подгрузка постов у клиента", current_page)

    post_per_page = 2       # сколько постов на странице
    offset = current_page * post_per_page               # с какого поста нужны новые данные
    limit = offset + post_per_page                      # до какого поста нужны данные
    next_posts = Post.objects.all().order_by("-create_date")[offset:limit]    # получаем все посты и сортируем от новых к старым, берём первые 2 поста
    print(next_posts)                   # <QuerySet [<Post: 9; cvbcvb; created: 2026-07-22 17:43:39.187463+00:00; author: admin>, <Post: 8; bcvb cvb cvb cvb cvb ; created: 2026-07-22 17:43:31.999120+00:00; author: admin>]>

    data = []                           # список данных, которые нужно отправить
    for post in next_posts:             # перебираем все данные из БД(посты)
        try:                            # пытаемся узнать ссылку на картинку у данного поста
            image_url = post.image.url  # поулчаем ссылку. Если ссылки нет, то будет исключение ValueError
        except ValueError:              # если случилось исключение ValueError
            image_url = None            # сохраним в переменную значение None
        data.append({                   # в список данных вставляем словарь для данного поста
            "title": post.title,
            "content": post.content,
            "image": image_url,
            "create_date": post.create_date,
            "rating": post.rating,
            "author": post.author.username,
            "id": post.id
        })
    print(data)     # [{'title': 'cvbcvb', 'content': 'vbnvbnvnvnvb', 'image': '/media/posts_images/%D1%84.png', 'create_date': datetime.datetime(2026, 7, 22, 17, 43, 39, 187463, tzinfo=datetime.timezone.utc), 'rating': 0, 'author': 'admin'}, {'title': 'bcvb cvb cvb cvb cvb ', 'content': 'cvb cvb cvb cv ', 'image': '/media/posts_images/%D1%81%D0%B5%D1%80%D0%B4%D1%86%D0%B5.png', 'create_date': datetime.datetime(2026, 7, 22, 17, 43, 31, 999120, tzinfo=datetime.timezone.utc), 'rating': 0, 'author': 'admin'}]

    return JsonResponse({"status": "ok", "new_posts": data})     # отправляем JSON данные с нашими постами


@login_required                 # ставим проверку на авторизованность, если нет, то перекинем на страницу входа в аккаунт
def add_new_post(request):
    if request.POST:            # если пришли данные из формы
        print("Кто-то хочет добавить пост")
        post_title = request.POST.get("post_title")         # получаем то,что пришло из формы из инпутов с такими name
        post_content = request.POST.get("post_content")
        post_image = request.FILES.get("post_image")        # получаем файл
        print(post_title)

        try:    # пытаемся создать пост с перехватом ошибок
            Post.objects.create(
                title=post_title,
                content=post_content,
                image=post_image,
                author=request.user
            )
            print("Пост успешно сохранён")
            return redirect("/")            # перекидываем на главную страницу
        except Exception as e:              # если произошло исключение
            print("При создании поста что-то пошло не так:", e)
        

    return render(
        template_name="posts_app/templates/add_new_post.html",
        request=request
    )


def post_and_commentaries_view(request, post_id):
    try:                                                            # поиск поста будем делать с перехватом исключения
        post_id = int(post_id)                                      # преобразуем строковый id поста в число
        post = Post.objects.get(id=post_id)                         # находим пост по id
        post_commentaries = post.commentaries.prefetch_related()    # находим все связанные комменты у данного поста
        print(post)
        print(post_commentaries)
        return render(
            template_name="posts_app/templates/post_and_commentaries.html",
            request=request,
            context={"post": post, "post_commentaries": post_commentaries}      # отправляем шаблонизатору пост и его комменты
        )
    except Exception as e:
        print("Кто-то попытался поулчить несуществующий пост")
        return redirect("/error_404_post_not_found")            # перекидываем на главную страницу


def error_404_post_not_found(request):
    return HttpResponse("Такого поста нет(")
