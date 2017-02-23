(function (root) {
    'use strict';
    
    class ResultsModel {
        constructor(results) {
            this.time = null;
            this.moves = results.moves;
            this.correctElements = results.correctElements;
            this.incorrectElements = results.incorrectElements;
        }
        
        incrementMove() {
            this.moves += 1;
        }
        
        getMoves() {
            return this.moves;
        }
    }
    
    root.puzzle.models.ResultsModel = ResultsModel;
})(window);
