/* global pref */

let HIJACK_SCRIPT_SHA;

Promise.all([grabHijackScript(), registerConfigScript()])
  .then(() => {
    registerWebRequest();
    registerHijacker();
  })
  .catch(console.error);

function registerHijacker() {
  registerScript("<all_urls>", {file: "/content/hijack.js"});
}

function registerWebRequest() {
  browser.webRequest.onHeadersReceived.addListener(
    listener,
    {
      urls: ["<all_urls>"],
      types: ["main_frame"]
    },
    ["blocking", "responseHeaders"]
  );
  
  function listener({responseHeaders}) {
    const header = responseHeaders.filter(h => h.name === "Content-Security-Policy")[0];
    if (header) {
      if (header.value.includes("script-src") ) {
        if (
          !header.value.includes(HIJACK_SCRIPT_SHA) &&
          !header.value.match(/script-src[^;]+?'unsafe-inline'/)
        ) {
          header.value = header.value.replace("script-src", `script-src 'sha256-${HIJACK_SCRIPT_SHA}'`);
        }
      } else {
        header.value += "; script-src sha256-" + HIJACK_SCRIPT_SHA;
      }
    }
    return {responseHeaders};
  }
}
  
function registerConfigScript() {
  return pref.ready().then(() => {
    for (const match of pref.get("matches")) {
      const config = {
        whitelist: getList(pref.get(`${match}/whitelist`)),
        blacklist: getList(pref.get(`${match}/blacklist`))
      };
      registerScript(match, {
        code: `var config = ${JSON.stringify(config)};`
      });
    }
  });
}
  
function grabHijackScript() {
  return fetch("/content/hijack-script.js")
    .then(r => r.text())
    .then(script => {
      const code = `const hijackScript = ${JSON.stringify(script)}`;
      registerScript("<all_urls>", {code});
      return script;
    })
    .then(script => {
      const buffer = new TextEncoder("utf-8").encode(script);
      return crypto.subtle.digest("SHA-256", buffer)
        .then(hash => {
          HIJACK_SCRIPT_SHA = btoa(String.fromCharCode(...new Uint8Array(hash)));
        });
    });
}

function getList(text) {
  return text.trim().split(/\s*\n\s*/).filter(Boolean);
}

function registerScript(match, js) {
  return browser.contentScripts.register({
    allFrames: true,
    js: [js],
    matches: [match],
    runAt: "document_start"
  });
}
