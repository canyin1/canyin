var registerId = {};
var events = {};

exports.register = function(eventName, listener) {
	if (events[eventName] == null) {
		events[eventName] = {};
		events[eventName].listeners = [];
	}

	events[eventName].listeners.push(listener)
}


exports.fire = function(eventName, params) {
		var event = events[eventName];

		if (event) {
			for (var i = 0; i < event.listeners.length; i++) {
				event.listeners[i](params);
			}
		}
	},

	exports.destroy = function(eventName, listener) {
		var event = events[eventName];

		if (event) {
			for (var i = 0; i < event.listeners.length; i++) {
				if (event.listeners[i] == listener) {
					event.listeners.splice(i, 1);
					return;
				}
			}
		}

	}
