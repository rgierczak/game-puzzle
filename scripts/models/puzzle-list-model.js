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
        
        find(callback) {
            return this.list.find(callback);
        }
        
        every(callback) {
            return this.list.every(callback);
        }
        
        setPosition(callback) {
            this.each((element, index) => {
                element.setPosition(index);
                callback(element);
            });
        }
        
        findByCurrentId(id) {
            return this.find((element) => {
                return element.getPositionProperty('currentId') === Number(id);
            });
        }
    
        findByOriginId(id) {
            return this.find((element) => {
                return element.getOriginId() === Number(id);
            });
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
