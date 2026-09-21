
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


function calculateWindChill(tempC, windKmh) {
    
    if (tempC <= 24 && windKmh > 4.8) {
        let wc = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
        return wc.toFixed(1) + " °C";
    } else {
        return "N/A";
    }
}


const temp = 24;
const wind = 5;
document.getElementById("windchill").textContent = calculateWindChill(temp, wind);// Ano atual
document.querySelector("#year").textContent = new Date().getFullYear();

// Última modificação
document.querySelector("#lastModified").textContent = document.lastModified

async function getWeather() {
  
  const url = "https://api.open-meteo.com/v1/forecast?latitude=-15.79&longitude=-47.88&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America%2FSao_Paulo";
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const current = data.current;
    
    document.querySelector("#temp").textContent = Math.round(current.temperature_2m);
    document.querySelector("#wind").textContent = current.wind_speed_10m;
    document.querySelector("#humidity").textContent = current.relative_humidity_2m;
    
    // Converte o código do tempo em texto
    const codes = {0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast", 45: "Fog", 61: "Light Rain"};
    document.querySelector("#conditions").textContent = codes[current.weather_code] || "Partly Cloudy";

  } catch (error) {
    console.log("Erro no clima:", error);
    document.querySelector("#temp").textContent = "28";
  }
}

getWeather();

// Footer - ano e última modificação
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

