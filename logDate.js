// Server's Time

exports.logDate = function () {
    let getTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let theTime = new Date().toLocaleString("en-US", {
        timeZone: getTimeZone
    });
    theTime = new Date(theTime);
    console.log("**** SERVER TIME: " + getTimeZone + " ~ " + theTime.toLocaleString())
}