from django.db import models
from django.contrib.auth.models import User             # подключили встроенную таблицу пользователей


class Post(models.Model):
    title = models.CharField(max_length=255)                # заголовок поста, максимум 255 символов
    content = models.CharField(max_length=10000)            # содержимое поста, максимум 10000 символов
    image = models.ImageField(upload_to="posts_images/" ,null=True, blank=True)         # ссылка на картинку в посте, поле можно оставить пустым
    create_date = models.DateTimeField(auto_now_add=True)   # дата и время публикации поста, при создании поста запишем текущее время на сервере
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")    # кто автор. Внешний ключ на таблицу пользователей. При удалении пользователя удаляем все его посты. related_name="posts" так можно будет потом у пользователя найти все его посты 
    rating = models.IntegerField(default=0)                 # рейтинг в виде числа. При создании поста по-умолчанию равняется нулю

    def __str__(self) -> str:                               # как отображать пост в виде строки(например в админке или в консоли)
        return f"{self.id}; {self.title}; created: {self.create_date}; author: {self.author.username}"

    class Meta:                                             # доп настройки таблицы
        verbose_name = "Пост"                               # как писать название таблицы в админке в единственном числе
        verbose_name_plural = "Посты"                       # мн. число


class Commentary(models.Model):
    content = models.CharField(max_length=1000)             # содержимое комментария, максимум 10000 символов
    create_date = models.DateTimeField(auto_now_add=True)   # дата и время создания коммента, при создании поста запишем текущее время на сервере
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commentaries")     # кто автор. Внешний ключ на таблицу пользователей. При удалении пользователя удаляем все его комменты. related_name="posts" так можно будет потом у пользователя найти все его посты 
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="commentaries")       # какому посту принадлежит. Внешний ключ на таблицу постов. При удалении поста удаляем все его комменты. related_name="posts" так можно будет потом у пользователя найти все его посты 
 
    def __str__(self) -> str:                               # как отображать коммент в виде строки(например в админке или в консоли)
        return f"{self.id};  author: {self.author.username}; created: {self.create_date}; comment: {self.content}"

    class Meta:                                             # доп настройки таблицы
        verbose_name = "Коментарий"                         # как писать название таблицы в админке в единственном числе
        verbose_name_plural = "Коментарии"                  # мн. число


class Vote(models.Model):
    """
    таблица оценок постов
    """
    
    # какие оценнки разрешаем и как их будем показывать в админке
    vote_choices = (
        (1, "like"),
        (-1, "dislike"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)        # ссылка на пользователя
    post = models.ForeignKey(Post, on_delete=models.CASCADE)        # ссылка на пост
    vote_value = models.SmallIntegerField(choices=vote_choices)     # числовое значение оценки(либо 1, либо -1)

    class Meta:                                                     # доп настройки таблицы
        verbose_name = "Оценка поста"                               # как писать название таблицы в админке в единственном числе
        verbose_name_plural = "Оценки постов"                       # мн. число

    def __str__(self) -> str:                               # как отображать коммент в виде строки(например в админке или в консоли)
        return f"{self.id};  author: {self.user.username}; post: {self.post.title}; value: {self.vote_value}"
