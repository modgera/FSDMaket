import { expect } from 'chai';

import createMaskForDate from './_masked_date';

describe('propsExists (F)', () => {
    const propsExists = createMaskForDate.propsExists;
    it(`props is not defined`, () => {
        expect(propsExists()).to.eql(false);
    });

    it(`props is defined`, () => {
        const propsExists = createMaskForDate.propsExists;
        expect(propsExists({someParam:''})).to.eql(true);
    });

});

describe('setParams (F)', () => {
    const setParams = createMaskForDate.setParams;
    it(`class name is not found`, () => {
        expect(setParams({})).to.eql(false);
    });

    it(`class name was found, but it's empty`, () => {
        expect(setParams({className:''})).to.eql(false);
    });

    it(`class name was found and it's good`, () => {
        expect(setParams({className:'some-class-name'})).to.eql(true);
    });

});

describe('validateProps (F)', () => {
    const validateProps = createMaskForDate.validateProps;
    it(`class name is not found`, () => {
        expect(validateProps({})).to.eql(false);
    });

    it(`empty props`, () => {
        expect(validateProps()).to.eql(false);
    });

});

describe('getClassSelector (F)', () => {
    const getClassSelector = createMaskForDate.getClassSelector;
    it(`add . before 'some-class'`, () => {
        expect(getClassSelector('some-class')).to.eql('.some-class');
    });

    it(`return '.some-class' without change`, () => {
        expect(getClassSelector('.some-class')).to.eql('.some-class');
    });

});







