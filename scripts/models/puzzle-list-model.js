(function (root) {
    'use strict';
    
    class PuzzleListModel {
        constructor() {
            this.list = [];
        }
        
        add(element) {
            this.list.push(element);
        }
        
        getList() {
            return this.list;
        }
        
        setPosition(callback) {
            this.list.forEach((element, index) => {
                element.setPosition(index);
                callback(element);
            });
        }
        
        findById(id) {
            return this.list.find((element) => {
                return element.getPosition('currentId') === Number(id);
            });
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
