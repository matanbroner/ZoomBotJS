const exec = require("child-process-promise").exec;
const find = require("find-process");
const schedule = require("node-schedule");
const time = require("time-number");
const uuid = require("uuid").v4;

class Schedule {
  constructor(config) {
    this._config = config;
    this._tasks = {};
  }

  activate(end, callback) {
    this._callback = callback;
    this._end = end;
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
    this.notifyEventChange();
  }

  deactivate() {
    Object.values(this._tasks).forEach((task) => task.event.cancel());
    this._tasks = {};
  }

  skipCurrentEvent(){
    let tasksKeys = Object.keys(this._tasks);
    let currentTask = tasksKeys[0];
    let nextTask = tasksKeys[1];
    if(this._tasks[currentTask].key == "join"){
      this._tasks[nextTask].event.cancel();
      delete this._tasks[nextTask];
    }
    this._tasks[currentTask].event.cancel();
    delete this._tasks[currentTask];
    this.notifyEventChange();
  } 

  scheduleMeeting(id, joinTime, leaveTime) {
    let joinTimeParsed = this.parseTime(joinTime);
    let leaveTimeParsed = this.parseTime(leaveTime);
    let joinId = uuid();
    let leaveId = uuid();
    let joinTimeDate = this.createDateTime(joinTimeParsed[0], joinTimeParsed[1]);
    let leaveTimeDate = this.createDateTime(leaveTimeParsed[0], leaveTimeParsed[1]);
    this._tasks = {
      ...this._tasks,
      [joinId]: {
        key: 'join',
        time: joinTimeDate,
        event: this.joinZoomMeeting(
          id,
          joinTimeDate,
          joinId
        )
      },
      [leaveId]: {
        key: 'leave',
        time: leaveTimeDate,
        event: this.quitZoom(
          leaveTimeDate,
          leaveId
          )
      }
      };
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

  joinZoomMeeting(id, date, eventId) {
    const notify = this.notifyEventChange;
    return schedule.scheduleJob(date, function() {
      exec(`open \"zoommtg://zoom.us/join?action=join&confno=${id}\"}`)
        .then(function(result) {
          var stdout = result.stdout;
          var stderr = result.stderr;
          console.log("stdout: ", stdout);
          console.log("stderr: ", stderr);
          notify(eventId)
        })
        .catch(function(err) {
          console.error("ERROR: ", err);
        });
    });
  }

  quitZoom(date, eventId) {
    const notify = this.notifyEventChange;
    return schedule.scheduleJob(date, function() {
      find("name", "zoom").then(function(list) {
        let zoom = list[0];
        process.kill(zoom.pid);
        notify(eventId);
      });
    });
  }

  notifyEventChange(eventId){
    if(typeof this._tasks[eventId] !== 'undefined'){
      delete this._tasks[eventId];
    }
    if(Object.keys(this._tasks).length > 0){
      const nextEvent = this._tasks[Object.keys(this._tasks)[0]];
      this._callback(this.prompt(nextEvent.key), this.timeDifference(nextEvent.time));
    } else {
      this._end();
    }
  }

  prompt(key){
    switch(key){
      case "join": return "Joining next meeting";
      case "leave": return "Leaving current meeting";
      default: return "Triggering next event";
    }
  }

  timeDifference(date){
    return (date - this.currentDate()) / 1000
  }
}

module.exports = Schedule;