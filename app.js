let weather = {
    apiKey: "77d0e8fec0f3c4a3e165e681ce6a5738",
    fetchWeather: (city) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=77d0e8fec0f3c4a3e165e681ce6a5738`
        ).then((response) => {
            if (!response.ok) {
                document.querySelector(".weatherInfo").style.display = "none";
                document.querySelector(".alert").style.display = "inline";
                document.querySelector(".alert").innerHTML = "Please enter a valid city name"
            }
            return response.json()
        })
            .then((data) => {
                const { name } = data;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                //Changing Weather Info
                document.querySelector(".weatherInfo").style.display = "inline";
                document.querySelector(".alert").style.display = "none";
                document.querySelector(".alert").innerHTML = ""
                document.querySelector(".cityName").innerHTML = "Weather in " + name;
                document.querySelector(".cityTemp").innerHTML = temp + " °C";
                document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
                document.querySelector(".cloud").innerHTML = description;
                document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
                document.querySelector(".windSpeed").innerHTML = "Wind Speed: " + speed + "km/h";
                document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
                document.querySelector(".weatherInfo").classList.remove("loading")
            })

    },

}
let search = document.getElementById("input");
//Defualt City
weather.fetchWeather("Giza")

//Change City with button
document.querySelector(".searchIcon").addEventListener("click", () => {
    weather.fetchWeather(search.value);
    search.value = "";
})

//Change City with pressing Enter
document.getElementById("input").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        weather.fetchWeather(search.value);
        search.value = "";
    }
})
