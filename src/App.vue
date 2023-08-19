<template>
  <div id="app">
    <Header />
    <KeepAlive>
      <router-view class="content"></router-view>
    </KeepAlive>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/layout-elements/Header";
import Footer from "./components/layout-elements/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
</style>
