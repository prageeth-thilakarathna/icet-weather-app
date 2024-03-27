console.log("script is working...");

const weatherAPIKey = "3bb712d3567640eb8ba92111242503";
const defaultCity = "Panadura";

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
                document.getElementById("setTemp").innerHTML = data.current.temp_c+" &deg;C"; 
            } else {
                document.getElementById("setTemp").innerHTML = data.current.temp_f+" &deg;F"; 
            }



            


        });
    } catch(error){
        console.log(error);
    }
}
