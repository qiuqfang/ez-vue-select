import { shallowMount } from "@vue/test-utils";
import EasySelect from "../../packages/main.vue";

describe("easy-select", () => {
  it("renders a easy-select", () => {
    const wrapper = shallowMount(EasySelect);
    expect(wrapper.text()).toMatch("Hello EasySelect");
  });
});
