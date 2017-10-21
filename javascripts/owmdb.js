"use strict";

const dom = require('./dom');

let owmdbKey;
let zipCode;

const getWeather = (zipCode, days) => {
	let apiCall = whichApiCall(zipCode, days);
	return new Promise((resolve, reject) => {
		$.ajax(apiCall).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const whichApiCall = (zipCode, days) => {
	let apiCall;
	switch(days) {
    case 1:
        apiCall = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${owmdbKey}&units=imperial`;
        break;
    case 3:
        apiCall = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&APPID=${owmdbKey}&units=imperial`;
        break;
    case 7:
        apiCall = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&APPID=${owmdbKey}&units=imperial`;
        break;
    default:
        apiCall = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${owmdbKey}&units=imperial`;
        break;
    }
    return apiCall;
};


const searchWeather = (zipCode, days) => {
	getWeather(zipCode, days).then((data) => {
		showResults(data, days);
	}).catch((error) => {
		console.log("error in searchWeather", error);
	});

};

const setKey = (apiKey) => {
	owmdbKey = apiKey;
	// getConfig();
};

const showResults = (weatherData, days) => {
	dom.clearDom();
	dom.domString(weatherData, days);
};

module.exports = {setKey, searchWeather};