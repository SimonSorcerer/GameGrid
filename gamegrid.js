var gameGrid = (function () {
    var width, height;
    var grid = [];
    var players = [];
    var activePlayer;

    // public methods
    // --------------------------------------------------------------

    this.init = function (width, height) {
        this.setDimensions(width, height);

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

    this.getPlayers = function () {
        return players;
    }

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
        players.push(playerName || 'Anonymous');

        if (players.length === 1) {
            setActivePlayer(0);
        }
    }

    // private methods
    // --------------------------------------------------------------

    var pieceExists = function(x, y) {
        return (y < grid.length && x < grid[y].length)
    }

    var playerExists = function(playerNumber) {
        return players.length > playerNumber;
    }

    var setActivePlayer = function(index) {
        if (players.length > index) {
            activePlayer = index;
        }
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