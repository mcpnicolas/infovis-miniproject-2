function processData() {
	// load data
	let aiddata = store.aiddata
	// process data
	let countriesList = groupByCountryArray(aiddata)
	let purposesVolume = groupByPurpose(aiddata)
	let topPurposes = purposesVolume.slice(0,10)
	let yearlyPurposesPercent = groupByYearlyPercentages(topPurposes)
	let japanRecipients = groupByJapanRecipients(aiddata)
	console.log("All countries with yearly net amounts: ",countriesList)
	console.log("Top 10 purposes with yearly donations: ",topPurposes)
	console.log("All recipients from Japan with yearly donations: ",japanRecipients)
	// load configs
	let config1 = getVis1ChartConfig()
	let config2 = getVis2ChartConfig()
	let config3 = getVis3ChartConfig()

	drawVis2Chart(yearlyPurposesPercent, config2)
}

loadData().then(processData);