(function () {
'use strict';

var App = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',[_c('div',{staticClass:"form-group"},[_c('h3',{staticClass:"form-group-head"},[_vm._v(_vm._s(_vm._("optionTitle")))]),_vm._v(" "),_vm._l((_vm.settings),function(item,index){return _c('fieldset',{staticClass:"optionMatchGroup"},[_c('div',{staticClass:"text browser-style"},[_c('label',{attrs:{"for":'match-' + index},domProps:{"innerHTML":_vm._s(_vm._('optionMatchPatternLabelHTML'))}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.match),expression:"item.match"}],attrs:{"type":"text","id":'match-' + index},domProps:{"value":(item.match)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "match", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"textarea browser-style"},[_c('label',{attrs:{"for":'whitelist-' + index}},[_vm._v(_vm._s(_vm._("optionWhitelistLabel")))]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(item.whitelist),expression:"item.whitelist"}],attrs:{"id":'whitelist-' + index,"rows":"8"},domProps:{"value":(item.whitelist)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "whitelist", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"textarea browser-style"},[_c('label',{attrs:{"for":'blacklist-' + index}},[_vm._v(_vm._s(_vm._("optionBlacklistLabel")))]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(item.blacklist),expression:"item.blacklist"}],attrs:{"id":'blacklist-' + index,"rows":"8"},domProps:{"value":(item.blacklist)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "blacklist", $event.target.value);}}})])])})],2)])},staticRenderFns: [],
  data: () => ({
    settings: [{
      match: "<all_urls>",
      whitelist: "",
      blacklist: ""
    }]
  }),
  methods: {
    _: id => browser.i18n.getMessage(id)
  }
};

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

}());
