(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
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
            this.template.setAttribute('data-id', model.position.currentId);
        }
        
        setElementStyle(model) {
            this.template.style.width = SETTINGS.PUZZLE_ELEMENT_SIZE - 3 + 'px';
            this.template.style.height = SETTINGS.PUZZLE_ELEMENT_SIZE - 3 + 'px';
            this.template.style.lineHeight = SETTINGS.PUZZLE_ELEMENT_SIZE + 'px';
            this.template.style.fontSize = SETTINGS.PUZZLE_ELEMENT_SIZE / 3 + 'px';
            this.template.style.left = model.position.left + 'px';
            this.template.style.top = model.position.top + 'px';
        }
        
        setElementText(model) {
            this.template.innerText = model.originId;
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
