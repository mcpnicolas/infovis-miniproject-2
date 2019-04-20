let store = {}

function loadData() {
	return Promise.all([
		d3.csv("aiddata-countries-only.csv"),
	]).then(datasets => {
		store.aiddata = datasets[0]
		console.log("Loaded AidData dataset")
		return store;
	})
}

function groupByCountryArray(data) {
	let result = data.reduce((result, d) => {
		let currentDonor = result[d.donor] || {
			"Country": d.donor,
			"YearlyNetAmounts": {}
		}
		if (!currentDonor.YearlyNetAmounts[d.year]) {
			currentDonor.YearlyNetAmounts[d.year] = {
				"Year": d.year,
				"Amount": 0
			}
		}
		currentDonor.YearlyNetAmounts[d.year].Amount -= parseInt(d.commitment_amount_usd_constant)
		result[d.donor] = currentDonor

		let currentRecipient = result[d.recipient] || {
			"Country": d.recipient,
			"YearlyNetAmounts": {}
		}
		if (!currentRecipient.YearlyNetAmounts[d.year]) {
			currentRecipient.YearlyNetAmounts[d.year] = {
				"Year": d.year,
				"Amount": 0
			}
		}
		currentRecipient.YearlyNetAmounts[d.year].Amount += parseInt(d.commitment_amount_usd_constant)
		result[d.recipient] = currentRecipient
	
	return result;
	},{})

	// Convert to array
	result = Object.keys(result).map(key => result[key])
	result.sort((a, b) => {
		return d3.ascending(a.Country, b.Country) // sorting by country name
	})
  	return result
}

function groupByPurpose(data) {
	let result = data.reduce((result, d) => {
		let currentPurpose = result[d.coalesced_purpose_name] || {
			"Purpose": d.coalesced_purpose_name,
			"TotalAmount": 0,
			"YearlyDonations": {}
		}
		if (!currentPurpose.YearlyDonations[d.year]) {
			currentPurpose.YearlyDonations[d.year] = {
				"Year": d.year,
				"Amount": 0
			}
		}
		currentPurpose.YearlyDonations[d.year].Amount += parseInt(d.commitment_amount_usd_constant)
		currentPurpose.TotalAmount += parseInt(d.commitment_amount_usd_constant)
		result[d.coalesced_purpose_name] = currentPurpose
		return result
	},{})

	// Convert to array
	result = Object.keys(result).map(key => result[key])
	result.sort((a, b) => {
		return d3.descending(a.TotalAmount,b.TotalAmount)
	})
  return result
}

function groupByJapanRecipients(data) {
	let result = data.reduce((result, d) => {
		let currentCountry = result[d.recipient] || {
			"Country": d.recipient,
			"TotalAmount": 0,
			"YearlyDonations": {}
		}
		if (!currentCountry.YearlyDonations[d.year]) {
			currentCountry.YearlyDonations[d.year] = {
				"Year": d.year,
				"Amount": 0
			}
		}
		currentCountry.YearlyDonations[d.year].Amount += parseInt(d.commitment_amount_usd_constant)
		currentCountry.TotalAmount += parseInt(d.commitment_amount_usd_constant)
		if (d.donor == "Japan") { // Only add to map if donation is from Japan
			result[d.recipient] = currentCountry
		}
		return result
	},{})

	// Convert to array
	result = Object.keys(result).map(key => result[key])
	result.sort((a, b) => {
		return d3.descending(a.TotalAmount,b.TotalAmount)
	})
  return result
}