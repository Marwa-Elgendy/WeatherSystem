let searchInput=document.getElementById("search")
//.......
let todayName= document.getElementById("toDay-dayName");
let todayNumber= document.getElementById("toDay-dayNum");
let todayMonth= document.getElementById("toDay-Month");
let todayLocation= document.getElementById("toDay-location");
let todayTemp= document.getElementById("toDay-temp");
let todayConditionImg= document.getElementById("toDayImg");
let todayConditionText= document.getElementById("toDayText");
let humidity= document.getElementById("humidity");
let wind= document.getElementById("wind");
let windDirection= document.getElementById("wind-direction");
let weatherDate;

//...........
let nextDay=document.getElementsByClassName("tomorrow-dayName");
let nextMaxTemp=document.getElementsByClassName("next-max-temp");
let nextMinTemp=document.getElementsByClassName("next_min_temp");
let nextConditionImg=document.getElementsByClassName("next_condition_img");
let nextConditionText=document.getElementsByClassName("next-condition-text");



//fetch api 

async function  getWeatherDate(cityName){
    let WeatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${cityName}&days=7`)
    let weatherDate=await WeatherResponse.json()
    return weatherDate
}

// display today date
function displayTodayData(data){

    let todayDate = new Date()
    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML=todayDate.getDate()
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+" km/h"
    windDirection.innerHTML=data.current.wind_dir
}
// display next days

function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for(let i=0;i<2;i++){
        let nextDate=new Date(forecastData[i+1].date)
        nextDay[i].innerHTML=nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML=forecastData[i+1].day.condition.text
    }

}

//start app

async function startApp(city="cairo"){
    let weatherData=await getWeatherDate(city)
    if(!weatherData.error){
    displayTodayData(weatherData)
    displayNextData(weatherData)
    }
    
}

startApp()

searchInput.addEventListener("input", function(){
    startApp(searchInput.value)

})