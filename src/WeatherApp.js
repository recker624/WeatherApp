"use strict";
import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";
import { eventManager } from "./EventManager";
import { staticRenderer } from "./UIManager";
import { apiManager } from "./APIManager";

//= =============================================================

staticRenderer.render();
eventManager.addEventHandler("button", "click", callbackFunc);
eventManager.setup();

function callbackFunc ()
{
	apiManager.getLocations("New Delhi").then(result =>
	{
		const locations = Object.values(result);
		for (let i = 0; i < locations.length; i++)
		{
			if (locations[i].country === "IN")
			{
				apiManager.getWeatherInfo(locations[i].lat, locations[i].lon)
					.then(result => console.log(result));
			}
		}
	});
}
