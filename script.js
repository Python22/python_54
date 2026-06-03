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
class News {
    constructor(title, text, all_tags, publisch_date) {
        this.title = title
        this.text = text
        this.all_tags = all_tags
        this.publisch_date = new Date(publisch_date)        // создаём объект даты из нашей строки такого вида: "YYYY-MM-DD"
    }

    print() {
        let current_news_container = document.createElement("div")      // создаём виртуальный элемент с тегом div и сохраняем ег ов переменную
        current_news_container.classList.add("current_news_container")  // созданному элементу div даём CSS класс current_news_container

        let publisch_date_string = ""       // тут сформируем строку даты публикации в требуемом виде. Сформируем её чуть далее
        let current_date = new Date()       // создаём объект даты. В него запишется текщая дата        
        let date_difference = Math.floor((current_date - this.publisch_date) / 1000 / 60 / 60 / 24) // считаем разницу между текущей датой и датой публикации и приводим ёе к целым суткам
        console.log(date_difference)

        if (date_difference === 0) {            // если разница равняется 0, то значит публикация была сегодня
            publisch_date_string = "Сегодня"
        }
        else if (date_difference === 1) {
            publisch_date_string = "1 день назад"
        }
        else if (date_difference === 2 || date_difference === 3 || date_difference === 4) {     // если разница 2, 3 или 4 дня
            publisch_date_string = `${date_difference} дня назад`                               // то такая строка будет
        }
        else if (date_difference === 5 || date_difference === 6) {                              // если разница 2, 3 или 4 дня
            publisch_date_string = `${date_difference} дней назад`                              // то такая строка будет
        }
        else {                                                                      // если 7 и более дней
            publisch_date_string = this.publisch_date.toLocaleDateString()          // берём дату публикации и приводим к виду «дд.мм.гггг». 
        }

        let all_tags_string = ""            // здесь будем хранить строку со всеми тегами в виде кнопок, пока она пустая
        for (let tag of this.all_tags) {    // перебираем все теги в массиве всех тегов по-очереди    
            all_tags_string += `<a href="#">#${tag}</a>`    // добавляем в стркоу тегов элемент 'a' с текстом этого тега вместе с #
        }
        // в итоге в all_tags_string будет такое: `<a href="#">#test</a><a href="#">#lorem</a>`

        // если обратиться к элементу с методом innerHTML, то можно создать его содержимое
        current_news_container.innerHTML = `
            <h2>${this.title}</h2>
            <span>${publisch_date_string}</span>
            <p>${this.text}</p>
            <p>${all_tags_string}</p>
        `   // так мы создали заполнение для контейнера новости. Значения для элементов берём из объекта, который вызывает метод print()
        
        document.getElementById("all_news_container").append(current_news_container)    
        // находим на странице элемент с id all_news_container и добавляем ему в конец наш созданный div
    }
}

/**
 * Задание 3
Реализовать класс, описывающий новостную ленту.
Класс должен содержать:
■ массив новостей;
■ свойство, которое возвращает количество новостей;
■ метод для вывода на экран всех новостей;
■ метод для добавления новости;
■ метод для удаления новости;
■ метод для сортировки новостей по дате (от последних новостей до старых);
■ метод для поиска новостей по тегу (возвращает массив
новостей, в которых указан переданный в метод тег).
Продемонстрировать работу написанных методов.
 */

/**
 * This class can make a news thread!!!
 */
class NewsThread {
    constructor() {
        this.all_news = []      // тут будем держать массив новостей
    }

    /**
     * свойство, которое возвращает количество новостей;
     */
    get_news_count() {
        return this.all_news.length // возвращаем кол-во элементов в массиве новостей
    }

    /**
     * ■ метод для вывода на экран всех новостей;
     */
    print_all_news() {
        for (let current_news of this.all_news) {       // перебираем все новости из массива новостей данной новостной ленты
            current_news.print()                        // вызываем метод print() у данной новости
        }
    }

    /**
     * ■ метод для добавления новости;
     */
    add_news(news) {
        this.all_news.push(news)  // вставляем в конец нашего массива новостей, новость, которую получили в методе
    }

    delete_news_by_title() {}
    sorting_by_date() {}
    get_news_by_tag_name(tag_name) {}
}



first_news = new News(
    "first news", 
    "lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
    ["test", "lorem"],
    "2026-06-03"
)

second_news = new News(
    "second news", 
    "asdmslk dfskdj fkjsd hfjk dhf gjkhdf jkgh djkfhg jkdfh gkjdhfg dfgrem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
    ["test", "asd"],
    "2026-05-03"
)
third_news = new News(
    "third news", 
    "asdmslk dfskdj fkjsd hfjk dhf gjkhdf jkgh djkfhg jkdfh gkjdhfg dfgrem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem",
    ["test", "asd"],
    "2026-06-01"
)

// first_news.print()
// second_news.print()
// third_news.print()


let news_thread = new NewsThread()          // создали объект новостной ленты
console.log(news_thread.get_news_count())   // 0 
news_thread.add_news(first_news)            // вставляем новость в новостную ленту
news_thread.add_news(second_news)
news_thread.add_news(third_news)
console.log(news_thread.get_news_count())   // 3
document.write(`<h2>Сейчас столько новостей: ${news_thread.get_news_count()}</h2>`)

news_thread.print_all_news()                // вызываем метод распечатки всех новостей
