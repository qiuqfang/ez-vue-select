<template>
  <div id="app">
    <h4>value为boolean</h4>
    <EasySelect v-model="value1" :options="options1"></EasySelect>
    <button @click="value1 = false">重置为false</button>
    <h4>value为number</h4>
    <EasySelect v-model="value2" :options="options2"></EasySelect>
    <button @click="value2 = 0">重置为0</button>
    <h4>value为string</h4>
    <EasySelect v-model="value3" :options="options3"></EasySelect>
    <button @click="value3 = ''">重置为空字符串</button>
    <h4>value为object</h4>
    <EasySelect v-model="value4" :options="options4"></EasySelect>
    <button @click="value4 = null">重置为null</button>
    <h4>value为array</h4>
    <EasySelect v-model="value5" :options="options5" multiple></EasySelect>
    <button @click="value5 = []">重置为[]</button>
  </div>
</template>

<script>
export default {
  name: "ExamplesEasyUI",
  data() {
    return {
      value1: false,
      options1: [
        { label: "选项1", value: false },
        { label: "选项2", value: true },
      ],
      value2: 0,
      options2: [
        { label: "选项1", value: 0 },
        { label: "选项2", value: 1 },
      ],
      value3: "0",
      options3: [
        { label: "选项1", value: "0" },
        { label: "选项2", value: "1" },
      ],
      value4: { label: "选项1", value: "0" },
      options4: [
        { label: "选项1", value: { label: "选项1", value: "0" } },
        { label: "选项2", value: { label: "选项2", value: "1" } },
      ],
      value5: [
        { label: "选项1", value: "0" },
        { label: "选项2", value: "1" },
      ],
      options5: [
        { label: "选项1", value: { label: "选项1", value: "0" } },
        { label: "选项2", value: { label: "选项2", value: "1" } },
        { label: "选项3", value: { label: "选项3", value: "2" } },
      ],
    };
  },
};
</script>

<style lang="less" scoped></style>
