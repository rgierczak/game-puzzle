(function (root) {
    'use strict';
    
    const TIMEOUT = 300;
    const TIMEOUT_INCREMENT = 100;
    
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
            let timeOffset = TIMEOUT;
            
            this.list.forEach((element, index) => {
                setTimeout(() => {
                    element.setPosition(index);
                    callback(element);
                }, timeOffset);
                timeOffset += TIMEOUT_INCREMENT;
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
