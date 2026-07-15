from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required       # подключаем декоратор-функцию, которая будет проверять авторизован пользователь или нет


# главная страница
def all_posts_view(request):
    return render(
        template_name="posts_app/templates/all_posts.html",
        request=request
    )


@login_required                 # ставим проверку на авторизованность, если нет, то перекинем на страницу входа в аккаунт
def add_new_post(request):
    return render(
        template_name="posts_app/templates/add_new_post.html",
        request=request
    )


def post_and_commentaries_view(request, post_id):
    return render(
        template_name="posts_app/templates/post_and_commentaries.html",
        request=request
    )
