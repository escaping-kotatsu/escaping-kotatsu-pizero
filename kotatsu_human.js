'use strict';

import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO を使えるようにするためのライブラリをインポート
const axios = require('axios');
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec)); // sleep 関数を定義

human();

async function human(){
	var gpioAccess = await requestGPIOAccess();
	//var sensor = document.getElementById("sensor");

  //人感センサ
	var dPort = gpioAccess.ports.get(18);  //18番ポート
	await dPort.export("in"); //入力モード
　//確認用LED
	const port = gpioAccess.ports.get(26); //26番ポート
	await port.export("out"); //出力モード

	//起動時LEDリセット
	port.write(0);
	sleep(50);
	port.write(1);
	sleep(100);
	port.write(0);
	console.log("START");

	var h = 0; //API連携用 センサー状態

  while (true) {
	  var sw = await dPort.read();
	  console.log(sw);
	  if (sw == 1) {
			port.write(1); // LEDを点灯
			console.log("ON");
			h=1;
			console.log('h=',h);
			await sleep(5000);
		} else {
			port.write(0); // LEDを消灯
			console.log("OFF");
			h=0;
			console.log('h=',h);
			await sleep(1000);
		}
	}
}

axios
  .get('https://kotatsu-api.3n38.app/iot/kotatsu/1/status')
  .then(res => {
		const pullTimerMax =  parseInt(res.data.pull_timer);
		let countM = 0;

    (async () => {
    	await sleep(60000);
    	if (++countM === pullTimerMax) {
				countM = 0;
				const result = await axios.post('https://kotatsu-api.3n38.app/login', { name: process.env.USER_NAME, pass: process.env.USER_PASS });
				const session = result.headers['set-cookie']['session'];
				await axios.post('https://kotatsu-api.3n38.app/api/user/pulling/toggle/1', {
					headers: { 'set-cookie': { session } }
				});
				// コタツコンソールの今直ぐひっぱる止めるAPI呼び出し 注: 当行コード動作未確認
			}
    })();
	});
