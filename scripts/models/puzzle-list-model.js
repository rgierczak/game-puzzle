(function (root) {
    'use strict';
    
    class PuzzleListModel {
        constructor() {
            this.puzzleList = [];
        }
        
        addPuzzleElement(element) {
            this.puzzleList.push(element);
        }
        
        each(callback) {
            this.puzzleList.forEach(callback);
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
