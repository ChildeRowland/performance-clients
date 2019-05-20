// const startData = require('./data').startData;
// const endData = require('./data').endData;

const currentClientAndMarketers = require('./data').currentClientAndMarketers;
const projectedClientAndMarketers = require('./data').projectedClientAndMarketers;

const startData = objectFlip(currentClientAndMarketers);
const endData = objectFlip(projectedClientAndMarketers);


// veiw the clients with array of marketer names
function objectFlip(startObj) {

	const results = {};

	Object.keys(startObj).forEach((keyName) => {

		for (let i = 0; i < startObj[keyName].length; i++) {

			let clientName = startObj[keyName][i];

			if (!results[clientName]) {
				results[clientName] = [];
			}

			if (!results[clientName].includes(keyName)) {
				results[clientName].push(keyName);
			}

		}

	});

	return results;

};

// marketer keeps one or more clients
function marketerKeepsClients (s, e) {

	const results = {};

	// loop over the properties in the start data set
	Object.keys(s).forEach((name) => {

		s[name].forEach((clientName) => {

			if (e[name] && e[name].includes(clientName)) {

				// array of clients that match in both sets
				if (!results[name]) {
					results[name] = [];
				}

				results[name].push(clientName);
			}

		});

	});

	return results;

}

// marketer is getting one or more different clients
function marketerChangesClients (s, e) {

	const results = {};

	// loop over the properties in the start data set
	Object.keys(e).forEach((name) => {

		e[name].forEach((clientName) => {

			if (s[name] && !s[name].includes(clientName)) {

				// array of clients that only exit in the ending set
				if (!results[name]) {
					results[name] = [];
				}

				results[name].push(clientName);
			}

		});

	});

	return results;

}

// marketers with completely new clients
function marketersWithAllNewClients (s, e) {

	const results = [];

	Object.keys(s).forEach((sName) => {

		for (let i = 0; i < s[sName].length; i++) {

			let clientName = s[sName][i];

			if (e[sName] && e[sName].includes(clientName)) {
				return;
			}

		}

		results.push(sName);

	});

	return results;

};

// clients with completely new marketers
function clientsWithAllNewMarketers (s, e) {

	const result = [];

	const currentClientList = objectFlip(s);
	const projectedClientList = objectFlip(e);

	return marketersWithAllNewClients(currentClientList, projectedClientList);

}

// marketer is keeping a client, and can train a marketer to that client
function marketerCanTrainNewMarketer (s, e) {

	const results = [];
	const marketer_with_same_clients = marketerKeepsClients(s, e);
	const marketer_with_different_clients = marketerChangesClients(s, e);

	//Object.keys(marketer_with_different_clients).forEach((traineeMarketerName) => {
	Object.keys(marketer_with_same_clients).forEach((trainingMarketerName) => {

		const mapObj = {};

		// marketer_with_different_clients[traineeMarketerName].forEach((clientName) => {
		marketer_with_same_clients[trainingMarketerName].forEach((clientName) => {

			// Object.keys(marketer_with_same_clients).forEach((trainingMarketerName) => {
			Object.keys(marketer_with_different_clients).forEach((traineeMarketerName) => {

				// if (marketer_with_same_clients[trainingMarketerName].includes(clientName)) {
				if (marketer_with_different_clients[traineeMarketerName].includes(clientName)) {

					if (!mapObj.trainer) {
						mapObj.trainer = trainingMarketerName;
						mapObj.trainees = [];
						mapObj.clientName = clientName;
					}

					mapObj.trainees.push(traineeMarketerName);
					
				}

			});

		});

		if (mapObj.trainer) {
			results.push(mapObj);
		}
		
	});

	return results;

}

// formatted version of marketers who can train other marketers to a client
function formattedMarketerCanTrainNewMarketer(s, e) {

	const results = [];
	const marketer_can_train_marketer_to_client = marketerCanTrainNewMarketer(s, e);

	marketer_can_train_marketer_to_client.forEach((trainingObj) => {

		results.push(`${trainingObj.trainer} can train ${trainingObj.trainees.join(', ')} on client ${trainingObj.clientName}`);

	});

	return results;

}

// console.log("*** Current list of marketers with client names ***");
// console.log(startData);

// console.log("*********************************************");

// console.log("*** Projected list of marketers with client names ***");
// console.log(endData);

// console.log("*********************************************");

// const current_client_list_with_marketer_names = currentClientAndMarketers;
// console.log("*** Current list of clients with list of marketers ***");
// console.log(current_client_list_with_marketer_names);

// console.log("*********************************************");

// const projected_client_list_with_marketer_names = projectedClientAndMarketers;
// console.log("*** Projected list of clients with list of marketers ***");
// console.log(projected_client_list_with_marketer_names);

// console.log("*********************************************");

const marketer_with_same_clients = marketerKeepsClients(startData, endData);
console.log("*** Marketers keeping the same clients ***");
console.log(marketer_with_same_clients);

console.log("*********************************************");

const marketer_with_different_clients = marketerChangesClients(startData, endData);
console.log("*** Marketers changing clients ***");
console.log(marketer_with_different_clients);

console.log("*********************************************");

const marketers_with_all_new_clients = marketersWithAllNewClients(startData, endData);
console.log("*** Marketers with all new clients ***");
console.log(marketers_with_all_new_clients);

console.log("*********************************************");

const marketer_can_train_marketer_to_client = marketerCanTrainNewMarketer(startData, endData);
console.log("*** marketers who can train other marketer to a client ***");
console.log(marketer_can_train_marketer_to_client);

console.log("*********************************************");

const formated_marketer_can_train_marketer_to_client = formattedMarketerCanTrainNewMarketer(startData, endData);
console.log("*** marketers who can train other marketer to a client (in string format) ***"); 
console.log(formated_marketer_can_train_marketer_to_client);

console.log("*********************************************");

const clients_with_all_new_marketers = clientsWithAllNewMarketers(startData, endData);
console.log("*** Clients with all new marketers ***");
console.log(clients_with_all_new_marketers);

console.log("*********************************************");






