<h1>A4988 Stepper Motor Driver for the tessel.io</h1>

<h3>Hardware</h3>
<ul>
  <li>Driver board (<a href="https://www.pololu.com/product/1182" target="_blank">this one</a>)</li>
  <li>A bipolar stepper motor (like <a href="https://www.pololu.com/product/1207" target="_blank">this one</a>)</li>
</ul>

<h3>Install <i>(not active just yet)</i></h3>
<pre>npm install tessel-stepper-4988v1</pre>

<h3>Wiring</h3>
<p>Do make sure to follow the schematic on the product page for the chip.<p>
<table>
  <tr><td>ENABLE</td><td>n/a</td></tr>
  <tr><td>MS1</td><td>n/a <i>(only wire these to get smaller steps if needed)</i></td></tr>
  <tr><td>MS2</td><td>n/a <i>(only wire these to get smaller steps if needed)</i></td></tr>
  <tr><td>MS3</td><td>n/a <i>(only wire these to get smaller steps if needed)</i></td></tr>
  <tr><td>RESET & SLEEP</td><td>jumper</td></tr>
  <tr><td>STEP</td><td>pin G2 of the tessel port you're using</td></tr>
  <tr><td>DIR</td><td>pin G3 of the tessel port you're using</td></tr>
  <tr><td>VMOT</td><td>to postive of power supply (**<i>note the 100uf they recommend be between the power + and - **</i>)</td></tr>
  <tr><td>GND</td><td>ground of power supply</td></tr>
  <tr><td>2B</td><td>BLUE wire of stepper motor if using the one recommended in this guide</td></tr>
  <tr><td>2A</td><td>RED wire of stepper motor if using the one recommended in this guide</td></tr>
  <tr><td>1A</td><td>BLACK wire of stepper motor if using the one recommended in this guide</td></tr>
  <tr><td>1B</td><td>GREEN wire of stepper motor if using the one recommended in this guide</td></tr>
  <tr><td>VDD</td><td>3.3v of tessel port</td></tr>
  <tr><td>GND</td><td>GND of tessel port</td></tr>
</table>

<h3>Example</h3>
<pre>
var tessel = require('tessel');
var stepperLib = require('stepper-4988v1');

// stepperLib.use
//  var HARDWARE = Tessel port (i.e. tessel.port['A'])
//  var SPEED = (in milliseconds) pulse rate to spin the stepper - shouldn't go below 10 as the motor may get hot
//  var DEBUG = OPTIONAL - show console output if TRUE
//  var CALLBACK = OPTIONAL - not currently implemented
var myStepper = stepperLib.use(tessel.port['D'], 10, true);

process.stdin.resume();
console.log('Type in the number of paces and the direction (0 or 1) seperated by a comma (i.e. 50,0) you would like the stepper to move to (whole numbers please)');

process.stdin.on('data', function (userInput) {
	userInput = userInput + " ";
	var myArr = userInput.split(',');
	var pos = parseFloat(myArr[0]);
	var direction = parseFloat(myArr[1]);
	console.log('Moving ' + pos + ' paces in direction ' + direction);
	myStepper.moveTo(pos, direction);
});

myStepper.on('ready', function() {
	console.log('Stepper is ready');
});

myStepper.on('arrived', function() {
	console.log('Looks like I made it!');
});
</pre>

<h3>Events</h3>
<p>StepperMotor.on('ready') - fired when driver is loaded</p>
<p>StepperMotor.on('arrived') - fired when using the 'moveTo(pos)' function stating the motor has reached is destination</p>

<h3>Methods</h3>
<p>StepperMotor.use(hardware, speed, maxposition, debug, callback)
  <ul>
    <li>hardware - what port of the tessel you're using (i.e. tessel.port['A'])</li>
    <li>speed - (in milliseconds) interval used for the pulse of the motor</li>
    <li>maxposition - used to limit the motion of the motor; will only move between 0 and 'maxposition'</li>
    <li>debug - (OPTIONAL) true or false to use console output of the drivers</li>
    <li>callback - (OPTIONAL) not currently implemented</li>
  </ul>
</p>
