from flask import Flask, render_template, url_for       # подключаем фласк и его компоненты
from flask_sqlalchemy import SQLAlchemy                 # для взаимодействия с БД и работой с таблицами из БД    
from flask_migrate import Migrate                       # класс для создания/изменения таблиц в БД
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required, current_user



app = Flask(__name__)                                                   # создаём объект приложения Flask, и даём ему имя нашего файла

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"         # регистрируем путь к БД. Используем диалект sqlite и пишем путь к файлу

db = SQLAlchemy(app=app)                                                # создаём объект, который будет взаимодействовать с БД
migrate = Migrate(app=app, db=db)                                       # объект, который будет создавать/изменять поля в таблицах


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
@app.route("/registration") 
def registration():
    return render_template(template_name_or_list="registration.html")
@app.route("/login") 
def login():
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
