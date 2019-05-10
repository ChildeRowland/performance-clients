let startData = {
	archie: ['a', 'b', 'c'],
	billy: ['a', 'b', 'c'],
	camilla: ['d', 'e', 'f'],
	debbie: ['d', 'e', 'f']
};

let endData = {
	archie: ['a', 'd', 'e'],
	billy: ['b', 'e', 'f'],
	camilla: ['d', 'a', 'b'],
	debbie: ['e', 'b', 'c']
};

// marketer keeps one or more clients
function marketerKeepsClients (s, e) {

	const results = {};

	// loop over the properties in the start data set
	Object.keys(s).forEach((name) => {

		s[name].forEach((clientName) => {

			if (e[name].includes(clientName)) {

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

			if (!s[name].includes(clientName)) {

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

// marketer is keeping a client, and can train a marketer to that client
function marketerCanTrainNewMarketer (s, e) {

	const results = [];
	const marketer_with_same_clients = marketerKeepsClients(s, e);
	const marketer_with_different_clients = marketerChangesClients(s, e);

	Object.keys(marketer_with_different_clients).forEach((marketerName) => {

		marketer_with_different_clients[marketerName].forEach((clientName) => {

			Object.keys(marketer_with_same_clients).forEach((potentialTrainingMarketerName) => {

				if (marketer_with_same_clients[potentialTrainingMarketerName].includes(clientName)) {

					results.push(`${potentialTrainingMarketerName} can train ${marketerName} to the client ${clientName}`)

				}

			});

		});
		
	});

	return results;

}

const marketer_with_same_clients = marketerKeepsClients(startData, endData);
console.log("Marketers keeping the same clients");
console.log(marketer_with_same_clients);

const marketer_with_different_clients = marketerChangesClients(startData, endData);
console.log("Marketers changing clients");
console.log(marketer_with_different_clients);

const marketer_can_train_marketer_to_client = marketerCanTrainNewMarketer(startData, endData);
console.log("");
console.log(marketer_can_train_marketer_to_client);




