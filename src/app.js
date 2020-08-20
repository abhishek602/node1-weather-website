const path = require('path');
const express = require('express');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const request = require('request');
// const nodemon = require('nodemon');
const hbs = require('hbs');
const { isError } = require('util');

const app = express();

//1. define paths for express config.

const publicDirPath = path.join(__dirname, '../public');          //generating the path for public dir
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//2.setup handlebars engine and views locations

app.set('view engine', 'hbs')            // now hbs extension is being used in view engine for dynamic file
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//3. setup static directory to serve. 

app.use(express.static(publicDirPath));            // used by application  through static function for static file




app.get("", ( req, res )=> {
    
    res.render('index', {
        title: 'weather-app',
        name:'abhishek'
    })
})

app.get("/about", (req, res) => {

    res.render('about', {
        title: 'About ME',
        name: 'abhishek'
    })
})

app.get("/help", (req, res) => {

    res.render('help', {
        title: 'Find help here',
        name: 'Abhishek Kumar'
    })
})


                
app.get("/weather", (req, res) => {
    if (!req.query.address) {
      
      return  res.send({
            Error: 'You must provide a valid address!!'
        });
    }
     

    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
      // destructuring of object data
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
       
            return res.send({ error });

          }
          
          res.send({
              location: location,
              forecast: forecastData,
              address:req.query.address
        });
        
      });
    });


});







app.get('/help/*', (req, res) => {

    res.render('404page', {
        error: "Help artical not found",
        name: 'Abhishek Kumar',
        title:'404'
    })
})

app.get('*', (req, res) => {
    
    res.render('404page', {
        error: "Page not found",
        name: 'Abhishek Kumar',
        title:'404'

    })
})

app.listen(3000, () => {
    console.log('server is running'); 
});


























// app.get("/help", (req, res) => {
//     res.send([{
//       name: "abhishek"
//     }, {
//       name: 'nainsi'
//   }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page in detail</h1>");
// });