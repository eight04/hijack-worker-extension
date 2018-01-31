/* eslint-env node */

require("node-sigint");

const app = require("express")();

app.get("/inline", (req, res) => {
  res.set("Content-Type", "text/html");
  res.set("Content-Security-Policy", "default-src 'none'; script-src 'self' 'unsafe-inline'");
  res.send(`
  <script>
    console.log("inline script run");
    new Worker("worker.js");
  </script>
  `);
});

app.get("/self", (req, res) => {
  res.set("Content-Type", "text/html");
  res.set("Content-Security-Policy", "default-src 'none'; script-src 'self'");
  res.send(`
  <script src="main.js"></script>
  `);
});

app.get("/main.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.send(`
    console.log("self script run");
    new Worker("worker.js");
  `);
});

app.get("/worker.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.send("console.log('worker script run')");
});

app.listen(8080);

process.on("SIGINT", () => {
	process.exit();
});
