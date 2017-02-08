(function (root) {
    'use strict';
    
    class ResultsModel {
        constructor() {
            this.time = null;
            this.moves = null;
        }
    }
    
    root.puzzle.models.ResultsModel = ResultsModel;
})(window);
