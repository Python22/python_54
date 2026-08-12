from flask import Flask, render_template, url_for, request, redirect        # подключаем фласк и его компоненты
from flask_sqlalchemy import SQLAlchemy                                     # для взаимодействия с БД и работой с таблицами из БД    
from flask_migrate import Migrate                                           # класс для создания/изменения таблиц в БД
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash   # для генерации хеша пароля и его проверки


app = Flask(__name__)                                                       # создаём объект приложения Flask, и даём ему имя нашего файла

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"             # регистрируем путь к БД. Используем диалект sqlite и пишем путь к файлу
app.config["SECRET_KEY"] = "234asdjl;flkj34lj5lk3j45lkhe3lkbdam,bn"         # секретный ключ сервера


db = SQLAlchemy(app=app)                                                    # создаём объект, который будет взаимодействовать с БД
migrate = Migrate(app=app, db=db)                                           # объект, который будет создавать/изменять поля в таблицах

login_manager = LoginManager(app=app)                                       # создаём объект логин менеджера из встроеннйо бибилиотеки
login_manager.login_view = "/login"                                         # регистрируем страницу схода в аккаунт


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class User(db.Model, UserMixin):                                        # класс-модель-таблица пользователей. наследуемся от других классов для подключения методов
    __tablename__ = "users"                                             # название таблицы

    id = db.Column(db.Integer, primary_key=True)                        # поле id, числовое, первичный ключ
    username = db.Column(db.String(50), unique=True, nullable=False)    # ник, срока до 50 символов, уникальная, обязательная
    password_hashed = db.Column(db.String(255), nullable=False)         # хеш пароля, до 255 символов, обязательное поле
    correct_singleplayer_answers = db.Column(db.Integer)                # кол-во правильных ответов в одиночной игре 
    incorrect_singleplayer_answers = db.Column(db.Integer)              # кол-во НЕправильных ответов в одиночной игре 
    multiplayer_game_wins = db.Column(db.Integer)                       # кол-во ВЫИГРАННЫХ игр в мультиплеере
    multiplayer_game_losses = db.Column(db.Integer)                     # кол-во ПРОИГРЫШЕЙ в мультиплеере


@app.route("/hello")                                            # если кто-то зашёл по адресу http://127.0.0.1:5000/hello
def hello():                                                    # то запускается функция
    return "HELLO!!!"                                           # которая просто вернёт строку    


@app.route("/")                                                 # если кто-то зашёл по адресу http://127.0.0.1:5000/
def index():                                                    # то запускается функция
    return render_template(template_name_or_list="index.html")  # которая вернёт шаблон из папки tempaltes с таким названием


@app.route("/game")                                             # если кто-то зашёл по адресу http://127.0.0.1:5000/game
def game():                                                     # то запускается функция
    return render_template(template_name_or_list="game.html")   # которая вернёт шаблон из папки tempaltes с таким названием


@app.route("/check_answer")
def check_answer():  
    pass
@app.route("/multiplayer") 
def multiplayer():
    return render_template(template_name_or_list="multiplayer.html")


@app.route("/registration", methods=["POST", "GET"]) 
def registration():
    if request.method == "POST":                # если данные от пользователя пришли с методом POST, то это значит пришли данные из формы регистрации
        username = request.form["username"]     # что пришло из input с именем username
        password = request.form["password"]     # что пришло из input с именем password
        password2 = request.form["password2"]   # что пришло из input с именем password2
        print(f"Кто-то хочет создать аккаунт/// username: {username}, {password}, {password2}")

        error_messages = []                     # если данные не проходят валидацию, то тут будем писать что не так и потом отправим это клиенту

        if username is None or password is None or password2 is None:           # если что-то из полей не пришло
            error_messages.append("Все поля обязательны;")                      # добавляем в список ошибок такое сообщение
        if len(username) > 50:
            error_messages.append("Ник слишком длинный, должен быть до 50 символов;")    
        if password != password2:
            error_messages.append("Пароли должны совпадать;")
        print(f"errors: {error_messages}")    

        # надо сделать поиск по нику
        existing_user = User.query.filter_by(username=username).first()     # ищем в БД запись в таблице users, у которой никнейм такой же, какой и сейчас пришёл
        # если никто не будет найден, сохраним None, если кто-то есть, то будет объект

        if existing_user:                                                   # если пользователь с таким ником уже есть
            error_messages.append("Такой ник уже занят.")                   # дополняем список ошибок        

        if len(error_messages) == 0:            # если список ошибок пустой
            new_user = User(                    # создаём объект класса User с такими полями(это будщая запись в БД в таблице)
                username=username,
                password_hashed=generate_password_hash(password),           # в поле пароля создаём хеш от пароля
                correct_singleplayer_answers=0,
                incorrect_singleplayer_answers=0,
                multiplayer_game_wins=0,
                multiplayer_game_losses=0
            )    
            db.session.add(new_user)                        # выполняем запрос в БД
            db.session.commit()                             # завершаем транзакцию, полноценно сохраняем запись в БД    
            print("В БД создан пользователь", username)
            # return redirect("/")                                 # на какой адрес перенаправляем
            login_user(new_user)                                   # запоминаем пользователя   
            return redirect(url_for("index"))                      # на какой адрес перенаправляем по названию функции
        else:                                               # если список ошибок не пустой    
            return render_template(                                # отправляем тот же шаблон, но уже с коллекцией ошибок
                template_name_or_list="registration.html",
                error_messages=error_messages
            )    
    return render_template(template_name_or_list="registration.html")


@app.route("/login", methods=["POST", "GET"]) 
def login():
    if request.method == "POST":                # если данные от пользователя пришли с методом POST, то это значит пришли данные из формы регистрации
        username = request.form["username"]     # что пришло из input с именем username
        password = request.form["password"]     # что пришло из input с именем password
        print(f"Кто-то хочет войти аккаунт/// username: {username}, {password}")

        error_messages = []                     # если данные не проходят валидацию, то тут будем писать что не так и потом отправим это клиенту

        if username is None or password is None:           # если что-то из полей не пришло
            error_messages.append("Все поля обязательны;")                      # добавляем в список ошибок такое сообщение
        if len(username) > 50:
            error_messages.append("Ник слишком длинный, должен быть до 50 символов;")    

        print(f"errors: {error_messages}")    

        # надо сделать поиск по нику
        existing_user = User.query.filter_by(username=username).first()     # ищем в БД запись в таблице users, у которой никнейм такой же, какой и сейчас пришёл
        # если никто не будет найден, сохраним None, если кто-то есть, то будет объект

        if existing_user is None:                                           # если пользователь с таким ником не найден
            error_messages.append("Такого пользователя нет.")               # дополняем список ошибок  
        else:
            if check_password_hash(existing_user.password_hashed, password) is False:
                error_messages.append("Пароли не совпадают.")              

        if len(error_messages) == 0:                                        # если список ошибок пустой
            login_user(existing_user)                                       # запоминаем пользователя   
            return redirect(url_for("index"))                      # на какой адрес перенаправляем по названию функции
        else:                                               # если список ошибок не пустой    
            return render_template(                                # отправляем тот же шаблон, но уже с коллекцией ошибок
                template_name_or_list="login.html",
                error_messages=error_messages
            )    
    return render_template(template_name_or_list="login.html")


@app.route("/logout") 
def logout():
    pass
@app.route("/user_page") 
def user_page():
    return render_template(template_name_or_list="user_page.html")


if __name__ == "__main__":
    with app.app_context():     # создаём контекст перед запуском сервера
        db.create_all()         # создаём таблицы и поля и работаем с БД
    app.run()
