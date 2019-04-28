function drawVis1Chart(countries, config) {
  let { margin, bodyWidth, bodyHeight, width, height, container } = config
  let step = bodyHeight/countries.length
  let overlap = 7

  let max = Number.MIN_SAFE_INTEGER
  for (c in countries) {
    for (y in countries[c].YearlyNetAmounts) {
      if (Math.abs(countries[c].YearlyNetAmounts[y].Amount)>max) {
        max = Math.abs(countries[c].YearlyNetAmounts[y].Amount)
      }
    }
  }
  //console.log(max)

  countryYears = countries.map(function(c) {
    return c.YearlyNetAmounts
  })
  console.log(countryYears)
  
  let colorScale = d3.scaleSqrt()
		.domain([-overlap,0,overlap])
		.range(["#C76E53","#ffffff","#737E16"])
		.interpolate(d3.interpolateHcl)

  let xScale = d3.scaleTime()
		.domain([new Date(1973,0,1), new Date(2013,0,1)])
    .range([0,bodyWidth])
    
  let yScale = d3.scaleSqrt()
    .domain([-max, +max])
    .range([overlap * step, -overlap * step])

  let yCountryScale = d3.scaleBand()
    .domain(countries.map(c => c.Country))
    .range([0, bodyHeight])

  let area = d3.area()
    .x((d) => xScale(new Date(parseInt(d.Year),0,1)))
    .y0(0)
    .y1(d => yScale(d.Amount))

  let body = container.append("g")
    .style("transform", `translate(${margin.left}px,${margin.top}px)`)

  let country = body.selectAll("g")
    .data(countryYears)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0,${i * (step) + margin.top})`)

  country.append("clipPath")
    .attr("id",(d, i) => "horizon_clip_" + i.toString()) // horizon_clip_0
    .append("rect")
    .attr("width", bodyWidth)
    .attr("height", step)

  country.append("defs").append("path")
    .attr("id",(d, i) => "horizon_path_" + i.toString())
    .attr("class","area")
    .attr("d", area)

  country.append("g")
    .attr("clip-path",(d, i) => "url(#horizon_clip_" + i.toString() + ")")
    .selectAll("use")
    .data(d => Array.from(
      {length: overlap * 2}, 
      (_, i) => Object.assign({index: i < overlap ? -i - 1 : i - overlap}, d)
    ))
    .enter().append("use")
    .attr("href",function(d, i) { // needs to return index of country
      let cIndex = this.parentNode.getAttribute("clip-path").slice(18,-1)
      return "#horizon_path_" + cIndex.toString()
    })
    .attr("fill", d => colorScale(d.index))
    .attr("transform", d => d.index < 0
        ? `scale(1,-1) translate(0,${d.index * step})`
        : `translate(0,${(d.index + 1) * step})`)

  let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")).ticks(10).tickSize(-(bodyHeight+5))
  container.append("g")
    .style("transform", `translate(${margin.left}px,${bodyHeight+margin.top+15}px)`)
    .call(xAxis)
    .attr("class", "axis-bottom")

  let yAxis = d3.axisLeft(yCountryScale).tickSize(-(bodyWidth-1))
	container.append("g")
		.style("transform", `translate(${margin.left+1}px,${margin.top+3.25}px)`)
		.call(yAxis)
		.attr("class", "axis-left")


}