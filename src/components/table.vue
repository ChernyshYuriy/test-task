<template>
  <div class="table table--offset">
    <div class="table__header">
      <slot name="header"></slot>
    </div>
    <template v-if="list.length">
      <AppTableRow
        v-for="(item, index) in list"
        :key="item.id"
        :index="index"
        :item="item"
      >
        <template v-slot:row>
          <slot name="body" v-bind="item"></slot>
        </template>
      </AppTableRow>
    </template>
    <template v-else><span class="empty"> no results</span> </template>
  </div>
</template>

<script>
import AppTableRow from "@/components/tableRow";
export default {
  name: "app-table",
  components: {
    AppTableRow,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.table {
  border: 1px solid $black;

  &--offset {
    margin: 20px 0px;
  }
  &__header {
    position: sticky;
    top: 0;
    left: 0;
    padding: 5px 10px;
    border-bottom: 1px solid $black;
    background-color: $white;
  }
  & .empty {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    &__header {
      font-size: 12px;
      padding: 5px 3px;
    }
  }
}
</style>
