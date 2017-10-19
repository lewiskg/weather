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