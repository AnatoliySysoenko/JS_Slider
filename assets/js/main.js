/** @format */

let i = 0;

let intervalId = setInterval(() => {
  console.log('setInterval called', ++i);
}, 1000);

let timerId = setTimeout(() => {
  console.log('setTimeout called');
  clearInterval(intervalId);
}, 9900);
