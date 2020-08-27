import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { dummyData } from "./dummyData.js"
import { dummyMultipleData } from "./dummyMultipleData.js"

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe('App', () => {

    it('should have nine types of fuel data', () => {
        const wrapper = mount(App);
        const dataResponse = wrapper.vm.convertToArrays(dummyData[0].generationmix);
        wrapper.setData({ fuelMix: dataResponse });
        expect(wrapper.vm.fuelMix).toHaveLength(10)

    });

    it('should group data', () => {
        const wrapper = mount(App);
        const dataResponse = wrapper.vm.combineIntoAverage(dummyMultipleData);
        const convertedDataResponse = wrapper.vm.convertToArrays(dataResponse);
        wrapper.setData({ fuelMix: convertedDataResponse });
        expect(wrapper.vm.fuelMix).toHaveLength(10)
        expect(wrapper.vm.fuelMix[0][1]).toMatch(37.1)

    })
})