const expect = require('expect');
const CubicWeightCalculator = require('../CubicWeightCalculator')
const nextEndPoint = '/api/products/1';
const baseUrl = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com';

describe('CubicWeightCalculator AWS S3', async () => {
    it('calculates the average cubic weight of Air Conditioners', async () => {

        const calculatorInstance = new CubicWeightCalculator(nextEndPoint, baseUrl); 

        const res = await calculatorInstance.fetchProducts('Air Conditioners');

        const totalCubicWeight = res.reduce(calculatorInstance.cubicWeightReducer, 0);
        expect(totalCubicWeight).toEqual(166.45353875)

        const averageCubicWeight = parseFloat(totalCubicWeight / res.length)
        expect(averageCubicWeight).toEqual(41.6133846875);
    })
})


