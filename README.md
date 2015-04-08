<h1>A4988 Stepper Motor Driver for the tessel.io</h1>

<h3>Some things to note</h3>
<p>The driver in this example is rated for 8volts...you may want to go with <a href="https://www.pololu.com/product/2134">this</a> driver instead.  I wasn't paying attention when I ordered them.  Wiring looks to be identical.</p>
<p>You can change the current, definitely read up on the driver's product page and set the current appropriately for the stepper motor you're using.</p>
<p>The motor does tend to get a little hot.  I leave it on for a bit and it reaches about 103deg F on the outside.  This could be because I'm throwing 8 volts at it (as noted above) instead of the rated 7.4...or I just need to tweak the current...or this is simply the nature of the beast.  Haven't figured it all out just yet so do read up!</p>
<hr>
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
<p>StepperMotor.on('arrived') - fired when using the 'moveTo(steps, direction)' function stating the motor has reached is destination</p>

<h3>Methods</h3>
<p>StepperMotor.use(hardware, speed, debug, callback)
  <ul>
    <li>hardware - what port of the tessel you're using (i.e. tessel.port['A'])</li>
    <li>speed - [WHOLE NUMBER] (in milliseconds) interval used for the pulse of the motor</li>
    <li>debug - [BOOLEAN] (OPTIONAL) true or false to use console output of the drivers</li>
    <li>callback - (OPTIONAL) not currently implemented</li>
  </ul>
</p>
<p>moveTo(steps, direction)
  <ul>
    <li>steps - [WHOLE NUMBER] the amount of steps you would like the stepper to move</li>
    <li>direction - [WHOLE NUMBER] either 0 or 1...stepper will move clockwise or counter-clockwise</li>
  </ul>
</p>
