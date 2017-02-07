(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    class PuzzleElementModel {
        constructor(id) {
            this.originId = id;
            this.position = {
                currentId: id,
                left: null,
                top: null
            };
        }
        
        setCurrentPosition(id) {
            this.position = {
                currentId: id,
                left: this.setLeftPosition(id),
                top: this.setTopPosition(id)
            }
        }
    
        setTopPosition(id) {
            return SETTINGS.PUZZLE_ELEMENT_SIZE * Math.floor(id / 4);
        }
    
        setLeftPosition(id) {
            return SETTINGS.PUZZLE_ELEMENT_SIZE * (id % 4);
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
