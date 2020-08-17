const { interval, fakerandom } = require('../lib');

const rand = fakerandom(243523452345);

interval((control) => {
  let num = rand.nextFloat();
  console.log(num);
  if (num < 0.05) {
    console.log('halt');
    control.halt();
  } else if (num < 0.10) {
    console.log('interval 3000');
    control.newInterval(3000);
  }
  else if (num < 0.20) {
    console.log('wait 3000');
    control.wait(3000);
  }
  else if (num > 0.90) {
    console.log('interval 1000');
    control.newInterval(1000);
  }
}, 1000);
