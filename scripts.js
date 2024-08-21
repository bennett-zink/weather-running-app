//HIDE ME LATER
const apiKey = "d7d60a511b60509ebcd556b453921c1f";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector("#location");
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

        const unixTimestamp = data.dt
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        console.log(hours, minutes)
        
        // Image based on weather
        if(data.weather[0].main == "Clouds"){
            if (hours < 7 || hours > 20){
                weatherIcon.src = "images/cloud-moon.svg"
            }
            else{
                weatherIcon.src = "images/cloud-sun.svg"
            }
        }
        else if(data.weather[0].main == "Clear"){
            if (hours < 7 || hours > 20){
                weatherIcon.src = "images/moon.svg"
            }
            else{
                weatherIcon.src = "images/sun.svg"
            }
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.svg"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle-sun.svg"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/fog.svg"
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.svg"
        }
        else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "images/lightning-rain.svg"
        }
        
        // Pace Adjustment
        const combined = dewPoint + Math.round(data.main.temp)
        if (combined <= 100){
            document.querySelector(".dew-adj").innerHTML = "No pace adjustment needed"
        }
        else if (combined > 100 && combined <= 110){
            document.querySelector(".dew-adj").innerHTML = "We recommend  0% to 0.5% pace adjustment"
        }
        else if (combined > 110 && combined <= 120){
            document.querySelector(".dew-adj").innerHTML = "We recommend  0.5% to 1% pace adjustment"
        }
        else if (combined > 120 && combined <= 130){
            document.querySelector(".dew-adj").innerHTML = "We recommend  1% to 2% pace adjustment"
        }
        else if (combined > 130 && combined <= 140){
            document.querySelector(".dew-adj").innerHTML = "We recommend  2% to 3% pace adjustment"
        }
        else if (combined > 140 && combined <= 150){
            document.querySelector(".dew-adj").innerHTML = "We recommend  3% to 4.5% pace adjustment"
        }
        else if (combined > 150 && combined <= 160){
            document.querySelector(".dew-adj").innerHTML = "We recommend  4.5% to 6% pace adjustment"
        }
        else if (combined > 160 && combined <= 170){
            document.querySelector(".dew-adj").innerHTML = "We recommend  6% to 8% pace adjustment"
        }
        else if (combined > 170 && combined <= 180){
            document.querySelector(".dew-adj").innerHTML = "We recommend  8% to 10% pace adjustment"
        }
        else if (combined > 180){
            document.querySelector(".dew-adj").innerHTML = "We do not recommend any hard running"
        }

        const windSpeed = Math.round(data.wind.speed)
        const windDeg = data.wind.deg
        let windDir = ""
        let windDirection = ""

        // Wind direction
        if (windDeg < 45 || windDeg >= 315){
            windDir = "N"
            windDirection = "north"
        }
        else if (windDeg >= 45 && windDeg < 135){
            windDir = "E"
            windDirection = "east"
        }
        else if (windDeg >= 135 && windDeg < 225){
            windDir = "S"
            windDirection = "south"
        }
        else if (windDeg >= 225 && windDeg < 315){
            windDir = "W"
            windDirection = "west"
        }

        document.querySelector(".wind").innerHTML = windSpeed + " mph " + windDir

        if(windSpeed <= 10){
            document.querySelector(".wind-rec").innerHTML = ""
        }
        else if (windSpeed > 10){
            document.querySelector(".wind-rec").innerHTML = "Running " + windDirection + " will slow you by about 12 seconds per mile"
        }
        else if (windSpeed > 20){
            document.querySelector(".wind-rec").innerHTML = "Running " + windDirection + " will slow you by about 24 seconds per mile"
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".search").style.display = "none";
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