var util = require('util');
var EventEmitter = require('events').EventEmitter;

function StepperDriver(hardware, speed, posCount, debug, callback) {
	var self = this;
	
	this.hardware = hardware;
	this.speed = speed;
	this.posCur = 0;
	this.posCount = posCount - 1;
	this.moveInt;
	this.pinPulse = hardware.pin['G2'];
	this.pinDir = hardware.pin['G1']; 
	
	if (debug) { this.debug = debug; }
	else { this.debug = false; }
	
	setImmediate(function emitReady() {
		self.emit('ready');
	}.bind(this));
}

util.inherits(StepperDriver, EventEmitter);

StepperDriver.prototype.moveTo = function(position) {
	var self = this;
	clearInterval(self.moveInt);
	self.pinPulse.output(0);
	
	// 0 = counter clockwise / 1 = clockwise
	if (position > self.posCur) { // move clockwise
		self.pinDir.output(1);
		self.moveInt = setInterval( function() {
			if (self.posCur >= position || self.posCur > self.posCount) {
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
	
	else if (position < self.posCur) {
		self.pinDir.output(0);
		self.moveInt = setInterval( function() {
			if (self.posCur <= position || self.posCur < 1) {
				clearInterval(self.moveInt);
				self.pinPulse.output(0);
				setImmediate(function() {self.emit('arrived');}.bind(this));
			}
			else {
				self.posCur -= 1;
				self.pinPulse.toggle();
				if (self.debug) { console.log('StepperDriver~at position: ' + self.posCur); }
			}
		}.bind(this), self.speed);
	}
}

function use(hardware, speed, posCount, debug, callback) {
	return new StepperDriver(hardware, speed, posCount, debug, callback);
}

exports.StepperDriver = StepperDriver;
exports.use = use;
