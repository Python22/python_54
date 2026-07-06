from django.db import models


# классы это таблицы в БД
class Publishers(models.Model): # издатели
    # id автоматом сам создаётся
    name = models.CharField(max_length=50, unique=True)         # поле, строка, максимально 50 символов, уникальная

    class Meta:                             # доп информация для админки
        verbose_name = "Издатель"           # как показывать название таблицы в админке в ЕДИНСТВЕННОМ числе    
        verbose_name_plural = "Издатели"    # как показывать название таблицы в админке во МНОЖЕСТВЕННОМ числе    

    def __str__(self) -> str:                   # метод, который будет вызываться если мы будем преобразовывать объект данного класса в строку
        return f"{self.name}; id={self.id}"     # будем возвращать имя издателя и его id в виде такой строки


class Genres(models.Model): # жанры
    # id автоматом сам создаётся
    name = models.CharField(max_length=50, unique=True)         # поле, строка, максимально 50 символов, уникальная

    class Meta:                             # доп информация для админки
        verbose_name = "Жанр"           # как показывать название таблицы в админке в ЕДИНСТВЕННОМ числе    
        verbose_name_plural = "Жанры"    # как показывать название таблицы в админке во МНОЖЕСТВЕННОМ числе    

    def __str__(self) -> str:                   # метод, который будет вызываться если мы будем преобразовывать объект данного класса в строку
        return f"{self.name}; id={self.id}"     # будем возвращать имя издателя и его id в виде такой строки    


class Authors(models.Model):
    firstname = models.CharField(max_length=50)                 # имя
    lastname = models.CharField(max_length=50)                  # фамилия
    patronymic = models.CharField(max_length=50, null=True, blank=True) # отчество, можно оставить пустым
    birthday = models.DateField()                               # день рождения, дата

    class Meta:                             # доп информация для админки
        verbose_name = "Писатель"           # как показывать название таблицы в админке в ЕДИНСТВЕННОМ числе    
        verbose_name_plural = "Писатели"    # как показывать название таблицы в админке во МНОЖЕСТВЕННОМ числе    

    def __str__(self) -> str:                   # метод, который будет вызываться если мы будем преобразовывать объект данного класса в строку
        return f"{self.lastname} {self.firstname} {self.patronymic}; {self.birthday}; id={self.id}"     # будем возвращать имя издателя и его id в виде такой строки


class Books(models.Model):
    title = models.CharField(max_length=255)                    # название книги
    publisher = models.ForeignKey(Publishers, on_delete=models.SET_NULL, null=True, blank=True) # издатель. Внешний ключ к классу Publishers по id
    #  on_delete=models.SET_NULL    что делать при удалении издателя(установить null, default, удалить или запретить)
    # , null=True, blank=True       поле можно оставить пустым
    year = models.SmallIntegerField()           # год издания, число на 2 байта
    authors = models.ManyToManyField(Authors, related_name="books")     # писатели  связь многие-ко-многим с таблицей Authors(автоматом сделается сквозная таблица)
    # related_name="books"      у писателей будет виртуальное поле books, в которм можно получить список книг данног автора
    genres = models.ManyToManyField(Genres, related_name="books")

    class Meta:                             # доп информация для админки
        verbose_name = "Книга"           # как показывать название таблицы в админке в ЕДИНСТВЕННОМ числе    
        verbose_name_plural = "Книги"    # как показывать название таблицы в админке во МНОЖЕСТВЕННОМ числе   

    def __str__(self) -> str:                   # метод, который будет вызываться если мы будем преобразовывать объект данного класса в строку
        return f"{self.title}; год издания-{self.year}; id={self.id}"     # будем возвращать название книги, год издания и его id в виде такой строки
