;(function(global, document, undefined) {

	function BufferLoader(ctx, callback) {
		this._ctx = ctx;
		this._cb = callback;
		this._buffers = {};
		this._index = 0;
		this._cap = 0;
	}

	BufferLoader.prototype = {
		load: function(sounds) {
			this._cap = Object.keys(sounds).length;
			for (var i in sounds) {
				this._load(i, sounds[i]);
			}
		},

		_load: function(key, url) {
			var loader = this;
			var req = new XMLHttpRequest();
			req.open("GET", url, true);
			req.responseType = "arraybuffer";
			req.onload = function() {
				loader._ctx.decodeAudioData(req.response, function(buffer) {
					if (!buffer) {
						throw "Decode audio has been failed!";
					}
					loader._buffers[key] = buffer;
					loader._index++;
					if (loader._index === loader._cap) {
						loader._complete();
					}
				});
			}

			req.onerror = function() {
				throw "HXR is failed! The key is " + key + ".";
			}

			req.send();
		},

		_complete: function() {
			this._cb(this._buffers);
		}
	};

	global.BufferLoader = BufferLoader;

})(this.self || global, document);
