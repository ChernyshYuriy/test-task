<template>
  <div class="favorite">
    <img
      v-if="status"
      class="favorite__img favorite__img--selected"
      src="../assets/img/favorite.png"
      alt=""
      @click="$emit('removeFavorite')"
    />
    <img
      v-else
      class="favorite__img"
      src="../assets/img/favorite-empty.png"
      alt=""
      @click="$emit('addFavorite')"
    />
  </div>
</template>

<script>
export default {
  name: "is-favorite",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite {
  display: flex;
  justify-content: center;
  align-items: center;
  &__img {
    cursor: pointer;
    width: 24px;
    height: 24px;
    &--selected {
      height: 30px;
      width: 30px;
      transform: translateY(-3px);
    }
  }
}
</style>
