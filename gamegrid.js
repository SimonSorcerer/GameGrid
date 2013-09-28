var gameGrid = (function () {
    var width, height;
    var grid = [];
    var players = [];
    var activePlayer;

    // private methods
    var pieceExists = function(x, y) {
        return (y >= 0 && y < grid.length && x >=0 && x < grid[y].length);
    };

    var playerExists = function (playerNumber) {
        return players.length > playerNumber;
    };

    var setActivePlayer = function(index) {
        if (players.length > index) {
            activePlayer = index;
        }
    };

    var initGrid = function(width, height) {
        var grid = [];

        // check if the dimensions are set
        if (width && height) {
            // create array of arrays (width * height) and fill with none (-1 here)
            for (var i = 0; i < height; i++) {
                grid[i] = [];
                for (var j = 0; j < width; j++) {
                    grid[i][j] = { value: -1 };
                }
            }
        }

        return grid;
    };

    // public methods
    return {
        init: function (width, height) {
            this.setDimensions(width, height);

            grid = initGrid(width, height);
        },

        setDimensions: function(w, h) {
            width = w;
            height = h;
        },

        getDimensions: function() {
            return {
                width: width,
                height: height
            }
        },

        getPlayers: function () {
            return players;
        },

        getActivePlayer: function() {
            return players[activePlayer];
        },

        getPiece: function(x, y) {
            if (pieceExists(x, y)) {
                return grid[x][y];
            }
        },

        pieceIsEmpty: function(x, y) {
            return (gameGrid.getPiece(x, y).value < 0);
        },

        hoverPiece: function(x, y) {
            if (pieceExists(x, y)) {
                grid[x][y].hover = true;
            }
        },

        pieceIsHovered: function(x, y) {
            if (pieceExists(x, y)) {
                return (grid[x][y].hover);
            }
        },

        unhoverAll: function() {
            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    grid[i][j].hover = false;
                }
            }
        },

        highlightWin: function(x, y, dx, dy, count) {
            for (var i = 0; i < count; i++) {
                if (pieceExists(x + dx * i, y + dy * i)) {
                    grid[x + dx * i][y + dy * i].win = true;
                }
            }
        },

        pieceIsWinMove: function(x, y) {
            if (pieceExists(x, y)) {
                return (grid[x][y].win);
            }
        },

        setPiece: function(x, y, val) {
            // default owner of this piece is active player
            val = val || activePlayer;

            if (pieceExists(x, y)) {
                grid[x][y].value = val;

                // if player for this piece doesn't exist, create it (and all players up to number val)
                while (!playerExists(val)) {
                    this.addPlayer();
                }

                return true;
            }
            return false;
        },

        getGrid: function() {
            return grid;
        },

        addPlayer: function(playerName) {
            players.push(playerName || 'Anonymous');

            if (players.length === 1) {
                setActivePlayer(0);
            }
        },

        nextPlayer: function() {
            activePlayer++;
            if (!playerExists(activePlayer)) {
                setActivePlayer(0);
            }
        },

        isEndGame: function() {
            return false;
        }
    }
}());