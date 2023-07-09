let latitude;
let longitude;
const APIKEY = '7b674925742140a6a95130205233006';
let addressData;


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  async function getAddress(){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${latitude},${longitude}&aqi=no&lang=cs`);
    addressData = await response.json();
    console.log(addressData);
    return addressData
 }

  async function showPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    await getAddress()

    const mainCard = document.getElementById('card-main');
    const loc = document.createElement('div');
    loc.id = 'location';
    mainCard.appendChild(loc);
    loc.textContent = `${addressData.location.name}, ${addressData.location.region}`
    const temp = document.createElement('div');
    temp.id = 'temp'
    const mainStats = document.createElement('div');
    mainStats.id = 'mainStats';
    mainCard.appendChild(mainStats);
    mainStats.appendChild(temp);
    temp.innerHTML = `${addressData.current.temp_c}°C`;
    const sideTemp = document.createElement('span');
    sideTemp.textContent = `Pocitová teplota: ${addressData.current.feelslike_c}°C`;
    temp.appendChild(sideTemp);
    const weather = document.createElement('div');
    weather.id = 'weather'
    const weatherIMG = document.createElement('img');
    weatherIMG.id = 'weatherIMG'
    weather.appendChild(weatherIMG);
    mainStats.appendChild(weather);
    weatherIMG.src = addressData.current.condition.icon;
    const weatherState = document.createElement('div');
    weatherState.id = 'weatherState'
    mainCard.appendChild(weatherState);
    weatherState.textContent = addressData.current.condition.text;
    const cloudpercent = document.createElement('div');
    cloudpercent.id = 'cloudpercent'
    const cloudiness = document.createElement('div');
    mainCard.appendChild(cloudiness);
    const cloudSVG = document.createElement('img');
    cloudiness.appendChild(cloudSVG);
    cloudSVG.src = "./img/cloud.svg"
    cloudSVG.id = "cloudSVG"
    cloudiness.id = 'cloudiness'
    cloudiness.appendChild(cloudpercent);
    cloudpercent.textContent = `${addressData.current.cloud}%`;
    const humidity = document.createElement('div');
    humidity.id = 'humidity'
    mainCard.appendChild(humidity);
    humidity.textContent = `Vlhkost vzduchu: ${addressData.current.humidity}%`;
    const updateTime = document.createElement('div');
    updateTime.id = 'updateTime'
    updateTime.textContent = `Naposled aktualizováno: ${addressData.current.last_updated[11]}${addressData.current.last_updated[12]}${addressData.current.last_updated[13]}${addressData.current.last_updated[14]}${addressData.current.last_updated[15]}`;
    mainCard.appendChild(updateTime);
  };
