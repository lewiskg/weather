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