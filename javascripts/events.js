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
			owmdb.searchWeather(cityZip,1);
		}
	});
};

$('#button-search').on('click', function(e) {
	e.preventDefault();
	let cityZip = getInput();
	owmdb.searchWeather(cityZip,1);
});


// add event listeners to dynamically created buttons
$(document).on('click', '#3-days', function(e) { 
	e.preventDefault();
	let cityZip = getInput();
	owmdb.searchWeather(cityZip,3);
});

$(document).on('click', '#5-days', function(e) { 
	e.preventDefault();
	let cityZip = getInput();
	owmdb.searchWeather(cityZip,7);
});


module.exports = {pressEnter};