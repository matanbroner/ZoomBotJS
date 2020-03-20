const app = require("express")();
const cors = require("cors");
const kill = require("kill-port");
const bodyParser = require("body-parser");

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
  await kill(port, "tcp");
  app.listen(port, () =>
    console.log(`Backend Service up and running on port ${port}`)
  );
};

main();
