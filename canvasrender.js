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

            for(var i = 0; i < this.grid.length; i++) {
                for (var j = 0; j < this.grid[i].length; j++) {
                    if (this.grid[i][j]) {
                        drawPiece(context, i, j, fieldSize);
                    }
                }
            }
        }
    };

    var drawPiece = function(context, x, y, size) {
        var dx = (x * size) + (size/2);
        var dy = (y * size) + (size/2);
        var radius = (size/2) - (size/5);

        context.beginPath();
        context.arc(dx, dy, radius, 0, Math.PI*2, false);
        context.closePath();

        context.strokeStyle = "#333";
        context.stroke();
        context.fillStyle = "#000";
        context.fill();
    }

    var setCanvasSize = function(canvas, fieldSize) {
        canvas.width = this.width * fieldSize + 1;
        canvas.height = this.height * fieldSize + 1;
    };

    var drawGrid = function(context, width, height, size) {
        for (var x = 0; x <= width; x++) {
            context.moveTo(0.5 + x * size, 0);
            context.lineTo(0.5 + x * size, 1 + height * size);
        }


        for (var y = 0; y <= height; y++) {
            context.moveTo(0, 0.5 + y * size);
            context.lineTo(1 + width * size, 0.5 + y *size);
        }

        context.strokeStyle = "black";
        context.stroke();
    };

    return this;
}());