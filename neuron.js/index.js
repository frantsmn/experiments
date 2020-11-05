class Neuron {
	constructor() {
		this.weight = 0.5;
		this.lastCorrection = 0;
		this.step = 0.0001;
	}

	processData(inputValue) {
		return inputValue * this.weight;
	}
	restoreData(expectedValue) {
		return expectedValue / this.weight;
	}
	train(inputValue, expectedValue) {
		let i = 0;
		do {

			this.weight += this.lastCorrection;
			this.lastCorrection = (this.restoreData(expectedValue) / this.weight - inputValue / this.weight) * this.step;

			if (++i % 100000)
				console.log('Step: ', this.step, ' Neuron result: ', this.weight * inputValue);

		} while (Math.round(this.weight * inputValue * 10000) / 10000 !== Math.round(expectedValue * 10000) / 10000);
		console.log('Train finished!');
		console.table({
			weight: this.weight,
			"expected result": expectedValue,
			"neuron result": this.weight * inputValue
		});
	}

}

const neuron = new Neuron();
neuron.train(10, 6.13);
