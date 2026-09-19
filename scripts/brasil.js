
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
document.getElementById("windchill").textContent = calculateWindChill(temp, wind);