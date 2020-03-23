const Schedule = require('./schedule');
const store = require('../database').schedules;

class ScheduleHandler {
    constructor(){
        this._activeSchedule = null;
    }
    
    async setActiveSchedule(id){
        try {
            this.deactivateActiveSchedule();
            const schedule = await store.findById(id);
            this._activeSchedule = new Schedule(schedule);
            this._activeSchedule.activate();
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
}

module.exports = new ScheduleHandler();