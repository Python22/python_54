from django.urls import path
import posts_app
import posts_app.views


app_name = "posts_app"           # название нашего приложения, внутри которого находится данный urls.py

# регистрируем наши пути и какие функции должны быть вызваны при заходе на данные пути
urlpatterns = [
    path('', posts_app.views.all_posts_view, name="all_posts"),
    path('add_new_post/', posts_app.views.add_new_post, name="add_new_post"),
    path('post/<str:post_id>', posts_app.views.post_and_commentaries_view, name="post_and_commentaries"),
    path('get_next_posts/', posts_app.views.get_next_posts, name="get_next_posts"),
    path('error_404_post_not_found/', posts_app.views.error_404_post_not_found, name="error_404_post_not_found"),
]
