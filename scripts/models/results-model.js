(function (root) {
    'use strict';
    
    class ResultsModel {
        constructor(results) {
            this.time = null;
            this.moves = results.moves;
            this.correctElements = results.correctElements;
            this.incorrectElements = results.incorrectElements;
        }
    }
    
    root.puzzle.models.ResultsModel = ResultsModel;
})(window);
