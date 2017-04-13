import $ from 'jquery';

import './style.scss';

let count = 0;
function counter() {
  count += 1;
  console.log(count);
  $('#main').html(`You have been on this page for ${count} seconds`);
}
setInterval(counter, 1000);
