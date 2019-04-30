function drawLegendVis2Chart(config, colorScale) {
	let {container, margin, height, width} = config;
	let xLegend = 1.5*margin.left
	let yLegend = 0

	let legend = container.append("g")
		.attr("class", "legend")

	legend.append("circle")
		.attr("cx", xLegend+10)
		.attr("cy", yLegend+11)
		.attr("r", 5)
		.attr("fill", colorScale(9))

	legend.append("text")
		.attr("x", xLegend+20)
		.attr("y", yLegend+15)
		.text("Sectors not specified")

	legend.append("circle")
		.attr("cx", xLegend+10)
		.attr("cy", yLegend+30)
		.attr("r", 5)
		.attr("fill", colorScale(8))

	legend.append("text")
		.attr("x", xLegend+20)
		.attr("y", yLegend+35)
		.text("Power generation & renewable sources")

	legend.append("circle")
		.attr("cx", xLegend+10)
		.attr("cy", yLegend+50)
		.attr("r", 5)
		.attr("fill", colorScale(7))

	legend.append("text")
		.attr("x", xLegend+20)
		.attr("y", yLegend+55)
		.text("Telecommunications")

	legend.append("circle")
		.attr("cx", xLegend+10)
		.attr("cy", yLegend+70)
		.attr("r", 5)
		.attr("fill", colorScale(6))

	legend.append("text")
		.attr("x", xLegend+20)
		.attr("y", yLegend+75)
		.text("Social welfare services")
	
	legend.append("circle")
		.attr("cx", xLegend+10)
		.attr("cy", yLegend+90)
		.attr("r", 5)
		.attr("fill", colorScale(5))

	legend.append("text")
		.attr("x", xLegend+20)
		.attr("y", yLegend+95)
		.text("Import support (capital goods)")
	
		legend.append("circle")
		.attr("cx", 4*xLegend)
		.attr("cy", yLegend+11)
		.attr("r", 5)
		.attr("fill", colorScale(4))

	legend.append("text")
		.attr("x", 4*xLegend+10)
		.attr("y", yLegend+15)
		.text("Power generation & non-renewable sources")

	legend.append("circle")
		.attr("cx", 4*xLegend)
		.attr("cy", yLegend+30)
		.attr("r", 5)
		.attr("fill", colorScale(3))

	legend.append("text")
		.attr("x", 4*xLegend+10)
		.attr("y", yLegend+35)
		.text("Rescheduling & refinancing")

	legend.append("circle")
		.attr("cx", 4*xLegend)
		.attr("cy", yLegend+50)
		.attr("r", 5)
		.attr("fill", colorScale(2))

	legend.append("text")
		.attr("x", 4*xLegend+10)
		.attr("y", yLegend+55)
		.text("Industrial development")

	legend.append("circle")
		.attr("cx", 4*xLegend)
		.attr("cy", yLegend+70)
		.attr("r", 5)
		.attr("fill", colorScale(1))

	legend.append("text")
		.attr("x", 4*xLegend+10)
		.attr("y", yLegend+75)
		.text("Rail transport")
	
	legend.append("circle")
		.attr("cx", 4*xLegend)
		.attr("cy", yLegend+90)
		.attr("r", 5)
		.attr("fill", colorScale(0))

	legend.append("text")
		.attr("x", 4*xLegend+10)
		.attr("y", yLegend+95)
		.text("Air transport")
}

function drawVis2Chart(purposes, config) {
	let { margin, width, height, bodyWidth, bodyHeight, container } = config
	let formatPercent = d3.format(".0%")

	let xScale = d3.scaleTime()
		.domain([new Date(1973,0,1), new Date(2013,0,1)])
		.range([0,bodyWidth])

	let yScale = d3.scaleLinear()
		.range([bodyHeight,0])

	let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")).ticks(10).tickSize(-(height-margin.bottom-margin.top))
	container.append("g")
		.style("transform", `translate(${margin.left}px,${margin.top+bodyHeight+5}px)`)
		.call(xAxis)
		.attr("class", "axis-bottom")
	
	let yAxis = d3.axisLeft(yScale).tickFormat(formatPercent)
	container.append("g")
		.style("transform", `translate(${margin.left}px,${margin.top}px)`)
		.call(yAxis)
		.attr("class", "axis-left")

	let colorScale = d3.scaleOrdinal()
		.domain([new Array(10).keys()])
		//.range(["#F08C66","#763D39","#7D4658","#715875","#546C87","#327E86","#368C73","#609458","#929743","#C69346"])
		//.range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a'])
		.range(['#cab2d6','#ff7f00','#fdbf6f','#e31a1c','#fb9a99','#a6d96a','#1a9850','#1f78b4','#a6cee3','#6a3d9a'])

	let stack = d3.stack()
		.keys(["Air transport",
					"Rail transport",
					"Industrial development",
					"Rescheduling & refinancing",
					"Power generation & non-renewable sources",
					"Import support (capital goods)",
					"Social welfare services",
					"Telecommunications",
					"Power generation & renewable sources",
					"Sectors not specified"])
		.order(d3.stackOrderNone)
		.offset(d3.stackOffsetNone)

	let yearSeries = stack(purposes)
	//console.log(yearSeries)

	let area = d3.area()
		//.x(function(d) { return xScale(d.data.year); })
		.x(function(d) { return xScale(new Date(d.data.year,0,1)); })
		.y0(function(d) { return yScale(d[0]); })
		.y1(function(d) { return yScale(d[1]); });

	let g = container.append("g")
		.attr("transform",`translate(${margin.left},${margin.top})`)

	let purpose = g.selectAll(".purpose")
		.data(yearSeries)
		.enter()
		.append("g")
		.attr("class","purpose")
	
	purpose.append("path")
		.attr("class","area")
		.attr("d",area)
		.style("fill",function(d,i) {
			return colorScale(i)
		})
		.style("opacity","0.9")
	
	container.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", margin.top-(bodyHeight))
		.attr("y", 0.25*margin.left)
		.style("text-anchor", "middle")
		.text("Percent of all donations from top 10 purposes")   	
	
	drawLegendVis2Chart(config, colorScale)
}