async function getWeather() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kythira&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.toLowerCase().includes('weather in kythira')) {
        addMessage('user', userInput);
        getWeather().then(data => {
            const weatherMessage = `The weather in Kythira is ${data.weather[0].description}. Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C.`;
            addMessage('bot', weatherMessage);
        }).catch(error => {
            addMessage('bot', 'Sorry, I could not fetch the weather data at the moment.');
        });
    } else {
        addMessage('user', userInput);
        addMessage('bot', 'I can only provide information about the weather in Kythira.');
    }
    document.getElementById('user-input').value = '';
}

function addMessage(sender, message) {
    const chatLog = document.getElementById('chat-log');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}
