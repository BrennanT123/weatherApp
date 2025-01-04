import "./styles.css";
import { format} from 'date-fns'

class weather {
  constructor(VCData) {
    this.address = VCData.resolvedAddress;
    this.currentTemp = VCData.currentConditions.temp;
    this.currentFeelsLike = VCData.currentConditions.feelslike;
    this.todayMin = VCData.days[0].tempmin;
    this.todayMax = VCData.days[0].tempmax;
    this.currentConditions = VCData.currentConditions.conditions;
    this.currentTime = format(new Date(),"eeee MMMM wo yyyy")
    if (VCData.alerts[0].event) {
      this.currentAlertEvent = VCData.alerts[0].event;
      this.currentAlertHeadline = VCData.alerts[0].headline;
      this.currentAlertEndintime = VCData.alerts[0].ends;
      this.currentAlertsDescription = VCData.alerts[0].description;
    }
  }
}

class htmlElements {
  constructor() {
    this.location = document.querySelector("#location");
    this.currentConditions = document.querySelector("#currentConditions");
    this.feelsLike = document.querySelector("#feelsLike");
    this.temp = document.querySelector("#temp");
    this.time = document.querySelector("#time");
    this.minmax = document.querySelector("#minmax");
    this.alertEvent = document.querySelector("#alertEvent");
    this.alertEndTime = document.querySelector("#alertEndTime");
    this.alertHeadline = document.querySelector("#alertHeadline");
  }
}

async function getWeather() {
  let response;
  try {
    response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=WHNRUC5T552WXSR65F5SSW8KD",
      { mode: "cors" }
    );
    //test for forcing it to fail
    /*     response = await fetch("https://invalid-url.com", { mode: "cors" }); */
  } catch (err) {
    alert(err);
  }
  if (!response.ok) {
    alert(`HTTP error! Status: ${response.status}`);
    return;
  }
  const weatherData = await response.json();
  console.log(weatherData);
  setWeather(weatherData);
}

function setWeather(VCPromise) {
  const weatherInput = new weather(VCPromise);
  const htmlElementsSelection = new htmlElements();
  htmlElementsSelection.location.textContent = weatherInput.address;
  htmlElementsSelection.time.textContent = weatherInput.currentTime;
  htmlElementsSelection.currentConditions.textContent = weatherInput.currentConditions;
  htmlElementsSelection.temp.textContent = weatherInput.currentTemp+'°F';
  htmlElementsSelection.feelsLike.textContent = 'Feels Like: '+weatherInput.currentFeelsLike+'°F';
  htmlElementsSelection.minmax.textContent = 'Min: '+ weatherInput.todayMin+'°F'+'\n Max: '+weatherInput.todayMax+'°F'; 

  console.log("weatherdata");
  console.log(weatherInput);
}

getWeather();
