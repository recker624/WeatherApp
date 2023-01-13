import countryData from "./countryCode.json";

const getCountryNames = (() =>
{
	try
	{
		// const _countryData = JSON.parse(countryData);

		async function getCountryFromCode (countryCode)
		{
		// eslint-disable-next-line array-callback-return
			const countryName = countryData.find(function (item, index, array)
			{
				if (countryCode.toUpperCase() === item.code) return true;
			});
			return countryName;
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

const eventManager = (() =>
{
	try
	{
		const _eventHandlers = new Map();
		/*
  STRUCTURE OF _eventHandlers:
  _eventHandlers = {
    elementID : {
        eventType_1 : [function_1, funciton_2, function_3, ... ], <-- Callback functions that will run when event eventType_1 is triggered on element with ID as elementID
        eventType_2 : [function_4, funciton_5, funciton_6, ... ],
        ...
      }
  }
  */

		function _eventDelegator (event)
		{
			// get all the event handlers on the current HTML element
			if (_eventHandlers.has(event.target.id))
			{
				const elementEventData = _eventHandlers.get(event.target.id);
				if (elementEventData.has(event.type))
				{
					const eventHandlerFunctions = elementEventData.get(event.type);
					eventHandlerFunctions.forEach((element, index, array) =>
					{
						element();
					});
				}
			}
		}

		function addEventHandler (elementID, eventType, callback)
		{
			if (_eventHandlers.has(elementID))
			{
				const elementEventData = _eventHandlers.get(elementID);
				if (elementEventData.has(eventType))
				{
					const eventHandlerFunctions = elementEventData.get(eventType);
					eventHandlerFunctions.push(callback);
					elementEventData.set(eventType, eventHandlerFunctions);
					_eventHandlers.set(elementID, elementEventData);
				}
				else
				{
					elementEventData.set(eventType, [callback]);
					_eventHandlers.set(elementID, elementEventData);
				}
			}
			else
			{
				const newElementEventData = new Map();
				newElementEventData.set(eventType, [callback]);
				_eventHandlers.set(elementID, newElementEventData);
			}
		}

		function setup ()
		{
			document.addEventListener("click", _eventDelegator);
		}

		return {
			setup,
			addEventHandler
		};
	}
	catch (error)
	{
		console.log(error.message);
	}
})();

export { eventManager };
