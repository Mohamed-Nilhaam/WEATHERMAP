function getWeatherAndSendSMS() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const apiKey = 'a2ef3421d90e6fc83c412991cb13f32a'; // Replace with your weather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherBox = document.getElementById('weatherBox');
        const weatherContent = document.getElementById('weatherContent');
        weatherContent.innerHTML = `
            Weather Forecast for ${data.name}, ${data.sys.country}:
            Temperature: ${data.main.temp} °C
            Humidity: ${data.main.humidity} %
            Weather: ${data.weather[0].description}
        `;

        weatherBox.style.display = 'block';
        displayWindyMap(data.coord.lat, data.coord.lon);

        // Send SMS
        sendMessage(weatherContent.innerText);
    })
    .catch(error => console.error('Error:', error));
}

function sendMessage() {
    const weatherContent = document.getElementById('weatherContent').innerText;
    const phoneNumber = '+94771386381'; // Ensure correct format

    const username = 'MohamedNilhaam';
    const password = 'Nilhaamking@2003';
    const apiKey = '879c1b042cdd802658791dd2e342c47a-05aef554-fbe1-4aff-a585-22e6c55e9451';

    // Sending a request to your server endpoint
    fetch('https://w1vydr.api.infobip.com/sms/2/text/single', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
         body: JSON.stringify({
            from: 'Alert',
            to: phoneNumber,
            text: weatherContent
        })
    })
    .then(response => response.json())
    .then(data => console.log('SMS sent successfully:', data))
    .catch(error => console.error('Error sending SMS:', error));
}



function displayWindyMap(latitude, longitude) {
    const windyMap = document.getElementById('windyMap');
    windyMap.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            src="https://embed.windy.com/embed2.html?lat=${latitude}&lon=${longitude}&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        ></iframe>
    `;
}

// Additional event listeners or initialization code can be added here if necessary.
