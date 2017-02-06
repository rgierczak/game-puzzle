(function (root) {
    'use strict';
    
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementView {
        constructor(model) {
            this.template = null;
            this.render(model);
        }
        
        render(model) {
            this.template = document.createElement('div');
            this.template.setAttribute('class', model.id);
            
            let $wrapper = document.getElementById('puzzle-wrapper');
            DOMHelper.render($wrapper, this.template);
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);


