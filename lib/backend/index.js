const app = require("express")();
const http = require('http');
const cors = require("cors");
const kill = require("kill-port");
const bodyParser = require("body-parser");

const Socket = require('./socket');

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.returnStatus = (response, code, body, appendedParameters = {}) => {
    let param;
    if (code >= 200 && code <= 300) {
      param = "content";
    } else {
      param = "err";
    }

    if (body instanceof Error) {
      body = body.toString();
    }

    response
      .status(code)
      .json({
        status: code,
        [param]: body,
        source: req.originalUrl,
        ...appendedParameters
      })
      .end();
  };
  next();
});

app.use("/api", require("./routes/api"));

const port = process.env.PORT || 8300;

const main = async () => {
  const server = http.createServer(app);
  Socket.activate(server);
  await kill(port, "tcp");
  server.listen(port, () => console.log("Backend Service Connected"));
};

main();
