from flask import Flask, render_template, url_for       # подключаем фласк и его компоненты


app = Flask(__name__)                                           # создаём объект приложения Flask, и даём ему имя нашего файла

@app.route("/hello")                                            # если кто-то зашёл по адресу http://127.0.0.1:5000/hello
def hello():                                                    # то запускается функция
    return "HELLO!!!"                                           # которая просто вернёт строку    


@app.route("/")                                                 # если кто-то зашёл по адресу http://127.0.0.1:5000/
def index():                                                    # то запускается функция
    return render_template(template_name_or_list="index.html")  # которая вернёт шаблон из папки tempaltes с таким названием


@app.route("/game")                                             # если кто-то зашёл по адресу http://127.0.0.1:5000/game
def game():                                                     # то запускается функция
    return render_template(template_name_or_list="game.html")   # которая вернёт шаблон из папки tempaltes с таким названием

if __name__ == "__main__":
    app.run()
