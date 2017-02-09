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
            this.$template = $('<div>').addClass('element');
        }
        
        setPosition(model) {
            this.$template.css('left', model.getPosition('left'));
            this.$template.css('top', model.getPosition('top'));
            this.$template.attr('data-id', model.getPosition('currentId'));
        }
        
        setStyle() {
            this.$template.css('width', SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('height',SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('lineHeight', SETTINGS.STYLE.ELEMENT_SIZE + 'px');
            this.$template.css('fontSize', SETTINGS.STYLE.ELEMENT_SIZE / SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('borderWidth', SETTINGS.STYLE.BORDER_SIZE);
        }
        
        setText(model) {
            this.$template.text(model.getOriginId());
        }
        
        render() {
            let $wrapper = $('#puzzle-wrapper');
            DOMHelper.render($wrapper, this.$template);
        }
        
        setupListeners() {
            this.$template.on('click', (event) => this.clickHandler(event));
        }
        
        clickHandler(event) {
            let payload = {
                detail: {
                    currentId: event.target.dataset.id,
                    originId: this.originId
                }
            };
            
            document.dispatchEvent(new CustomEvent(SETTINGS.EVENTS.ELEMENT.CLICK, payload));
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);
