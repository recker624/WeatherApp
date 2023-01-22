import countryData from "./data/countryCode.json";
import { apiManager } from "./APIManager";

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
	function _getDays (weeklyWeatherData)
	{
		const weeklyWeatherDataList = weeklyWeatherData.list;
		const currentDay = new Date();
		currentDay.setDate(currentDay.getDate() + 1);

		let currentDayDate = ("0" + currentDay.getDate()).slice(-2);
		let currentDayMonth = ("0" + (currentDay.getMonth() + 1)).slice(-2);
		let currentDayYear = currentDay.getFullYear();

		let dateText = `${currentDayYear}-${currentDayMonth}-${currentDayDate} 00:00:00`;

		const weeklyWeatherDataArr = [];

		weeklyWeatherDataList.forEach(listItem =>
		{
			if (listItem.dt_txt === dateText)
			{
				weeklyWeatherDataArr.push(listItem);
				currentDay.setDate(currentDay.getDate() + 1);

				currentDayDate = ("0" + currentDay.getDate()).slice(-2);
				currentDayMonth = ("0" + (currentDay.getMonth() + 1)).slice(-2);
				currentDayYear = currentDay.getFullYear();

				dateText = `${currentDayYear}-${currentDayMonth}-${currentDayDate} 00:00:00`;
			}
		});

		return weeklyWeatherDataArr;
	}

	function showWeeklyWeatherData (weeklyWeatherData)
	{
		// weeklyWeatherData contains weather forcast every 3 hours so we filter it to get
		// data for any one time instance on a particular day
		const _dailyWeatherData = _getDays(weeklyWeatherData);
		const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		if (_dailyWeatherData.length !== 0)
		{
			const weatherData = `
    <div class="weeklyWeather" id="weeklyWeather">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">${dayOfWeek[new Date(_dailyWeatherData[0].dt_txt.split(" ")[0]).getDay()]}</th>
            <th scope="col">${dayOfWeek[new Date(_dailyWeatherData[1].dt_txt.split(" ")[0]).getDay()]}</th>
            <th scope="col">${dayOfWeek[new Date(_dailyWeatherData[2].dt_txt.split(" ")[0]).getDay()]}</th>
            <th scope="col">${dayOfWeek[new Date(_dailyWeatherData[3].dt_txt.split(" ")[0]).getDay()]}</th>
            <th scope="col">${dayOfWeek[new Date(_dailyWeatherData[4].dt_txt.split(" ")[0]).getDay()]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Max</th>
            <td>${_dailyWeatherData[0].main.temp_max}</td>
            <td>${_dailyWeatherData[1].main.temp_max}</td>
            <td>${_dailyWeatherData[2].main.temp_max}</td>
            <td>${_dailyWeatherData[3].main.temp_max}</td>
            <td>${_dailyWeatherData[4].main.temp_max}</td>
          </tr>
          <tr>
            <th scope="row">Min</th>
            <td>${_dailyWeatherData[0].main.temp_min}</td>
            <td>${_dailyWeatherData[1].main.temp_min}</td>
            <td>${_dailyWeatherData[2].main.temp_min}</td>
            <td>${_dailyWeatherData[3].main.temp_min}</td>
            <td>${_dailyWeatherData[4].main.temp_min}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td><img src="${"http://openweathermap.org/img/w/" + _dailyWeatherData[0].weather[0].icon + ".png"}"></td>
            <td><img src="${"http://openweathermap.org/img/w/" + _dailyWeatherData[1].weather[0].icon + ".png"}"></td>
            <td><img src="${"http://openweathermap.org/img/w/" + _dailyWeatherData[2].weather[0].icon + ".png"}"></td>
            <td><img src="${"http://openweathermap.org/img/w/" + _dailyWeatherData[3].weather[0].icon + ".png"}"></td>
            <td><img src="${"http://openweathermap.org/img/w/" + _dailyWeatherData[4].weather[0].icon + ".png"}"></td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
			const subContainer2 = document.querySelector(".subContainer-2");
			subContainer2.insertAdjacentHTML("afterbegin", weatherData);
		}
	}

	function showCurrentWeatherData (currentWeatherData, locationName)
	{
		const weatherData = `
    <div class="currentWeather col-lg-4 " id ="currentWeather">
      <div class="temp&Feel row">
        <div class="col">Feels like : ${currentWeatherData.main.temp}</div>
        <div class="col">${currentWeatherData.weather[0].description}</div>
      </div>

      <div class="row location">
        <div class="col city" id="city">${locationName.split(",")[0].trim()}</div>
        <div class="col country" id="country">${locationName.split(",")[1].trim()}</div>
      </div>

      <div class="additionalInfo row">
        <table class="table col">
          <tbody>
            <tr>
              <td>Humidity</td>
              <td>${currentWeatherData.main.humidity}</td>
            </tr>
            <tr>
              <td>Cloudiness</td>
              <td>${currentWeatherData.clouds.all}%</td>
            </tr>
            <tr>
              <td>Wind speed</td>
              <td>${currentWeatherData.wind.speed} km/h</td>
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
		locationsContainer.classList.add("list-group", "position-absolute");
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

	function removeCurrentWeatherInfo ()
	{
		document.getElementById("currentWeather").remove();
	}

	function removeWeeklyWeatherInfo ()
	{
		document.getElementById("weeklyWeather").remove();
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
		showWeeklyWeatherData,
		showCurrentWeatherData,
		displayAvailableLocations,
		removeAvailableLocations,
		removeCurrentWeatherInfo,
		removeWeeklyWeatherInfo
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
      <div class="inputBox  col-6" position-relative> 
		    <input type="text" class="searchLocation w-100" placeholder="Search Location" id="searchLocation" value="New Delhi">
      </div>
      <div class="col-6"> 
		    <button class="btn btn-primary w-50" id="searchLocationBtn">Search</button>
      </div>
		</div>
		`;
		return searchBar;
	}

	async function _homePage ()
	{
		const lat = 28.6139; const lon = 77.209;
		const locationName = "New Delhi, India";
		const currentWeatherInfo = await apiManager.getCurrentWeatherInfo(lat, lon);
		const weeklyWeatherInfo = await apiManager.getWeeklyWeatherInfo(lat, lon);
		dynamicRenderer.showCurrentWeatherData(currentWeatherInfo, locationName);
		dynamicRenderer.showWeeklyWeatherData(weeklyWeatherInfo);
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

		_homePage();
	}

	return {
		setup
	};
})();

export { dynamicRenderer, staticRenderer };
