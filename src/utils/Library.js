export const dateFormat = {
   year: "numeric",
   month: "2-digit",
   day: "2-digit",
   // hour: "2-digit",
   // minute: "2-digit",
   // second: "2-digit",
};
export const dateTimeFormat = {
   year: "numeric",
   month: "2-digit",
   day: "2-digit",
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
};
export const timeFormat = {
   hour: "2-digit",
   minute: "2-digit",
   second: "2-digit",
};

export const handleInputs = (e, { values }, { setValues }) => {
   const { name, value } = e;
   console.log("handleInputs - values", values);
   setValues({ ...values, [name]: value });
   console.log("handleInputs - values", values);
};
