(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementView {
        constructor(model) {
            this.$template = null;
            this.originId = model.getOriginId();
            
            this.buildTemplate();
            this.setupView(model);
            this.setupListeners();
        }
        
        setupView(model) {
            this.setStyle();
            this.setText(model);
            this.setCurrentId(model);
        }
        
        buildTemplate() {
            this.$template = $('<div>').addClass('element');
        }
        
        animate(model, duration) {
            return new Promise((resolve, reject) => {
                this.$template.animate({
                        left: model.getPosition('left'),
                        top: model.getPosition('top')
                    }, {
                        duration,
                        easing: SETTINGS.STYLE.EASING_TYPE,
                        complete: () => {
                            resolve();
                        }
                    }
                );
            });
        }
        
        move(model, duration) {
            this.setCurrentId(model);
            return this.animate(model, duration).then(() => this.onAnimateHandler(model));
        }
        
        setCurrentId(model) {
            this.$template.attr('data-id', model.getPosition('currentId'));
        }
        
        setBackgroundColor(model) {
            let color = model.isOnTargetPosition() ?
                SETTINGS.STYLE.CORRECT_POSITION_COLOR :
                SETTINGS.STYLE.INCORRECT_POSITION_COLOR;
            this.$template.css('background-color', color);
        }
        
        setStyle() {
            this.$template.css('width', SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('height', SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE);
            this.$template.css('lineHeight', SETTINGS.STYLE.ELEMENT_SIZE - SETTINGS.STYLE.BORDER_SIZE + 'px');
            this.$template.css('fontSize', SETTINGS.STYLE.ELEMENT_SIZE / 3);
            this.$template.css('borderWidth', SETTINGS.STYLE.BORDER_SIZE);
        }
        
        setText(model) {
            this.$template.text(model.getOriginId());
        }
        
        render(model, duration) {
            DOMHelper.append($('#puzzle-wrapper'), this.$template);
            return this.animate(model, duration);
        }
        
        setupListeners() {
            this.$template.on('click', (event) => this.clickHandler(event));
        }
    
        onAnimateHandler(model) {
            this.setBackgroundColor(model);
            $(document).trigger(SETTINGS.EVENTS.ELEMENT.ANIMATED);
        }
        
        clickHandler(event) {
            let payload = { currentId: event.target.dataset.id };
            $(document).trigger(SETTINGS.EVENTS.ELEMENT.CLICK, [payload]);
        }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);
