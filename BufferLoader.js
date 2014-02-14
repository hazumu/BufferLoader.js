/**
 * BufferLoader.js
 *
 * @name     BufferLoader.js
 * @author   hazumu jo
 * @url      https://github.com/hazumu/BufferLoader.js
 * @version  0.0.1-beta
 * @license  Creative Commons Attribution-ShareAlike 2.1 Japan License
 */
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

			(function (key, url, loader) {
				// リクエスト作成
				var req = new XMLHttpRequest();
				req.open("GET", url, true);
				req.responseType = "arraybuffer";
				req.onload = function() {
					loader._ctx.decodeAudioData(req.response, function(buffer) {
						if (!buffer) {
							throw "Decode audio has failed!";
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
			})(key, url, loader);
		},

		_complete: function() {
			this._cb(this._buffers);
		}
	};

	global.BufferLoader = BufferLoader;

})(this.self || global, document);
