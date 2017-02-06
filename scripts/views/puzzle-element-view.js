(function (root) {
    'use strict';
    
    class PuzzleElementView {
        constructor(model) {
            this.template = null;
            this.render(model);
        }
        
        render(model) {
            this.createElement(model.index);
        }
        
        createElement(index) {
            this.template = document.createElement('div');
            
            console.log('template: ', this.template);
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);


