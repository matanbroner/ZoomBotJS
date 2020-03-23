const exec = require("child-process-promise").exec;
const find = require("find-process");
const schedule = require("node-schedule");
const time = require("time-number");

class Schedule {
  constructor(config) {
    this._config = config;
    this._tasks = [];
  }

  activate() {
    this._config.meetings.forEach(meeting => {
    let today = this.currentDate();
      let joinTimeParsed = this.parseTime(meeting.joinTime);
      if (
        this.createDateTime(joinTimeParsed[0], joinTimeParsed[1]) > today && meeting.days.includes(today.getDay())
      ) {
        this.scheduleMeeting(
          meeting.meetingId,
          meeting.joinTime,
          meeting.leaveTime
        );
      }
    });
  }

  deactivate() {
    this._tasks.forEach(task => task.cancel());
    this._tasks = [];
  }

  scheduleMeeting(id, joinTime, leaveTime) {
    let joinTimeParsed = this.parseTime(joinTime);
    let leaveTimeParsed = this.parseTime(leaveTime);
    this._tasks = [
      ...this._tasks,
      this.joinZoomMeeting(
        id,
        this.createDateTime(joinTimeParsed[0], joinTimeParsed[1])
      ),
      this.quitZoom(this.createDateTime(leaveTimeParsed[0], leaveTimeParsed[1]))
    ];
  }

  currentDate() {
    return new Date(Date.now());
  }

  createDateTime(hour, min) {
    const today = this.currentDate();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hour,
      min,
      0
    );
  }

  parseTime(t) {
    // 18600 -> "10:05" -> [10, 5]
    return time
      .timeFromInt(t)
      .split(":")
      .map(x => parseInt(x));
  }

  joinZoomMeeting(id, date) {
    return schedule.scheduleJob(date, function() {
      exec(`open \"zoommtg://zoom.us/join?action=join&confno=${id}\"}`)
        .then(function(result) {
          var stdout = result.stdout;
          var stderr = result.stderr;
          console.log("stdout: ", stdout);
          console.log("stderr: ", stderr);
        })
        .catch(function(err) {
          console.error("ERROR: ", err);
        });
    });
  }

  quitZoom(date) {
    return schedule.scheduleJob(date, function() {
      find("name", "zoom").then(function(list) {
        let zoom = list[0];
        process.kill(zoom.pid);
      });
    });
  }
}

module.exports = Schedule;

// {
//     "name":"Test4",
//     "meetings":[
//        {
//           "id":123,
//           "meetingId":12345,
//           "joinTime":18000,
//           "leaveTime":18600,
//           "days":[
//              0,
//              1,
//              2,
//              3,
//              4,
//              5,
//              6
//           ]
//        }
//     ],
//     "_id":"cik7ae7bUPMsrjlW"
//  }
