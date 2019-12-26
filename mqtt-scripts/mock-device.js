// mock-device.js
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

const deviceName = "RasPi-MQTT";

// 1. Publish random number every 15 seconds
schedule('*/15 * * * * *', () => {
    let temperature = {
        "name": deviceName,
        "cmd": "temperature",
        "temperature": getRandomFloat(20, 30).toFixed(1)
    };
    publish('DataTopic', JSON.stringify(temperature));
    let humidity = {
        "name": deviceName,
        "cmd": "humidity",
        "humidity": getRandomFloat(30, 80).toFixed(1)
    };
    publish('DataTopic', JSON.stringify(humidity));
});

// 2. Receive the reading request, then return the response
subscribe("CommandTopic", (topic, val) => {
    var data = val;
    switch (data.cmd) {
        case "temperature":
            data.temperature = getRandomFloat(20, 30).toFixed(1);
            break;
        case "humidity":
            data.humidity = getRandomFloat(30, 80).toFixed(1);
            break;
    }
    publish("ResponseTopic", JSON.stringify(data));
});
