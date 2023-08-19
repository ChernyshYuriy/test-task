<template>
  <button class="btn" :class="`btn${classModification}`"><slot /></button>
</template>

<script>
export default {
  name: "btn-ui",
  props: {
    classModification: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  @include border-radius;
  cursor: pointer;
  border: none;
  color: $white;
  background-color: $dark-gray3;
  width: max-content;
  &--register {
    width: 100%;
    background-color: $green;
    height: 43px;
    margin-top: 2px;
    margin-bottom: 29px;
    font-size: 16px;
  }
}
@media screen and (max-width: 430px) {
  .btn--register {
    width: calc(100vw - 30px);
  }
}
</style>
