var gameGrid = (function () {
    var width, height;
    var canvas;
    var grid = [];

    this.init = function (width, height, elementId) {
        this.setDimensions(width, height);
        this.setCanvasId(elementId);

        this.grid = new Array();
    }

    this.setDimensions = function(width, height) {
        this.width = width;
        this.height = height;
    };

    this.setCanvasId = function(elementId) {
        this.canvas = elementId;
    };

    var initGrid = function() {
        this.grid = [];

        // check if the dimensions are set
        if (this.width && this.height) {
            // create array of arrays (width * height) and fill with zeroes
            for (var i = 0; i < this.height; i++) {
                this.grid[i] = [];
                for (var j = 0; j < this.width; j++) {
                    this.grid[i][j] = 0;
                }
            }
        }
    }

    this.draw = function() {
        // check the element is in the DOM and the browser supports canvas
        if (this.canvas.getContext) {

            // initialise a 2-dimensional drawing context
            var context = this.canvas.getContext('2d');

            // canvas commands go here
        }
    };

    return this;
}());