(function() {
    let lastTime = 0;
    let vendors = ['webkit', 'moz'];
    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            let id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
let Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			let s = p/4;
		} else {
			let s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			let s = p / 4;
		} else {
			let s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			let s = p/4;
		}
		else {
			let s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
function cssTransform(el,attr,val){
    // el.transform = {} 把 transform相关的操作都记录在元素下的transform自定义属性中
    if(!el.transform){
        el.transform = {};
    }

    if(val === undefined){
        return el.transform[attr];  
    }
    el.transform[attr] = val;
    let transformVal = "";
    for(let s in el.transform){
        switch(s){
            case "scale":
            case "scaleX":
            case "scaleY":
                transformVal += s+"("+el.transform[s]+") ";
                break;
            case "translateX":
            case "translateY":
            case "translateZ":
                transformVal += s+"("+el.transform[s]+"px) ";
                break;    
            default:
                transformVal += s+"("+el.transform[s]+"deg) ";    
        }
    }
    el.style.transform = el.style.webkitTransform = transformVal;
}
function css(el,attr,val){
    const TRANSFORM = ["scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skewX","skewY","translateX","translateY","translateZ"];
    for(let i = 0; i < TRANSFORM.length; i++){
        if(attr == TRANSFORM[i]){
            return cssTransform(el,attr,val);
        } 
    }
    if(val === undefined){
        return parseFloat(getComputedStyle(el)[attr]);
    }
    switch(attr){
        case "zIndex":
        case "opacity":
            el.style[attr] = val;
            break;
        default:
            el.style[attr] = val + "px";    
    }
}
/*
op:{
	el: 动画的元素,
	attr: {
		样式：值,
		样式：值
	}[,
		time: 动画时间,
		type: 动画形式,
		cb: function(){
			动画执行完成之后要做的事情
		}
	]
}	
*/
function mTween(op){
    let init = {
        time: 400,
        type: "linear"
    };
    for(let s in op){
        init[s] = op[s];
    }
    let delay = 1000/60; 
    let t = 0;
    let b = {};
    let c = {};
    let d = Math.ceil(init.time/delay);
    for(let s in init.attr){
        b[s] = css(init.el,s); 
        c[s] = init.attr[s] - b[s];
    }
	cancelAnimationFrame(init.el.timer);
	init.el.timer = requestAnimationFrame(move);
	function move(){
		t++;
		if(t > d){
			cancelAnimationFrame(init.el.timer);
			init.cb&&init.cb();
        } else {
            for(let s in b){
                let val = Tween[init.type](t,b[s],c[s],d);
                css(init.el,s,val); 
			}
			init.el.timer = requestAnimationFrame(move);
        }
	}
}