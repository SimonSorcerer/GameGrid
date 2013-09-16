gameGrid.init(10, 10, "demoCanvas");
// set some black pieces
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

// set some white pieces
gameGrid.setPiece(1, 2, 0);
gameGrid.setPiece(3, 3, 0);
gameGrid.setPiece(3, 9, 0);
gameGrid.setPiece(4, 9, 0);
gameGrid.setPiece(5, 5, 0);
gameGrid.setPiece(8, 0, 0);

// some red
gameGrid.setPiece(6, 8, 2);
gameGrid.setPiece(4, 2, 2);
gameGrid.setPiece(4, 8, 2);
gameGrid.setPiece(7, 1, 2);

gameGrid.renderer.draw("demoCanvas");