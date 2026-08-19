// находим все нужные элементы для игры на странице по их id
let country_flag_elem = document.getElementById("country_flag_elem")
let capital_elem = document.getElementById("capital_elem")
let area_elem = document.getElementById("area_elem")
let population_elem = document.getElementById("population_elem")        // население
let user_answer_form = document.getElementById("user_answer_form")      // форма ответа
let user_answer_input = document.getElementById("user_answer_input")    // поле для ответа

user_answer_form.addEventListener("submit", (e) => {                    // если случается отправка формы с ответом
    e.preventDefault()                                                  // останавливаем обновление страницы и отправку данных
    fetch(`/check_answer?user_answer=${user_answer_input.value}`)       // отправляем get запрос с ответом пользователя
    .then()

})
