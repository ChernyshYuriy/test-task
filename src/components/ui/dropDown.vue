<template>
  <select class="drop-down" v-model="selectedData" @change="onChange($event)">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "drop-down",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedData: "",
    };
  },
  mounted() {
    this.selectedData = this.selected;
  },

  methods: {
    onChange(event) {
      this.$emit("changeValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-down {
  border: 1px solid $black;
  @include border-radius;
  background-color: $white;
  margin: 5px 15px;
  height: 20px;
  padding: 2px 5px;
}
</style>
