
const eventManager = (() => {

  const _data = await fetch("./countryCode.json");
	const _responseJS = await JSON.parse(_data);

	async function _getCountryFromCode (countryCode) {
		const countryName = _responseJS.find(function (item, index, array) {
		  if (countryCode.toUpperCase() === item.code) return true;
		});
		return countryName;
	}

	function setup () {

	}
	return {
		setup
	};
})();

export { eventManager };
