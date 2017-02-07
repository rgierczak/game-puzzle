(function (root) {
    'use strict';
    
    class PuzzleListModel {
        constructor() {
            this.list = [];
        }
        
        add(element) {
            this.list.push(element);
        }
        
        setPosition(callback) {
            this.list.forEach((element, index) => {
                element.setPosition(index);
                callback(element);
            });
        }
        
        find(id) {
            return this.list.find((element) => {
                return element.position.currentId === Number(id);
            });
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
