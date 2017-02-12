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
        
        findByOrigin(id) {
            return this.list.find((element) => {
                return element.getPosition('currentId') === Number(id);
            });
        }
    }
    
    root.puzzle.models.PuzzleListModel = PuzzleListModel;
})(window);
