BufferLoader.js
========

Web Aoudio APIで利用する音源を非同期で読み込む

## Usage

    var ctx = new (window.AudioContext || window.webkitAudioContext);
    var sounds = {
        "sound1" : "Path to sound1",
        "sound2" : "Path to sound2"
    };

    // すべてのファイルの読み込みが終了した後に呼ばれるコールバック関数
    function cb(sounds) {
        var src = ctx.createBufferSource();
        // 利用したい音源のキーを指定
        src.buffer = sounds["sound1"];
        src.connect(ctx.destination);
        src.noteOn(0);
    }

    // Web Aoudioのコンテキストとコールバック関数をコンストラクタに与える
    var loader = new window.BufferLoader(ctx, cb);
    loader.load(sounds);

## License

BufferLoader.js is licensed under the terms of the MIT License.


## Other

- 参考: [Getting Started with Web Audio API - HTML5 Rocks](http://www.html5rocks.com/ja/tutorials/webaudio/intro/)
