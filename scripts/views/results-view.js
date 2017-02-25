(function (root) {
    'use strict';

    const DEFAULT_MOVES = 0;
    const DEFAULT_TIME = '00:00';
    
    let Timer = root.puzzle.helpers.Timer;
    
    class ResultsView {
        constructor(model) {
            this.$time = $('#time');
            this.$moves = $('#moves');
            
            this.clearView();
            this.render(model);
        }
        
        clearView() {
            this.stopTimer();
            this.setMoves(DEFAULT_MOVES);
            this.setTime(DEFAULT_TIME);
        }
        
        render(model) {
            this.setMoves(model.getMoves());
            this.setTime(model.getTime());
        }
        
        setMoves(moves) {
            this.$moves.text(moves);
        }
        
        startTimer() {
            Timer.start();
        }
        
        stopTimer() {
            Timer.stop();
        }
        
        setTime(time) {
            this.$time.text(time);
        }
    }
    
    root.puzzle.views.ResultsView = ResultsView;
})(window);
