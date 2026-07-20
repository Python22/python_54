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
            return redirect("/auth/login")                                  # перенаправляем на функцию login_view в приложении auth_app

    return render(
        template_name="auth_app/templates/register.html",
        request=request,
        context={"errors": errors}
    )


def login_view(request):
    print("Кто-то пытается войти в аккаунт")
    if request.method == "POST":        # если данные пришли из формы
        user_login = request.POST.get("login")              # что пришло из формы под именем login, если таких данных нет, то запишем None
        user_password = request.POST.get("password")        # что пришло из формы под именем password

        if user_login is None or user_password is None:     # если что-то не пришло
            return redirect("/auth/login")                  # опять открываем страницу входа в аккаунт без сообщения об ошибке 

        # if User.objects.filter(username=user_login).exists():   # проверяем в таблице пользователей, существует ли кто-то с таким же ником
            # if User.ob
        user = authenticate(username=user_login, password=user_password)    # вызываем процесс аутентификации(есть ли пользователь с таким ником и такой же ли пароль был сохранён(хеш от пароля))
        if user is None:                        # если логин или пароль не подошли
            return render(                      # открываем ту же страницу, но уже отправляем ещё и текст с ошибкой авторизации
                template_name="auth_app/templates/login.html",
                request=request,
                context={"error": "Неправильный логин и/или пароль"}    
            )    
        else:                                   # если пользователь с такими логином и паролем есть
            login(request, user)                # запомнимаем что этот пользователь прошёл процесс захода в аккаунт
            return redirect("/")                # перекидываем на главную страницу сайта


    return render(
        template_name="auth_app/templates/login.html",
        request=request
    )


def logout_view(request):
    logout(request=request)     # вызываем функцию django по выходу из акканута
    return redirect("/")        # перекидываем на главную страницу сайта
