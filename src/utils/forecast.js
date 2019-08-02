const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/2e5b06c9a6606e06f12800ec27bae0b7/' + latitude + ','+ longitude + '?units=si&lang=ko';

    
    request({ url, json:true }, (error, { body }) => {
        
        if(error) {
            callback('Unable to connect weather service!', undefined);
        }else if(body.error) {
            callback('Unable to find location!', undefined);
        }else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                max:body.daily.data[0].temperatureMax,
                min:body.daily.data[0].temperatureMin,
                rain:body.currently.precipProbability
            });
        }
    });
};


module.exports = forecast;
