(function (root) {
    'use strict';
    
    class PuzzleListModel {
        constructor() {
            this.list = [];
        }
        
        add(element) {
            this.list.push(element);
        }
        
        each(callback) {
            this.list.forEach(callback);
        }
        
        getList() {
            return this.list;
        }
        
        setPosition(callback) {
            this.each((element, index) => {
                element.setPosition(index);
                callback(element);
            });
        }
        
        findByCurrentId(id) {
            return this.list.find((element) => {
                return element.getPosition('currentId') === Number(id);
            });
        }
    
        findByOriginId(id) {
            return this.list.find((element) => {
                return element.getOriginId() === Number(id);
            });
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
