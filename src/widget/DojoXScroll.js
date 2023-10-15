	/**
	DojoXScroll
	========================

	@file      : DojoXScroll.js
	@version   : 1.2.0
	@author    : Ivo Sturm
	@date      : 13-10-2023
	@copyright : First Consulting
	@license   : Apache V2

	Documentation
	=============
	
	Add a simple scroll to top button to your Mendix page. This widget extends the dojo libraries Mendix uses by adding dojox specific libraries. In this way it is not needed to add any jQuery for instance.
	v1.1.0 - Ugraded to Mendix 8. Added scrollContainerClassNthChild setting to more easily handle pickin the nth child of the element class array you want to target
	v1.2.0 - Fix for slow page, moving retrieval of region inside the click event of the button.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dojo/_base/fx",
	"dojo/fx/easing",
	"dojo/NodeList-traverse",	
	"mxui/dom",
	"dojo/dom-style",
	"dijit/registry",
	"dojo/dom-geometry",
	"dojo/window",
	"dojo/text!DojoXScroll/widget/template/DojoXScroll.html",
	"DojoXScroll/lib/_base",
	"DojoXScroll/lib/_core",		
	"DojoXScroll/lib/smoothscroll"
], function(declare, _WidgetBase, _TemplatedMixin, baseFx, easing, NodeList,  dom, domStyle, registry, domGeom, win, widgetTemplate) {
    "use strict";

    // Declare widget's prototype.
    return declare("DojoXScroll.widget.DojoXScroll", [ _WidgetBase, _TemplatedMixin ], {
		
		//TemplatedMixin will create our dom node using this HTML template
		templateString: widgetTemplate,

		duration: 2000,
		targetClass: '.lastObject',
		timeout: 500,
		_logNode: 'DojoXScroll widget: ',
		
		postCreate : function(){
            //window.setTimeout(function() {
				this._setupEvents();
				this._styleButton();
			//},0);
		},
        // Attach events to HTML dom elements
		_setupEvents: function () {
			
			// important to target the correct window which has overflow hence a scrollbar
			var region = dojo.query(this.scrollContainerClass)[this.scrollContainerClassNthChild];
						
			if (!region){
				alert(this._logNode + ' could not find region based on input class: ' + this.scrollContainerClass + ' and ' + this.scrollContainerClassNthChild + 'th child. Please check the HTML page with Inspect Element and adjust the widget settings likewise');
			}
			
			this._addScrollEventHandler(this.topBtn);


			// important to target the correct window which has overflow hence a scrollbar
			var scrollToTopBtns = dojo.query("." + this.buttonClass);	
			
			if (scrollToTopBtns){
			
				for (var i = 0 ; i < scrollToTopBtns.length ; i++){
					this._addScrollEventHandler(scrollToTopBtns[i]);
				}
			}
			
        },
		_addScrollEventHandler : function(button){
			// add on click scroll to top event
			// v1.2.0: added region retrieval in click event, because it occurred the region wasn't available yet once the button was connected to the clck event, because of slow page loading.
            this.connect(button, "click", function (e) {
				var region = dojo.query(this.scrollContainerClass)[this.scrollContainerClassNthChild];
				dojox.fx.smoothScroll({
					node: region,
					win: region,
					offset: { x:0,y:region.scrollTop},
					duration: this.duration
				}).play(this.timeout);
				
				// return false;
				
            });
		},
		_styleButton : function(){

			this.topBtn.style.backgroundColor = this.btnBGColor;
			this.topBtn.style.border = '1px solid ' + this.btnArrowColor;
			this.topBtn.style.right = this.btnOffsetRight + 'px';
			this.topBtn.style.bottom = this.btnOffsetBottom  + 'px';
			
			// add color to the arrow glyphicon
			this.topBtn.firstElementChild.style.color = this.btnArrowColor;
		},
		update : function(obj, callback){
			
			this._updateRendering();
								
			typeof(callback) == "function" && callback();	
		},
        // Rerender the interface.
        _updateRendering: function () {
			

		}	
	});
});

require(["DojoXScroll/widget/DojoXScroll"], function() {
    "use strict";
});


