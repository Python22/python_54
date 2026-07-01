from django.shortcuts import render


def index(request):
    return render(
        template_name="biblio_app/templates/books.html",
        request=request
    )


def all_books(request):
    return render(
        template_name="biblio_app/templates/books.html",
        request=request
    )


def all_authors(request):
    return render(
        template_name="biblio_app/templates/authors.html",
        request=request
    )


def all_publishers(request):
    return render(
        template_name="biblio_app/templates/publishers.html",
        request=request
    )


def all_genres(request):
    return render(
        template_name="biblio_app/templates/genres.html",
        request=request
    )
