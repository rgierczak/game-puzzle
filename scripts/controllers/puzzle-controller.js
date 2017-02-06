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
            this.buildPuzzleElements();
            this.renderPuzzleList();
        }
    
        renderPuzzleList() {
            this.puzzleList.each((puzzleModel) => {
                this.renderPuzzleComponent(puzzleModel);
            });
        }
        
        renderPuzzleComponent(model) {
            new PuzzleElementView(model);
        }
    
        buildPuzzleElements() {
            for (let i = 0; i < PUZZLE_ELEMENTS_AMOUNT; i++)
                this.puzzleList.addPuzzleElement(new PuzzleElementModel(i))
        }
        
        setupListeners() {}
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
