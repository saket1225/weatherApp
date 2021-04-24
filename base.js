const api = {
  key: "7d7bba94d72559873a50afba6f429822",
  base: "https://api.openweathermap.org/data/2.5/"
}

var pinCodeInput = document.querySelector(".pincode")

function getResultsFunc(){
  pinCode = pinCodeInput.value;
    if (pinCode > 1){
        fetchResults(pinCode)
        document.querySelector(".note").style.display = 'none'
    }
}

var searchButton = document.querySelector(".searchIcon")

searchButton.addEventListener("click", () => {
  getResultsFunc()
})

pinCodeInput.addEventListener("keyup", function (event){
  if (event.keyCode == 13) {
    getResultsFunc()
  }
})

function fetchResults (valueOfInput) {
  fetch(`${api.base}weather?q=${valueOfInput}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(data => {
        displayResuts(data)
    })
    .catch((e) => {
      document.querySelector(".note").innerHTML = "Please Enter A Valid Pin/Zip"
      document.querySelector(".note").style.display = 'block'
    })
}

var iconDom = document.querySelector(".icon")
var placeText = document.querySelector(".placeText")
var timeDom = document.querySelector(".time")
var descriptionDom = document.querySelector(".description")
var airSpeed = document.querySelector(".airSpeed")
var humidityDom = document.querySelector(".humidityText")
var degreeDom = document.querySelector(".degree")
var imageIcon = document.querySelector(".icon")

function displayResuts(data){
    var temp = Math.round(data.main.temp);
    var place = data.name;
    var windSpeed = Math.round(data.wind.speed);
    var humidity = data.main.humidity;
    var description = data.weather[0].description;
    var clouds = data.clouds.all

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes()

    placeText.innerHTML = place;
    timeDom.innerHTML = time;
    descriptionDom.innerHTML = description;
    airSpeed.innerHTML = windSpeed;
    humidityDom.innerHTML = humidity;
    degreeDom.innerHTML = temp;


    if (windSpeed > 10){
      imageIcon.src = "img/Tormado.svg"
      descriptionDom.innerHTML = "Isn't it too windy out there?"
    }

    else if(humidity > 35){
      imageIcon.src = "img/Raining.svg"
    }

    else if(windSpeed > 7 && humidity > 40){
      imageIcon.src = "img/thunderstorm.svg"
    }

    else if(description == "haze"){
      imageIcon.src = "img/cloudy.svg"
    }

    else if(description == "clear sky"){
      imageIcon.src = "img/sun.svg"
    }
}
