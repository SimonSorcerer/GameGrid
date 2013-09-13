gameGrid.renderer = (function (){
    this.draw = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        var fieldSize = 30;

        // check the element is in the DOM and the browser supports canvas
        if (canvas.getContext) {
            // initialise a 2-dimensional drawing context
            var context = canvas.getContext('2d');

            setCanvasSize(canvas, fieldSize);
            drawGrid(context, this.width, this.height, fieldSize);
        }
    };

    var setCanvasSize = function(canvas, fieldSize) {
        canvas.width = this.width * fieldSize;
        canvas.height = this.height * fieldSize;
    };

    var drawGrid = function(context, width, height, size) {
        for (var x = 0; x <= width; x++) {
            context.moveTo(x * size, 0);
            context.lineTo(x * size, height * size);
        }


        for (var y = 0; y <= height; y++) {
            context.moveTo(0, y * size);
            context.lineTo(width * size, y *size);
        }

        context.strokeStyle = "black";
        context.stroke();
    };

    return this;
}());