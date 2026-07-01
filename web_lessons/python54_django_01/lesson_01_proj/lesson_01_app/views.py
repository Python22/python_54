from django.shortcuts import render, HttpResponse


"""
Тут мы описываем функции, которые будут вызываться при заходе по какому-либо адресу.
"""

def hello_world(request):                   # это функция, котора будет запускаться при заходе на некоторый путь, который описывается в urls
    return HttpResponse("привет мир")       # возврщаем тому, кто зашёл обычный ответ в в иде текста


def hello_2(request):
    return HttpResponse("<h2>HELLO</h2><p>Vasya</p>")   # отправляем текст, который будет восприниматься как HTML код


def index(request):                 
    return render(
        template_name="lesson_01_app/templates/index.html",                 # путь к HTML шаблону
        request=request                                                     # обязательно добавляем полученный request
    )   # возвращаем подготовленую HTML страницу
