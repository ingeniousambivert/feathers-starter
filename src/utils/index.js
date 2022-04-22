function dateWithMonthsDelay(months) {
	const date = new Date();
	date.setMonth(date.getMonth() + months);
	return date;
}

function serializeQueryString(obj, prefix) {
	const str = [];
	let key;
	for (key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			let holdOne = prefix ? prefix + "[" + key + "]" : key;
			let holdTwo = obj[key];
			str.push(
				holdTwo !== null && typeof holdTwo === "object"
					? serializeQueryString(holdTwo, holdOne)
					: encodeURIComponent(holdOne) + "=" + encodeURIComponent(holdTwo)
			);
		}
	}
	return str.join("&");
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

module.exports = {
	dateWithMonthsDelay,
	serializeQueryString,
	asyncForEach,
};
