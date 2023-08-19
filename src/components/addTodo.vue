<template>
  <form class="addTodo" @submit.prevent="addTodo">
    <h4>Add todo</h4>
    <div class="addTodo__content">
      <div class="addTodo__block">
        <span>User id</span>
        <input class="addTodo__input" v-model="userId" type="text" />
      </div>
      <div class="addTodo__block">
        <span>Title</span>
        <input class="addTodo__input" v-model="title" type="text" />
      </div>
      <Btn class="addTodo__btn">Add</Btn>
    </div>
  </form>
</template>

<script>
import Btn from "./ui/Btn";
import API from "@/api/api";

export default {
  name: "add-todo",
  components: {
    Btn,
  },
  data() {
    return {
      userId: null,
      title: "",
    };
  },

  mounted() {},

  methods: {
    async addTodo() {
      try {
        if (!this.userId || !this.title) return;
        const resp = await fetch(API.todos, {
          method: "POST",
          body: { userId: this.userId, title: this.title },
        });
        if (resp.ok) {
          this.$emit("addTodo", {
            userId: this.userId,
            title: this.title,
            completed: false,
          });
          this.userId = null;
          this.title = "";
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.addTodo {
  h4 {
    margin-bottom: 10px;
  }
  &__content {
    display: flex;
    align-items: end;
  }
  &__block {
    display: flex;
    flex-direction: column;
    max-width: 150px;
  }
  &__input {
    @include input;
    @include border-radius;
    height: 20px;
    margin-right: 12px;
  }
  &__btn {
    padding: 7px;
    background-color: $green;
    height: fit-content;
  }
  @media screen and (max-width: 400px) {
    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    &__block {
      margin-bottom: 10px;
    }
  }
}
</style>
