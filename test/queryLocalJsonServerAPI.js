const expect = require('expect');
const CubicWeightCalculator = require('../CubicWeightCalculator')
const nextEndPoint = '1';
const baseUrl = 'http://localhost:3000/';
const createDBFile = require('../jsonDBServer/createDBJson');

describe('CubicWeightCalculator Local Server', () => {
    it('calculates the average cubic weight of 10000 Air Conditioners', async () => {

        await createDBFile(10000, 5000); // numberOfRecords, timeToInitialize - Wait for mock json server to initialize
        const calculatorInstance = new CubicWeightCalculator(nextEndPoint, baseUrl); 
        const res =  await calculatorInstance.fetchProducts('Air Conditioners')
            
        let totalCubicWeight = res.reduce(calculatorInstance.cubicWeightReducer, 0);
        totalCubicWeight = Math.round( totalCubicWeight * 1e2 ) / 1e2
        expect(totalCubicWeight).toEqual(2500)

        let averageCubicWeight = totalCubicWeight / res.length
        averageCubicWeight = Math.round( averageCubicWeight * 1e2 ) / 1e2
        expect(averageCubicWeight).toEqual(0.25);

    })
})