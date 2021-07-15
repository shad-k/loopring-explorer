const getTimeFromNow = (timestamp) => {
  const diff = Date.now() - timestamp;
  const diffInMinutes = Math.ceil(diff / 3600);
  if (diffInMinutes > 60) {
    return `${diffInMinutes % 60} hours`;
  } else {
    return `${diffInMinutes} mins`;
  }
};

export default getTimeFromNow;
