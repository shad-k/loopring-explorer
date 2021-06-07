const getDateString = (date: number, inMS = false): string => {
  let dateObj: Date;
  if (!inMS) {
    dateObj = new Date(date * 1000);
  } else {
    dateObj = new Date(date);
  }

  return `${dateObj.getDate()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getFullYear()}`;
};

export default getDateString;
