let all_show_books_btns = document.getElementsByClassName("show_author_books_btn")  // находим все кнопки "показать" на странице по CSS классу

for (let show_btn of all_show_books_btns) {                                         // перебираем каждую кнопку
    show_btn.addEventListener("click", (e) => {                                     // данной кнопке добавляем отслеживание клика. Если клик сработал то запускаем функцию
        let author_id = show_btn.getAttribute("author_id")                          // узнаём значение атрбута author_id у данной кнопки
        let url = `http://127.0.0.1:8000/get_books_by_author_id/${author_id}`       // формируем ссылку на получение коллекции книг у автора с таким id
        console.log(url)   
        
    })
}