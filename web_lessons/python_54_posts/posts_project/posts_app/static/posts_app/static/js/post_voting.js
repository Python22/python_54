let all_vote_buttons = document.querySelectorAll(".like_btn, .dislike_btn") // ищем кнопки голосования как в css
console.log(all_vote_buttons)


for (let vote_button of all_vote_buttons) {                                 // перебираем все кнопки голосования
    vote_button.addEventListener("click", (e) => {                          // каждой кнопке добавляем отслеживание клика по ней
        console.log("тынкули на оценку")
        let post_id = e.target.getAttribute("post_id")                      // узнаём у кнопки что лежит в атрибуте post_id
        let user_vote_value = ""                                            // тут будем держать то, какую оценку отправим
        console.log(post_id)
        
        if (e.target.innerText === "👍") {                                  // если у кнопки внутри лежит 👍 
            user_vote_value = "1"                                           // если лайк, то в переменную сохраним "1", это как бы лайк
        }
        else {                                                              // если на кнопке дизлайк    
            user_vote_value = "-1"                                          // то в переменную запишем "-1"
        }
        console.log(user_vote_value)
        // let user_vote_value = e.target.innerText === "👍" ? "1" : "-1"   // то же самое, но тернарным оператором
        fetch(`/post_vote?post_id=${post_id}&user_vote_value=${user_vote_value}`)   // отправляем на сервер GET запрос с нашими данными
        .then(response => {                                             // как только будет получен ответ от сервера, сохраним ответ в response
            console.log(response)                                       // Response { type: "basic", url: "http://127.0.0.1:8000/get_next_posts/?current_page=1", redirected: true, status: 200, ok: true, statusText: "OK", headers: Headers(8), body: ReadableStream, bodyUsed: false }
            if (response.status != 200) {                               // если статус ответа НЕ ок
                throw "Не смогли получить новые посты..."               // кидаем исключение в консоль
            }
            console.log("данные получены")
            return response.json()                                      // проводим десериализацию данных из строки
        })
        .then(data => {                                                 // работапем с данными, которые пришли от сервера
            console.log(data)
            if (data.error_message != null) {                           // если в полученных данных в поле error_message НЕ null
                throw `Не смогли оценить данный пост...Ошибка: ${data.error_message}`   // кидаем исключение в консоль с описанием ошибка от сервера
            }
            // если данные не содержат инфу об ощибке, то значит всё ок
            if (e.target.innerText === "👍") {                                  // если у кнопки внутри лежит 👍 
                e.target.style.textShadow = "0 0 5px green"                     // добавим подсветку у кнопки зелёного цвета
                console.log(e.target.parentNode.children[2])
            }
            else {                                                              // если на кнопке дизлайк    
                e.target.style.textShadow = "0 0 5px red"                       // добавим подсветку у кнопки красного цвета
            }
            e.target.parentNode.children[2].innerText = data.new_post_rating    // обновляем рейтинг на странице(ищем спан по родителю)
        })
    })
}