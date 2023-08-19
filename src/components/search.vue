<template>
  <div class="search">
    <h4>Search</h4>
    <input
      class="search__input"
      v-model="searchPhrase"
      type="text"
      @input="search()"
    />
  </div>
</template>

<script>
export default {
  name: "Search-todos",

  data() {
    return {
      searchPhrase: "",
      timeout: 0,
    };
  },

  mounted() {
    this.searchPhrase =
      JSON.parse(sessionStorage.getItem("filters"))?.search || "";
  },

  methods: {
    search() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$emit("search", this.searchPhrase.trim());
      }, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  gap: 20px;
  &__input {
    @include border-radius;
    @include input;
  }
}
</style>
