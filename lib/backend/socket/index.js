const socketIo = require("socket.io");
const handler = require("../activator/handler");
const store = require('../database').schedules;

const errorFunction = (socket, err) => {
  socket.emit("error", err);
}

const sendSchedules = async (socket) => {
  try {
    const docs = await store.find({});
    socket.emit("schedules", docs);
  } catch (e) {
    errorFunction(socket, "Error fetching all schedules");
  }
}

function activate(server) {
  let socketServer = socketIo(server);
  socketServer.on("connection", socket => {

    console.log("Client Connected")
    sendSchedules(socket);

    socket.on("activate", async function(id) {
      await handler.setActiveSchedule(
        id,
        () => socket.emit("endSchedule"),
        (prompt, time) => {
          socket.emit("newEvent", {
              prompt,
              time
          })
        }
      );
    });

    socket.on("deactivate", async function() {
      handler.deactivateActiveSchedule();
      socket.emit("endSchedule");
    });

    socket.on("skip", () => {
      handler.skipActiveScheduleEvent();
    })

    socket.on("disconnect", () => {
      handler.deactivateActiveSchedule();
    });
  });
}

module.exports = {
  activate
};
