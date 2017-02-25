(function (root) {
    'use strict';
    
    class ResultsModel {
        constructor() {
            this.time = '00:00';
            this.moves = 0;
        }
        
        incrementMove() {
            this.moves += 1;
        }
        
        getMoves() {
            return this.moves;
        }
        
        getTime() {
            return this.time;
        }
        
        setTime(time) {
            this.time = time;
        }
    }
    
    root.puzzle.models.ResultsModel = ResultsModel;
})(window);
