let search_city_form = document.getElementById("search_city_form")              // нашли форму для поиска города
let city_search_input = document.getElementById("city_search_input")            // нашли поле дял ввода города
let current_date = document.getElementById("current_date")                      // поле текущей даты
let current_weather_image = document.getElementById("current_weather_image")    // иконка текущей погоды
let current_weather_description = document.getElementById("current_weather_description")    // описание погоды
let current_weather_temperature = document.getElementById("current_weather_temperature")    // температура
let current_weather_feelslike = document.getElementById("current_weather_feelslike")        // температура по ощущениям
let current_weather_sunrise = document.getElementById("current_weather_sunrise")            // восход
let current_weather_sunset = document.getElementById("current_weather_sunset")              // закат
let current_weather_duration = document.getElementById("current_weather_duration")          // длительность дня

let API_KEY = "52bc58d001c88615075f61a15f96138b"        // api ключ для получения данных с сервиса

// функция получения данных о погоде по городу
async function get_weather_data(city_name) {
    let api_link = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_KEY}`    // готовим ссылку для получения данных о погоде для данного города
    let response = await fetch(api_link)                // делаем запрос на сервис
    let weather_data_result = await response.json()     // проводим десериализацию данных
    console.log(weather_data_result)

    city_search_input.value = city_name

    current_weather_temperature.innerText = weather_data_result["main"]["temp"] + "°C"
}

get_weather_data("Kaliningrad")



