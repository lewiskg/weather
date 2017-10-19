(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const owmdb = require('./owmdb');

const apiKeys = () => {

	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		owmdb.setKey(results.owmdb.apiKey);
	}).catch((error) => {
		console.log("error in retrieve keys", error);
	});
};

module.exports = {retrieveKeys};
},{"./owmdb":5}],2:[function(require,module,exports){
"use strict";

const clearDom = () => {
	$("#weather-holder").empty("");
	$("#search-field").val("");
};

const domString = (currentWeatherData) => {
	let domStrang = "";

		console.log(Object.keys(currentWeatherData));
		console.log(currentWeatherData.main.temp);

		domStrang += `<div class="current col-sm-12 col-md-12">`;
		domStrang += 	`<p>Temperature: ${currentWeatherData.main.temp}</p>`;
		domStrang += 	`<p>Current Conditions: ${currentWeatherData.weather.description}</p>`;
		domStrang += 	`<p>Wind direciton: ${currentWeatherData.wind.deg}, Wind speed: ${currentWeatherData.wind.speed}</p>`;
		domStrang += `</div>`;

		// for (let i = 0; i < movieArray.length; i++) {
		// if (i % 3 === 0) {
		// 	domStrang += `<div class="row">`;
		// }
		// domStrang +=  `<div class="col-sm-6 col-md-4">`;
		// domStrang +=    `<div class="thumbnail">`;
		// domStrang +=     `<img src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}" alt="">`;
		// domStrang +=      `<div class="caption">`;
		// domStrang +=        `<h3>${movieArray[i].original_title}</h3>`;
		// domStrang += 		`<p>${movieArray[i].overview}</p>`;
		// domStrang +=        `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Watch List</a></p>`;
		// domStrang +=      `</div>`;
		// domStrang +=    `</div>`;
		// domStrang +=  `</div>`;
		// if (i % 3 === 2 || i === movieArray.length -1 ) {
		// 	domStrang += `</div>`;
		// }

	// }
	printToDom(domStrang);
};


const printToDom = (strang) => {
	$("#weather-holder").append(strang);

};

module.exports = {clearDom, domString};
},{}],3:[function(require,module,exports){
"use strict";

let owmdb = require('./owmdb');

const getInput = () => {
	let inputZip = $('#search-field').val();
	if (inputZip.length === 5 && $.isNumeric(inputZip)) {
		return inputZip;
	} else {
		console.log('in getInput: input the correct stuff');
	}
};

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			let cityZip = getInput();
			owmdb.searchWeather(cityZip);
		}
	});
};

$('#button-search').on('click', function(e) {
	e.preventDefault();
	let cityZip = getInput();
	owmdb.searchWeather(cityZip);
});

module.exports = pressEnter;
},{"./owmdb":5}],4:[function(require,module,exports){
"use strict";

let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();
events();

},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
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
},{"./dom":2}]},{},[4]);
