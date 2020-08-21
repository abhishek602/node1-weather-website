const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=439d4b804bc8187953eb36d2a8c26a02`;


  request({ url, json: true }, (error, { body }) => {   // shorthand and destructuring.
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,

        `This place is above approx ${body.main.sea_level}m from the see level.It is currently ${body.main.temp} Fh out. There is a ${body.weather[0].description} So no any chance of rain.
        Here pressure is = ${body.main.pressure},
        Minimum temperature is = ${body.main.temp_min} fh,
        Maximum temperature is = ${body.main.temp_max} ,
        Humidity is = ${body.main.humidity} ,
        and also wind speed is = ${body.wind.speed}.
        

        Thanks for using our site.`
      );
    }
  });
};

module.exports = forecast;







/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* const forecast = (lat, lon, callback) => {
  const url = `https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=439d4b804bc8187953eb36d2a8c26a02`;


  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,

        ` It is currently ${response.body.main.temp} Fh out. There is a ${response.body.weather[0].description} So no any chance of rain.`
      );
    }
  });
};

module.exports = forecast;
*/