gameGrid.init(10, 10);
// add players
gameGrid.addPlayer('Batman');
gameGrid.addPlayer('Robin');

gameGrid.renderer.canvasInit("demoCanvas");
gameGrid.tictactoe.gameInit(5);

gameGrid.tictactoe = (function () {

    // public methods
    this.gameInit = function(winCount) {
        gameGrid.isEndGame = function() {
            return gameGrid.tictactoe.isEndGame(gameGrid.getGrid(), winCount);
        }
    }


    this.ísEndGame = function (grid, winCount) {
        var dimensions = gameGrid.getDimensions();

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
        var value = gameGrid.getPiece(x, y);

        for (var i = 0; i < winCount; i++) {
            if (gameGrid.getPiece(x + (i * dx), y + (i * dy)) != value) {
                break;
            }
        }

        return (i == winCount);
    }
}());
