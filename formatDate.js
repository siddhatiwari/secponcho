const formatDate = date => {
  let hour = date.getHours();
  let min = date.getMinutes();
  let time = 'AM';
  if (hour > 12) {
    time = 'PM';
    hour = hour - 12;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min} ${time}`;
};

export default formatDate;