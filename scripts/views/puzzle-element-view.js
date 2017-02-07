(function (root) {
    'use strict';
    
    const PUZZLE_ELEMENT_SIZE = 30;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementView {
        constructor(model) {
            this.model = model;
            this.template = null;
            
            this.display();
            this.setupListeners();
        }
        
        display() {
            this.buildTemplate();
            this.setElementStyle();
            this.setElementText();
            this.render();
        }
        
        buildTemplate() {
            this.template = document.createElement('div');
            this.template.setAttribute('class', 'element');
            this.template.setAttribute('data-id', this.model.position.currentId);
        }
        
        setElementStyle() {
            this.template.style.width = PUZZLE_ELEMENT_SIZE - 3 + 'px';
            this.template.style.height = PUZZLE_ELEMENT_SIZE - 3 + 'px';
            this.template.style.left = this.model.position.left + 'px';
            this.template.style.top = this.model.position.top + 'px';
        }
        
        setElementText() {
            this.template.innerText = this.model.originId;
        }
        
        render() {
            let $wrapper = document.getElementById('puzzle-wrapper');
            DOMHelper.render($wrapper, this.template);
        }
        
        setupListeners() {
            this.template.addEventListener('click', (event) => this.clickHandler(event));
        }
        
        clickHandler(event) {
            let dto = {
                detail: {
                    currentId: event.target.dataset.id,
                    template: this.template
                }
            };
            document.dispatchEvent(new CustomEvent('puzzle:click', dto));
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);


