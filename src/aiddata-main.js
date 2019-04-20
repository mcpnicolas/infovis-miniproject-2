function processData() {
	let aiddata = store.aiddata
	let countriesList = groupByCountryArray(aiddata)
	let purposes = groupByPurpose(aiddata)
	let topPurposes = purposes.slice(0,10)
	let japanRecipients = groupByJapanRecipients(aiddata)
	console.log("All countries with yearly net amounts: ",countriesList)
	console.log("Top 10 purposes with yearly donations: ",topPurposes)
	console.log("All recipients from Japan with yearly donations: ",japanRecipients)
}

loadData().then(processData);