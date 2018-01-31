document.addEventListener("HIJACK_WORKER_INIT", ({detail: {whitelist, blacklist}}) => {
  whitelist = whitelist.map(p => new RegExp(p, "i"));
  blacklist = blacklist.map(p => new RegExp(p, "i"));
  
  window.Worker = (Worker => {
    class Worker_ extends Worker {
      constructor(url, ...args) {
        if (!valid(url)) {
          throw new Error(`Worker is not allowed: ${url}`);
        }
        super(url, ...args);
      }
    };
    Worker_.hijackSecret = "test";
    return Worker_;
  })(window.Worker);

  window.SharedWorker = (SharedWorker => {
    return class extends SharedWorker {
      constructor(url, ...args) {
        if (!valid(url)) {
          throw new Error(`SharedWorker is not allowed: ${url}`);
        }
        super(url, ...args);
      }
    };
  })(window.SharedWorker);

  const tempBlacklist = new Set;
  const tempWhitelist = new Set;

  function valid(url) {
    if (tempWhitelist.has(url)) {
      return true;
    }
    if (tempBlacklist.has(url)) {
      return false;
    }
    for (const rx of whitelist) {
      if (rx.test(url)) {
        tempWhitelist.add(url);
        return true;
      }
    }
    for (const rx of blacklist) {
      if (rx.test(url)) {
        tempBlacklist.add(url);
        return false;
      }
    }
    if (confirm(`Do you want to allow web worker "${url}"?`)) {
      tempWhitelist.add(url);
      return true;
    }
    tempBlacklist.add(url);
    return false;
  }
}, {once: true});
