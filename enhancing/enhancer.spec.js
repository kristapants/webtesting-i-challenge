const { success, fail, repair } = require('./enhancer.js');

describe('Sanity and intro', () => {
    it('works', () => {
      expect(2 + 2).toBe(4)
    })
    test('everything working', () => {
      expect({}).not.toBe({})
      expect({}).toEqual({})
    })
})

describe('Enhancement success works', () => {
    let excalibur;
    beforeEach(() => {
        excalibur = {name: 'Excalibur', durability: 15, enhancement: 18}
    })
    test('The item\'s enhancement increases by one', () => {
        expect(excalibur.enhancement).toBe(18)
        excalibur = success(excalibur)
        expect(excalibur.enhancement).toBe(19)
    })
    test('The item\'s enhancement does not increase over 20', () => {
        expect(excalibur.enhancement).toBe(18)
        excalibur = success(excalibur)
        expect(excalibur.enhancement).toBe(19)
        excalibur = success(excalibur)
        expect(excalibur.enhancement).toBe(20)
        excalibur = success(excalibur)
        expect(excalibur.enhancement).toBe(20)
    })
    test('The item\'s durability is not changed', () => {
        expect(excalibur.durability).toBe(15)
        expect(excalibur.enhancement).toBe(18)
        excalibur = success(excalibur)
        expect(excalibur.durability).toBe(15)
        expect(excalibur.enhancement).toBe(19)

    })
})

describe('Enhancement failure works', () => {
    let excalibur;
    test('If the item\'s enhancement is less than 15, the durability of the item is decreased by 5', () => {
        excalibur = {name: 'Excalibur', durability: 15, enhancement: 10}
        excalibur = fail(excalibur)
        expect(excalibur.durability).toBe(10)
        excalibur = fail(excalibur)
        expect(excalibur.durability).toBe(5)
    })
    test('If the item\'s enhancement is 15 or more, the durability of the item is decreased by 10.', () => {
        excalibur = {name: 'Excalibur', durability: 15, enhancement: 16}
        excalibur = fail(excalibur)
        expect(excalibur.durability).toBe(5)
    })
    test('If the item\'s enhancement level is greater than 16, the enhancement level decreases by 1', () => {
        excalibur = {name: 'Excalibur', durability: 20, enhancement: 20}
        excalibur = fail(excalibur)
        expect(excalibur.enhancement).toBe(19)
    })
    test('The item\'s durability level does not go below 0', () => {
        excalibur = {name: 'Excalibur', durability: 5, enhancement: 1}
        excalibur = fail(excalibur)
        expect(excalibur.durability).toBe(0)
        excalibur = fail(excalibur)
        expect(excalibur.durability).toBe(0)
    })
})

describe('Repair item works', () => {
    let excalibur = {name: 'Excalibur', durability: 20, enhancement: 3}
    test('An item with no durability remaining is restored to full durability', () => {
        excalibur = repair(excalibur)
        expect(excalibur.durability).toBe(100)
    })
})
