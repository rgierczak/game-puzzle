(function (root) {
    'use strict';
    
    class PuzzleListModel {
        constructor() {
            this.list = [];
        }
        
        addPuzzleElement(element) {
            this.list.push(element);
        }
        
        setElementPosition(callback) {
            this.list.forEach((element, index) => {
                element.setPosition(index);
                callback(element);
            });
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
