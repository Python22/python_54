let hamburger_menu_btn = document.getElementById("hamburger_menu_btn")          // кнопка-гамбургер
let all_main_menu_buttons = document.getElementsByClassName("main_menu_btn")    // все кнопки меню по css классу
let user_container = document.getElementById("user_container")                  // где кнопки входа
let is_main_menu_open = true                // открыты ли кнопки меню

if (window.innerWidth <= 480) {             // при загрузке страницы смотрим на ширину окна, если она меньше 480 px
    for (let btn of all_main_menu_buttons) {                // перебираем все кнопки меню
        btn.style.display = "none"                          // выключаем отображениет кнопки
    }
    user_container.style.display = "none"                   // ВЫКЛЮЧАЕМ область user
    is_main_menu_open = false
}

hamburger_menu_btn.addEventListener("click", () => {            // если есть клик по кнопке
    if (is_main_menu_open) {                                    // если меню сейчас раскрыто
        for (let btn of all_main_menu_buttons) {                // перебираем все кнопки меню
            btn.style.display = "none"                          // выключаем отображениет кнопки
        }
        user_container.style.display = "none"                   // ВЫКЛЮЧАЕМ область user
        is_main_menu_open = false                               // меняем значение переменной, сейчас меню СКРЫТО
    }
    else {                                                      // если меню скрыто
        for (let btn of all_main_menu_buttons) {                // перебираем все кнопки меню
            btn.style.display = "block"                         // включаем отображениет кнопки
        }
        user_container.style.display = "block"                  // ВКЛЮЧАЕМ область user
        is_main_menu_open = true                                // меняем значение переменной, сейчас меню ОТКРЫТО
    }
})

