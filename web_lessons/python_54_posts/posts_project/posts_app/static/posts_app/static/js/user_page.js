let all_posts_container = document.getElementById("all_posts_container") // div со всеми постами

let current_page = 0        // текущая страница

document.addEventListener("scrollend", (e) => {     // отслеживаем событие завершения прокрутки
    let page_height = document.body.scrollHeight    // высота содержимого страницы
    console.log("прокрутили!")
    console.log(page_height)                        
    console.log(window.scrollY)                     // текущее положение по высоте

    if (page_height - window.scrollY < 2000) {       // если прокрутили до конца страницы(до конца менее 500 пикселей)
        console.log("прокрутили до конца, нужна подгрузка постов")
        fetch(`/get_next_posts_by_user?current_page=${current_page + 1}&username=${document.title}`)            // делаем GET запрос на сервер по указанному url
        .then(response => {                                             // как только будет получен ответ от сервера, сохраним ответ в response
            console.log(response)                                       // Response { type: "basic", url: "http://127.0.0.1:8000/get_next_posts/?current_page=1", redirected: true, status: 200, ok: true, statusText: "OK", headers: Headers(8), body: ReadableStream, bodyUsed: false }
            if (response.status != 200) {                              // если статус ответа НЕ ок
                throw "Не смогли получить новые посты..."               // кидаем исключение в консоль
            }
            console.log("данные получены")
            return response.json()                                      // проводим десериализацию данных из строки
        })
        .then(data => {                                                 // работаем с полученными данными
            console.log(data)                                           // Object { status: "ok", new_posts: (2) […] }
            let new_posts = data.new_posts                              // из тела данных получаем массив постов
            console.log(new_posts)                                      // Array [ {…}, {…} ]
            for (let post of new_posts) {                               // перебираем массив новых постов
                let post_html_string = ""                               // тут будем собирать html строку для данного поста
                
                post_html_string += `
                    <div class="post_container">
                        <div class="post_header">
                            <h2><a href="/post/${post.id}">${post.title}</a></h2>
                        </div>
                        <p class="post_author">${post.author}</p>
                        <p class="post_date">${post.create_date}</p>
                        <p class="post_content">${post.content}</p>
                `
                if (post.image != null) {   // если у данного поста в поле ссылки на картинку не null, а настоящая ссылка, то
                    post_html_string += `<img src="${post.image}" alt="картинка поста" class="post_image">`
                }
                        
                post_html_string +=        
                        `<div class="post_footer">
                            <a href="/post/${post.id}">Комментарии</a>
                            <button class="like_btn" post_id="${post.id}">👍</button>
                            <span class="rating">${post.rating}</span>
                            <button class="dislike_btn" post_id="${post.id}">👎</button>
                        </div>
                    </div>
                `            
                all_posts_container.innerHTML += post_html_string   // в контейнер всех постов добавим новый html код
            }
            current_page++
        })
    } 
})

