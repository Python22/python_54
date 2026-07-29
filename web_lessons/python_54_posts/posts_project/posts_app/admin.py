from django.contrib import admin
from posts_app.models import Post, Commentary, Vote   # подключаем таблицы-модели


admin.site.register(Post)           # включаем отображение таблицы в админке
admin.site.register(Commentary)     # включаем отображение таблицы в админке
admin.site.register(Vote)     # включаем отображение таблицы в админке
