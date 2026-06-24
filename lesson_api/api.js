// получение данных по сети из другого источника

// // способ 1

// function get_data() {
//     fetch("https://api.openweathermap.org/data/2.5/weather?q=Kaliningrad&appid=52bc58d001c88615075f61a15f96138b")   // js делает запрос на сторонний сервис
//     .then(response => {                                 // через некоторое время принимаем ответ от сервера
//         console.log("Ответ от сервера получен: ", response) //  { type: "cors", url: "https://api.openweathermap.org/data/2.5/weather?q=Kaliningrad&appid=52bc58d001c88615075f61a15f96138b", redirected: false, status: 200, ok: true, statusText: "OK", headers: Headers(2), body: ReadableStream, bodyUsed: false }
//         if (response.status != 200) {                       // проеряем статус ответа. Если он не 200, это ошибка
//             console.error("Не смогли получить корректные данные от сервера!!!!")        // сообщение в консоли
//             throw "Не смогли получить корректные данные от сервера!!!!"                 // кидаем исключение
//         }
//         else {
//             return response.json()                      // проводим десериализацию(превращаем строку в JS объект)
//         }
//     })
//     .then(data => {                                     // получаем JSON объект из запроса
//         console.log(data)                               // Object { coord: {…}, weather: (1) […], base: "stations", main: {…}, visibility: 10000, wind: {…}, clouds: {…}, dt: 1782325209, sys: {…}, timezone: 7200, … }
//         console.log(data["main"])                       // {temp: 291.27, feels_like: 291.38, temp_min: 291.27, temp_max: 291.27, pressure: 1017, …}
//         console.log(data["main"]["temp"])               // 291.27
//     })
// }


// get_data()




// способ 2

async function get_data() {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Kaliningrad&appid=52bc58d001c88615075f61a15f96138b")   // js делает запрос на сторонний сервис
    let data = await response.json()                            // проводим десериализацию(превращаем строку в JS объект)

    console.log(data)                               // Object { coord: {…}, weather: (1) […], base: "stations", main: {…}, visibility: 10000, wind: {…}, clouds: {…}, dt: 1782325209, sys: {…}, timezone: 7200, … }
    console.log(data["main"])                       // {temp: 291.27, feels_like: 291.38, temp_min: 291.27, temp_max: 291.27, pressure: 1017, …}
    console.log(data["main"]["temp"])               // 291.27
}


get_data()
