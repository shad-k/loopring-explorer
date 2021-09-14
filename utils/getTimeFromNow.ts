import getDateString from "./getDateString";

const getTimeFromNow = (timestamp) => {
  const diff = Date.now() - timestamp * 1000;
  const diffInMinutes = Math.ceil(diff / 60000);
  if (diffInMinutes > 60) {
    const hours = Math.floor(diffInMinutes / 60);

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      if (days > 7) {
        return getDateString(timestamp, false, false);
      }

      return `${days}d ${hours - days * 24}h`;
    }
    return `${hours}h ${diffInMinutes - hours * 60}m`;
  } else {
    return `${diffInMinutes} mins`;
  }
};

export default getTimeFromNow;
