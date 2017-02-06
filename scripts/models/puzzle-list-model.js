(function (root) {
    'use strict';
    
    class PuzzleListModel {
        constructor() {
            this.list = [];
        }
        
        addPuzzleElement(element) {
            this.list.push(element);
        }
        
        each(callback) {
            this.list.forEach(callback);
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
