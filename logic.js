$(document).ready(function () {
    var APIkey = "9424dec718537ee2a289030dac6f5389";
    $("#submit-button").click(function () {
        // var cityName = $("#searchCity").val();
        var cityName = $("#searchCity").val();
        getWeather(cityName)
    })
    function getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
        var weather = {};
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#cityName").text(cityName)
            $("#icon").html("<img src='https://openweathermap.org/img/w/'" + response.weather[0].icon + ".png/>")
            $(".temp").text(response.main.temp + "F");
            $(".wind").text(response.wind.speed + "mph");
            $(".hum").text(response.main.humidity + "%");
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIkey
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $(".UV").text(response.value);
                queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&exclude=current,minutely,hourly,alerts&appid=${APIkey}`;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (forecast) {
                    console.log(forecast);

                    // PSUEDO CODE
                    // for loop, i = 0 and i < 5 and i++
                    for (var i = 0; i < 5; i++) {
                        var targetDay = moment(targetDay).format("DD/MM/YYYY")
                        iconCode = forecast.daily[i].weather[0].icon;
                        altIcon = forecast.daily[i].weather[0].description;
                        iconURL = `http://openweathermap.org/img/w/${iconCode}.png`
                        // forecast.daily[i].[INFORMATION]
                        var element = $(`
                        <div class="col">
                            <div class="card bg-primary text-white">
                                <div class="card-body">
                                <h5>${targetDay}</h5>
                                <img src="${iconURL}" alt="$${altIcon}">
                                <p>Temp: ${forecast.daily[i].temp.day} F</p>
                                <p>Humidity: ${forecast.daily[i].humidity} %</p>
                                </div>
                            </div>
                        </div>                
                        `)
                    forecast.append(element);
                        // append element to container for the forecast
                    }

                    // extract temperature, humidity, icon of weather
                    // display in the following order:
                    // DATE
                    // ICON
                    // TEMP
                    // HUMIDITY


                });
                function getForecast(cityName) {
                    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=5&appid=" + APIkey;
                    var weather = {};
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);
                        // tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
                        // descElement.innerHTML = weather.description;
                        // locationElement.innerHTML = `${weather.city}, ${weather.country}`;
                        // console.log(api)
                        //     .then(function(response){
                        //         let data = response.json();
                        //         return data;
                        //     })
                        //     .then(function(data){
                        //         weather.temperature = Math.floor(data.main.temp);
                        //         weather.description = data.weather[0].description;
                        //         weather.iconId = data.weather[0].icon;
                        //         weather.city = data.name;
                        //         weather.country = data.sys.country;
                        //     })
                        //     .then(function(){
                        //         displayWeather(weather);
                        //         console.log(weather);
                        //     });
                    })
                }
            })
            //     function displayWeather(weather){

            //         $("#cityName").text(weather.city)
            //         $("#icon").html(`<img src="http://openweathermap.org/img/w/${weather.iconId}.png"/>`)
            //         $(".temp").text(weather.temperature)
            //         $(".wind").text(weather.description)
            //         $(".hum").text(weather.humidity)
            //         $(".UV").text(weather.uv)
            //         // tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
            //         // descElement.innerHTML = weather.description;
            //         // locationElement.innerHTML = `${weather.city}, ${weather.country}`;
            //     }
            //     function forecastURL(weather){

            //     }
            // function addSearchHistory(cityName){

            //     $("#list-group-item").text(cityName)
            //     $("#list-group-item").text()
            // create new list item with the class list-group-item
            // add city name into list item
            // prepend list item into the unordered list
        })
    }
})