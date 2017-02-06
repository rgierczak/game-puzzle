(function (root) {
    'use strict';
    
    class PuzzleElementModel {
        constructor(id) {
            this.id = id;
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
