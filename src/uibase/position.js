/**
 * position and visible extension，可定位的隐藏层
 * @author: 承玉<yiminghe@gmail.com>
 */
KISSY.add("uibase/position", function(S, DOM, Event) {


    var doc = document ,
        KEYDOWN = "keydown";

    function Position() {
    }

    Position.ATTRS = {
        x: {
            // 水平方向绝对位置
        },
        y: {
            // 垂直方向绝对位置
        },
        xy: {
            // 相对 page 定位, 有效值为 [n, m], 为 null 时, 选 align 设置
            setter: function(v) {

                var self = this,
                    xy = S.makeArray(v);

                if (xy.length) {
                    xy[0] && self.set("x", xy[0]);
                    xy[1] && self.set("y", xy[1]);
                }
                return v;
            }
        },
        zIndex: {
            value: 9999
        },
        visible:{
            value:undefined
        }
    };


    Position.prototype = {

        _uiSetZIndex:function(x) {
            this._forwordStateToView("zIndex", x);
        },
        _uiSetX:function(x) {
            this._forwordStateToView("x", x);
        },
        _uiSetY:function(y) {
            this._forwordStateToView("y", y);
        },
        _uiSetVisible:function(isVisible) {
            var self = this;
            this._forwordStateToView("visible", isVisible);
            self[isVisible ? "_bindKey" : "_unbindKey" ]();
            self.fire(isVisible ? "show" : "hide");
        },
        /**
         * 显示/隐藏时绑定的事件
         */
        _bindKey: function() {
            Event.on(doc, KEYDOWN, this._esc, this);
        },

        _unbindKey: function() {
            Event.remove(doc, KEYDOWN, this._esc, this);
        },

        _esc: function(e) {
            if (e.keyCode === 27) this.hide();
        },
        /**
         * 移动到绝对位置上, move(x, y) or move(x) or move([x, y])
         * @param {number|Array.<number>} x
         * @param {number=} y
         */
        move: function(x, y) {
            var self = this;
            if (S.isArray(x)) {
                y = x[1];
                x = x[0];
            }
            self.set("xy", [x,y]);
        },

        /**
         * 显示 Overlay
         */
        show: function() {
            this.render();
            this.set("visible", true);
            this.fire("show");
        },

        /**
         * 隐藏
         */
        hide: function() {
            this.set("visible", false);
            this.fire("hide");
        }

    };

    return Position;
}, {
    requires:["dom","event"]
});