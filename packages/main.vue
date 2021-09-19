<template>
  <div class="easy-select" ref="easySelect">
    <div class="easy-select-main">
      <input
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        readonly
        @focus="isFocus = true"
      />
    </div>
    <ul class="easy-option-list" v-show="isFocus">
      <template v-if="options.length > 0">
        <li
          class="easy-option-item"
          :class="{ selected: inputValue.indexOf(option.label) !== -1 }"
          v-for="(option, index) in options"
          :key="index"
          :title="option.label"
          @click="handleSelectValue(option)"
        >
          {{ option.label }}
        </li>
      </template>
      <li v-else class="easy-option-item">无数据</li>
    </ul>
  </div>
</template>

<script>
const typeList = [
  "[object Boolean]",
  "[object Number]",
  "[object String]",
  "[object Object]",
  "[object Array]",
];

export default {
  name: "EasySelect",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: [Boolean, Number, String, Object, Array],
    },
  },
  data() {
    return {
      isFocus: false,
      inputMultipleValue: [], // 用来保存多选时input中显示的数据
      valueMultiple: [], // 用来保存多选时返回的数据
    };
  },
  computed: {
    inputValue(vm) {
      let inputValue = "";
      if (
        this.value === undefined ||
        this.value === null ||
        this.value === "" ||
        this.value.length === 0
      ) {
        return inputValue;
      }
      const type = Object.prototype.toString.call(this.value);
      if (type === typeList[typeList.length - 1]) {
        const value = [...this.value];
        // 多选时，值为对象的处理
        if (this.options[0].value instanceof Object) {
          value.length = 0;
          this.value.forEach((v) => {
            value.push(v.value);
          });
          this.options.forEach((option) => {
            if (
              value.includes(option.value.value) &&
              !this.inputMultipleValue.includes(option.label)
            ) {
              this.inputMultipleValue.push(option.label);
              this.valueMultiple.push(option.value);
            }
          });
        } else {
          this.options.forEach((option) => {
            if (value.includes(option.value) && !this.inputMultipleValue.includes(option.label)) {
              this.inputMultipleValue.push(option.label);
              this.valueMultiple.push(option.value);
            }
          });
        }
        inputValue = vm.inputMultipleValue.sort().join(",");
        return inputValue;
      }
      if (type === typeList[typeList.length - 2]) {
        if (this.value.label) {
          inputValue = this.value.label;
        }
        return inputValue;
      }
      if (typeList.includes(type)) {
        this.options.forEach((option) => {
          if (this.value === option.value) {
            inputValue = option.label;
          }
        });
        return inputValue;
      }
      return inputValue;
    },
  },
  methods: {
    handleSelectValue(option) {
      const value = option.value !== undefined || option.value !== null ? option.value : option;
      if (this.multiple) {
        if (this.inputMultipleValue.includes(option.label)) {
          this.inputMultipleValue.splice(this.inputMultipleValue.indexOf(option.label), 1);
          this.valueMultiple.splice(this.valueMultiple.indexOf(value), 1);
        } else {
          this.inputMultipleValue.push(option.label);
          this.valueMultiple.push(value);
        }
        this.$emit("change", this.valueMultiple);
      } else {
        this.isFocus = false;
        this.$emit("change", value);
      }
    },
  },
  mounted() {
    const fn = (e) => {
      if (!e.path.includes(this.$refs.easySelect)) {
        this.isFocus = false;
      }
    };
    document.addEventListener("click", fn);
    this.$once("hook:beforeDestroy", () => {
      document.addEventListener("click", fn);
    });
  },
};
</script>

<style lang="less" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

input {
  width: 100%;
  cursor: pointer;
  outline: none;
  border: 1px solid #ccc;
  height: 28px;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &::focus {
    border-color: rgb(64, 158, 255);
  }
}
.easy-select,
.easy-select-main {
  position: relative;
}
.easy-select {
  .easy-option-list {
    width: 100%;
    background-color: #fff;
    color: #222;
    position: absolute;
    left: 0;
    z-index: 100;
    border-radius: 5px;
    padding: 5px 0;
    margin: 1px 0 0;
    max-height: 268px;
    overflow: auto;
    border: 1px solid #ccc;
    .easy-option-item {
      padding: 10px 15px;
      cursor: pointer;
      color: #606266;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &.selected {
        color: #409eff;
        font-weight: 700;
      }
      &:hover {
        background-color: #eee;
      }
    }
  }
}

/* 整个滚动条 */
::-webkit-scrollbar {
  width: 6px;
  &:horizontal {
    height: 6px;
  }
}
/* 滚动条上的按钮 */
::-webkit-scrollbar-button {
  display: none;
  &:horizontal {
    display: none;
  }
}
/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgb(220, 220, 220);
  border-radius: 6px;
  &:hover {
    background-color: rgb(200, 200, 200);
  }
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
}
/* 滚动条没有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
}
/* 当同时有垂直滚动条和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
}
/* 某些元素的corner部分的部分样式(例:textarea的可拖动按钮) */
::-webkit-resizer {
}
</style>
