// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill - Fórmula da WDD131
function calculateWindChill(tempC, windKmh) {
    if (tempC <= 10 && windKmh > 4.8) {
        let wc = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
        return wc.toFixed(1) + " °C";
    } else {
        return "N/A";
    }
}

// Clima ao vivo
async function getWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=-15.79&longitude=-47.88&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America%2FSao_Paulo";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const current = data.current;

    const temp = Math.round(current.temperature_2m);
    const wind = current.wind_speed_10m;

    document.querySelector("#temp").textContent = temp;
    document.querySelector("#wind").textContent = wind;
    document.querySelector("#humidity").textContent = current.relative_humidity_2m;
    
    const codes = {0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast", 45: "Fog", 61: "Light Rain", 95: "Thunderstorm"};
    document.querySelector("#conditions").textContent = codes[current.weather_code] || "Partly Cloudy";

    // AGORA usa o dado real pro windchill
    document.querySelector("#windchill").textContent = calculateWindChill(temp, wind);

  } catch (error) {
    console.log("Erro:", error);
  }
}

getWeather();
