
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;



function calculateWindChill(tempC, windKmh) {
    let wc = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
    return wc.toFixed(1) + " °C";
}

async function getWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=-15.79&longitude=-47.88&current=temperature_2m,wind_speed_10m&timezone=America%2FSao_Paulo";
  const response = await fetch(url);
  const data = await response.json();
  
  const temp = Math.round(data.current.temperature_2m);
  const wind = data.current.wind_speed_10m;

  document.querySelector("#temp").textContent = temp;
  document.querySelector("#wind").textContent = wind;
  document.querySelector("#windchill").textContent = calculateWindChill(temp, wind);
}
getWeather();