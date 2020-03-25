const Schedule = require('./schedule');
const store = require('../database').schedules;

class ScheduleHandler {
    constructor(){
        this._activeSchedule = null;
    }
    
    async setActiveSchedule(id, end, callback){
        try {
            this.deactivateActiveSchedule();
            const schedule = await store.findById(id);
            this._activeSchedule = new Schedule(schedule);
            this._activeSchedule.activate(end, (prompt, time) => {
                callback(prompt, time);
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    deactivateActiveSchedule(){
        if(this._activeSchedule){
            this._activeSchedule.deactivate();
        }
    }

    skipActiveScheduleEvent(){
        if(this._activeSchedule){
            this._activeSchedule.skipCurrentEvent();
        }
    }
}

module.exports = new ScheduleHandler();