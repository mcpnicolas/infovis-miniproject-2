function drawAxesVis3Chart(xScale, yScale, config) {
    let { container, margin, height } = config

    let xAxis = d3.axisTop(xScale)
	container.append("g")
		.style("transform", `translate(${margin.left}px,${margin.top-5}px)`)
		.call(xAxis)
		.attr("class", "axis-top")
		.selectAll("text")
		.attr("transform", `rotate(-90)`)
		.attr("dy", "1.25em")
        .style("text-anchor", "start")
	
	let yAxis = d3.axisLeft(yScale)
	container.append("g")
		.style("transform", `translate(${margin.left}px,${margin.top}px)`)
		.call(yAxis)
		.attr("class", "axis-left")
}

function drawLegendVis3Chart(colorScale, config) {
    let {container, margin, height, width} = config;
	let xLegend = 20;
    let yLegend = 0;
    
    let legend = container.append("g")
        .attr("class", "legend")
    
    legend.append("text")
		.attr("x", xLegend)
		.attr("y", yLegend+12)
        .text("$ Amount donated by Japan")
        
    legend.append("rect")
		.attr("x", xLegend)
		.attr("y", yLegend+20)
		.attr("height", 15)
		.attr("width", 40)
		.attr("fill", colorScale(999999))

	legend.append("rect")
		.attr("x", xLegend+40)
		.attr("y", yLegend+20)
		.attr("height", 15)
		.attr("width", 40)
        .attr("fill", colorScale(1000001))
    
    legend.append("rect")
		.attr("x", xLegend+80)
		.attr("y", yLegend+20)
		.attr("height", 15)
		.attr("width", 40)
        .attr("fill", colorScale(10000001))

    legend.append("rect")
		.attr("x", xLegend+120)
		.attr("y", yLegend+20)
		.attr("height", 15)
		.attr("width", 40)
        .attr("fill", colorScale(100000001))
    
    legend.append("rect")
		.attr("x", xLegend+160)
		.attr("y", yLegend+20)
		.attr("height", 15)
		.attr("width", 40)
        .attr("fill", colorScale(1000000001))
    
    legend.append("text")
		.attr("x", xLegend-5)
		.attr("y", yLegend+50)
        .text("<1M")
        
    legend.append("text")
		.attr("x", xLegend+35)
		.attr("y", yLegend+50)
        .text("1M")
        
    legend.append("text")
		.attr("x", xLegend+70)
		.attr("y", yLegend+50)
        .text("10M")
        
    legend.append("text")
		.attr("x", xLegend+110)
		.attr("y", yLegend+50)
        .text("100M")
        
    legend.append("text")
		.attr("x", xLegend+155)
		.attr("y", yLegend+50)
        .text("1B")
        
    legend.append("text")
		.attr("x", xLegend+185)
		.attr("y", yLegend+50)
		.text(">1B")
}

function drawVis3Chart(recipients, config) {
    let { margin, width, height, bodyWidth, bodyHeight, container } = config
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER

    for (r in recipients) {
        let thisCountry = d3.values(recipients[r].YearlyDonations)
        let thisMin = d3.min(thisCountry, d => d.Amount)
        let thisMax = d3.max(thisCountry, d => d.Amount)
        if (thisMin < min) min = thisMin
        if (thisMax > max) max = thisMax
    }
    //console.log(min)
    //console.log(max)

    let colorScale = d3.scaleThreshold()
        .domain([1000000,10000000,100000000,1000000000]) // $1M, $10M, $100M, $1B 
        .range(["#D7D986","#B5BD64","#95A246","#77872B","#5B6C14"])
    
    let rows = recipients.length
    let cols = 41

    let matrix = new Array(rows)
    for (var i = 0; i < rows; i++) {
        matrix[i] = new Array(cols)
        for (var j = 0; j < cols; j++) {
            if (!recipients[i].YearlyDonations[j+1973]) {
                matrix[i][j] = "#e8e8e8"
            }
            else {
                let amt = recipients[i].YearlyDonations[j+1973].Amount
                matrix[i][j] = colorScale(amt)
            }
        }
    }

    let x = d3.scaleBand()
        .domain(d3.range(cols))
		.range([0, bodyWidth])
	
	let xScale = d3.scaleBand()
        .domain(Array.from({length:2013-1973+1},(v,k)=>k+1973))
        .range([0, bodyWidth])
    
	let y = d3.scaleBand()
		.domain(d3.range(rows))
		.range([0, bodyHeight])
    
	let yScale = d3.scaleBand()
		.domain(recipients.map(c => c.Country))
        .range([0, bodyHeight])
    
    let body = container.append("g")
        .style("transform", `translate(${margin.left}px,${margin.top}px)`)
        
    let row = body.selectAll(".row")
        .data(matrix)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { return "translate(0," + y(i) + ")" })
    
    row.selectAll(".cell")
        .data(function(d) { return d })
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("x", function(d, i) { return x(i) })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("stroke","#ffffff")
        .style("stroke-width", 0.1)
        .style("fill",function(d) { return d })

    drawAxesVis3Chart(xScale, yScale, config)
    drawLegendVis3Chart(colorScale, config)
}