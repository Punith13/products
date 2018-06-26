const axios = require('axios');

let nextEndPoint = '/api/products/1';

let baseUrl = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';

const fetchProducts = (category) => {
	const productsInCategory = [];

	return new Promise(async resolve => {
		while (nextEndPoint) {
			await new Promise((resolve, reject) => {
				// placing it on an event stack to prevent stack overflow error
				setTimeout(async () => {
					const result = await axios.get(`${baseUrl}${nextEndPoint}`);

					if (result.data) {
						result.data.objects.forEach(el => {
							if (el.category === category) {
								productsInCategory.push(el);
							}
						});

						nextEndPoint = result.data.next;
						resolve();
					} else {
						reject(new Error('Network error'));
					}
				}, 0);
			});
		}
		resolve(productsInCategory);
	});
};

const cubicWeightReducer = (accumulator, currentValue) => {
	const { size: { width, length, height } } = currentValue;
	return accumulator + (parseFloat(width) / 100 * parseFloat(length) / 100 * parseFloat(height) / 100 * 250);
};

fetchProducts('Air Conditioners').then(res => {
	const totalCubicWeight = res.reduce(cubicWeightReducer, 0);
	console.log('Average cubic weight', (totalCubicWeight / res.length).toFixed(2));
});
 