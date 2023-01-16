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

		return weatherData;
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

		return weatherData;
	}

	function createAvailableLocations (weeklyWeatherData)
	{

	}

	return {
		createWeeklyWeatherData,
		createCurrentWeatherData,
		createAvailableLocations
	};
})();

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
		<div class="searchBar col-lg-6 align-self-center">
		  <input type="text" class="searchLocation col-6" placeholder="Search Location" >
		  <button class="btn btn-primary col-4">Search</button>
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

		const subContainer1 = document.createElement("div");
		subContainer1.classList.add("subContainer-1", "row", "mt-5");

		const subContainer2 = document.createElement("div");
		subContainer2.classList.add("subContainer-2", "mt-5");

		mainContainer.append(subContainer1, subContainer2);

		subContainer1.insertAdjacentHTML("afterbegin", "<div class='col-lg-1'></div>");
		subContainer1.insertAdjacentHTML("afterbegin", searchBar);
		//= =============================================================
		subContainer1.insertAdjacentHTML("beforeend", dynamicRenderer.createCurrentWeatherData());
		subContainer2.insertAdjacentHTML("afterbegin", dynamicRenderer.createWeeklyWeatherData());

		document.querySelector("body").insertAdjacentHTML("afterbegin", navbar);
		document.querySelector("body").append(mainContainer);
	}

	return {
		setup
	};
})();

export { dynamicRenderer, staticRenderer };
