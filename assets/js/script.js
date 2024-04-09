console.log("script is working...");

const weatherAPIKey = "ae5e906c4f6f4f5682a130925240804";
const defaultCity = "Panadura";
var currentCity = "";

window.onload = function () {
    document.getElementById("searchCity").value = "";
    getWeatherForecast(defaultCity);
}

function getWeatherForecast(city) {
    $(".swiper-slide").remove();
    $(".pastSlider").remove();
    try {
        const format = document.getElementById("getFormatValue").value;

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${city}&days=10&aqi=yes&alerts=yes`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                currentCity = data.location.name;
                document.getElementById("setLocation").innerHTML = data.location.name + ", " + data.location.country;

                let localTime = data.location.localtime;
                const time = localTime.split(" ");
                const hour = time[1].split(":");
                if (hour[0] >= 0 && hour[0] <= 11) {
                    document.getElementById("setTime").innerHTML = time[1] + " AM";
                } else {
                    document.getElementById("setTime").innerHTML = time[1] + " PM";
                }

                document.getElementById("setDate").innerHTML = time[0];
                document.getElementById("setWeatherImg").src = data.current.condition.icon;

                if (format == "C") {
                    document.getElementById("setTemp").innerHTML = data.current.temp_c;
                    document.getElementById("setFormat").innerHTML = " &deg;C";
                    document.getElementById("setWind").innerHTML = data.current.wind_kph + " kph";
                    document.getElementById("setPressure").innerHTML = data.current.pressure_mb + " mb";
                    document.getElementById("setPrecip").innerHTML = data.current.precip_mm + " mm";
                    document.getElementById("setFeelsLike").innerHTML = data.current.feelslike_c + " &deg;C";
                    document.getElementById("setVis").innerHTML = data.current.vis_km + " km";
                    document.getElementById("setGustWind").innerHTML = data.current.gust_kph + " kph";

                    for (let i = 1; i < 10; i++) {
                        var forecastAirQuality = data.forecast.forecastday[i].day.air_quality.pm2_5;
                        var forecastAQValue = "";
                        if (forecastAirQuality >= 0 && forecastAirQuality < 12) {
                            forecastAQValue = "Good";
                        } else if (forecastAirQuality >= 12 && forecastAirQuality < 35) {
                            forecastAQValue = "Moderate";
                        } else if (forecastAirQuality >= 35 && forecastAirQuality < 55) {
                            forecastAQValue = "Unhealthy for Sensitive Groups";
                        } else if (forecastAirQuality >= 55 && forecastAirQuality < 150) {
                            forecastAQValue = "Unhealthy";
                        } else if (forecastAirQuality >= 150 && forecastAirQuality < 250) {
                            forecastAQValue = "Very Unhealthy";
                        } else if (forecastAirQuality >= 250) {
                            forecastAQValue = "Hazardous";
                        }
                        $(".futureSliderWrapper").append(
                            `
                            <div class="swiper-slide">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <h6 class="card-title">${data.forecast.forecastday[i].date}</h6>
                                            </div>
    
                                            <div class="col-12">
                                                <img src="${data.forecast.forecastday[i].day.condition.icon}" class="forecastImg" alt="weather-img">
                                            </div>
    
                                            <div class="col-12">
                                                <h6 class="value">${data.forecast.forecastday[i].day.condition.text}</h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">Max : </span><span class="temp">${data.forecast.forecastday[i].day.maxtemp_c}</span><span
                                                        class="value"> &deg;C</span></h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">Min : </span><span class="temp">${data.forecast.forecastday[i].day.mintemp_c}</span><span
                                                        class="value"> &deg;C</span></h6>
                                            </div>
    
                                            <div class="col-12 mt-3">
                                                <h6><span class="label">Wind : </span><span class="value">${data.forecast.forecastday[i].day.maxwind_kph} kph</span></h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">Humidity : </span><span class="value">${data.forecast.forecastday[i].day.avghumidity}%</span>
                                                </h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">AQ : </span><span class="value">${forecastAQValue}</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        );
                    }

                } else {
                    document.getElementById("setTemp").innerHTML = data.current.temp_f;
                    document.getElementById("setFormat").innerHTML = " &deg;F";
                    document.getElementById("setWind").innerHTML = data.current.wind_mph + " mph";
                    document.getElementById("setPressure").innerHTML = data.current.pressure_in + " in";
                    document.getElementById("setPrecip").innerHTML = data.current.precip_in + " in";
                    document.getElementById("setFeelsLike").innerHTML = data.current.feelslike_f + " &deg;F";
                    document.getElementById("setVis").innerHTML = data.current.vis_miles + " miles";
                    document.getElementById("setGustWind").innerHTML = data.current.gust_mph + " mph";

                    for (let i = 1; i < 10; i++) {
                        var forecastAirQuality = data.forecast.forecastday[i].day.air_quality.pm2_5;
                        var forecastAQValue = "";
                        if (forecastAirQuality >= 0 && forecastAirQuality < 12) {
                            forecastAQValue = "Good";
                        } else if (forecastAirQuality >= 12 && forecastAirQuality < 35) {
                            forecastAQValue = "Moderate";
                        } else if (forecastAirQuality >= 35 && forecastAirQuality < 55) {
                            forecastAQValue = "Unhealthy for Sensitive Groups";
                        } else if (forecastAirQuality >= 55 && forecastAirQuality < 150) {
                            forecastAQValue = "Unhealthy";
                        } else if (forecastAirQuality >= 150 && forecastAirQuality < 250) {
                            forecastAQValue = "Very Unhealthy";
                        } else if (forecastAirQuality >= 250) {
                            forecastAQValue = "Hazardous";
                        }
                        $(".futureSliderWrapper").append(
                            `
                            <div class="swiper-slide">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <h6 class="card-title">${data.forecast.forecastday[i].date}</h6>
                                            </div>
    
                                            <div class="col-12">
                                                <img src="${data.forecast.forecastday[i].day.condition.icon}" class="forecastImg" alt="weather-img">
                                            </div>
    
                                            <div class="col-12">
                                                <h6 class="value">${data.forecast.forecastday[i].day.condition.text}</h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">Max : </span><span class="temp">${data.forecast.forecastday[i].day.maxtemp_f}</span><span
                                                        class="value"> &deg;F</span></h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">Min : </span><span class="temp">${data.forecast.forecastday[i].day.mintemp_f}</span><span
                                                        class="value"> &deg;F</span></h6>
                                            </div>
    
                                            <div class="col-12 mt-3">
                                                <h6><span class="label">Wind : </span><span class="value">${data.forecast.forecastday[i].day.maxwind_mph} mph</span></h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">Humidity : </span><span class="value">${data.forecast.forecastday[i].day.avghumidity}%</span>
                                                </h6>
                                            </div>
    
                                            <div class="col-12">
                                                <h6><span class="label">AQ : </span><span class="value">${forecastAQValue}</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        );
                    }
                }

                document.getElementById("setCondition").innerHTML = data.current.condition.text;
                document.getElementById("setWindDegree").innerHTML = data.current.wind_degree + " &deg";
                document.getElementById("setWindDir").innerHTML = data.current.wind_dir;
                document.getElementById("setHumidity").innerHTML = data.current.humidity + " %";
                document.getElementById("setCloud").innerHTML = data.current.cloud + " %";
                document.getElementById("setUV").innerHTML = data.current.uv + " index";

                const airQuality = data.current.air_quality.pm2_5;
                if (airQuality >= 0 && airQuality < 12) {
                    document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5 + " (Good)";
                } else if (airQuality >= 12 && airQuality < 35) {
                    document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5 + " (Moderate)";
                } else if (airQuality >= 35 && airQuality < 55) {
                    document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5 + " (Unhealthy for Sensitive Groups)";
                } else if (airQuality >= 55 && airQuality < 150) {
                    document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5 + " (Unhealthy)";
                } else if (airQuality >= 150 && airQuality < 250) {
                    document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5 + " (Very Unhealthy)";
                } else if (airQuality >= 250) {
                    document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5 + " (Hazardous)";
                }
            });

        for (let i = 1; i <= 7; i++) {
            var date = new Date();
            date.setDate(date.getDate() - i);
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;
            var day = date.getUTCDate();
            let week = date.getUTCDay();
            
            fetch(`https://api.weatherapi.com/v1/history.json?key=${weatherAPIKey}&q=${city}&dt=${year}-${month}-${day}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    
                    if(format == "C"){
                        $(".pastSliderWrapper").append(
                            `
                            <div class="card mb-3 pastSlider">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="position-absolute top-50 start-0 translate-middle-y ms-3">
                                                <h6 class="card-title">${getWeekName(week)}</h6>
                                                <h6 class="condition">${data.forecast.forecastday[0].day.condition.text}</h6>
                                            </div>
                                        </div>
                                        <div class="col-6 text-center">
                                            <img src="${data.forecast.forecastday[0].day.condition.icon}" alt="past-weather-img">
                                            <h4><span class="temp">${data.forecast.forecastday[0].day.avgtemp_c}</span><span class="format"> &deg;C</span></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    } else {
                        $(".pastSliderWrapper").append(
                            `
                            <div class="card mb-3 pastSlider">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="position-absolute top-50 start-0 translate-middle-y ms-3">
                                                <h6 class="card-title">${getWeekName(week)}</h6>
                                                <h6 class="condition">${data.forecast.forecastday[0].day.condition.text}</h6>
                                            </div>
                                        </div>
                                        <div class="col-6 text-center">
                                            <img src="${data.forecast.forecastday[0].day.condition.icon}" alt="past-weather-img">
                                            <h4><span class="temp">${data.forecast.forecastday[0].day.avgtemp_f}</span><span class="format"> &deg;F</span></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        )
                    }
                })
        }
    } catch (error) {
        console.log(error);
    }
}

function formatController() {
    getWeatherForecast(currentCity);
}

// future weather
var swiper = new Swiper(".futureSlider", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: ".futureSliderNext",
        prevEl: ".futureSliderPrev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    },
});

// get week name
function getWeekName(num) {
    if (num == 0) {
        return "Sunday";
    } else if (num == 1) {
        return "Monday";
    } else if (num == 2) {
        return "Tuesday";
    } else if (num == 3) {
        return "Wednesday";
    } else if (num == 4) {
        return "Thursday";
    } else if (num == 5) {
        return "Friday";
    } else {
        return "Saturday";
    }
}