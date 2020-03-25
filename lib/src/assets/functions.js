import constants from './constants'

export default {
    sortMeetingsByJoinTime: (meetings) => {
        return meetings.sort((a, b) =>
          a.joinTime > b.joinTime ? 1 : -1
        );
      },
      daysText: (days) => {
        return days.map(day => constants.days[day]).join(", ");
      },
      timeText: (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)
}