"use strict";

const dom = require('./dom');
// const apiKeys = require('./apiKeys');

let owmdbKey;
let zipCode;

const getWeather = (zipCode) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${owmdbKey}&units=imperial`).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};


const searchWeather = (zipCode) => {
	getWeather(zipCode).then((data) => {
		showResults(data);
	}).catch((error) => {
		console.log("error in searchWeather", error);
	});

};

const setKey = (apiKey) => {
	owmdbKey = apiKey;
	// getConfig();
};

const showResults = (weatherData) => {
	dom.clearDom();
	dom.domString(weatherData);
};





module.exports = {setKey, searchWeather};