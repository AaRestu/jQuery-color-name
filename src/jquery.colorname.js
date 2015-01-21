/**
 *
 * jQuery - Color Name
 * Author: Restu Suhendar www.aarestu.com
 *
 * Dual licensed under the MIT and GPL licenses
 *
 */

(function($) {
	var ColorName = function() {
		var reg_hex_color = /^#[0-9abcdefABCDEF]{6}$/,
			default_opt_get_name = {
				call_after : function() {},
				call_before : function() {},
				color_data : {}
			},
			name = function(color, opt) {
				if(!Object.keys(opt.color_data).length) {
					opt.color_data = global_color_data;
				}

				var color_rgb = rgb(color),
					check = -1,
					result;

				var color_hsl = rgb_to_hsl(color_rgb);

				for(var color_name in opt.color_data) {
					var color_d_rgb = rgb(opt.color_data[color_name]);
					var color_d_hsl = rgb_to_hsl(color_d_rgb);

					var check_hsl = Math.pow(Math.abs(color_hsl.h - color_d_hsl.h), 2) +
									Math.pow(Math.abs(color_hsl.s - color_d_hsl.s), 2) +
									Math.pow(Math.abs(color_hsl.l -  color_d_hsl.l), 2);

					var check_rgb = Math.abs(color_rgb.red - color_d_rgb.red) +
									Math.abs(color_rgb.green - color_d_rgb.green) +
									Math.abs(color_rgb.blue -  color_d_rgb.blue);

					var check_n = check_hsl + check_rgb;

					console.log(color_name + " " + check_n + " rgb " + check_rgb);
					
					if(check < 0 || check_n < check) {
						result = color_name;
						check = check_n;
					}
				};
				return { 
					name : result, 
					color_identik : opt.color_data[result] 
				};
			},
			rgb_to_hsl = function(color_rgb) {
				var r = color_rgb.red / 255, 
					g = color_rgb.green / 255, 
					b = color_rgb.blue / 255,
					hsl = {'h': 0, 's': 0, 'l': 0};

			    var max = Math.max(r, g, b), 
			    	min = Math.min(r, g, b);

			    hsl.l = (max + min) / 2;

			    if(max == min){
			        hsl.h = hsl.s = 0; // achromatic
			    }else{
			        var d = max - min;
			        hsl.s = hsl.l > 0.5 ? d / (2 - max - min) : d / (max + min);
			        switch(max){
			            case r: 
			            	hsl.h = 60 * (((g - b) / d) % 6); 
			            	if (hsl.h < 0) {
								hsl.h += 360;
							}
			            	break;
			            case g: hsl.h = 60 * ((b - r) / d + 2); break;
			            case b: hsl.h = 60 * ((r - g) / d + 4); break;
			        }
			        hsl.h /= 6;
			    }
			    console.log(hsl);
			    return hsl;
			},
			rgb = function(color) {
				if(typeof(color) != "string") {
					console.error("invalid color " + color + " is not string ");
				} else if(! reg_hex_color.exec(color)){
					console.error("invalid format color " + color);
				}

				return {
					red : parseInt("0x" + color.substring(1, 3)),
					green : parseInt("0x" + color.substring(3, 5)),
					blue : parseInt("0x" + color.substring(5, 7))
				}
			};

		return {
			getName : function(opt) {
				opt = $.extend({}, default_opt_get_name, opt||{});

				return name(this.toString(), opt).name;
			},
			getColorIdentik : function(opt) {
				opt = $.extend({}, default_opt_get_name, opt||{});
				
				return name(this.toString(), opt);
			},
			getNameBackgroundColor: function(opt) {
				opt = $.extend({}, default_opt_get_name, opt||{});
				
				var color = $(this).css('backgroundColorHex');
				console.log(color);
				return name(color, opt);
			}
		}
	}();

	$.cssHooks.backgroundColorHex = {
	    get: function(elem) {
	        if (elem.currentStyle)
	            var bg = elem.currentStyle["backgroundColor"];
	        else if (window.getComputedStyle)
	            var bg = document.defaultView.getComputedStyle(elem,
	                null).getPropertyValue("background-color");
	        if (bg.search("rgb") == -1)
	            return bg;
	        else {
	            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	            function hex(x) {
	                return ("0" + parseInt(x).toString(16)).slice(-2);
	            }
	            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
	        }
	    }
	}

	String.prototype.getColorName = ColorName.getName;
	String.prototype.getColorIdentik = ColorName.getColorIdentik;

	$.fn.extend({
		getNameBackgroundColor : ColorName.getNameBackgroundColor
	})
})(jQuery);

var global_color_data = {
	"aqua": "#00ffff",
	"aliceblue": "#f0f8ff",
	"antiquewhite": "#faebd7",
	"black": "#000000",
	"blue": "#0000ff",
	"cyan": "#00ffff",
	"darkblue": "#00008b",
	"darkcyan": "#008b8b",
	"darkgreen": "#006400",
	"darkturquoise": "#00ced1",
	"deepskyblue": "#00bfff",
	"green": "#008000",
	"lime": "#00ff00",
	"mediumblue": "#0000cd",
	"mediumspringgreen": "#00fa9a",
	"navy": "#000080",
	"springgreen": "#00ff7f",
	"teal": "#008080",
	"midnightblue": "#191970",
	"dodgerblue": "#1e90ff",
	"lightseagreen": "#20b2aa",
	"forestgreen": "#228b22",
	"seagreen": "#2e8b57",
	"darkslategray": "#2f4f4f",
	"darkslategrey": "#2f4f4f",
	"limegreen": "#32cd32",
	"mediumseagreen": "#3cb371",
	"turquoise": "#40e0d0",
	"royalblue": "#4169e1",
	"steelblue": "#4682b4",
	"darkslateblue": "#483d8b",
	"mediumturquoise": "#48d1cc",
	"indigo": "#4b0082",
	"darkolivegreen": "#556b2f",
	"cadetblue": "#5f9ea0",
	"cornflowerblue": "#6495ed",
	"mediumaquamarine": "#66cdaa",
	"dimgray": "#696969",
	"dimgrey": "#696969",
	"slateblue": "#6a5acd",
	"olivedrab": "#6b8e23",
	"slategray": "#708090",
	"slategrey": "#708090",
	"lightslategray": "#778899",
	"lightslategrey": "#778899",
	"mediumslateblue": "#7b68ee",
	"lawngreen": "#7cfc00",
	"aquamarine": "#7fffd4",
	"chartreuse": "#7fff00",
	"gray": "#808080",
	"grey": "#808080",
	"maroon": "#800000",
	"olive": "#808000",
	"purple": "#800080",
	"lightskyblue": "#87cefa",
	"skyblue": "#87ceeb",
	"blueviolet": "#8a2be2",
	"darkmagenta": "#8b008b",
	"darkred": "#8b0000",
	"saddlebrown": "#8b4513",
	"darkseagreen": "#8fbc8f",
	"lightgreen": "#90ee90",
	"mediumpurple": "#9370db",
	"darkviolet": "#9400d3",
	"palegreen": "#98fb98",
	"darkorchid": "#9932cc",
	"yellowgreen": "#9acd32",
	"sienna": "#a0522d",
	"brown": "#a52a2a",
	"darkgray": "#a9a9a9",
	"darkgrey": "#a9a9a9",
	"greenyellow": "#adff2f",
	"lightblue": "#add8e6",
	"paleturquoise": "#afeeee",
	"lightsteelblue": "#b0c4de",
	"powderblue": "#b0e0e6",
	"firebrick": "#b22222",
	"darkgoldenrod": "#b8860b",
	"mediumorchid": "#ba55d3",
	"rosybrown": "#bc8f8f",
	"darkkhaki": "#bdb76b",
	"silver": "#c0c0c0",
	"mediumvioletred": "#c71585",
	"indianred": "#cd5c5c",
	"peru": "#cd853f",
	"chocolate": "#d2691e",
	"tan": "#d2b48c",
	"lightgray": "#d3d3d3",
	"lightgrey": "#d3d3d3",
	"thistle": "#d8bfd8",
	"goldenrod": "#daa520",
	"orchid": "#da70d6",
	"palevioletred": "#db7093",
	"crimson": "#dc143c",
	"gainsboro": "#dcdcdc",
	"plum": "#dda0dd",
	"burlywood": "#deb887",
	"lightcyan": "#e0ffff",
	"lavender": "#e6e6fa",
	"darksalmon": "#e9967a",
	"palegoldenrod": "#eee8aa",
	"violet": "#ee82ee",
	"azure": "#f0ffff",
	"honeydew": "#f0fff0",
	"khaki": "#f0e68c",
	"lightcoral": "#f08080",
	"sandybrown": "#f4a460",
	"beige": "#f5f5dc",
	"mintcream": "#f5fffa",
	"wheat": "#f5deb3",
	"whitesmoke": "#f5f5f5",
	"ghostwhite": "#f8f8ff",
	"lightgoldenrodyellow": "#fafad2",
	"linen": "#faf0e6",
	"salmon": "#fa8072",
	"oldlace": "#fdf5e6",
	"bisque": "#ffe4c4",
	"blanchedalmond": "#ffebcd",
	"coral": "#ff7f50",
	"cornsilk": "#fff8dc",
	"darkorange": "#ff8c00",
	"deeppink": "#ff1493",
	"floralwhite": "#fffaf0",
	"fuchsia": "#ff00ff",
	"gold": "#ffd700",
	"hotpink": "#ff69b4",
	"ivory": "#fffff0",
	"lavenderblush": "#fff0f5",
	"lemonchiffon": "#fffacd",
	"lightpink": "#ffb6c1",
	"lightsalmon": "#ffa07a",
	"lightyellow": "#ffffe0",
	"magenta": "#ff00ff",
	"mistyrose": "#ffe4e1",
	"moccasin": "#ffe4b5",
	"navajowhite": "#ffdead",
	"orange": "#ffa500",
	"orangered": "#ff4500",
	"papayawhip": "#ffefd5",
	"peachpuff": "#ffdab9",
	"pink": "#ffc0cb",
	"red": "#ff0000",
	"seashell": "#fff5ee",
	"snow": "#fffafa",
	"tomato": "#ff6347",
	"white": "#ffffff",
	"yellow": "#ffff00",
	"rebeccapurple": "#663399"
};