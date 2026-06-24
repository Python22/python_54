let user_email_elem = document.getElementById("user_email")
console.log(document.cookie)            // email=asd@asd.com; password=123qweASD
let cookie_string = document.cookie
console.log(cookie_string)              // email=asd@asd.com; password=123qweASD

let cookie_data = cookie_string.split("; ")
console.log(cookie_data)                // [ "email=asd@asd.com", "password=123qweASD" ]

for (let current_pair of cookie_data) { // перебираем массив кукисов
    let cookie_key_value = current_pair.split("=")  // разбиваем строку куки на ключ и значение "email=asd@asd.com"  -> ["email", "asd@asd.com"]
    if (cookie_key_value[0] === "email") {                  // если ключ у куки == email
        user_email_elem.innerText = cookie_key_value[1]     // берём значение у данных куки и помещаем в поле для почты
    }
}