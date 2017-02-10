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
            let timeOffset = 200;
            
            this.list.forEach((element, index) => {
                setTimeout(() => {
                    element.setPosition(index);
                    callback(element);
                }, 300 + timeOffset);
                timeOffset += 100;
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
