var util = require('util');
var EventEmitter = require('events').EventEmitter;

function StepperDriver(hardware, speed, debug, callback) {
	var self = this;
	
	this.hardware = hardware;
	this.speed = speed;
	this.moveInt;
	this.posCur = 0;
	this.pinPulse = hardware.pin['G2'];
	this.pinDir = hardware.pin['G3']; 
	
	if (debug) { this.debug = debug; }
	else { this.debug = false; }
	
	setImmediate(function emitReady() {
		self.emit('ready');
	}.bind(this));
}

util.inherits(StepperDriver, EventEmitter);

StepperDriver.prototype.moveTo = function(position, direction) {
	var self = this;
	direction = parseFloat(direction);
	clearInterval(self.moveInt);
	self.pinPulse.output(0);
	self.posCur = 0; // keep track of how far we've moved
	
	// 0 = counter clockwise / 1 = clockwise
	if (direction == 0) { self.pinDir.output(0); }
	else { self.pinDir.output(1); }
	
	self.moveInt = setInterval( function() {
		if (self.posCur >= position) {
			clearInterval(self.moveInt);
			self.pinPulse.output(0);
			setImmediate(function() {self.emit('arrived');}.bind(this));
		}
		else {
			self.posCur += 1;
			self.pinPulse.toggle();
			if (self.debug) { console.log('StepperDriver~at position: ' + self.posCur); }
		}
	}.bind(this), self.speed);
}

function use(hardware, speed, debug, callback) {
	return new StepperDriver(hardware, speed, debug, callback);
}

exports.StepperDriver = StepperDriver;
exports.use = use;
