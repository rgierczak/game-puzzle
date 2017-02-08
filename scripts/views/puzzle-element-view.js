(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementView {
        constructor(model) {
            this.originId = model.originId;
            this.template = null;
            
            this.display(model);
            this.setupListeners();
        }
        
        display(model) {
            this.buildTemplate();
            this.setStyle();
            this.setPosition(model);
            this.setText(model);
            this.render();
        }
        
        buildTemplate() {
            this.template = document.createElement('div');
            this.template.setAttribute('class', 'element');

        }
        
        setPosition(model) {
            this.template.style.left = model.position.left + 'px';
            this.template.style.top = model.position.top + 'px';
            this.template.setAttribute('data-id', model.position.currentId);
        }
        
        setStyle() {
            this.template.style.width = SETTINGS.ELEMENT_SIZE - 3 + 'px';
            this.template.style.height = SETTINGS.ELEMENT_SIZE - 3 + 'px';
            this.template.style.lineHeight = SETTINGS.ELEMENT_SIZE + 'px';
            this.template.style.fontSize = SETTINGS.ELEMENT_SIZE / 3 + 'px';
        }
        
        setText(model) {
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
            let payload = {
                detail: {
                    currentId: event.target.dataset.id,
                    originId: this.originId
                }
            };
            document.dispatchEvent(new CustomEvent('element-view:click', payload));
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);
