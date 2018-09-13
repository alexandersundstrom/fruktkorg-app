$(document).ready(() => {
  $.getScript('test.js', () => {
    console.log('first');
    forkster();
    console.log('second');
  });
});