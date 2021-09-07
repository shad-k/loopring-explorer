const getPaddedNumber = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

const getTime = (date: Date): string => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${getPaddedNumber(hours)}:${getPaddedNumber(
    minutes
  )}:${getPaddedNumber(seconds)} UTC`;
};

const getMonth = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getUTCMonth()];
};

const getDateString = (
  date: number,
  inMS = false,
  includeTime = true
): string => {
  let dateObj: Date;
  if (!inMS) {
    dateObj = new Date(date * 1000);
  } else {
    dateObj = new Date(date);
  }

  if (!includeTime) {
    return `${getMonth(dateObj)}-${getPaddedNumber(
      dateObj.getUTCDate()
    )}-${dateObj.getUTCFullYear()}`;
  }

  return `${getMonth(dateObj)}-${getPaddedNumber(
    dateObj.getUTCDate()
  )}-${dateObj.getUTCFullYear()} ${getTime(dateObj)}`;
};

export default getDateString;
