const BaseStore = require("./baseStore");

let schedulesStorage = require.resolve("./storage/schedules.db");
let schedulesSchema = require("./schemas/schedule");

module.exports = {
    schedules: new BaseStore(schedulesSchema, schedulesStorage)
}

