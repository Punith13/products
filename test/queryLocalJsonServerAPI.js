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
            
        const totalCubicWeight = res.reduce(calculatorInstance.cubicWeightReducer, 0);
        expect(totalCubicWeight).toEqual(2500);

        const averageCubicWeight = parseFloat(totalCubicWeight / res.length)
        expect(averageCubicWeight).toEqual(0.25);

    })
})