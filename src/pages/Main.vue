<template>
  <div class="container main-page">
    <template v-if="!user">
      <div class="empty-page">
        <span>please log in first</span>
        <router-link to="/">Log in</router-link>
      </div>
    </template>
    <template v-else>
      <UserData :user="user" :showParams="showUserParams" />
      <Filters :options="filtersOptions" @filterChange="filtering($event)" />
      <AddTodo @addTodo="addTodo($event)" />
      <AppTable :list="filteredTodosList">
        <template v-slot:header>
          <div class="table-grid">
            <div>UserId</div>
            <div>Title</div>
            <div>Is completed</div>
            <div class="text-center">favorite</div>
          </div>
        </template>
        <template #body="{ userId, title, completed, id }">
          <div class="table-grid">
            <div>{{ userId }}</div>
            <div>{{ title }}</div>
            <isCompleted :status="completed" />
            <isFavorite
              :status="isInFavorites(id)"
              @addFavorite="addFavorite(id)"
              @removeFavorite="removeFavorite(id)"
            />
          </div>
        </template>
      </AppTable>
    </template>
  </div>
</template>

<script>
import API from "@/api/api";
import UserData from "@/components/userData";
import AppTable from "@/components/table";
import isCompleted from "@/components/isCompleted";
import Filters from "@/components/filter";
import isFavorite from "@/components/isFavorite";
import AddTodo from "@/components/addTodo";

import fetchData from "@/mixins/fetchData";
import { RouterLink } from "vue-router";
let newId = 201;
export default {
  name: "Main-Page",
  mixins: [fetchData],

  components: {
    UserData,
    AppTable,
    isCompleted,
    Filters,
    isFavorite,
    AddTodo,
    RouterLink,
  },
  data() {
    return {
      user: {},
      showUserParams: ["username", "phone", "name", "email", "website"],
      todosList: [],
      filteredTodosList: [],
      filtersOptions: {
        byId: [],
        global: ["All", "Completed", "Uncompleted", "Favorites"],
      },
      favorites: [],
    };
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  },
  async mounted() {
    await this.getTodos();
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    savedFilters
      ? this.filtering(savedFilters)
      : (this.filteredTodosList = this.todosList);
  },

  methods: {
    // fetching todos and combines with costume todos added before from local store
    async getTodos() {
      try {
        const resp = (await this.fetchData(API.todos)) || [];
        const addedTodos = JSON.parse(localStorage.getItem("addedTodos"));

        this.todosList = [...(resp || []), ...(addedTodos || [])];
        this.setAllIdsForFilter(this.todosList);
      } catch (error) {
        console.error(`work catch, request error ${error}`);
      }
    },
    // create array and set in to filter option `by id` all user id what in todos list
    setAllIdsForFilter(data) {
      this.filtersOptions.byId = [
        "All users",
        ...new Set(data.map((item) => item.userId)),
      ];
    },

    searchTodos(item, searchPhrase) {
      if (!searchPhrase) return true;
      return item.title.toLowerCase().includes(searchPhrase.toLowerCase());
    },
    // condition filter by id
    filterById(item, filterValue) {
      if (filterValue === "All users") return true;
      return item.userId + "" === filterValue;
    },
    // condition filter by completed or favorite
    filterGlobal(item, filterValue) {
      const conditions = {
        Completed: (item) => !!item.completed,
        Uncompleted: (item) => !item.completed,
        Favorites: (item) => !!this.isInFavorites(item.id),
      };
      if (filterValue === "All") return true;
      return conditions[filterValue](item);
    },

    // using condition and search to make filtering i one loop
    filtering(filters) {
      this.filters = filters;
      let newTodos = this.todosList;
      this.filteredTodosList = newTodos.filter(
        (item) =>
          this.searchTodos(item, filters.search) &&
          this.filterById(item, filters.byId) &&
          this.filterGlobal(item, filters.global)
      );
    },
    // get saved filters if not found filters use to save after refresh page
    getFilters() {
      if (this.filters?.length) return;
      const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
      this.filters = savedFilters;
    },
    // use recursion to get not used id in array because after post api return always 201
    // and save new todos to local storage because api don't save it
    addTodo(newTodo) {
      if (this.todosList.some((item) => item.id === newId)) {
        newId++;
        this.addTodo(newTodo, newId);
        return;
      }
      const todo = { ...newTodo, id: newId };
      this.todosList.push(todo);
      this.getFilters();
      if (this.filters) this.filtering(this.filters);
      this.setAllIdsForFilter(this.todosList);
      const addedTodos = JSON.parse(localStorage.getItem("addedTodos"));
      localStorage.setItem(
        "addedTodos",
        JSON.stringify([...(addedTodos || []), todo])
      );
    },
    // add favorite id and save it to local storage
    addFavorite(id) {
      if (this.isInFavorites(id)) return;
      this.favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    // remove favorite id and remove it to local storage
    removeFavorite(id) {
      this.favorites = this.favorites.filter((idFav) => idFav !== id);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    isInFavorites(id) {
      return this.favorites.includes(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  margin-top: 20px;
}
.empty-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  & * {
    width: max-content;
  }
  & a {
    @include border-radius;
    padding: 7px;
    background-color: $green;
    text-decoration: none;
    color: $white;
    margin-top: 10px;
  }
}
.table-grid {
  display: grid;
  grid-template-columns: 70px 1fr 100px 100px;
}
@media screen and (max-width: 500px) {
  .table-grid {
    display: grid;
    grid-template-columns: 40px 1fr 75px 40px;
  }
}
</style>
