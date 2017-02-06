(function (root) {
    'use strict';
    
    const PUZZLE_ELEMENT_SIZE = 30;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementView {
        constructor(model) {
            this.template = null;
            
            this.display(model);
            this.setupListeners();
        }
    
        display(model) {
            this.buildTemplate(model);
            this.setElementStyle(model);
            this.setElementText(model);
            this.render();
        }
    
        buildTemplate(model) {
            this.template = document.createElement('div');
            this.template.setAttribute('class', 'element');
            this.template.setAttribute('data-id', model.id);
        }
    
        setElementStyle(model) {
            this.template.style.width = PUZZLE_ELEMENT_SIZE - 3 + 'px';
            this.template.style.height = PUZZLE_ELEMENT_SIZE - 3 + 'px';
            this.template.style.left = model.position.left + 'px';
            this.template.style.top = model.position.top + 'px';
        }
        
        setElementText(model) {
            this.template.innerText = model.id;
        }
    
        render() {
            let $wrapper = document.getElementById('puzzle-wrapper');
            DOMHelper.render($wrapper, this.template);
        }
        
        setupListeners() {
            this.template.addEventListener('click', this.clickHandler);
        }
        
        clickHandler(event) {
            let dto = { detail: event.target.dataset.id };
            document.dispatchEvent(new CustomEvent('puzzle:click', dto));
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);


