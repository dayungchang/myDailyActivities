import moment from "moment";

export const DateFormat = {
   year: "numeric",
   month: "2-digit",
   day: "2-digit",
   // hour: "2-digit",
   // minute: "2-digit",
   // second: "2-digit",
};
export const DateTimeFormat = {
   year: "numeric",
   month: "2-digit",
   day: "2-digit",
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
};
export const TimeFormat = {
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
};

export const DateString = (dateData) => {
   return new Intl.DateTimeFormat("en-US", DateFormat).format(dateData);
};
export const TimeSting = (timeData) => {
   return new Intl.DateTimeFormat("en-US", TimeFormat).format(timeData);
};
export const DurationHM = (startDateTime, endDateTime) => {
   let startShiftTime = moment(
      new Intl.DateTimeFormat("en-US", DateTimeFormat).format(startDateTime),
      ["DD-MM-YYYY h:mm:ss A"]
   ).utcOffset(0, false);
   let endShiftTime = moment(
      new Intl.DateTimeFormat("en-US", DateTimeFormat).format(endDateTime),
      ["DD-MM-YYYY h:mm:ss A"]
   ).utcOffset(0, false);

   var TotalSeconds = endShiftTime.diff(startShiftTime, "seconds");

   var hours = Math.floor(TotalSeconds / 3600);
   // console.log("Hours", hours);

   var minutes = Math.floor((TotalSeconds / 60) % 60);
   return ` ${hours}:${minutes.toString().padStart(2, 0)}`;
   // console.log('hours: ' + duration.hours(), 'minutes: ' + duration.minutes());
};
export const HandleInputs = (e, { values }, { setValues }) => {
   const { name, value } = e;
   // console.log("handleInputs - values", values);
   setValues({ ...values, [name]: value });
   // console.log("handleInputs - values", values);
};

