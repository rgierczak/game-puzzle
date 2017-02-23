(function (root) {
    'use strict';
    
    class ResultsView {
        constructor() {
            this.$time = $('#time');
            this.$moves = $('#moves');
            this.$correctElements = $('#correct-elements');
            this.$incorrectElements = $('#incorrect-elements');
            
            this.setupListeners();
        }
        
        render(model) {
            this.setMoves(model.moves);
            this.setCorrectElements(model.correctElements);
            this.setIncorrectElements(model.incorrectElements);
        }
        
        setMoves(moves) {
            this.$moves.text(moves);
        }
        
        setCorrectElements(elements) {
            this.$correctElements.text(elements);
        }
        
        setIncorrectElements(elements) {
            this.$incorrectElements.text(elements);
        }
        
        setupListeners() {
            
        }
    }
    
    root.puzzle.views.ResultsView = ResultsView;
})(window);
