gameGrid.renderer = (function (){
    this.draw = function(canvasId, grid) {
        var canvas = document.getElementById(canvasId);
        var fieldSize = 30;
        var grid = gameGrid.getGrid();
        var dimensions = gameGrid.getDimensions();

        // check the element is in the DOM and the browser supports canvas
        if (canvas.getContext) {
            // initialise a 2-dimensional drawing context
            var context = canvas.getContext('2d');

            setCanvasSize(canvas, dimensions.width, dimensions.height, fieldSize);
            drawGrid(context, dimensions.width, dimensions.height, fieldSize);

            for(var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] >= 0) {
                        drawPiece(context, i, j, fieldSize, grid[i][j]);
                    }
                }
            }
        }
    };

    var drawPiece = function(context, x, y, size, player) {
        var dx = (x * size) + (size/2);
        var dy = (y * size) + (size/2);
        var radius = (size/2) - (size/5);

        context.beginPath();
        context.arc(dx, dy, radius, 0, Math.PI*2, false);
        context.closePath();

        context.lineWidth = 2;
        context.strokeStyle = "#333";
        context.stroke();

        context.fillStyle = getPlayerColor(player);
        context.fill();
    }

    var getPlayerColor = function(playerNumber) {
        switch (playerNumber) {
            case 0: return '#fff'; break;
            case 1: return '#000'; break;
            case 2: return '#f00'; break;
            case 3: return '#0f0'; break;
            case 4: return '#00f'; break;
            default: return '#0ff';
        }
    }

    var setCanvasSize = function(canvas, width, height, fieldSize) {
        canvas.width = width * fieldSize + 1;
        canvas.height = height * fieldSize + 1;
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