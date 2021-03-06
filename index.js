const {
    exec
} = require("child_process");
const find = require("find-process");
const schedule = require('node-schedule');
const time = require("time-number");

function parseTime(t){
    return time.timeFromInt(t, { format: 12, leadingZero: false }).split(":").map((x) => parseInt(x));
}

console.log(parseTime(18600))


const main = async () => {
    await exec(`open \"zoommtg://zoom.us/join?action=join&confno=${5927518163}\"}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });


    const currentDate = new Date(Date.now());

    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 22, 28, 0);

    var j = schedule.scheduleJob(date, function () {
        find('name', 'zoom')
                .then(function (list) {
                    let zoom = list[0];
                    process.kill(zoom.pid);
                });
    });

    console.log(j)
}

main()