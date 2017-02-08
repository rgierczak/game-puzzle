(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementView {
        constructor(model) {
            this.$template = null;
            this.originId = model.getOriginId();
    
            this.buildTemplate();
            this.setStyle();
            this.setPosition(model);
            this.setText(model);
            this.render();
            this.setupListeners();
        }

        buildTemplate() {
            this.$template = document.createElement('div');
            this.$template.setAttribute('class', 'element');
        }
        
        setPosition(model) {
            this.$template.style.left = model.getPosition('left') + 'px';
            this.$template.style.top = model.getPosition('top') + 'px';
            this.$template.setAttribute('data-id', model.getPosition('currentId'));
        }
        
        setStyle() {
            this.$template.style.width = SETTINGS.ELEMENT_SIZE - SETTINGS.BORDER_SIZE + 'px';
            this.$template.style.height = SETTINGS.ELEMENT_SIZE - SETTINGS.BORDER_SIZE + 'px';
            this.$template.style.lineHeight = SETTINGS.ELEMENT_SIZE + 'px';
            this.$template.style.fontSize = SETTINGS.ELEMENT_SIZE / SETTINGS.BORDER_SIZE + 'px';
            this.$template.style.borderWidth = SETTINGS.BORDER_SIZE + 'px';
        }
        
        setText(model) {
            this.$template.innerText = model.getOriginId();
        }
        
        render() {
            let $wrapper = document.getElementById('puzzle-wrapper');
            DOMHelper.render($wrapper, this.$template);
        }
        
        setupListeners() {
            this.$template.addEventListener('click', (event) => this.clickHandler(event));
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
