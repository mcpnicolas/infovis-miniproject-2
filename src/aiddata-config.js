function getVis1ChartConfig() {
	let width = 730;
	let height = 500;
	let margin = {
		top: 10,
		bottom: 20,
		left: 110,
		right: 10
	}
	let bodyHeight = height - margin.top - margin.bottom
	let bodyWidth = width - margin.left - margin.right

	let container = d3.select("#Vis1Chart")
	
	container
		.attr("width", width)
		.attr("height", height)

	return { width, height, margin, bodyHeight, bodyWidth, container }
}

function getVis2ChartConfig() {
	let width = 800;
	let height = 620;
	let margin = {
		top: 120,
		bottom: 40,
		left: 70,
		right: 10
	}
	let bodyHeight = height - margin.top - margin.bottom
	let bodyWidth = width - margin.left - margin.right

	let container = d3.select("#Vis2Chart")
	
	container
		.attr("width", width)
		.attr("height", height)

	return { width, height, margin, bodyHeight, bodyWidth, container }
}

function getVis3ChartConfig() {
	let width = 730;
	let height = 500;
	let margin = {
		top: 10,
		bottom: 20,
		left: 110,
		right: 10
	}
	let bodyHeight = height - margin.top - margin.bottom
	let bodyWidth = width - margin.left - margin.right

	let container = d3.select("#Vis3Chart")
	
	container
		.attr("width", width)
		.attr("height", height)

	return { width, height, margin, bodyHeight, bodyWidth, container }
}