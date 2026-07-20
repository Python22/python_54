from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.decorators import login_required       # подключаем декоратор-функцию, которая будет проверять авторизован пользователь или нет
from posts_app.models import Post, Commentary                   # подключаем наши модели


# главная страница
def all_posts_view(request):
    # all_posts = Post.objects.all().order_by("-create_date")[:2]    # получаем все посты и сортируем от новых к старым, берём первые 2 поста
    all_posts = Post.objects.all().order_by("-create_date")    # получаем все посты и сортируем от новых к старым



    return render(
        template_name="posts_app/templates/all_posts.html",        # какой шаблон готовить 
        request=request,
        context={"all_posts": all_posts}                           # коллекция наших первых постов 
    )


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
    return render(
        template_name="posts_app/templates/post_and_commentaries.html",
        request=request
    )
