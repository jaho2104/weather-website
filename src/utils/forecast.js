const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1bd992f45f83a5efdf8cbfb214dc25db/${latitude},${longitude}?units=si`

    request({
        url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const data = body.currently
            const summary = body.daily.data[0].summary

            callback(undefined, `${summary} It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast