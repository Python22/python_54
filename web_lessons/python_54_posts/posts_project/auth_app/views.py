from django.shortcuts import render, redirect               # подключаем функцию отрисовки и перенаправления
from django.contrib.auth.models import User                 # подключаем встроенный класс-модель-таблицу пользователей
from django.contrib.auth import login, logout, authenticate # подключаем встроенные функции для авторизаций


def register_view(request):
    print("Кто-то пытается зарегистрироваться")
    errors = []         # сюда будем кидать текст о некорректных данных при регистрации
    if request.method == "POST":        # если данные пришли из формы
        user_login = request.POST.get("login")              # что пришло из формы под именем login, если таких данных нет, то запишем None
        user_password = request.POST.get("password")        # что пришло из формы под именем password
        user_password2 = request.POST.get("password2")      # что пришло из формы под именем password2

        if user_login is None or user_password is None or user_password2 is None:   # если хотя бы одно поле является None, то не все данные получены
            errors.append("Все поля обязательны.")          # добавляем в список ошибок строку об ошибке отстутствия некоторого поля      

        if len(user_login) < 1 or len(user_login) > 255:    # если длина логина вне разрешённого диапазона
            errors.append("Логин должен быть от 1 до 255 символов.")          # добавляем в список ошибок строку об ошибке 

        if User.objects.filter(username=user_login).exists():   # проверяем в таблице пользователей, существует ли кто-то с таким же ником
            # SELECT * FROM users WHERE username = ?     
            errors.append("Такой логин уже занят.")   

        if len(user_password) < 8 or len(user_password) > 20:   # если длина пароля вне разрешённого диапазона
            errors.append("Пароль должен быть от 8 до 20 символов.")        

        if user_password != user_password2:                     # если пароли не совпадают
            errors.append("Пароли должны совпадать.")           # добавляем сообщение об ошибке

        if len(errors) == 0:                                        # если в списке ошибок нет ни одного элемента(нет ошибок)
            User.objects.create_user(username=user_login, password=user_password)   # создаём в базе данных нового пользователя с такими данными
            print("Успешно создали пользователя с именем", user_login)              # сообщение в консоль
            return redirect("auth_app:login_view")                                  # перенаправляем на функцию login_view в приложении auth_app

    return render(
        template_name="auth_app/templates/register.html",
        request=request,
        context={"errors": errors}
    )


def login_view(request):
    return render(
        template_name="auth_app/templates/login.html",
        request=request
    )


def logout_view(request):
    pass