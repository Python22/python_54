let all_show_books_btns = document.getElementsByClassName("show_author_books_btn")  // находим все кнопки "показать" на странице по CSS классу

for (let show_btn of all_show_books_btns) {                                         // перебираем каждую кнопку
    show_btn.addEventListener("click", (e) => {                                     // данной кнопке добавляем отслеживание клика. Если клик сработал то запускаем функцию
        let author_id = show_btn.getAttribute("author_id")                          // узнаём значение атрбута author_id у данной кнопки
        let url = `http://127.0.0.1:8000/get_books_by_author_id/${author_id}`       // формируем ссылку на получение коллекции книг у автора с таким id
        console.log(url)   

        show_btn.innerHTML = "Загрузка..."                                          // меняем текст на кнопке
        show_btn.disabled = true                                                    // делаем кнопку неактивной, чтобы нельзя было повторно нажать

        try {                                                                       // блок внутри try выполняет код с отслеживанием исключений
            fetch(url)                                                                  // делаем сетевой запрос по сформированной ссылке url для данного писателя по id
            .then(response => {                                                         // асинхронно ждём ответ от сервера        
                console.log(response)                                                   // Response { type: "basic", url: "http://127.0.0.1:8000/get_books_by_author_id/1", redirected: false, status: 200, ok: true, statusText: "OK", headers: Headers(8), body: ReadableStream, bodyUsed: false }
                if (response.status != 200) {                                           // если статус на 200, то данные не получены, есть какая-то ошибка
                    show_btn.innerHTML = "Данные не получены..."                        // пишем на кнопке ошибку
                    show_btn.disabled = false                                           // делаем кнопку снова кликабельной
                    throw new Error("Данные не получены...")                            // кидаем JS исключение
                }
                return response.json()                                          // берём тело ответ и десериализуем(из строки в массив js объектов)
            })
            .then(data => {                                                     // берём массив js объектов
                console.log(data)                                               // Array(3) [ {…}, {…}, {…} ]
                let books_container = show_btn.parentNode                       // узнаём родительский элемент нашей кнопки
                books_container.innerHTML = ""                                  // очищаем содержимое ячейки, в том числе и кнопку удалим
                if (data.length === 0) {                                        // если кол-во элементов в коллекции книг === 0
                    books_container.innerHTML = "книг нет"                      // пишем в ячейке что книг нет
                }
                else {                                                          // если книги есть
                    for (let book of data) {                                    // перебираем все книги
                        books_container.innerHTML += `<p>${book.title}; ${book.year}</p>`   // добавляем в ячейку строку из данных про данную книгу       
                    }        
                }
            })
        }
        catch {                                                                 // сюда попадём если было исключение    
            show_btn.innerHTML = "Данные не получены..."                        // пишем на кнопке ошибку
            show_btn.disabled = false                                           // делаем кнопку снова кликабельной
        }
        

    })
}
