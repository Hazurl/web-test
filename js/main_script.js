(function() {

    function clamp(num, a, b) {
        return ((num < a) ? a : ((num > b) ? b : num));
    }

    var scroll_info = {
        current_view : 0,
        view_scroll : window.scrollY,

        marge : 20,
        views : [
            "top", "aboutme", "projects", "contactme"
        ],
        views_count : 4,
        views_y : [0, 0, 0, 0],
        nav_buttons : [null, null, null, null],

        trigger : true,

        init : function() {
            this.views_count = this.views.length;
            for (i = 0; i < this.views_count; ++i) {
                var anchor = document.getElementById('anchor-' + this.views[i]);
                if (anchor == null)
                    console.log('Element not found : anchor-' + this.views[i]);
                else 
                    this.views_y[i] = this.getElementPosition(anchor).top;  

                this.nav_buttons[i] = document.getElementById('nav-button-' + this.views[i]);
                (function(index, t) {
                    t.nav_buttons[index].addEventListener('click', function() {
                        t.changeView(index);
                    });
                })(i, this);
            }
            window.addEventListener('scroll', function (e) { scroll_info.onScroll(window.scrollY); });
            console.log(this);
        },

        getElementPosition : function(element) {
            var bodyRect = document.body.getBoundingClientRect(),
            elemRect = element.getBoundingClientRect();
            return  {
                top : elemRect.top - bodyRect.top,
                left : elemRect.left - bodyRect.left,
                right : elemRect.right - bodyRect.right,
                bottom : elemRect.bottom - bodyRect.bottom
            };
        },

        changeView : function(index) {
            this.current_view = clamp(index, 0, this.views_count - 1);
            window.scrollTo(0, this.views_y[this.current_view]);
            this.view_scroll = this.views_y[this.current_view];
            console.log("Change to view #" + this.current_view);
        },

        onScroll : function(scroll) {
            if (!this.trigger) {
                this.trigger = true;
                return;
            }
            this.trigger = false;
            delta = scroll - this.view_scroll;
            console.log("Delta : " + delta);
            if (delta > scroll_info.marge) {
                this.changeView(this.current_view + 1);
                console.log("Delta above");
            } else if (delta < -scroll_info.marge) {
                this.changeView(this.current_view - 1);
                console.log("Delta under");
            }
        }
    
    };
    scroll_info.init();
})();