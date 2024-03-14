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
export const TimeFormat2 = {
   day: "2-digit",
   hour: "2-digit",
   minute: "2-digit",
   hour12: false,
};
export const DayofWeekShortFormat = {
   weekday: "short",
};
export const DayofWeekLongFormat = {
   weekday: "long",
};

export const DateString = (dateData) => {
   return new Intl.DateTimeFormat("en-US", DateFormat).format(dateData);
};
export const TimeSting = (timeData) => {
   return new Intl.DateTimeFormat("en-US", TimeFormat).format(timeData);
};
export const DurationHM = (startDateTime, endDateTime) => {
   let lapsTime = "";
   if (startDateTime && endDateTime) {
      const diffTime = endDateTime - startDateTime;
      lapsTime = Intl.DateTimeFormat("en-US", TimeFormat2).format(diffTime);
   }
   return lapsTime;
};
export const DayOfWeekLong = (dateData) => {
   return new Intl.DateTimeFormat("en-US", DayofWeekLongFormat).format(
      dateData
   );
};
export const DayOfWeekShort = (dateData) => {
   return new Intl.DateTimeFormat("en-US", DayofWeekShortFormat).format(
      dateData
   );
};
export const HandleInputs = (e, { values }, { setValues }) => {
   const { name, value } = e;
   // console.log("handleInputs - values", values);
   setValues({ ...values, [name]: value });
   // console.log("handleInputs - values", values);
};

