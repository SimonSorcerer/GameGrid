var gameGrid = (function () {
    var width, height;
    var canvas;
    var grid = [];
    var players = [];

    // public methods
    // --------------------------------------------------------------

    this.init = function (width, height, elementId) {
        this.setDimensions(width, height);
        this.setCanvasId(elementId);

        grid = initGrid(width, height);
    }

    this.setDimensions = function(w, h) {
        width = w;
        height = h;
    };

    this.getDimensions = function() {
        return {
            width: width,
            height: height
        }
    }

    this.setCanvasId = function(elementId) {
        canvas = elementId;
    };

    this.getPiece = function(x, y) {
        if (pieceExists(x, y)) {
            return grid[x][y];
        }
    }

    this.setPiece = function(x, y, val) {
        if (pieceExists(x, y)) {
            grid[x][y] = val;

            // if player for this piece doesn't exist, create it (and all players up to number val)
            while (!playerExists(val)) {
                this.addPlayer();
            }

            return true;
        }
        return false;
    }

    this.getGrid = function() {
        return grid;
    }

    this.addPlayer = function(playerName) {
        players.push(playerName || 'anonymous');
    }

    // private methods
    // --------------------------------------------------------------

    var pieceExists = function(x, y) {
        return (y < grid.length && x < grid[y].length)
    }

    var playerExists = function(playerNumber) {
        return players.length > playerNumber;
    }

    var initGrid = function(width, height) {
        var grid = [];

        // check if the dimensions are set
        if (width && height) {
            // create array of arrays (width * height) and fill with none (-1 here)
            for (var i = 0; i < height; i++) {
                grid[i] = [];
                for (var j = 0; j < width; j++) {
                    grid[i][j] = -1;
                }
            }
        }

        return grid;
    }

    return this;
}());