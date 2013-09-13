gameGrid.renderer = (function (){
    this.draw = function() {
        // check the element is in the DOM and the browser supports canvas
        if (this.canvas.getContext) {

            // initialise a 2-dimensional drawing context
            var context = this.canvas.getContext('2d');

            // canvas commands go here
        }
    };
}());