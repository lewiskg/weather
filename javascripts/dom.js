"use strict";

let events = require('./events');

let moment = require('../lib/node_modules/moment/moment.js');

const clearDom = () => {
	$("#weather-holder").empty("");
};

const domString = (currentWeatherData, days) => {
	let domStrang = "";

	switch(days) {
    case 1:
		let daTe = moment(currentWeatherData.dt*1000).format("dddd, DD MMM YYYY hh:mm a");
	    domStrang += `<div id="forcast-current" class="current col-sm-12 col-md-12 text-center">`;
		domStrang += 	`<p><span class="bold-text">Date:</span> ${daTe}</p>`;
		domStrang += 	`<p><span class="bold-text">Temperature:</span> ${currentWeatherData.main.temp}</p>`;
		domStrang += 	`<p><span class="bold-text">Current Conditions:</span> ${currentWeatherData.weather[0].description}</p>`;
		domStrang += 	`<p><span class="bold-text">Wind direciton:</span> ${currentWeatherData.wind.deg}, Wind speed: ${currentWeatherData.wind.speed}</p>`;
		domStrang +=	`<p><a id="3-days" href="#" class="btn btn-primary" role="button">3-Day Forcast</a> <a id="5-days" href="#" class="btn btn-default" role="button">5-Day Forcast</a></p>`;
		domStrang += `</div>`;
        break;
    case 3:
		let weatherArray = currentWeatherData.list;
		for (let i = 8; i < 32; i=i+8) { 
	        domStrang += `<div id="forcast-3days" class="forcast col-sm-3 col-md-3">`;
			let daTe = moment(weatherArray[i].dt*1000).format("dddd, DD MMM YYYY hh:mm a");
			domStrang += 	`<p><span class="bold-text">Date:</span> ${daTe}</p>`;
			domStrang += 	`<p><span class="bold-text">Temperature:</span> ${weatherArray[i].main.temp}</p>`;
			domStrang += 	`<p><span class="bold-text">Current Conditions:</span> ${weatherArray[i].weather[0].description}</p>`;
			domStrang += 	`<p><span class="bold-text">Wind direciton:</span> ${weatherArray[i].description}, Wind speed: ${weatherArray[i].wind.speed}</p>`;
			domStrang += `</div>`;
		}
        break;
    case 7:
    	let weatherArray5 = currentWeatherData.list;
		for (let i = 0; i < 40; i=i+8) {
			let daTe = moment(weatherArray5[i].dt*1000).format("dddd, DD MMM YYYY hh:mm a");
	        domStrang += `<div id="forcast-5days" class="forcast col-sm-3 col-md-3">`;
			domStrang += 	`<p><span class="bold-text">Date:</span> ${daTe}</p>`; 
			domStrang += 	`<p><span class="bold-text">Temperature:</span> ${weatherArray5[i].main.temp}</p>`;
			domStrang += 	`<p><span class="bold-text">Current Conditions:</span> ${weatherArray5[i].weather[0].description}</p>`;
			domStrang += 	`<p><span class="bold-text">Wind direciton:</span> ${weatherArray5[i].wind.deg}, Wind speed: ${weatherArray5[i].wind.speed}</p>`;
			domStrang += `</div>`;
		}
        break;

    default:
        break;
    }
	printToDom(domStrang, days);
};

const printToDom = (strang, days) => { 
	if (days === 1) {
		if ($('#forcast-current')) {
			$('#forcast-current').remove();
		}
		if ($('.forcast')) {
			$('.forcast').remove();
		}
		$("main").append(strang);

	} else {
		if ($('.forcast')) {
			$('.forcast').remove();
		}
		$("main").append(strang);
	}
};

module.exports = {clearDom, domString};