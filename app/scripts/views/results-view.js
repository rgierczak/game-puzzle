(function (root) {
    'use strict';
    
    let Timer = root.puzzle.helpers.Timer;
    
    class ResultsView {
        constructor(model) {
            this.$time = $('#time');
            this.$moves = $('#moves');
            
            this.clearView(model);
            this.render(model);
        }
        
        clearView(model) {
            this.stopTimer();
            this.render(model)
        }
        
        render(model) {
            this.renderMoves(model.getMoves());
            this.renderTime(model.getTime());
        }
        
        renderMoves(moves) {
            this.$moves.text(moves);
        }
        
        startTimer() {
            Timer.start();
        }
        
        stopTimer() {
            Timer.stop();
        }
        
        renderTime(time) {
            this.$time.text(time);
        }
    }
    
    root.puzzle.views.ResultsView = ResultsView;
})(window);
