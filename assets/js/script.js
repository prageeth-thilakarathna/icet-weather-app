const weatherAPIKey = "ae5e906c4f6f4f5682a130925240804";
const defaultCity = "Panadura";
var currentCity = "";
var errorStatus = "";
var errorCondition = false;
var btnNotifyClear = document.getElementById("btnNotifyClear");
var searchCityInputBox = document.getElementById("searchCity");
var searchButton = document.getElementById("searchButton");
var isFormatChange = false;

window.onload = function () {
    // search button
    $(".btnSearch").append(`<i class="fa fa-search btnSearchIcon" aria-hidden="true" style="width: 30px;" onclick="getWeatherForecast(document.getElementById('searchCity').value)"></i>`);

    document.getElementById("searchCity").value = "";
    getWeatherForecast(defaultCity);
    searchListner();
}

function getWeatherForecast(city) {
    $(".btnSearchIcon").remove();
    $(".btnSearch").append(`<i class="fa fa-spinner fa-pulse fa-fw btnSpinnerIcon" style="width: 35px;"></i>`);

    if (!isFormatChange) {
        $(".noNotification").remove();
        btnNotifyClear.setAttribute("style", "cursor: pointer; pointer-events: auto;");
    }

    try {
        const format = document.getElementById("getFormatValue").value;

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${city}&days=3&aqi=yes&alerts=yes`)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                    errorStatus = response.status;
                    errorCondition = true;
                    $(".errorHeader span").remove();
                    $(".errorBody span").remove();
                }
                return response.json();
            })
            .then(data => {
                if (errorCondition) {
                    displayErrorMessage(data);
                    console.log(data);
                    document.getElementById("searchCity").value = "";
                    $(".btnSpinnerIcon").remove();
                    $(".btnSearch").append(`<i class="fa fa-search btnSearchIcon" aria-hidden="true" style="width: 30px;" onclick="getWeatherForecast(document.getElementById('searchCity').value)"></i>`);
                    searchListner();
                } else {
                    document.getElementById("searchCity").value = "";
                    $(".futureCarousel").remove();
                }

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

                var day = new Date();

                document.getElementById("setDay").innerHTML = getWeekName(day.getDay());
                document.getElementById("setWeatherImg").src = data.current.condition.icon;

                let forecastLength = data.forecast.forecastday.length;

                if (format == "C") {
                    document.getElementById("setTemp").innerHTML = data.current.temp_c;
                    document.getElementById("setFormat").innerHTML = " &deg;C";
                    document.getElementById("setWind").innerHTML = data.current.wind_kph + " kph";
                    document.getElementById("setPressure").innerHTML = data.current.pressure_mb + " mb";
                    document.getElementById("setPrecip").innerHTML = data.current.precip_mm + " mm";
                    document.getElementById("setFeelsLike").innerHTML = data.current.feelslike_c + " &deg;C";
                    document.getElementById("setVis").innerHTML = data.current.vis_km + " km";
                    document.getElementById("setGustWind").innerHTML = data.current.gust_kph + " kph";

                    for (let i = 1; i < forecastLength; i++) {
                        var fetureDay = new Date();
                        fetureDay.setDate(fetureDay.getDate() + i);
                        var forecastDay = getWeekNameShortForm(fetureDay.getDay());

                        var futureDate = data.forecast.forecastday[i].date.split("-");

                        $(`.futureOwlCarousel-${i}`).append(
                            `
                            <div class="futureCarousel">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <h6 class="card-title">${forecastDay} ${futureDate[2]}</h6>
                                            </div>
    
                                            <div class="col-12 d-flex justify-content-center">
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
                                                <h6><span class="label">UV Radiation : </span><span class="value">${data.forecast.forecastday[i].day.uv} Index</span>
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

                    for (let i = 1; i < forecastLength; i++) {
                        var fetureDay = new Date();
                        fetureDay.setDate(fetureDay.getDate() + i);
                        var forecastDay = getWeekNameShortForm(fetureDay.getDay());

                        var futureDate = data.forecast.forecastday[i].date.split("-");

                        $(`.futureOwlCarousel-${i}`).append(
                            `
                            <div class="futureCarousel">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <h6 class="card-title">${forecastDay} ${futureDate[2]}</h6>
                                            </div>
    
                                            <div class="col-12 d-flex justify-content-center">
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
                                                <h6><span class="label">UV Radiation : </span><span class="value">${data.forecast.forecastday[i].day.uv} Index</span>
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

                /*-- add notification --*/
                if (!isFormatChange) {
                    $(".notificationAdd").append(`<li class="notification"><a class="dropdown-item">Sunrise &nbsp&nbsp&nbsp: ${data.forecast.forecastday[0].astro.sunrise}</a></li>`);
                    $(".notificationAdd").append(`<li class="notification"><a class="dropdown-item">Sunset &nbsp&nbsp&nbsp&nbsp: ${data.forecast.forecastday[0].astro.sunset}</a></li>`);
                    $(".notificationAdd").append(`<li class="notification"><a class="dropdown-item">Moonrise : ${data.forecast.forecastday[0].astro.moonrise}</a></li>`);
                    $(".notificationAdd").append(`<li class="notification"><a class="dropdown-item">Moonset &nbsp: ${data.forecast.forecastday[0].astro.moonset}</a></li>`);
                    $(".badge").append(`<span class="visually-hidden">unread notification</span>`);
                }
            });

        for (let i = 1; i <= 7; i++) {
            var date = new Date();
            date.setDate(date.getDate() - i);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            let week = date.getDay();

            fetch(`https://api.weatherapi.com/v1/history.json?key=${weatherAPIKey}&q=${city}&dt=${year}-${month}-${day}`)
                .then(response => {
                    if (!response.ok) {
                        console.log(`HTTP error! Status: ${response.status}`);
                        errorStatus = response.status;
                        errorCondition = true;
                    }
                    return response.json();
                })
                .then(data => {
                    if (errorCondition) {
                        console.log(data);
                        errorCondition = false;
                    } else {
                        $(`.pastSlider-${i}`).remove();
                    }

                    if (format == "C") {
                        $(`.pastSliderWrapper-${i}`).append(
                            `
                            <div class="card mb-3 pastSlider-${i}">
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
                        $(`.pastSliderWrapper-${i}`).append(
                            `
                            <div class="card mb-3 pastSlider-${i}">
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

                    if (i == 7) {
                        $(".btnSpinnerIcon").remove();
                        $(".btnSearch").append(`<i class="fa fa-search btnSearchIcon" aria-hidden="true" style="width: 30px;" onclick="getWeatherForecast(document.getElementById('searchCity').value)"></i>`);
                        searchListner();
                        isFormatChange = false;
                    }
                })
        }


    } catch (error) {
        console.log(error);
    }
}

// format change
function formatController() {
    isFormatChange = true;
    getWeatherForecast(currentCity);
}

// future weather
$(document).ready(function () {
    $(".forecastCarousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2,
            },
            768: {
                items: 1,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            },
            1400: {
                items: 4,
            }
        }
    });
    $(".owl-dots").remove();
    $(".owl-prev span").remove();
    $(".owl-next span").remove();
    $(".owl-prev").append(`<i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>`);
    $(".owl-next").append(`<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>`);
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

// get week name short form
function getWeekNameShortForm(num) {
    if (num == 0) {
        return "Sun";
    } else if (num == 1) {
        return "Mon";
    } else if (num == 2) {
        return "Tue";
    } else if (num == 3) {
        return "Wed";
    } else if (num == 4) {
        return "Thu";
    } else if (num == 5) {
        return "Fri";
    } else {
        return "Sat";
    }
}

// error message
function displayErrorMessage(error) {
    const toastLive = document.getElementById('liveToast');
    $(".errorHeader").append(`<span>HTTP error! Status: ${errorStatus}</span>`);
    $(".errorBody").append(`<span>${error.error.message}</span>`);

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
    toastBootstrap.show();
    errorStatus = "";
    errorCondition = false;
}

// notify clear
function notifyClear() {
    $(".notification").remove();
    $(".visually-hidden").remove();
    btnNotifyClear.setAttribute("style", "cursor: default; pointer-events: none;");
    $(".notificationAdd").append(`<li class="noNotification text-center mt-3">No Notification</li>`);
}

btnNotifyClear.addEventListener("click", notifyClear);

// search listner
function searchListner() {
    if (searchCityInputBox.value.length > 0) {
        searchButton.disabled = false;
        searchButton.setAttribute("style", "cursor: pointer; pointer-events: auto;");
    } else {
        searchButton.disabled = true;
        searchButton.setAttribute("style", "cursor: default; pointer-events: none;");
    }
}

searchCityInputBox.addEventListener("input", (event) => {
    searchListner();
});