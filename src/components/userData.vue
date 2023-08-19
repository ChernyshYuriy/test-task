<template>
  <div class="user-data">
    <div
      class="user-data__row"
      v-for="parameter in showParams"
      :key="parameter"
    >
      <span>{{ parameter }}: </span><span>{{ user[parameter] }}</span>
    </div>
    <router-link class="user-data__link" to="/">Change user</router-link>
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
  &__link {
    margin-top: 5px;
    background-color: $green;
    color: $white;
    padding: 5px;
    font-size: 16px;
    display: block;
    width: fit-content;
    text-decoration: none;
    @include border-radius;
  }
}
</style>
