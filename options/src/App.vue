<template>
  <form>
		<div class="form-group">
			<h3 class="form-group-head">{{_("optionTitle")}}</h3>
      <fieldset class="optionMatchGroup" v-for="(item, index) in settings">
        <div class="text browser-style">
          <label :for="'match-' + index" v-html="_('optionMatchPatternLabelHTML')"></label>
          <input type="text" :id="'match-' + index" v-model="item.match">
        </div>
        <div class="textarea browser-style">
          <label :for="'whitelist-' + index">{{_("optionWhitelistLabel")}}</label>
          <textarea :id="'whitelist-' + index" rows="8" v-model="item.whitelist"></textarea>
        </div>
        <div class="textarea browser-style">
          <label :for="'blacklist-' + index">{{_("optionBlacklistLabel")}}</label>
          <textarea :id="'blacklist-' + index" rows="8" v-model="item.blacklist"></textarea>
        </div>
      </fieldset>
		</div>
	</form>
</template>

<script>
export default {
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
</script>
