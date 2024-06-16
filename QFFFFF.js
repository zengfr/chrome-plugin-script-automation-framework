

//
//
//https://github.com/zengfr/chrome-plugin-script-automation-framework
class QFFFFF {
    constructor() {
        var that = this;
        that.log('start')
        that.delay = (function() {
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                ms = that.rand(ms, ms * 2);
                that.log('delay :' + ms);
                timer = setTimeout(callback, ms);
            };
        })();
    }
    init(callback) {
        var that = this;
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js';
        script.onload = function() {
            that.log('load script');

            that.delay(function() {
                that.log('$1 ' + (typeof $));
                that.log('$2 ' + (typeof jQuery));
                that.log('$3 ' + (typeof window.$));
                that.log('$4 ' + (typeof window.jQuery));
                callback();
            }, 1000 * 3);
        };
        that.log('init script');
        document.head.appendChild(script);
    }
    rand(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }
    sleep_rnd_sync(ms, callback) {
        var that = this;
        var s = that.rand(ms, ms * 2);
        that.log('sleep: ' + s);
        setTimeout(callback, s)
    }
    async sleep_rnd_async(ms) {
        var that = this;
        var s = that.rand(ms, ms * 2);
        await that.sleep(s);
    }
    sleep(ms) {
        var that = this;
        that.log('sleep: ' + ms);
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    scrollTo(ele,p) {
      try {
            var sd = 2000;
            var so = -80;
            if (p) {
                sd = p.scroll_duration;
                so = p.scroll_offset;
            }
            $(window).scrollTo(ele, sd, {
                offset: so
            });
        } catch (ex) {
            that.log(ex.message)
            console.error(ex)
        }
    }
    click(ele, p) {
        var that = this;
        that.scrollTo(ele,p)
        that.log('click: ' + ele);
        ele.click()
        that.scrollTo(ele,p)
    }
    log(str) {
        console.info(new Date().toLocaleTimeString() + " app-> " + str);
    }
}

 
//------------------------------//
