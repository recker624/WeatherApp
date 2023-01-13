const dynamicRenderer = (() =>
{
	function render ()
	{

	}

	return {
		render
	};
})();

// ===========================
const staticRenderer = (() =>
{
	function render ()
	{
		const btn = `
      <button id="button">Click me!</button>
    `;
		const body = document.querySelector("body");
		body.insertAdjacentHTML("afterbegin", btn);
	}
	return {
		render
	};
})();

export { staticRenderer, dynamicRenderer };
