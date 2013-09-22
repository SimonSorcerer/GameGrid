gameGrid.tictactoe = (function () {

    // public methods
    this.isEndGame = function () {
        var dimensions = gameGrid.getDimensions();
        var grid = gameGrid.getGrid();
        var winCount = 3;

        // check if the dimensions are set
        if (dimensions.width && dimensions.height) {
            for (var i = 0; i < dimensions.height; i++) {
                for (var j = 0; j < dimensions.width; j++) {
                    if (checkPieceForWin(grid, i, j, winCount)) {
                        return true;
                    };
                }
            }
        }

        return false;
    }


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

        return (i == winCount);
    }
}());
