/*!
 * hoverIntent v1.10.1 // 2019.10.05 // jQuery v1.7.0+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007-2019 Brian Cherne
 */
!function(factory){"use strict";"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof module&&module.exports?module.exports=factory(require("jquery")):jQuery&&!jQuery.fn.hoverIntent&&factory(jQuery)}(function($){"use strict";function track(ev){cX=ev.pageX,cY=ev.pageY}var cX,cY,_cfg={interval:100,sensitivity:6,timeout:0},INSTANCE_COUNT=0,compare=function(ev,$el,s,cfg){if(Math.sqrt((s.pX-cX)*(s.pX-cX)+(s.pY-cY)*(s.pY-cY))<cfg.sensitivity)return $el.off(s.event,track),delete s.timeoutId,s.isActive=!0,ev.pageX=cX,ev.pageY=cY,delete s.pX,delete s.pY,cfg.over.apply($el[0],[ev]);s.pX=cX,s.pY=cY,s.timeoutId=setTimeout(function(){compare(ev,$el,s,cfg)},cfg.interval)};$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var instanceId=INSTANCE_COUNT++,cfg=$.extend({},_cfg);$.isPlainObject(handlerIn)?(cfg=$.extend(cfg,handlerIn),$.isFunction(cfg.out)||(cfg.out=cfg.over)):cfg=$.isFunction(handlerOut)?$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector}):$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});function handleHover(e){var ev=$.extend({},e),$el=$(this),hoverIntentData=$el.data("hoverIntent");hoverIntentData||$el.data("hoverIntent",hoverIntentData={});var state=hoverIntentData[instanceId];state||(hoverIntentData[instanceId]=state={id:instanceId}),state.timeoutId&&(state.timeoutId=clearTimeout(state.timeoutId));var mousemove=state.event="mousemove.hoverIntent.hoverIntent"+instanceId;if("mouseenter"===e.type){if(state.isActive)return;state.pX=ev.pageX,state.pY=ev.pageY,$el.off(mousemove,track).on(mousemove,track),state.timeoutId=setTimeout(function(){compare(ev,$el,state,cfg)},cfg.interval)}else{if(!state.isActive)return;$el.off(mousemove,track),state.timeoutId=setTimeout(function(){!function(ev,$el,s,out){var data=$el.data("hoverIntent");data&&delete data[s.id],out.apply($el[0],[ev])}(ev,$el,state,cfg.out)},cfg.timeout)}}return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}});

$(function() {

    function showMe(){$(this).children('.timeline-content').fadeIn()}
    function hideMe(){$(this).children('.timeline-content').fadeOut()}

    $(".horizontal-timeline").hoverIntent({
        over: showMe,
        out: hideMe,
        selector: '.timeline-dot',
    });

    $( window ).on( "load", function(){

        if ($('.horizontal-timeline').length) {

            $('.horizontal-timeline .timeline-content').each(function () {
                let height = Math.round($(this).outerHeight());
                if ($(this).hasClass('top')) {
                    $(this).css('top', '-'+(height+22)+'px');
                };
            });

            let containerWidth = $('.horizontal-timeline').outerWidth();
            let timelineWidth = $('.horizontal-timeline .timeline-body').outerWidth();
            const next = $('.timeline-navigation .next');
            const prev = $('.timeline-navigation .prev');
            let pageCount = Math.ceil(timelineWidth/containerWidth);
            let currentPage = 1;

            function nextPage() {
                if (currentPage == pageCount) {
                    return null
                } else {
                    currentPage++;
                    if (prev.hasClass('disabled')) {
                        prev.removeClass('disabled')
                    };
                }
            };
            function prevPage() {
                if (currentPage == 1) {
                    return null;
                } else {
                    currentPage--;
                    if (next.hasClass('disabled')) {
                        next.removeClass('disabled')
                    };
                }
            };

            prev.click(function (e) { 
                e.preventDefault();
                prevPage();
                window.setTimeout (() => {
                    $('.horizontal-timeline').attr('arial-page', currentPage);
                    if (currentPage == 1) {
                        prev.addClass('disabled');
                    };
                }, 100);
            });
            next.click(function (e) { 
                e.preventDefault();
                nextPage();
                window.setTimeout (() => {
                    $('.horizontal-timeline').attr('arial-page', currentPage);
                    if (currentPage == pageCount) {
                        next.addClass('disabled');
                    }
                }, 100);
            });


        };

    })
	
});