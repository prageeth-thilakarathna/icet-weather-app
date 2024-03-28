console.log("script is working...");

const weatherAPIKey = "3bb712d3567640eb8ba92111242503";
const defaultCity = "Panadura";
var currentCity = "";

window.onload = function(){
    document.getElementById("searchCity").value = "";
    getWeatherForecast(defaultCity);
}

function getWeatherForecast(city) {
    try{
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${city}&days=10&aqi=yes&alerts=yes`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            currentCity = data.location.name;
            document.getElementById("setLocation").innerHTML = data.location.name+", "+data.location.country;

            let localTime = data.location.localtime;
            const time = localTime.split(" ");
            const hour = time[1].split(":");
            if(hour[0]>=0 && hour[0]<=11){
                document.getElementById("setTime").innerHTML = time[1]+" AM";
            } else {
                document.getElementById("setTime").innerHTML = time[1]+" PM";
            }

            document.getElementById("setDate").innerHTML = time[0];
            document.getElementById("setWeatherImg").src = data.current.condition.icon;
            
            const format = document.getElementById("getFormatValue").value;

            if(format=="C"){
                document.getElementById("setTemp").innerHTML = data.current.temp_c;
                document.getElementById("setFormat").innerHTML = " &deg;C";
                document.getElementById("setWind").innerHTML = data.current.wind_kph+" kph";
                document.getElementById("setPressure").innerHTML = data.current.pressure_mb+" mb";
                document.getElementById("setPrecip").innerHTML = data.current.precip_mm+" mm";
                document.getElementById("setFeelsLike").innerHTML = data.current.feelslike_c+" &deg;C";
                document.getElementById("setVis").innerHTML = data.current.vis_km+" km";
                document.getElementById("setGustWind").innerHTML = data.current.gust_kph+" kph";
                 
            } else {
                document.getElementById("setTemp").innerHTML = data.current.temp_f;
                document.getElementById("setFormat").innerHTML = " &deg;F";
                document.getElementById("setWind").innerHTML = data.current.wind_mph+" mph";
                document.getElementById("setPressure").innerHTML = data.current.pressure_in+" in";
                document.getElementById("setPrecip").innerHTML = data.current.precip_in+" in";
                document.getElementById("setFeelsLike").innerHTML = data.current.feelslike_f+" &deg;F";
                document.getElementById("setVis").innerHTML = data.current.vis_miles+" miles";
                document.getElementById("setGustWind").innerHTML = data.current.gust_mph+" mph";
            }

            document.getElementById("setCondition").innerHTML = data.current.condition.text;
            document.getElementById("setWindDegree").innerHTML = data.current.wind_degree+" &deg";
            document.getElementById("setWindDir").innerHTML = data.current.wind_dir;
            document.getElementById("setHumidity").innerHTML = data.current.humidity+" %";
            document.getElementById("setCloud").innerHTML = data.current.cloud+" %";
            document.getElementById("setUV").innerHTML = data.current.uv+" index";

            const airQuality = data.current.air_quality.pm2_5;
            if(airQuality>=0 && airQuality<12){
                document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5+" (Good)";
            } else if(airQuality>=12 && airQuality<35){
                document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5+" (Moderate)";
            } else if(airQuality>=35 && airQuality<55){
                document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5+" (Unhealthy for Sensitive Groups)";
            } else if(airQuality>=55 && airQuality<150){
                document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5+" (Unhealthy)";
            } else if(airQuality>=150 && airQuality<250){
                document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5+" (Very Unhealthy)";
            } else if(airQuality>=250){
                document.getElementById("setAirQuality").innerHTML = data.current.air_quality.pm2_5+" (Hazardous)";
            }
            


            


        });
    } catch(error){
        console.log(error);
    }
}

function formatController(){
    console.log("format change call...")
    getWeatherForecast(currentCity);
}
