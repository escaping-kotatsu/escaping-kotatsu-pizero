'use strict';

import { requestGPIOAccess } from 'node-web-gpio';//"./node_modules/node-web-gpio/dist/index.js";
import axios from 'axios';
import delay from 'delay';

(async () => {
  const gpioAccess = await requestGPIOAccess();
  const pullPin = gpioAccess.ports.get(25);
  await pullPin.export('out');

  const poll = async () => {
    axios
      .get('https://kotatsu-api.3n38.app/iot/kotatsu/1/status')
      .then(res => {
      if (res.data.pulling) {
        pullPin.write(1);
      } else {
        pullPin.write(0);
      };
    });
    await delay(500);
    poll();
  }
  poll();
})();
