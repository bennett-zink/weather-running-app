//HIDE ME LATER
const apiKey = "d7d60a511b60509ebcd556b453921c1f";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// API CALL: https://api.openweathermap.org/data/2.5/weather?units=imperial&q=holland&appid=d7d60a511b60509ebcd556b453921c1f 
async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F"
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%"

        const dewPoint = data.main.temp - ((9/25) * (100- data.main.humidity))
        document.querySelector(".dewpoint").innerHTML = Math.round(dewPoint) + "°F"
        
        // Image based on weather
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }
        else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "images/thunderstorm.png"
        }
        
        // Pace Adjustment
        const combined = dewPoint + Math.round(data.main.temp)
        if (combined <= 100){
            document.querySelector(".dew-adj").innerHTML = "No pace adjustment needed"
            document.querySelector(".dew-adj-pace").innerHTML = ""
        }
        else if (combined > 100 && combined <= 110){
            document.querySelector(".dew-adj").innerHTML = "We recommend  0% to 0.5% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:02 mins/mile"
        }
        else if (combined > 110 && combined <= 120){
            document.querySelector(".dew-adj").innerHTML = "We recommend  0.5% to 1% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:04 mins/mile"
        }
        else if (combined > 120 && combined <= 130){
            document.querySelector(".dew-adj").innerHTML = "We recommend  1% to 2% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:07 mins/mile"
        }
        else if (combined > 130 && combined <= 140){
            document.querySelector(".dew-adj").innerHTML = "We recommend  2% to 3% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:12 mins/mile"
        }
        else if (combined > 140 && combined <= 150){
            document.querySelector(".dew-adj").innerHTML = "We recommend  3% to 4.5% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:19 mins/mile"
        }
        else if (combined > 150 && combined <= 160){
            document.querySelector(".dew-adj").innerHTML = "We recommend  4.5% to 6% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:26 mins/mile"
        }
        else if (combined > 160 && combined <= 170){
            document.querySelector(".dew-adj").innerHTML = "We recommend  6% to 8% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:34 mins/mile"
        }
        else if (combined > 170 && combined <= 180){
            document.querySelector(".dew-adj").innerHTML = "We recommend  8% to 10% pace adjustment"
            document.querySelector(".dew-adj-pace").innerHTML = "For example 8:00 mins/mile to 8:43 mins/mile"
        }
        else if (combined > 180){
            document.querySelector(".dew-adj").innerHTML = "We do not recommend any hard running"
            document.querySelector(".dew-adj-pace").innerHTML = ""
        }

        const windSpeed = Math.round(data.wind.speed)
        const windDeg = data.wind.deg
        let windDir = ""

        // Wind direction
        if (windDeg < 45 || windDeg >= 315){
            windDir = "north"
        }
        else if (windDeg >= 45 && windDeg < 135){
            windDir = "east"
        }
        else if (windDeg >= 135 && windDeg < 225){
            windDir = "south"
        }
        else if (windDeg >= 225 && windDeg < 315){
            windDir = "west"
        }

        if (data.wind.gust) {
            document.querySelector(".wind").innerHTML = windSpeed + " mph from the " + windDir + " with gusts up to " + Math.round(data.wind.gust) + " mph"
        }
        else{
            document.querySelector(".wind").innerHTML = windSpeed + "mph from the " + windDir
        }

        if(windSpeed <= 10){
            document.querySelector(".wind-rec").innerHTML = ""
        }
        else if (windSpeed > 10){
            document.querySelector(".wind-rec").innerHTML = "Running " + windDir + " will slow you by about 12 seconds per mile"
        }
        else if (windSpeed > 20){
            document.querySelector(".wind-rec").innerHTML = "Running " + windDir + " will slow you by about 24 seconds per mile"
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBox.addEventListener("keydown", (event) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    console.log(searchBox.value)
})