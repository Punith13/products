const axios = require('axios');

class CubicWeightCalculator {
	constructor(nextEndPoint , baseUrl){
		this.nextEndPoint = nextEndPoint; 
		this.baseUrl = baseUrl;
	}

	fetchProducts(category){
		const productsInCategory = [];
	
		return new Promise(async resolve => {
			while (this.nextEndPoint) {
				await new Promise((resolve, reject) => {
					//setImmediate uses queue of I/O eventhandlers. If all I/O events in 
					//the current snapshot are processed, it executes the callback.
					// It queues them immediately after the last I/O handler
					// somewhat like process.nextTick. So it is faster
					setImmediate(async () => {
						const result = await axios.get(`${this.baseUrl}${this.nextEndPoint}`);
	
						if (result.data) {
							result.data.objects.forEach(el => {
								if (el.category === category) {
									productsInCategory.push(el);
								}
							});
	
							this.nextEndPoint = result.data.next;
							resolve();
						} else {
							reject(new Error('Network error'));
						}
					});
				});
			}
			resolve(productsInCategory);
		});
	}

	cubicWeightReducer(accumulator, currentValue){
		const { size: { width, length, height } } = currentValue;
			return accumulator + (parseFloat(width) / 100 * parseFloat(length) / 100 * parseFloat(height) / 100 * 250);
	}
}
 
module.exports = CubicWeightCalculator;