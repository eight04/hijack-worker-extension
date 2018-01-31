/* global config hijackScript cloneInto */

const script = document.createElement("script");
script.textContent = hijackScript;
document.documentElement.append(script);
const initEvent = new CustomEvent("HIJACK_WORKER_INIT", {
  detail: cloneInto(config, window)
});
document.dispatchEvent(initEvent);
script.remove();
