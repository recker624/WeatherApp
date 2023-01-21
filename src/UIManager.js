import countryData from "./data/countryCode.json";

const getCountryNames = (() =>
{
	try
	{
		// const _countryData = JSON.parse(countryData);

		function getCountryFromCode (countryCode)
		{
		// eslint-disable-next-line array-callback-return
			const countryName = countryData.find(function (item, index, array)
			{
				if (countryCode.toUpperCase() === item.code) return true;
			});
			return countryName.name;
		}
		return {
			getCountryFromCode
		};
	}
	catch (error)
	{
		console.log(error.message);
	}
})();

const dynamicRenderer = (() =>
{
	function createWeeklyWeatherData ()
	{
		const weatherData = `
    <div class="weeklyWeather">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Max</th>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            <th scope="row">Min</th>
            <td>5</td>
            <td>4</td>
            <td>3</td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
		const subContainer2 = document.querySelector(".subContainer-2");
		subContainer2.insertAdjacentHTML("afterbegin", weatherData);
	}

	function createCurrentWeatherData (currentWeatherData)
	{
		const weatherData = `
    <div class="currentWeather col-lg-4 ">
      <div class="temp&Feel row">
        <div class="col">Temperature</div>
        <div class="col">Feels Like</div>
      </div>

      <div class="row location">
        <div class="col place">City</div>
        <div class="col country">Country</div>
      </div>

      <div class="additionalInfo row">
        <table class="table col">
          <tbody>
            <tr>
              <td>Humidity</td>
              <td>30%</td>
            </tr>
            <tr>
              <td>Rain chance</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>Wind speed</td>
              <td>10km/h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;
		const subContainer1 = document.querySelector(".subContainer-1");
		subContainer1.insertAdjacentHTML("beforeend", weatherData);
	}

	function displayAvailableLocations (cityAndCountry)
	{
		// available locations is array of (city, country)
		const locationsContainer = document.createElement("div");
		locationsContainer.classList.add("list-group");
		locationsContainer.id = "locationsContainer";
		cityAndCountry.forEach((element, index) =>
		{
			const location = document.createElement("button");
			location.classList.add("list-group-item", "list-group-item-action");
			location.id = "location_" + index.toString();

			// get country name from country code
			const countryName = getCountryNames.getCountryFromCode(element[1]);

			location.innerText = `${element[0]}, ${countryName}`;
			locationsContainer.append(location);
		});
		const inputBox = document.querySelector(".searchBar .inputBox");
		inputBox.append(locationsContainer);
	}

	function removeAvailableLocations ()
	{
		const locationsContainer = document.getElementById("locationsContainer");
		if (locationsContainer != null)
		{
			document.getElementById("locationsContainer").remove();
		}
	}

	return {
		createWeeklyWeatherData,
		createCurrentWeatherData,
		displayAvailableLocations,
		removeAvailableLocations
	};
})();

//= ==================================================================
//= ==================================================================

const staticRenderer = (() =>
{
	function _createNavbar ()
	{
		const navbar = `
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand text-white" href="#">Weatherly</a>
          </div>
        </div>
      </nav>
    `;

		return navbar;
	}

	function _createSearchBar ()
	{
		const searchBar = `
		<div class="searchBar col-lg-6 align-self-center row">
      <div class="inputBox  col-6"> 
		    <input type="text" class="searchLocation w-100" placeholder="Search Location" id="searchLocation" value="New Delhi">
      </div>
      <div class="col-6"> 
		    <button class="btn btn-primary w-50" id="searchLocationBtn">Search</button>
      </div>
		</div>
		`;
		return searchBar;
	}

	function setup ()
	{
		const navbar = _createNavbar();
		const searchBar = _createSearchBar();

		const mainContainer = document.createElement("div");
		mainContainer.classList.add("mainContainer", "container-lg");
		mainContainer.id = "mainContainer";

		const subContainer1 = document.createElement("div");
		subContainer1.classList.add("subContainer-1", "row", "mt-5");

		const subContainer2 = document.createElement("div");
		subContainer2.classList.add("subContainer-2", "mt-5");

		mainContainer.append(subContainer1, subContainer2);

		subContainer1.insertAdjacentHTML("afterbegin", "<div class='col-lg-1'></div>");
		subContainer1.insertAdjacentHTML("afterbegin", searchBar);

		document.querySelector("body").insertAdjacentHTML("afterbegin", navbar);
		document.querySelector("body").append(mainContainer);
	}

	return {
		setup
	};
})();

export { dynamicRenderer, staticRenderer };
