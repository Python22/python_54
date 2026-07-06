from django.contrib import admin
from biblio_app.models import Authors, Books, Genres, Publishers       # подключили наши таблицы-модели-классы


admin.site.register(Authors)            # разрешаем отображать данную таблицу во встроенной админке
admin.site.register(Books)            # разрешаем отображать данную таблицу во встроенной админке
admin.site.register(Genres)            # разрешаем отображать данную таблицу во встроенной админке
admin.site.register(Publishers)            # разрешаем отображать данную таблицу во встроенной админке
