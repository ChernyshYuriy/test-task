<template>
  <div>
    <div class="filters">
      <h4>Filters</h4>
      <div class="filters__option">
        <span>By ids</span>
        <dropDown
          :options="options.byId"
          :selected="filters.byId"
          @changeValue="changeFilters($event, 'byId')"
        />
      </div>
      <div class="filters__option">
        <span>By completed and favorite</span>
        <dropDown
          :options="options.global"
          :selected="filters.global"
          @changeValue="changeFilters($event, 'global')"
        />
      </div>
    </div>
    <search @search="changeSearch($event)" />
  </div>
</template>

<script>
import dropDown from "./ui/dropDown";
import Search from "@/components/search";

export default {
  name: "TestTaskSelectoFilter",
  components: {
    dropDown,
    Search,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      filters: {},
    };
  },

  beforeMount() {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    this.filters = savedFilters
      ? savedFilters
      : {
          byId: "All users",
          global: "All",
        };
  },

  methods: {
    filterAction() {
      this.$emit("filterChange", this.filters);
      sessionStorage.setItem("filters", JSON.stringify(this.filters));
    },
    changeFilters(value, filterKey) {
      this.filters[filterKey] = value;
      this.filterAction();
    },
    changeSearch(value) {
      this.filters.search = value;
      this.filterAction();
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  margin-top: 20px;
  &__option {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
  }
}
@media screen and (max-width: 400px) {
  .filters {
    flex-direction: column;
    justify-content: flex-start;
    &__option {
      align-items: flex-start;
    }
  }
}
</style>
