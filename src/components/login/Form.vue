<template>
  <div class="form">
    <div class="form__header">description</div>
    <form @submit.prevent="registration()" class="form__content">
      <p>description</p>
      <div class="form__block">
        <input
          id="username"
          type="text"
          class="input form__input"
          placeholder="Username"
          v-model="username"
        />
        <label class="error" for="username">{{ errorsFields.username }}</label>
      </div>

      <div class="form__block">
        <input
          id="phone"
          type="text"
          class="input form__input"
          placeholder="Phone Number"
          v-model="phone"
        />
        <label class="error" for="phone">{{ errorsFields.phone }}</label>
      </div>
      <div class="form__block">
        <Btn :classModification="'--register'">Register</Btn>
        <span v-if="isErrorUserData" class="error error--login">
          login error
        </span>
      </div>
    </form>
  </div>
</template>

<script>
const validationsText = {
  requiredField: "required field",
  onlyLatter: "only english latter",
  notFoundInBase: "not found in base",
};
import Btn from "../ui/Btn";
import API from "@/api/api";
import fetchData from "@/mixins/fetchData";
export default {
  name: "Form-container",
  mixins: [fetchData],
  components: {
    Btn,
  },
  data() {
    return {
      users: [],
      activeUser: null,
      username: "",
      phone: "",
      errorsFields: {
        username: "",
        phone: "",
      },
      isErrorUserData: false,
    };
  },

  mounted() {},

  methods: {
    async fetchUsers() {
      if (!this.users.length) {
        this.users = await this.fetchData(API.users);
      }
    },
    // searching user in fetched data
    async getUser() {
      await this.fetchUsers();
      if (!this.users?.length) return;
      this.activeUser = this.users.find(
        (user) =>
          user.username.toLowerCase() === this.username.toLowerCase() &&
          user.phone.toLowerCase() === this.phone.toLowerCase()
      );
      this.isErrorUserData = !this.activeUser;
    },
    // validate inputs
    validationField(fieldKey) {
      let fieldValue = this[fieldKey];
      switch (true) {
        case !fieldValue.length:
          this.errorsFields[fieldKey] = validationsText.requiredField;
          return false;

        case fieldKey === "username" && !/^[a-z]+$/i.test(fieldValue):
          this.errorsFields[fieldKey] = validationsText.onlyLatter;
          return false;

        default:
          this.errorsFields[fieldKey] = "";
          return true;
      }
    },
    //submit form to move next page and save user
    async registration() {
      this.validationField("username");
      this.validationField("phone");
      this.isErrorUserData = false;
      if (!this.errorsFields.username && !this.errorsFields.phone) {
        await this.getUser();
        if (this.activeUser) {
          sessionStorage.setItem("user", JSON.stringify(this.activeUser));
          this.$router.push({ path: "/main" });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin padding {
  padding: 0px 25px 0px;
}
@mixin width {
  width: 397px;
}

.form {
  margin: auto;
  background-color: $light-gray;
  width: 447px;
  transform: translateY(-18px);
  @include border-radius;
  &__content {
    @include padding;
    @include width;
    & p {
      font-size: 14px;
      margin-top: 16px;
      margin-bottom: 20px;
      color: $dark-gray-text;
    }
  }
  &__header {
    @include padding;
    @include border-radius;
    color: $dark-gray-text;
    background-color: $dark-gray3;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
  }
  &__input {
    margin-bottom: 24px;
  }
  &__block {
    position: relative;
    & .error {
      position: absolute;
      bottom: 6px;
      left: 10px;
      color: $red;
      font-size: 12px;
      &--login {
        left: 50%;
        font-size: 18px;
        transform: translateX(-50%);
      }
    }
  }
}
@media screen and (max-width: 470px) {
  .form {
    width: calc(100vw - 10px);
    &__content {
      padding: 0px 10px;
      margin: 0px auto;
    }
    &__header {
      padding: 0px 10px;
    }
    &__input {
      width: calc(100vw - 50px);
    }
  }
}

@media screen and (max-width: 430px) {
  .form__block {
    width: calc(100vw - 30px);
  }
}
</style>
