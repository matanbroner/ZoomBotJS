var Document = require('camo').Document;

class Schedule extends Document {
    constructor() {
        super();

        this.schema({
            name: String,
            meetings: [{
                meetingId: String,
                days: [{
                    type: Number,
                    choices: [...Array(7).keys()]
                }],
                joinTime: String,
                leaveTime: String
            }]
        })
    }
}

module.exports = Schedule