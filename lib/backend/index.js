const app = require("express")();
const cors = require('cors');
const kill = require('kill-port');

app.use(cors());

const databases = require("./database");


app.use("/api", require("./routes/api"));


const port = process.env.PORT || 8300;

const main = async () => {
    await kill(port, "tcp");
    app.listen(port, () => console.log(`Backend Service up and running on port ${port}`));
}

main();