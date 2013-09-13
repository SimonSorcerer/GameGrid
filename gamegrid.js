var gameGrid = (function () {
    var width, height;
    var canvas;
    var grid = [];

    // public methods
    // --------------------------------------------------------------

    this.init = function (width, height, elementId) {
        this.setDimensions(width, height);
        this.setCanvasId(elementId);

        this.grid = initGrid(this.width, this.height);
    }

    this.setDimensions = function(width, height) {
        this.width = width;
        this.height = height;
    };

    this.setCanvasId = function(elementId) {
        this.canvas = elementId;
    };

    this.getPiece = function(x, y) {
        if (pieceExists(x, y)) {
            return this.grid[x][y];
        }
    }

    this.setPiece = function(x, y, val) {
        if (pieceExists(x, y)) {
            this.grid[x][y] = val;
            return true;
        }
        return false;
    }

    this.switchPiece = function (x, y) {
        if (pieceExists(x, y)) {
            this.grid[x][y] = 1 - this.grid[x][y];
        }
    }

    // private methods
    // --------------------------------------------------------------

    var pieceExists = function(x, y) {
        return (y < this.grid.length && x < this.grid[y].length)
    }

    var initGrid = function(width, height) {
        var grid = [];

        // check if the dimensions are set
        if (width && height) {
            // create array of arrays (width * height) and fill with zeroes
            for (var i = 0; i < height; i++) {
                grid[i] = [];
                for (var j = 0; j < width; j++) {
                    grid[i][j] = 0;
                }
            }
        }

        return grid;
    }

    return this;
}());