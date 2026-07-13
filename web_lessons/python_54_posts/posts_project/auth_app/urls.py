from django.urls import path
import auth_app
import auth_app.views


app_name = "auth_app"           # название нашего приложения, внутри которого находится данный urls.py

# регистрируем наши пути и какие функции должны быть вызваны при заходе на данные пути
urlpatterns = [
    path('register/', auth_app.views.register_view, name="register"),
    path('login/', auth_app.views.login_view, name="login"),
    path('logout/', auth_app.views.logout_view, name="logout"),
]
