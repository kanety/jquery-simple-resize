!function(n){var i={};function r(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/dist",r(r.s=2)}([function(t,e){t.exports=jQuery},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var i=n(0),r=n.n(i),a=(n(1),"simple-resize");function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o={top:null,bottom:null,left:null,right:null,corner:null},u=function(){function n(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.options=r.a.extend({},o,e),this.$target=r()(t),this.$document=r()(document),this.uid=(new Date).getTime()+Math.random(),this.namespace="".concat(a,"-").concat(this.uid),this.handlers={},this.startX=0,this.startY=0,this.startWidth=0,this.startHeight=0,this.init()}return function(t,e,n){e&&s(t.prototype,e),n&&s(t,n)}(n,[{key:"init",value:function(){this.$target.addClass(a).addClass("resize-target"),this.build(),this.unbind(),this.bind()}},{key:"build",value:function(){var n=this;["top","bottom","left","right","corner"].forEach(function(t){var e;1==n.options[t]?e=r()("<div>").addClass("resize-inner").appendTo(n.$target):(e=r()(n.options[t]),r.a.contains(n.$target[0],e[0])?e.addClass("resize-inner"):e.addClass(a).addClass("resize-outer")),n.handlers[t]=e.addClass("resize-".concat(t))})}},{key:"bind",value:function(){var e=this;for(var t in this.handlers)this.handlers[t].on("mousedown.".concat(this.namespace),function(t){e.start(r()(t.currentTarget),t.pageX,t.pageY)})}},{key:"unbind",value:function(){for(var t in this.handlers)this.handlers[t].off(".".concat(this.namespace));this.$document.off(".".concat(this.namespace))}},{key:"start",value:function(e,t,n){var i=this;this.startX=t,this.startY=n,this.startWidth=this.$target.width(),this.startHeight=this.$target.height(),this.$document.on("mousemove.".concat(this.namespace),function(t){i.move(e,t.pageX,t.pageY)}).on("mouseup.".concat(this.namespace),function(t){i.end(e)}).on("selectstart.".concat(this.namespace),function(t){return!1}),r()("iframe").css("pointer-events","none"),this.$target.trigger("resize:start",[e])}},{key:"move",value:function(e,t,n){var i=t-this.startX,r=n-this.startY,a=this.startWidth+i,s=this.startHeight+r;["resize-corner","resize-right","resize-left"].some(function(t){return e.hasClass(t)})&&this.$target.width(a),["resize-corner","resize-top","resize-bottom"].some(function(t){return e.hasClass(t)})&&this.$target.height(s),this.$target.trigger("resize:move",[e])}},{key:"end",value:function(t){this.$document.off(".".concat(this.namespace)),r()("iframe").css("pointer-events","auto"),this.$target.trigger("resize:end",[t])}}],[{key:"getDefaults",value:function(){return o}},{key:"setDefaults",value:function(t){r.a.extend(o,t)}}]),n}();r.a.fn.simpleResize=function(i){return this.each(function(t,e){var n=r()(e);n.data(a)||n.data(a,new u(n,i))})},r.a.SimpleResize=u}]);