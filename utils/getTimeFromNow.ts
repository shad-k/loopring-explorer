const getTimeFromNow = (timestamp) => {
  const diff = Date.now() - timestamp * 1000;
  const diffInMinutes = Math.ceil(diff / 60000);
  if (diffInMinutes > 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ${diffInMinutes - hours * 60} mins`;
  } else {
    return `${diffInMinutes} mins`;
  }
};

export default getTimeFromNow;
