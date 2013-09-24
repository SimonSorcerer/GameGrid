var tictactoe = (function () {
    var win;

    // private methods
    var checkPieceForWin = function(grid, x, y, winCount) {
        if (gameGrid.pieceIsEmpty(x, y)) {
            return false;
        }

        return checkPieceForWinPartial(grid, x, y, -1, 0, winCount) ||
            checkPieceForWinPartial(grid, x, y, 1, 0, winCount) ||
            checkPieceForWinPartial(grid, x, y, 0, -1, winCount) ||
            checkPieceForWinPartial(grid, x, y, 0, 1, winCount) ||
            checkPieceForWinPartial(grid, x, y, -1, -1, winCount) ||
            checkPieceForWinPartial(grid, x, y, 1, -1, winCount) ||
            checkPieceForWinPartial(grid, x, y, 1, 1, winCount) ||
            checkPieceForWinPartial(grid, x, y, -1, 1, winCount);
    }

    var checkPieceForWinPartial = function(grid, x, y, dx, dy, winCount) {
        var value = gameGrid.getPiece(x, y).value;
        var piece;

        for (var i = 0; i < winCount; i++) {
            piece = gameGrid.getPiece(x + (i * dx), y + (i * dy));
            if (!piece || piece.value != value) {
                break;
            }
        }

        if (i == winCount) {
            gameGrid.highlightWin(x, y, dx, dy, winCount);
            return true;
        }

        return false;
    }

    var isEndGame = function () {
        var dimensions = gameGrid.getDimensions();
        var grid = gameGrid.getGrid();

        // check if the dimensions are set
        if (dimensions.width && dimensions.height) {
            for (var i = 0; i < dimensions.height; i++) {
                for (var j = 0; j < dimensions.width; j++) {
                    if (checkPieceForWin(grid, i, j, win)) {
                        return true;
                    };
                }
            }
        }

        return false;
    }

    // public methods
    return {
        init: function (canvasId, width, height, pieceSize, winCount) {
            width = width || 10;
            height = height || 10;
            pieceSize = pieceSize || 40;
            win = winCount || 5;

            gameGrid.init(width, height);

            // add players
            gameGrid.addPlayer('mr.white');
            gameGrid.addPlayer('mr.black');

            gameGrid.isEndGame = isEndGame;

            gameGrid.renderer.canvasInit(canvasId, pieceSize);
        }
    }
}());
