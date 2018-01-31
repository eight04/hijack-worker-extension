import App from "./App.vue";

new Vue({
  el: "#main",
  render: c => c("App"),
  components: {App}
});

browser.runtime.getBrowserInfo()
  .then(({version}) => {
    if (+version.split(".")[0] < 57) {
      document.body.classList.add("version-lt-57");
    }
  });
