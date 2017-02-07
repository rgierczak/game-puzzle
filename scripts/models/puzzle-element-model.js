(function (root) {
    'use strict';
    
    const PUZZLE_ELEMENT_SIZE = 30;
    
    class PuzzleElementModel {
        constructor(id) {
            this.id = id;
            this.position = {
                left: null,
                top: null
            };
        }
        
        setPosition(id) {
            this.position = {
                left: this.setLeftPosition(id),
                top: this.setTopPosition(id)
            }
        }
    
        setTopPosition(id) {
            return PUZZLE_ELEMENT_SIZE * Math.floor(id / 4);
        }
    
        setLeftPosition(id) {
            return PUZZLE_ELEMENT_SIZE * (id % 4);
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
