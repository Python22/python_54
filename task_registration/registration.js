let email_input = document.getElementById("email")          // находим нужные input'ы на странице
let password_input = document.getElementById("password")    // находим нужные input'ы на странице
let password2_input = document.getElementById("password2")  // находим нужные input'ы на странице
let error_messages_elem = document.getElementById("error_messages_elem")        // находим нужный текстоый блок, куда будем помещать ошибки

document.getElementById("registration_form").addEventListener("submit", (e) => {    // находим форму. Если даные были отправлены,то все поля готовы
    let email_pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/    // шаблон для проверки почты
    let all_error_messages = ""             // здесь будем складировать найденные ошибки со стороны клиента

    email_input.style.borderColor = "green"                     // делаем цвет обводки у ввода почты зелёной
    if (email_pattern.test(email_input.value) === false) {      // если введённая почта в input'е не подходит под шаблон почты
        all_error_messages += "Почта имеет неверный формат!<br>"   // добавляем текст об ошибке в all_error_messages
        email_input.style.borderColor = "red"                   // делаем цвет обводки у ввода почты красной
    }

    password_input.style.borderColor = "green"                  // ставим цвет обводки у поля ввода пароля в зелёный
    if (password_input.value.lenght < 6) {                      // если кол-во символов в поле ввода пароля менее 6
        all_error_messages += "Пароль слишком короткий, требуется 6 или более символов<br>" // добавим и другое сообщение
        password_input.style.borderColor = "red"                  // ставим цвет обводки у поля ввода пароля в зелёный
    }

    if (/[a-z]/.test(password_input.value) === false) {         // проверяем введённый пароль по шаблону на наличие 1 букву мелкого регистра
        all_error_messages += "Пароль должен содержать как минимум 1 маленькую латинскую букву<br>" // добавим и другое сообщение
        password_input.style.borderColor = "red"                  // ставим цвет обводки у поля ввода пароля в зелёный
    }
    if (/[A-Z]/.test(password_input.value) === false) {         // проверяем введённый пароль по шаблону на наличие 1 букву большого регистра
        all_error_messages += "Пароль должен содержать как минимум 1 большую латинскую букву<br>" // добавим и другое сообщение
        password_input.style.borderColor = "red"                  // ставим цвет обводки у поля ввода пароля в зелёный
    }
    if (/[0-9]/.test(password_input.value) === false) {         // проверяем введённый пароль по шаблону на наличие 1 цифры 
        all_error_messages += "Пароль должен содержать как минимум 1 цифру<br>" // добавим и другое сообщение
        password_input.style.borderColor = "red"                  // ставим цвет обводки у поля ввода пароля в зелёный
    }

    password2_input.style.borderColor = "green"                  // ставим цвет обводки у поля ввода пароля в зелёный
    if (password_input.value != password2_input.value) {        // если введённые значения в полях для пароей не равны
        all_error_messages += "Пароли не совпадают!"
        password2_input.style.borderColor = "red"                  // ставим цвет обводки у поля ввода пароля в зелёный
    }

    if (all_error_messages.length > 0) {                        // если текст об ошибках содержит хотя бы 1 символ
        error_messages_elem.innerHTML = all_error_messages      // вставляем текст об ошибках внутрь соотв. элемента
        error_messages_elem.style.display = "block"             // делаем текст с ошибками видимым, вместо none
        error_messages_elem.style.color = "red"                 // даём красный цвет    
        e.preventDefault()       // предотвращаем обновление странцы                               
    }    
    
})

