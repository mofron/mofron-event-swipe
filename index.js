const TStart = require('mofron-event-touchstart');
const TMove  = require('mofron-event-touchmove');
const TEnd   = require('mofron-event-touchend');
const ConfArg = mofron.class.ConfArg;

/**
 * @file mofron-event-flick/index.js
 * @brief flick event for mofron
 * @license MIT
 */
module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @short
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname("Swipe");
            
            //this.confmng().add("isTimeout",  { type: 'boolean', init: false });
            //this.confmng().add("retTimeout", { type: 'number' });
            //this.confmng().add("st_xpos",    { type: 'number', init: 0 });
	    //this.confmng().add("st_ypos",    { type: 'number', init: 0 });
            //this.confmng().add("buf_xpos",   { type: 'number', init: 0 });
	    //this.confmng().add("buf_ypos",   { type: 'number', init: 0 });
            
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    touchEvent (p1,p2,p3) {
        try {
            if ("start" === p3.type) {
                p3.event.data('start_page_x', p2.touches[0].pageX);
		p3.event.data('start_page_y', p2.touches[0].pageY);

                p3.event.data('is_flick',     true);                
                let ret_tm = setTimeout(() => {
                    p3.event.data('is_flick', false);
                },300);
                p3.event.data("ret_timeout", ret_tm);
	    } else if ("move" === p3.type) {
                p3.event.execListener({
		    type:  'move',
		    diffX: p3.event.data('start_page_x') - p2.touches[0].pageX,
		    diffY: p3.event.data('start_page_y') - p2.touches[0].pageY,
		    pageX: p2.touches[0].pageX,
		    pageY: p2.touches[0].pageY
		});
	    } else if ("end" === p3.type) {
                if (true === p3.event.data('is_flick')) {
                    clearTimeout(p3.event.data('ret_timeout'));
                    return;
                } else {
                    p3.event.execListener({
                        type:  'end',
                        diffX: null,
                        diffY: null,
                        pageX: null,
                        pageY: null
                    });
                }
	    }


//	    if ("start" === p3.type) {
//                p3.event.isTimeout(false);
//		let ret_to = setTimeout(() => {
//                    p3.event.confmng("isTimeout",true);
//		},300);
//		p3.event.confmng("retTimeout", ret_to);
//
//                p3.event.confmng("st_xpos", p2.touches[0].pageX);
//		p3.event.confmng("st_ypos", p2.touches[0].pageY);
//	    } else if ("move" === p3.type) {
//                p3.event.confmng("buf_xpos", p2.touches[0].pageX);
//                p3.event.confmng("buf_ypos", p2.touches[0].pageY);
//	    } else if (("end" === p3.type) && (true === p3.event.isTimeout())) {
//                /* swipe event */
//                clearTimeout(p3.event.confmng("retTimeout"));
//
//                let dif_xpos = p3.event.confmng("st_xpos") - p3.event.confmng("buf_xpos");
//		let dif_ypos = p3.event.confmng("st_ypos") - p3.event.confmng("buf_ypos");
//
//		if (Math.abs(dif_xpos) < Math.abs(dif_ypos)) {
//                    if (0 < dif_ypos) {
//                        p3.event.execListener("up");
//		    } else {
//                        p3.event.execListener("down");
//		    }
//		} else {
//                    if (0 < dif_xpos) {
//                        p3.event.execListener("left");
//		    } else {
//                        p3.event.execListener("right");
//		    }
//
//		}
//                
//		//p3.event.confmng("ypos");
//                
//                
//	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    isTimeout (prm) {
        try {
            return this.confmng("isTimeout", prm);
	} catch (e) {
	    console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * event contents
     * 
     * @param (mofron.class.dom) target dom object
     * @type private
     */
    contents (dom) {
        try {
	    

            this.component().event([
                new TStart(
		    new ConfArg(this.touchEvent,{ event: this, type: "start" })
		),
                new TMove(
		    new ConfArg(this.touchEvent,{ event: this, type: "move" })
		),
                new TEnd(
		    new ConfArg(this.touchEvent,{ event: this, type: "end" })
		),
            ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
