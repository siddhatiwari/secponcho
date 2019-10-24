const formatDate = date => {
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour > 12) {
    hour = hour - 12;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
};

export default formatDate;