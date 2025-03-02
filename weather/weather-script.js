const loadWeatherApp = ()=>{ 

const weatherElement = document.querySelector('weather-app')
const shadow = weatherElement.shadowRoot
console.log('SHADOW FROM FETCH',shadow)


const settingContainer = shadow.getElementById("setting-container");
const labelLocation = shadow.getElementById('label-location')
const locations = shadow.getElementById("location");
const locationsList = shadow.getElementById('places-list')
const comunication = shadow.getElementById("comunication");
const note = shadow.getElementById("note");
const update = shadow.getElementById("update");
const findLocation = shadow.getElementById('find-location')
const temperature = shadow.getElementById("temperature");
const extra = shadow.getElementById("extra");
const alertIcon = shadow.getElementById("alert-icon");
const alert = shadow.getElementById("alert");
const forecastContainer = shadow.getElementById('forecast-container')
const forecastDays = shadow.getElementById('forecast-days')
const selectAlertStatus = shadow.getElementById('alert-status')
const statusIcon = shadow.getElementById('status-icon')
let geometry = ''
let locationHint = []
let lat,lng;
findLocation.addEventListener('click', ()=>{findLocationFun()})
findLocation.addEventListener('touchstart', ()=>{findLocationFun()})
const findLocationFun = ()=>{
    const searchLocation = locations.value
    
    if(searchLocation.length > 2){
        fetch('http://127.0.0.1:3100/location',{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({location : searchLocation})
        })
        .then(response => response.json())
        .then(data => {
            geometry = data.results[0].geometry.location
            locationHint = data.results.map(e => {
                return e.formatted_address
        },0)
            locationsList.innerHTML = ''
            for (let i = 0; i < locationHint.length; i++) {
                console.log(data.results[i].geometry.location.lat,"-",data.results[i].geometry.location.lng)
                const li = document.createElement('li')
                li.classList = 'location-element'
                li.innerHTML = locationHint[i]
                locationsList.append(li)
                li.addEventListener('mouseover',()=> li.style.cursor = 'pointer')
                console.log('hint',locationHint[i])
            }
            const liElements = shadow.querySelectorAll('.location-element')
            console.log('LI ELEMENT', liElements)
            liElements.forEach( (e,i) => {
                e.addEventListener('click',()=>{
                    lat = data.results[i].geometry.location.lat
                    lng = data.results[i].geometry.location.lng
                    labelLocation.innerText = e.innerText
                    getWeather()
                    liElements.forEach(e=> e.remove())
                })
                

            })
            
        })
        .catch(err => {console.log(err)})
    }
}




const weatherCodes = {
  "0": "Sconosciuto",
  "1000": "Sereno",
  "1100": "Prevalentemente Sereno",
  "1101": "Parzialmente Nuvoloso",
  "1102": "Molto Nuvoloso",
  "1001": "Nuvoloso",
  "1103": "Parzialmente Nuvoloso e Prevalentemente Sereno",
  "2100": "Nebbia Leggera",
  "2101": "Prevalentemente Sereno e Nebbia Leggera",
  "2102": "Parzialmente Nuvoloso e Nebbia Leggera",
  "2103": "Molto Nuvoloso e Nebbia Leggera",
  "2106": "Prevalentemente Sereno e Nebbia",
  "2107": "Parzialmente Nuvoloso e Nebbia",
  "2108": "Molto Nuvoloso e Nebbia",
  "2000": "Nebbia",
  "4204": "Parzialmente Nuvoloso e Pioggerella",
  "4203": "Prevalentemente Sereno e Pioggerella",
  "4205": "Molto Nuvoloso e Pioggerella",
  "4000": "Pioggerella",
  "4200": "Pioggia Leggera",
  "4213": "Prevalentemente Sereno e Pioggia Leggera",
  "4214": "Parzialmente Nuvoloso e Pioggia Leggera",
  "4215": "Molto Nuvoloso e Pioggia Leggera",
  "4209": "Prevalentemente Sereno e Pioggia",
  "4208": "Parzialmente Nuvoloso e Pioggia",
  "4210": "Molto Nuvoloso e Pioggia",
  "4001": "Pioggia",
  "4211": "Prevalentemente Sereno e Pioggia Forte",
  "4202": "Parzialmente Nuvoloso e Pioggia Forte",
  "4212": "Molto Nuvoloso e Pioggia Forte",
  "4201": "Pioggia Forte",
  "5115": "Prevalentemente Sereno e Raffiche di Neve",
  "5116": "Parzialmente Nuvoloso e Raffiche di Neve",
  "5117": "Molto Nuvoloso e Raffiche di Neve",
  "5001": "Raffiche di Neve",
  "5100": "Neve Leggera",
  "5102": "Prevalentemente Sereno e Neve Leggera",
  "5103": "Parzialmente Nuvoloso e Neve Leggera",
  "5104": "Molto Nuvoloso e Neve Leggera",
  "5122": "Pioggerella e Neve Leggera",
  "5105": "Prevalentemente Sereno e Neve",
  "5106": "Parzialmente Nuvoloso e Neve",
  "5107": "Molto Nuvoloso e Neve",
  "5000": "Neve",
  '5001': 'Nevischio',
  "5101": "Neve Forte",
  "5119": "Prevalentemente Sereno e Neve Forte",
  "5120": "Parzialmente Nuvoloso e Neve Forte",
  "5121": "Molto Nuvoloso e Neve Forte",
  "5110": "Pioggerella e Neve",
  "5108": "Pioggia e Neve",
  "5114": "Neve e Pioggia Ghiacciata",
  "5112": "Neve e Grandine",
  "6000": "Pioggia Ghiacciata",
  "6003": "Prevalentemente Sereno e Pioggia Ghiacciata",
  "6002": "Parzialmente Nuvoloso e Pioggia Ghiacciata",
  "6004": "Molto Nuvoloso e Pioggia Ghiacciata",
  "6204": "Pioggerella e Pioggia Ghiacciata",
  "6206": "Pioggia Leggera e Pioggia Ghiacciata",
  "6205": "Prevalentemente Sereno e Leggera Pioggia Ghiacciata",
  "6203": "Parzialmente Nuvoloso e Leggera Pioggia Ghiacciata",
  "6209": "Molto Nuvoloso e Leggera Pioggia Ghiacciata",
  "6200": "Leggera Pioggia Ghiacciata",
  "6213": "Prevalentemente Sereno e Pioggia Ghiacciata",
  "6214": "Parzialmente Nuvoloso e Pioggia Ghiacciata",
  "6215": "Molto Nuvoloso e Pioggia Ghiacciata",
  "6001": "Pioggia Ghiacciata",
  "6212": "Pioggerella e Pioggia Ghiacciata",
  "6220": "Pioggia Leggera e Pioggia Ghiacciata",
  "6222": "Pioggia e Pioggia Ghiacciata",
  "6207": "Prevalentemente Sereno e Forte Pioggia Ghiacciata",
  "6202": "Parzialmente Nuvoloso e Forte Pioggia Ghiacciata",
  "6208": "Molto Nuvoloso e Forte Pioggia Ghiacciata",
  "6201": "Forte Pioggia Ghiacciata",
  "7110": "Prevalentemente Sereno e Leggera Grandine",
  "7111": "Parzialmente Nuvoloso e Leggera Grandine",
  "7112": "Molto Nuvoloso e Leggera Grandine",
  "7102": "Leggera Grandine",
  "7108": "Prevalentemente Sereno e Grandine",
  "7107": "Parzialmente Nuvoloso e Grandine",
  "7109": "Molto Nuvoloso e Grandine",
  "7000": "Grandine",
  "7105": "Pioggerella e Grandine",
  "7106": "Pioggia Ghiacciata e Grandine",
  "7115": "Pioggia Leggera e Grandine",
  "7117": "Pioggia e Grandine",
  "7103": "Pioggia Ghiacciata e Forte Grandine",
  "7113": "Prevalentemente Sereno e Forte Grandine",
  "7114": "Parzialmente Nuvoloso e Forte Grandine",
  "7116": "Molto Nuvoloso e Forte Grandine",
  "7101": "Forte Grandine",
  "8001": "Prevalentemente Sereno e Temporale",
  "8003": "Parzialmente Nuvoloso e Temporale",
  "8002": "Molto Nuvoloso e Temporale",
  "8000": "Temporale"
}

const weatherIcons = {
   "10000": "10000_clear_large@2x.png",
  "10001": "10001_clear_large@2x.png",
  "10010": "10010_cloudy_large@2x.png",
  "11000": "11000_mostly_clear_large@2x.png",
  "11001": "11001_mostly_clear_large@2x.png",
  "11010": "11010_partly_cloudy_large@2x.png",
  "11011": "11011_partly_cloudy_large@2x.png",
  "11020": "11020_mostly_cloudy_large@2x.png",
  "11021": "11021_mostly_cloudy_large@2x.png",
  "11030": "11030_mostly_clear_large@2x.png",
  "11031": "11031_mostly_clear_large@2x.png",
  "20000": "20000_fog_large@2x.png",
  "21000": "21000_fog_light_large@2x.png",
  "21010": "21010_fog_light_mostly_clear_large@2x.png",
  "21011": "21011_fog_light_mostly_clear_large@2x.png",
  "21020": "21020_fog_light_partly_cloudy_large@2x.png",
  "21021": "21021_fog_light_partly_cloudy_large@2x.png",
  "21030": "21030_fog_light_mostly_cloudy_large@2x.png",
  "21031": "21031_fog_light_mostly_cloudy_large@2x.png",
  "21060": "21060_fog_mostly_clear_large@2x.png",
  "21061": "21061_fog_mostly_clear_large@2x.png",
  "21070": "21070_fog_partly_cloudy_large@2x.png",
  "21071": "21071_fog_partly_cloudy_large@2x.png",
  "21080": "21080_fog_mostly_cloudy_large@2x.png",
  "21081": "21081_fog_mostly_cloudy_large@2x.png",
  "40000": "40000_drizzle_large@2x.png",
  "40010": "40010_rain_large@2x.png",
  "42000": "42000_rain_light_large@2x.png",
  "42010": "42010_rain_heavy_large@2x.png",
  "42020": "42020_rain_heavy_partly_cloudy_large@2x.png",
  "42021": "42021_rain_heavy_partly_cloudy_large@2x.png",
  "42030": "42030_drizzle_mostly_clear_large@2x.png",
  "42031": "42031_drizzle_mostly_clear_large@2x.png",
  "42040": "42040_drizzle_partly_cloudy_large@2x.png",
  "42041": "42041_drizzle_partly_cloudy_large@2x.png",
  "42050": "42050_drizzle_mostly_cloudy_large@2x.png",
  "42051": "42051_drizzle_mostly_cloudy_large@2x.png",
  "42080": "42080_rain_partly_cloudy_large@2x.png",
  "42081": "42081_rain_partly_cloudy_large@2x.png",
  "42090": "42090_rain_mostly_clear_large@2x.png",
  "42091": "42091_rain_mostly_clear_large@2x.png",
  "42100": "42100_rain_mostly_cloudy_large@2x.png",
  "42101": "42101_rain_mostly_cloudy_large@2x.png",
  "42110": "42110_rain_heavy_mostly_clear_large@2x.png",
  "42111": "42111_rain_heavy_mostly_clear_large@2x.png",
  "42120": "42120_rain_heavy_mostly_cloudy_large@2x.png",
  "42121": "42121_rain_heavy_mostly_cloudy_large@2x.png",
  "42130": "42130_rain_light_mostly_clear_large@2x.png",
  "42131": "42131_rain_light_mostly_clear_large@2x.png",
  "42140": "42140_rain_light_partly_cloudy_large@2x.png",
  "42141": "42141_rain_light_partly_cloudy_large@2x.png",
  "42150": "42150_rain_light_mostly_cloudy_large@2x.png",
  "42151": "42151_rain_light_mostly_cloudy_large@2x.png",
  "50000": "50000_snow_large@2x.png",
  "50010": "50010_flurries_large@2x.png",
  "51000": "51000_snow_light_large@2x.png",
  "51010": "51010_snow_heavy_large@2x.png",
  "51020": "51020_snow_light_mostly_clear_large@2x.png",
  "51021": "51021_snow_light_mostly_clear_large@2x.png",
  "51030": "51030_snow_light_partly_cloudy_large@2x.png",
  "51031": "51031_snow_light_partly_cloudy_large@2x.png",
  "51040": "51040_snow_light_mostly_cloudy_large@2x.png",
  "51041": "51041_snow_light_mostly_cloudy_large@2x.png",
  "51050": "51050_snow_mostly_clear_large@2x.png",
  "51051": "51051_snow_mostly_clear_large@2x.png",
  "51060": "51060_snow_partly_cloudy_large@2x.png",
  "51061": "51061_snow_partly_cloudy_large@2x.png",
  "51070": "51070_snow_mostly_cloudy_large@2x.png",
  "51071": "51071_snow_mostly_cloudy_large@2x.png",
  "51080": "51080_wintry_mix_large@2x.png",
  "51100": "51100_wintry_mix_large@2x.png",
  "51120": "51120_wintry_mix_large@2x.png",
  "51140": "51140_wintry_mix_large@2x.png",
  "51150": "51150_flurries_mostly_clear_large@2x.png",
  "51151": "51151_flurries_mostly_clear_large@2x.png",
  "51160": "51160_flurries_partly_cloudy_large@2x.png",
  "51161": "51161_flurries_partly_cloudy_large@2x.png",
  "51170": "51170_flurries_mostly_cloudy_large@2x.png",
  "51171": "51171_flurries_mostly_cloudy_large@2x.png",
  "51190": "51190_snow_heavy_mostly_clear_large@2x.png",
  "51191": "51191_snow_heavy_mostly_clear_large@2x.png",
  "51200": "51200_snow_heavy_partly_cloudy_large@2x.png",
  "51201": "51201_snow_heavy_partly_cloudy_large@2x.png",
  "51210": "51210_snow_heavy_mostly_cloudy_large@2x.png",
  "51211": "51211_snow_heavy_mostly_cloudy_large@2x.png",
  "51220": "51220_wintry_mix_large@2x.png",
  "60000": "60000_freezing_rain_drizzle_large@2x.png",
  "60010": "60010_freezing_rain_large@2x.png",
  "60020": "60020_freezing_rain_drizzle_partly_cloudy_large@2x.png",
  "60021": "60021_freezing_rain_drizzle_partly_cloudy_large@2x.png",
  "60030": "60030_freezing_rain_drizzle_mostly_clear_large@2x.png",
  "60031": "60031_freezing_rain_drizzle_mostly_clear_large@2x.png",
  "60040": "60040_freezing_rain_drizzle_mostly_cloudy_large@2x.png",
  "60041": "60041_freezing_rain_drizzle_mostly_cloudy_large@2x.png",
  "62000": "62000_freezing_rain_light_large@2x.png",
  "62010": "62010_freezing_rain_heavy_large@2x.png",
  "62020": "62020_freezing_rain_heavy_partly_cloudy_large@2x.png",
  "62021": "62021_freezing_rain_heavy_partly_cloudy_large@2x.png",
  "62030": "62030_freezing_rain_light_partly_cloudy_large@2x.png",
  "62031": "62031_freezing_rain_light_partly_cloudy_large@2x.png",
  "62040": "62040_wintry_mix_large@2x.png",
  "62050": "62050_freezing_rain_light_mostly_clear_large@2x.png",
  "62051": "62051_freezing_rain_light_mostly_clear_large@2x.png",
  "62060": "62060_wintry_mix_large@2x.png",
  "62070": "62070_freezing_rain_heavy_mostly_clear_large@2x.png",
  "62071": "62071_freezing_rain_heavy_mostly_clear_large@2x.png",
  "62080": "62080_freezing_rain_heavy_mostly_cloudy_large@2x.png",
  "62081": "62081_freezing_rain_heavy_mostly_cloudy_large@2x.png",
  "62090": "62090_freezing_rain_light_mostly_cloudy_large@2x.png",
  "62091": "62091_freezing_rain_light_mostly_cloudy_large@2x.png",
  "62120": "62120_wintry_mix_large@2x.png",
  "62130": "62130_freezing_rain_mostly_clear_large@2x.png",
  "62131": "62131_freezing_rain_mostly_clear_large@2x.png",
  "62140": "62140_freezing_rain_partly_cloudy_large@2x.png",
  "62141": "62141_freezing_rain_partly_cloudy_large@2x.png",
  "62150": "62150_freezing_rain_mostly_cloudy_large@2x.png",
  "62151": "62151_freezing_rain_mostly_cloudy_large@2x.png",
  "62200": "62200_wintry_mix_large@2x.png",
  "62220": "62220_wintry_mix_large@2x.png",
  "70000": "70000_ice_pellets_large@2x.png",
  "71010": "71010_ice_pellets_heavy_large@2x.png",
  "71020": "71020_ice_pellets_light_large@2x.png",
  "71030": "71030_wintry_mix_large@2x.png",
  "71050": "71050_wintry_mix_large@2x.png",
  "71060": "71060_wintry_mix_large@2x.png",
  "71070": "71070_ice_pellets_partly_cloudy_large@2x.png",
  "71071": "71071_ice_pellets_partly_cloudy_large@2x.png",
  "71080": "71080_ice_pellets_mostly_clear_large@2x.png",
  "71081": "71081_ice_pellets_mostly_clear_large@2x.png",
  "71090": "71090_ice_pellets_mostly_cloudy_large@2x.png",
  "71091": "71091_ice_pellets_mostly_cloudy_large@2x.png",
  "71100": "71100_ice_pellets_light_mostly_clear_large@2x.png",
  "71101": "71101_ice_pellets_light_mostly_clear_large@2x.png",
  "71110": "71110_ice_pellets_light_partly_cloudy_large@2x.png",
  "71111": "71111_ice_pellets_light_partly_cloudy_large@2x.png",
  "71120": "71120_ice_pellets_light_mostly_cloudy_large@2x.png",
  "71121": "71121_ice_pellets_light_mostly_cloudy_large@2x.png",
  "71130": "71130_ice_pellets_heavy_mostly_clear_large@2x.png",
  "71131": "71131_ice_pellets_heavy_mostly_clear_large@2x.png",
  "71140": "71140_ice_pellets_heavy_partly_cloudy_large@2x.png",
  "71141": "71141_ice_pellets_heavy_partly_cloudy_large@2x.png",
  "71150": "71150_wintry_mix_large@2x.png",
  "71160": "71160_ice_pellets_heavy_mostly_cloudy_large@2x.png",
  "71161": "71161_ice_pellets_heavy_mostly_cloudy_large@2x.png",
  "71170": "71170_wintry_mix_large@2x.png",
  "80000": "80000_tstorm_large@2x.png",
  "80010": "80010_tstorm_mostly_clear_large@2x.png",
  "80011": "80011_tstorm_mostly_clear_large@2x.png",
  "80020": "80020_tstorm_mostly_cloudy_large@2x.png",
  "80021": "80021_tstorm_mostly_cloudy_large@2x.png",
  "80030": "80030_tstorm_partly_cloudy_large@2x.png",
  "80031": "80031_tstorm_partly_cloudy_large@2x.png"
  };



const today = new Date()
const timeOfTheDay = today.getHours()
console.log(timeOfTheDay)
let dayOrNight = '0'
if (timeOfTheDay > 6 && timeOfTheDay < 18){
    dayOrNight = '0'
}else{
    dayOrNight = '1'
}
console.log(today)
const pathIcons = '/icons/'

    const getWeather = (labelLocation) =>{
    fetch('http://127.0.0.1:3100/forecast',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ 'lat': lat, 'lng': lng})
    })
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        let strNewElement = ''
        for (let i = 0; i < forecastDays.value; i++) {
            let dayValue = 0
            if(i===0){
                dayValue = 'oggi'
            }else{
                let nextDay = new Date(today)
                nextDay.setDate(today.getDate() + i)
                dayValue = nextDay.toLocaleDateString('it-IT', { weekday: 'short' });
            }
            let chanceOfRain = Math.round(data.timelines.daily[i].values.precipitationProbabilityAvg)
            let tempMax = Math.round(data.timelines.daily[i].values.temperatureMax)
            let tempMin = Math.round(data.timelines.daily[i].values.temperatureMin)
            let weatherCode = data.timelines.daily[i].values.weatherCodeMax
            let weatherCondition = weatherCodes[weatherCode]
            let weatherIcon = weatherIcons[weatherCode + dayOrNight]
            if(weatherIcon === undefined){
                weatherIcon = weatherIcons[weatherCode + '0']
            }
            
            strNewElement += `
                <div class="forecast">
                    <div class="icon">
                        <div class="temperature"><span class="max">${tempMax}°C</span> / <span class="min">${tempMin}°C</span></div>
                        <img src="./weather/icons/${weatherIcon}" alt="">
                        <div class="condition">${weatherCondition}</div>
                        <div class="rain-chance">${chanceOfRain}%</div>
                        <div class="day">${dayValue}</div>
                    </div>
                </div>
            `
            console.log(chanceOfRain,tempMax, tempMin, weatherCondition)
        }
        forecastContainer.innerHTML = ''
        forecastContainer.innerHTML = strNewElement
       
    })
    .catch(err => {console.log(err)})

}


}