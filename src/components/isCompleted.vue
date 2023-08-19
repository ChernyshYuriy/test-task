<template>
  <div class="completed">
    <img
      v-if="status"
      class="img img--completed"
      src="../assets/img/completed.png"
      alt="completed"
    />
    <img
      v-else
      class="img"
      src="../assets/img/not_completed.png"
      alt="not completed"
    />
  </div>
</template>

<script>
export default {
  name: "is-completed",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.completed {
  display: flex;
  justify-content: center;
  align-items: center;
  & .img {
    height: 24px;
    width: 24px;
    &--completed {
      height: 30px;
      width: 30px;
    }
  }
}
</style>
