var Document = require('camo').Document;

class Schedule extends Document {
    constructor() {
        super();

        this.schema({
            rooms: [{
                roomId: String,
                days: [{
                    type: Number,
                    choices: [...Array(7).keys()]
                }],
                hour: {
                    type: Number,
                    choices: [...Array(24).keys()]
                } 
            }]
        })
    }
}

module.exports = Schedule