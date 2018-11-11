export default function formatTimeDifference(milliseconds) {
  // https://stackoverflow.com/a/13904120
  let delta = milliseconds / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  let seconds = Math.floor(delta % 60); 

  if (days < 10) {
    days = `0${days}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${days}:${hours}:${minutes}:${seconds}`;
}
