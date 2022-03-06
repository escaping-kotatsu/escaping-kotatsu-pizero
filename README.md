# escaping-kotatsu-pizero

## kotatsu-human.js
人感センサ HC-SR501<br>
→モーションセンサなので動いていないと反応しない

### 使用ピン
| PIN | Name | Use |
|-----|-----|-----|
| 2 | 5V|人感センサ VCC|
| 6 | GND | 人感センサ GND|
| 12 | GPIO18 | 人感センサ DATA |
| 37 | GPIO26 | 確認LED + |
| 34 | GND | 確認LED GND |

### センサ本体
センサを下にして左下から

|| 再検知 <br> ジャンパ | 感度調整VR | 延長時間調整 |
|-----|------|-----|-----|
|内容| L なし <br> H あり | 左 近距離 <br> 右 遠距離| 左 短い <br> 右 長い|
|設定値|L|中央|10時方向|

配線(レンズを外し、センサ側基板面に表示あり)

|GND|DATA| VCC |
|------|-----|-----|
|0V|H(+3V) 検知<br> L(0V) 非検知|+5V|

### 実行・動作
・`npm install`<br>
・`npm start`  or `node kotatsu_human.js`<br>
・START<br>
・確認用LED ON→OFF(100ミリ秒)<br>
・センサ入力開始<br>

 ||動きあり|動きなし|
 |-----|-----|-----|
 |コンソール|1 ON|0 OFF|
 |LED|ON|OFF|
