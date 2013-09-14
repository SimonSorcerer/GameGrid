gameGrid.init(10, 10, "demoCanvas");
// set some pieces black
gameGrid.setPiece(1, 0, 1);
gameGrid.setPiece(2, 3, 1);
gameGrid.setPiece(2, 8, 1);
gameGrid.setPiece(3, 4, 1);
gameGrid.setPiece(5, 1, 1);
gameGrid.setPiece(6, 6, 1);
gameGrid.setPiece(9, 2, 1);
gameGrid.setPiece(9, 9, 1);
gameGrid.setPiece(0, 5, 1);
gameGrid.setPiece(6, 7, 1);
gameGrid.setPiece(7, 7, 1);

gameGrid.renderer.draw("demoCanvas");