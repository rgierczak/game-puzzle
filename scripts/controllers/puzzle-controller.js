(function (root) {
    'use strict';
    
    const CUBE_SIZE = 30;
    const PUZZLE_ELEMENTS_AMOUNT = 16;
    
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    
    class PuzzleController {
        constructor() {
            this.puzzleList = new PuzzleListModel();
            this.setup();
        }
        
        setup() {
            this.setupPuzzle();
            this.setupListeners();
        }
        
        setupPuzzle() {
            for (let i = 0; i < PUZZLE_ELEMENTS_AMOUNT; i++)
                this.puzzleList.addPuzzleElement(new PuzzleElementModel(i));
    
            this.puzzleList.each((puzzleModel) => {
                new PuzzleElementView(puzzleModel);
            });
        }
        
        setupListeners() {}
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
