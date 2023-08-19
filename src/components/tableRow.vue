<template>
  <div class="row" :class="{ 'row--pair': index % 2 !== 0 }">
    <slot name="row" v-bind="item"></slot>
  </div>
</template>

<script>
export default {
  name: "app-table-row",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: NaN,
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  height: max-content;
  padding: 10px;
  &--pair {
    background-color: $light-gray2;
  }
}
</style>
