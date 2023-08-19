<template>
  <div class="login-page"><Form /></div>
</template>

<script>
import Form from "../components/login/Form";
export default {
  name: "Login-Page",
  components: { Form },
};
</script>

<style lang="scss" scoped>
.login-page {
  background-color: $dark-gray2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
