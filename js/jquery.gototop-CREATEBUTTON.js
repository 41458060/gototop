/*
 * jQuery.stickthis v0.1.0
 * https://github.com/alejandromur/gototop
 *
 * Copyright 2016, alejandro@mamutlove.es
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function( $, window, document, undefined ){

    "use strict";

    $.gototop = function(el, options){

        var SCROLL = 0;
        var PAGE = $("html, body");
        var BUTTON = null;
        var base = this;

        base.$el = $(el);
        base.el = el;

        base.$el.data('gototop',base);

        base.initialize = function(){
            base.options = $.extend({},$.gototop.defaultOptions, options);
            base.checkCreate();
            base.listen();
        };

        base.checkCreate = function(){
            if( base.options.create === true ){
                BUTTON = '<button class="gototop"><span>GO TO TÖP</span></button>';
                $("body").append(BUTTON);
                base.$el = $(".gototop");
            }
        };

        base.listen = function(){
            window.addEventListener("scroll", base.getScrollPosition, false);
            base.$el.on("click", { position: base.options.position, duration: base.options.duration}, base.scrolltotop);
        };

        base.getScrollPosition = function(){
            SCROLL = document.body.scrollTop || window.pageYOffset;
            base.checkPosition();
        };

        base.checkPosition = function(){
            if( SCROLL >= base.options.visibleAt ){
                base.$el.show();
                base.$el.addClass(base.options.classname);
            }else{
                base.$el.removeClass(base.options.classname);
            }
        };

        base.scrolltotop = function(event){
            PAGE.animate({ scrollTop : event.data.position }, event.data.duration);
        };

        base.initialize();

    };

    $.gototop.defaultOptions = {
        create : false,
        position : 50,
        duration : 3000,
        classname : "isvisible",
        visibleAt : 500
    };

    $.fn.gototop = function(options){

        return this.each(function(){
            var gototop = new $.gototop(this,options);
        });
    };

}( jQuery, window, document ));