(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    const MOVEMENT_DURATION = 800;
    
    class PuzzleElementView {
        constructor(model) {
            this.$template = null;
            this.originId = model.getOriginId();
            
            this.buildTemplate();
            this.setStyle();
            this.setText(model);
            this.render();
            this.move(model, MOVEMENT_DURATION);
            this.setupListeners();
        }
        
        buildTemplate() {
            this.$template = $('<div>').addClass('element');
        }
        
        move(model, duration) {
            this.setPosition(model, duration);
            this.setCurrentId(model)
        }
        
        setPosition(model, duration) {
            this.$template.animate({
                    left: model.getPosition('left'),
                    top: model.getPosition('top')
                }, {
                    duration,
                    easing: SETTINGS.STYLE.EASING_TYPE,
                    complete: () => {
                        $(document).trigger(SETTINGS.EVENTS.ELEMENT.MOVED);
                    }
                }
            );
        }
        
        setCurrentId(model) {
            this.$template.attr('data-id', model.getPosition('currentId'));
        }
        
        setStyle() {
            this.$template.css('width', SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('height', SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('lineHeight', SETTINGS.STYLE.ELEMENT_SIZE + 'px');
            this.$template.css('fontSize', SETTINGS.STYLE.ELEMENT_SIZE / SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('borderWidth', SETTINGS.STYLE.BORDER_SIZE);
        }
        
        setText(model) {
            this.$template.text(model.getOriginId());
        }
        
        render() {
            let $wrapper = $('#puzzle-wrapper');
            DOMHelper.append($wrapper, this.$template);
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
            
            $(document).trigger(SETTINGS.EVENTS.ELEMENT.CLICK, [payload]);
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);
