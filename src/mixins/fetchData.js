const fetchMixin = {
  methods: {
    async fetchData(api) {
      const response = await fetch(api);
      const json = await response.json();
      return json;
    },
  },
};
export default fetchMixin;
