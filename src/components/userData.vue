<template>
  <div v-if="user.id" class="user-data">
    <div
      class="user-data__row"
      v-for="parameter in showParams"
      :key="parameter"
    >
      <span>{{ parameter }}: </span><span>{{ user[parameter] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-data",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    showParams: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.user-data {
  &__row {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}
</style>
