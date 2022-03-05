import {requestGPIOAccess} from "./node_modules/node-web-gpio/dist/index.js"; // WebGPIO を使えるようにするためのライブラリをインポート
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

  while (true) {
	  var sw = await dPort.read();
	  console.log(sw);
	  if (sw == 1) {
			port.write(1); // LEDを点灯
			console.log("ON");
			await sleep(5000);
		} else {
			port.write(0); // LEDを消灯
			console.log("OFF");
			await sleep(1000);
		}
	}
}
