// let test_array = ["vasya", "petya", "bob"]

// for (let i = 0; i < test_array.length; i++) {
//     console.log(test_array[i])
// }

// for (let i in test_array) {         // перебираем индексы
//     console.log(test_array[i])
// }

// for (let elem of test_array) {         // перебираем элементы
//     console.log(elem)
// }



// class Student {
//     constructor(name, age, gender="male") {
//         this.name = name
//         this._age = age
//         this.gender = gender
//     }

//     say_hello() {
//         console.log("hi!!!!!!")
//     }

//     set_age(value) {
//         if (value < 0) {
//             throw "Возраст не может быть отрицательным!!!"
//         }
//         this._age = value
//     }

//     static test_static() {      // так мы создали статичный метод. Он доступен только самому классу, но не объектам данного класса
//         console.log("this is a static method!!!")
//     }
// }

// vasya = new Student("Vasya", 21)
// vasya.say_hello()
// console.log(vasya)
// // vasya.set_age(-25)
// console.log(vasya)

// // vasya.test_static()
// Student.test_static()




// class Cat {
//     static cats_counter = 0     // общее поле для класса, оно доступно самому классу

//     constructor(name, age) {
//         this.name = name
//         this.age = age
        
//         Cat.cats_counter++
//     }


// }

// barsik = new Cat("Barsik", 5)
// murzik = new Cat("Murzik", 3)
// bob = new Cat("Bob", 4)

// console.log(barsik)
// console.log(Cat.cats_counter)





// class Animal {
//     constructor(name="Noname", age=0) {
//         this.name = name
//         this.age = age
//     }

//     run() {}
//     sleep() {}
//     eat() {}
// }

// class Dog extends Animal {
//     constructor(name="Noname", age=0, weight=0) {
//         super(name, age)
//         this.weight = weight
//     }

//     run() {
//         console.log(`dog (${this.name}) is running!!!`)
//     }
// }


// class Kangaroo extends Animal {
//     constructor(name="Noname", age=0, height=0) {
//         super(name, age)
//         this.height = height
//     }

//     run() {
//         console.log(`Kangaroo (${this.name}) is jumping!!!`)
//     }
// }





/**
 * Задание 1
Реализовать класс PrintMachine, которой состоит из:
■ размера шрифта;
■ цвета шрифта;
■ семейства шрифта;
■ метода print(), который принимает текст и печатает его
соответствующим шрифтомс помощью .
Создать объект такого класса и продемонстрировать работу
метода.
 */
// class PrintMachine {
//     constructor(font_size=14, color="black", font_family="arial") {
//         this.font_size = font_size
//         this.color = color
//         this.font_family = font_family
//     }

//     print(text) {
//         document.write(`<p style="font-size:${this.font_size}px; color:${this.color}; font-family:${this.font_family}">${text}</p>`)
//     }
// }

// // ctrl + /

// my_print_machine = new PrintMachine(40, "red")
// my_print_machine.print("lorem ipsum111!!!!!")
// my_print_machine.print("sdf sdf sdlfj slfj d")

// second_machine = new PrintMachine(50, "#00ff19", "sans-seriff")
// second_machine.print("this is new text!!!!")














/*
Задание 2
Реализовать класс, описывающий новость (заголовок, текст, массив тегов, дата публикации). 
В классе необходимо реализовать
один метод print, который выводит всю информацию в таком
виде, как на рисунке 1.

Обратите внимание на то, как выводится дата:
■ если с даты публикации прошло менее дня, то выводится «сегодня»;
■ если с даты публикации прошло менее недели, то выводится «N дней назад»;
■ в остальных случаях, полная дата в формате «дд.мм.гггг».
*/

/**
 * This class can made and show some news
 * @param title - String
 * @param text - String
 * @param all_tags - Array
 * @param publisch_date - string with format "YYYY-MM-DD"
 */
// class News {
//     constructor(title, text, all_tags, publisch_date) {
//         this.title = title
//         this.text = text
//         this.all_tags = all_tags
//         this.publisch_date = new Date(publisch_date)        // создаём объект даты из нашей строки такого вида: "YYYY-MM-DD"
//     }

//     print() {
//         let current_news_container = document.createElement("div")      // создаём виртуальный элемент с тегом div и сохраняем ег ов переменную
//         current_news_container.classList.add("current_news_container")  // созданному элементу div даём CSS класс current_news_container

//         let publisch_date_string = ""       // тут сформируем строку даты публикации в требуемом виде. Сформируем её чуть далее
//         let current_date = new Date()       // создаём объект даты. В него запишется текщая дата        
//         let date_difference = Math.floor((current_date - this.publisch_date) / 1000 / 60 / 60 / 24) // считаем разницу между текущей датой и датой публикации и приводим ёе к целым суткам
//         console.log(date_difference)

//         if (date_difference === 0) {            // если разница равняется 0, то значит публикация была сегодня
//             publisch_date_string = "Сегодня"
//         }
//         else if (date_difference === 1) {
//             publisch_date_string = "1 день назад"
//         }
//         else if (date_difference === 2 || date_difference === 3 || date_difference === 4) {     // если разница 2, 3 или 4 дня
//             publisch_date_string = `${date_difference} дня назад`                               // то такая строка будет
//         }
//         else if (date_difference === 5 || date_difference === 6) {                              // если разница 2, 3 или 4 дня
//             publisch_date_string = `${date_difference} дней назад`                              // то такая строка будет
//         }
//         else {                                                                      // если 7 и более дней
//             publisch_date_string = this.publisch_date.toLocaleDateString()          // берём дату публикации и приводим к виду «дд.мм.гггг». 
//         }

//         let all_tags_string = ""            // здесь будем хранить строку со всеми тегами в виде кнопок, пока она пустая
//         for (let tag of this.all_tags) {    // перебираем все теги в массиве всех тегов по-очереди    
//             all_tags_string += `<a href="#">#${tag}</a>`    // добавляем в стркоу тегов элемент 'a' с текстом этого тега вместе с #
//         }
//         // в итоге в all_tags_string будет такое: `<a href="#">#test</a><a href="#">#lorem</a>`

//         // если обратиться к элементу с методом innerHTML, то можно создать его содержимое
//         current_news_container.innerHTML = `
//             <h2>${this.title}</h2>
//             <span>${publisch_date_string}</span>
//             <p>${this.text}</p>
//             <p>${all_tags_string}</p>
//         `   // так мы создали заполнение для контейнера новости. Значения для элементов берём из объекта, который вызывает метод print()
        
//         document.getElementById("all_news_container").append(current_news_container)    
//         // находим на странице элемент с id all_news_container и добавляем ему в конец наш созданный div
//     }
// }

// /**
//  * Задание 3
// Реализовать класс, описывающий новостную ленту.
// Класс должен содержать:
// ■ массив новостей;
// ■ свойство, которое возвращает количество новостей;
// ■ метод для вывода на экран всех новостей;
// ■ метод для добавления новости;
// ■ метод для удаления новости;
// ■ метод для сортировки новостей по дате (от последних новостей до старых);
// ■ метод для поиска новостей по тегу (возвращает массив
// новостей, в которых указан переданный в метод тег).
// Продемонстрировать работу написанных методов.
//  */

// /**
//  * This class can make a news thread!!!
//  */
// class NewsThread {
//     constructor() {
//         this.all_news = []      // тут будем держать массив новостей
//     }

//     /**
//      * свойство, которое возвращает количество новостей;
//      */
//     get_news_count() {
//         return this.all_news.length // возвращаем кол-во элементов в массиве новостей
//     }

//     /**
//      * ■ метод для вывода на экран всех новостей;
//      */
//     print_all_news() {
//         for (let current_news of this.all_news) {       // перебираем все новости из массива новостей данной новостной ленты
//             current_news.print()                        // вызываем метод print() у данной новости
//         }
//     }

//     /**
//      * ■ метод для добавления новости;
//      */
//     add_news(news) {
//         this.all_news.push(news)  // вставляем в конец нашего массива новостей, новость, которую получили в методе
//     }

//     delete_news_by_title() {}
//     sorting_by_date() {}
//     get_news_by_tag_name(tag_name) {}
// }



// first_news = new News(
//     "first news", 
//     "lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
//     ["test", "lorem"],
//     "2026-06-03"
// )

// second_news = new News(
//     "second news", 
//     "asdmslk dfskdj fkjsd hfjk dhf gjkhdf jkgh djkfhg jkdfh gkjdhfg dfgrem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
//     ["test", "asd"],
//     "2026-05-03"
// )
// third_news = new News(
//     "third news", 
//     "asdmslk dfskdj fkjsd hfjk dhf gjkhdf jkgh djkfhg jkdfh gkjdhfg dfgrem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
//     ["test", "asd"],
//     "2026-06-01"
// )

// // first_news.print()
// // second_news.print()
// // third_news.print()


// let news_thread = new NewsThread()          // создали объект новостной ленты
// console.log(news_thread.get_news_count())   // 0 
// news_thread.add_news(first_news)            // вставляем новость в новостную ленту
// news_thread.add_news(second_news)
// news_thread.add_news(third_news)
// console.log(news_thread.get_news_count())   // 3
// document.write(`<h2>Сейчас столько новостей: ${news_thread.get_news_count()}</h2>`)

// news_thread.print_all_news()                // вызываем метод распечатки всех новостей









// Задание 4
// Реализовать класс Button, который содержит ширину, высоту,
// текст кнопки и метод showBtn(), который выводит кнопку на экран
// с помощью тега button и функции document.write().
// Реализовать класс BootstrapButton, унаследовав его от класса
// Button. 
// Добавить поле color и переопределить метод showBtn()
// так, чтобы кнопка выводилась со стилями и указанным цветом.

// class Button {
//     constructor(width, height, text="") {
//         this.width = width          // ширина
//         this.height = height        // высота
//         this.text = text            // текст кнопки
//     }

//     showBtn() {
//         document.write(`<button style="width:${this.width}px; height:${this.height}px;">${this.text}</button>`)
//     }
// }

// class BootstrapButton extends Button {                      // создаём класс-наследник от класса Button
//     constructor(width, height, text="", color="black") {    // при создании экземпляров можем принимать 4 параметра
//         super(width, height, text)                          // отправляем первые 3 параметра в родительский конструктор
//         this.color = color                                  // новое поле класса
//     }

//     showBtn() {
//         // document.write(`<button style="width:${this.width}px; height:${this.height}px; color: ${this.color}">${this.text}</button>`)
//         document.write(`<button style="width:${this.width}px; height:${this.height}px; background-color: ${this.color}">${this.text}</button>`)
//     }
// }

// first_button = new Button(100, 50, "test")      // создали экземпляр класса
// first_button.showBtn()                          // вызываем его метод отрисовки

// second_button = new Button(100, 20, "test2")    // создали экземпляр класса
// second_button.showBtn()                         // вызываем его метод отрисовки

// third_button = new BootstrapButton(100, 100, "test 3", "red")   // создали экземпляр другого класса
// third_button.showBtn()                                          // вызываем его метод отрисовки



// второй способ обработки событий
// function click_to_btn() {
//     alert("тыкнули по кнопке")
// }

// // третий способ обработки событий
// let third_btn = document.getElementById("third_btn")    // находим кнопку на странице по её id
// third_btn.addEventListener("click", click_to_btn)       // добавляем отслеживание клика 


// // четвёртый способ обработки событий
// document.getElementById("fourth_btn").addEventListener("click", click_to_btn)   // то же самое, что и у способа №3, но без переменной


// // пятый способ обработки событий
// document.getElementById("fifth_btn").addEventListener("click", () => { 
//     alert("тыкнули по пятой кнопке!!!!")                               // тут описываем тело функции, которая будет вызвана при клике
//     console.log("тыкнули по пятой кнопке!!!!")
// })  // то же самое, но используя стрелочную функцию


// // шестой способ обработки событий
// let sixth_btn = document.getElementById("sixth_btn")        // находим кнопку по id и сохраняем в переменную

// sixth_btn.addEventListener("click", (e) => {                // добавляем отслеживание клика, если он есть вызываем функцию и передаём ей свойства события
//     console.log(e)                                          // тут есть все св-ва события
//     console.log(e.target)                                   // <button id="sixth_btn">      это наша кнока, которая была тыкнута  (сам элемент, который вызвал событие)
//     e.target.remove()                                       // метод remove() позволяет удалить элемент, у которого вызван данный метод
// })  

// sixth_btn.addEventListener("mousemove", (e) => {            // добавялем этой же кнопке второе отслеживание события(движение мыши внутри кнопки)
//     console.log("мышка двигается по кнопке!!!!!!!")         // просто выводим в консоль
//     e.target.innerHTML += "!"                               // добавялем внутрь кнопки в текст ещё 1 !
// })






// Задание 5
// Создать html-страницу для генерации случайных чисел. На
// странице должна быть кнопка, при нажатии на которую случайное
// целое число от 0 до 100 выводится в div. 

// способ 1
// let random_number_elem = document.getElementById("random_number_elem")      // находим поле, куду будем вставлять случайное число
// let generate_number_btn = document.getElementById("generate_number_btn")    // находим кнопку генерации случайного числа

// generate_number_btn.addEventListener("click", () => {                       // если кликнули по кнопке
//     random_number_elem.innerHTML = Math.floor(Math.random() * 100)          // 
// })



// способ 2
// function randint(min, max) {        // функция честной генерации чисел от первого до второго числа. Можно найти в интернете
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// let random_number_elem = document.getElementById("random_number_elem")      // находим поле, куду будем вставлять случайное число
// let generate_number_btn = document.getElementById("generate_number_btn")    // находим кнопку генерации случайного числа

// generate_number_btn.addEventListener("click", () => {                       // если кликнули по кнопке
//     random_number_elem.innerHTML = randint(1, 100)                          // вызываем функцию генерации чисел от 1 до 100 и вставляем в текстовый элемент
// })

// task_5.style.textAlign = "center"       // обращаемся к элементу task_5 по его id и даём св-во text-align со значением center(выравнивание текста по-центру)




/**
 * Задание 6
Создать html-страницу с div, который занимает всю ширину и высоту экрана. 
При движении мышкой внутри этого div, выводить текущие координаты мышки. 
При клике кнопкой мыши туда же, выводить, какой именно кнопкой был совершен клик 
(правой или левой).
 */

// let task_6 = document.getElementById("task_6")          // нашли сам div по его id
// let task_6_text = document.querySelector("#task_6 p")   // находим 1 элемент по поиску как в CSS через метод querySelector()

// task_6.style.backgroundColor = "#555"                   // даём нашему div цвето фона(можно названием, HEX, rgb, rgba)
// task_6.style.width = "100%"                             // даём CSS св-во ширина 100% от родителя(body), т.е. вся страница
// task_6.style.height = "100vh"                           // высоту ставим на 100 vh(viewport height), вместо %

// task_6_text.style.textAlign = "center"                  // центрируем текст по горизонтали
// task_6_text.style.paddingTop = "50vh"                    // центрируем текст по вертикали(добавляем сверху отступ на половину экрана)

// task_6.addEventListener("mousemove", (e) => {           // добавляем отслеживание движение мышкой. Если оно есть, запускается функция с приёмом парамеитров события(e)
//     task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}`  // вставляем в текстовый элемент значения координат из полученного события
// })

// task_6.addEventListener("mousedown", (e) => {
//     console.log(e.buttons)      // сумма кнопок, которые зажаты у мышки
//     if (e.buttons === 1) {      // если сумма кнопок = 1, то это значит что зажата только левая кнопка мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Левая`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
//     else if (e.buttons === 2) {      // если сумма кнопок = 2, то это значит что зажата только правая кнопка мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Правая`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
//     else if (e.buttons === 3) {      // если сумма кнопок = 3, то это значит что зажата левая и правая кнопки мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Левая и правая`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
//     else if (e.buttons === 4) {      // если сумма кнопок = 4, то это значит что зажато колёсико мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Колёсико`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
//     else if (e.buttons === 5) {      // если сумма кнопок = 5, то это значит что зажата левая кнопка и колёсико мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Левая и колёсико`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
//     else if (e.buttons === 6) {      // если сумма кнопок = 6, то это значит что зажата левая кнопка и колёсико мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Правая и колёсико`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
//     else if (e.buttons === 7) {      // если сумма кнопок = 7, то это значит что зажата левая кнопка, правая кнопка и колёсико мыши
//         task_6_text.innerHTML = `X: ${e.clientX}; Y: ${e.clientY}<br>Левая, правая и колёсико`     // вставляем в текст помимо координат ещё и имя кнопки на новой строке
//     }
// })


/**
 * Задание 7
Создать html-страницу, на которой будет кнопка и текст. 
При нажатии на кнопку, текст должен скрываться. 
При повторном нажатии – текст должен снова отображаться. 
 */

// let task_7_text = document.getElementById("task_7_text")        // нашли текстовое поле, которое надо будет скрывать/показывать
// document.getElementById("task_7_btn").addEventListener("click", () => { // находим кнопку и добавляем отслеживание клика, который вызывает функцию
//     if (task_7_text.style.display !== "none") {             // узнаём значение CSS св-ва display у текстового блока. Если там не none, то значит он отображается
//         task_7_text.style.display = "none"                  // даём текстовому блоку CSS св-во display: none  (выключаем его)
//     }
//     else {                                                  // иначе значит что там стоит none(выключено отображение)
//         task_7_text.style.display = "block"                 // ставим обычный блоковый режим отображения(включаем)
//     }
    
// })




/**
 *  Задание 8
Создать html-страницу со вкладками. 
С левой стороны страницы отображается несколько вкладок, по которым можно переключаться. 
У каждой вкладки есть свое содержимое, но в один момент
времени отображается содержимое только активной вкладки. 
*/
// let task_8_text = document.getElementById("task_8_text")            // нашли текстовый блок, в котором будем менять текст
// let all_buttons = document.getElementsByClassName("task_8_button")  // находим все элементы с CSS классом task_8_button и сохраняем в массиве

// for (let current_button of all_buttons) {               // перебираем все кнопки по очереди
//     current_button.addEventListener("click", (e) => {   // каждой кнопке добавляем отслеживание клика по ней
//         console.log(e)                                  // тут можно узнать св-ва события
//         console.log(e.target)                           // кто был тыкнут
//         console.log(e.target.innerHTML)                 // что внутри элемента, на который тыкнули

//         if (e.target.innerHTML === "HTML") {            // если на кнопке написано HTML
//             // вставляем в текстовый блок тест про HTML
//             task_8_text.innerHTML = `
//                 HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML 
//                 HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML 
//                 HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML 
//                 HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML 
//                 HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML HTML `
//         }
//         else if (e.target.innerHTML === "CSS") {        // если на кнопке написано CSS
//             // вставляем в текстовый блок тест про CSS
//             task_8_text.innerHTML = `
//                 CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS 
//                 CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS 
//                 CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS 
//                 CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS 
//                 CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS CSS `
//         }
//         else if (e.target.innerHTML === "JS") {         // если на кнопке написано JS
//             // вставляем в текстовый блок тест про JS
//             task_8_text.innerHTML = `
//                 JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS 
//                 JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS 
//                 JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS 
//                 JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS 
//                 JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS 
//                 JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS JS `
//         }

//         for (let btn of all_buttons) {  // перебираем все кнопки
//             btn.style.backgroundColor = "rgb(91, 91, 154)"  // ставим всем кнопкам цвет фона на обычный
//         }    
//         e.target.style.backgroundColor = "aqua"             // а текущей тыкнутой кнопке ставим цвет фона синий

//     })
// }





/**
 *         Задание 9
Создать html-страницу со списком новостей. Возле каждой
новости должна быть кнопка Удалить, при нажатии на которую
соответствующая новость исчезает
 */

// let all_remove_buttons = document.getElementsByClassName("remove_post_btn")     // находим все кнопки по CSS классу

// for (let current_button of all_remove_buttons) {                                // перебираем все кнопки по очереди
//     current_button.addEventListener("click", (e) => {                           // добавляем каждой кнопке обработку клика по ней
//         console.log(e)                                      // все св-ва события
//         console.log(e.target)                               // так узнаём какая конкретно кнопка была нажата
//         console.log(e.target.parentNode)                    // узнаём родительский элемент у кнопки, в нашем случае  <div class="post_header">   
//         console.log(e.target.parentNode.parentNode)         // узнаём родителя у <div class="post_header">, это будет <div class="post_container">
//         e.target.parentNode.parentNode.remove()             // удаляем найденный контейнер новости
//     })
// }






// // ПРИМЕРЫ 

// console.log(document.getElementById("example_div"))             
// // сам элемент

// console.log(document.getElementById("example_div").children)    
// // коллекция потомков(детей)    HTMLCollection { 0: div#first_div, 1: div#second_div, 2: div#third_div, length: 3, … }

// console.log(document.getElementById("example_div").childNodes)  
// // тоже коллекция потомков(детей), но с пробелами между ними NodeList(7) [ #text, div#first_div, #text, div#second_div, #text, div#third_div, #text ]


// console.log(document.getElementById("example_div").firstElementChild)   // получить первого потомка     <div id="first_div">
// console.log(document.getElementById("example_div").children[0])         // то же самое


// console.log(document.getElementById("example_div").lastElementChild)    // получить последнего потомка  <div id="third_div">









/**
 * Задание 10
    Создать html-страницу с progressbar и кнопкой, при нажатии
    на которую заполненность progressbar увеличивается на 5%.
   
 */

// вариант 1
// let current_progress_bar = document.getElementById("current_progress_bar")  // находим полоску прогресса, которая будет меняться
// let progress_value = 20                                                     // текущее значение полоски прогресса в %
// console.log(progress_value)

// document.getElementById("add_progress_btn").addEventListener("click", () => {   // находим кнопку и добавляем обработку клика по ней
//     progress_value += 5                                                     // увеличиваем значение прогресса на 5
//     if (progress_value > 100) {                                             // если знаечние стало больше 100
//         progress_value = 100                                                // явно ставим на 100
//     }
//     current_progress_bar.style.width = progress_value + "%"                 // даём полоске прогресса новую ширину из нашей переменной
// })



// let current_progress_bar = document.getElementById("current_progress_bar")  // находим полоску прогресса, которая будет меняться
// let progress_value = 20                                                     // текущее значение полоски прогресса в %
// console.log(progress_value)

// document.getElementById("add_progress_btn").addEventListener("click", () => {   // находим кнопку и добавляем обработку клика по ней                                                       // увеличиваем значение прогресса на 5
//     if (progress_value < 100) {                                             // если знаечние стало больше 100
//         progress_value += 5                                           // тогда добавляем
//     }
//     current_progress_bar.style.width = progress_value + "%"                 // даём полоске прогресса новую ширину из нашей переменной
// })





/**
 * 
 * Задание 11
Создать html-страницу с таблицей.
При наведении мышкой на ячейку таблицы, у этой ячейки
должен меняться фон. Учтите, что когда мышку уводят с ячейки,
то ее фон возвращается к прежнему.
Выполнить задание с помощью JS, а не с помощью CSS.
*/

// let all_cells = document.querySelectorAll("#task_11 td")  // найти все ячейки по CSS поиску

// for (let cell of all_cells) {                                   // перебираем все ячейки
//     cell.addEventListener("mouseenter", (e) => {                // если мышка вошла в зону элемента
//         e.target.style.backgroundColor = "#885050"              // данной ячейки, на которую навелись, ставим другой цвет фона
//     })

//     cell.addEventListener("mouseleave", (e) => {                // если мышка вышла из зоны элемента
//         e.target.style.backgroundColor = "blanchedalmond"       // данной ячейки, на которую навелись, возвращаем цвет фона
//     })
// }



/**
 * Задание 12
Создать html-страницу с любым содержимым и запретить
пользователю выделять текст и вызывать контекстное меню кликом правой кнопки.
 */

// document.onselectstart = () => { return false }     // выключаем выделение текста
// document.oncontextmenu = () => { return false }     // выключаем контекстное меню, после нажатия правой кнопкой мыши






/**
 *     Задание 13
Создать html-страницу с кнопкой Like, при нажатии на которую увеличивается счетчик лайков.
 */

// let likes_btn = document.getElementById("task_13_btn")  // нашли кнопку
// let likes_counter = 0                                   // счётчик лайков

// likes_btn.addEventListener("click", () => {             // при клике по кнопке вызываем функцию
//     likes_counter++                                     // увеличиваем значение счётчика на 1
//     likes_btn.innerHTML = `👍 Like ${likes_counter}`    // меняем текст внутри кнопки на новый, где вместо 0 ставим значение счётчика    
// })






/**
 *     Задание 14
Создать html-страницу с меню, которое имеет выпадающие списки. 
Список с элементами подменю должен появляться по
щелчку на соответствующий элемент меню.
 */
let all_first_lvl_buttons = document.getElementsByClassName("first_lvl_menu")       // находим все элементы-кнопки первого уровня
let all_second_lvl_menu = document.querySelectorAll(".first_lvl_menu ul")           // находим все меню второго уровня у кнопок первого уровня

for (let current_button of all_first_lvl_buttons) {                                 // перебираем все кнопки
    current_button.addEventListener("click", (e) => {                               // если на кнопку кликнули
        console.log(e.target.children[0])
        
        for (let second_lvl of all_second_lvl_menu) {                               // перебираем все меню второго уровня
            second_lvl.style.display = "none"                                       // выключаем их
        }
        
        e.target.children[0].style.display = "block"                                // включаем отображение кнопок второго уровня
    })
}
