(function (root) {
    'use strict';
    
    const PUZZLE_ELEMENT_SIZE = 30;
    
    class PuzzleElementModel {
        constructor(id) {
            this.id = id;
            this.position = null;
            
            this.setPosition(id);
        }
        
        setPosition(id) {
            this.position = {
                left: this.getLeftPosition(id),
                top: this.geTopPosition(id)
            }
        }
    
        geTopPosition(id) {
            return PUZZLE_ELEMENT_SIZE * Math.floor(id / 4);
        }
    
        getLeftPosition(id) {
            return PUZZLE_ELEMENT_SIZE * (id % 4);
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
