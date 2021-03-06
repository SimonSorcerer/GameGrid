gameGrid.renderer = (function (){
    var canvas;
    var fieldSize;

    // private methods
    var draw = function() {
        var grid = gameGrid.getGrid();
        var dimensions = gameGrid.getDimensions();

        // check the element is in the DOM and the browser supports canvas
        if (canvas.getContext) {
            // initialise a 2-dimensional drawing context
            var context = canvas.getContext('2d');

            setCanvasSize(canvas, dimensions.width, dimensions.height, fieldSize);
            context.clearRect(0, 0, canvas.width, canvas.height);

            drawGrid(context, dimensions.width, dimensions.height, fieldSize);

            for(var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (gameGrid.pieceIsHovered(i, j)) {
                        drawHover(context, i, j, fieldSize);
                    }

                    if (gameGrid.pieceIsWinMove(i, j)) {
                        drawWin(context, i, j, fieldSize);
                    }

                    if (!gameGrid.pieceIsEmpty(i, j)) {
                        drawPiece(context, i, j, fieldSize, grid[i][j].value);
                    }
                }
            }
        }
    };

    var pieceHover = function(e) {
        var pieceCoords = getPieceCoordinates(getCursorPosition(e));

        gameGrid.unhoverAll();
        if (gameGrid.pieceIsEmpty(pieceCoords.x, pieceCoords.y)) {
            gameGrid.hoverPiece(pieceCoords.x, pieceCoords.y);
        }

        draw();
    };

    var pieceClick = function (e) {
        var pieceCoords = getPieceCoordinates(getCursorPosition(e));

        if (gameGrid.pieceIsEmpty(pieceCoords.x, pieceCoords.y)) {
            gameGrid.setPiece(pieceCoords.x, pieceCoords.y);
        }

        if (!gameGrid.isEndGame()) {
            gameGrid.nextPlayer();
        }
        else {
            canvas.removeEventListener('click', pieceClick, false);
            canvas.removeEventListener('mousemove', pieceHover, false);

            console.log("EndGame!");
        }

        draw();
    };

    var getCursorPosition = function(e) {
        var x, y;

        if (e.pageX !== undefined && e.pageY !== undefined) {
            x = e.pageX;
            y = e.pageY;
        }
        else { // firefox method to get position
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        return {
            x: x,
            y: y
        };
    };

    var getPieceCoordinates = function(cursorCoords) {
        return {
            x: Math.floor(cursorCoords.x / fieldSize),
            y: Math.floor(cursorCoords.y / fieldSize)
        };
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
    };

    var drawHover = function(context, x, y, fieldSize) {
        context.beginPath();
        context.rect(x * fieldSize + 0.5, y * fieldSize + 0.5, fieldSize, fieldSize);
        context.closePath();

        context.fillStyle = "#dae6bc";
        context.fill();
    };

    var drawWin = function(context, x, y, fieldSize) {
        context.beginPath();
        context.rect(x * fieldSize + 0.5, y * fieldSize + 0.5, fieldSize, fieldSize);
        context.closePath();

        context.fillStyle = "#e65372";
        context.fill();
    };

    var getPlayerColor = function(playerNumber) {
        switch (playerNumber) {
            case 0: return '#fff';
            case 1: return '#000';
            case 2: return '#f00';
            case 3: return '#0f0';
            case 4: return '#00f';
            default: return '#0ff';
        }
    };

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

    // public methods
    return {
        canvasInit: function(canvasId, pixelSize) {
            canvas = document.getElementById(canvasId);
            fieldSize = pixelSize;

            draw();

            // add listener events
            canvas.addEventListener('click', pieceClick, false);
            canvas.addEventListener('mousemove', pieceHover, false);
        }
    };
}());