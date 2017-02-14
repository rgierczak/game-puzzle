(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    let PromiseHelper = root.puzzle.helpers.PromiseHelper;
    
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
        
        getOriginId() {
            return this.originId;
        }
        
        setupListeners() {
            this.$template.on('click', (event) => this.clickHandler(event));
        }
        
        clickHandler(event) {
            let payload = { currentId: event.target.dataset.id };
            $(document).trigger(SETTINGS.EVENTS.ELEMENT.CLICK, [payload]);
        }
        
        setText(model) {
            this.$template.text(model.getOriginId());
        }
        
        setCurrentId(model) {
            this.$template.attr('data-id', model.getPositionProperty('currentId'));
        }
        
        buildTemplate() {
            this.$template = $('<div>').addClass('element');
        }
        
        move(model, duration) {
            this.setCurrentId(model);
            return this.animate(model, duration).then(() => this.onAnimateHandler(model));
        }
        
        onAnimateHandler(model) {
            this.setBackgroundColor(model);
            $(document).trigger(SETTINGS.EVENTS.ELEMENT.ANIMATED);
        }
        
        render(model, duration) {
            DOMHelper.append($('#puzzle-wrapper'), this.$template);
            this.setBackgroundColor(model);
    
            return this.animate(model, duration).then(() => this.onAnimateHandler(model));
        }
        
        animate(model, duration) {
            return PromiseHelper.create((resolve, reject) => {
                this.animateTemplate(model, duration, resolve);
            })
        }
        
        animateTemplate(model, duration, callback) {
            this.$template.animate({
                    left: model.getPositionProperty('left'),
                    top: model.getPositionProperty('top')
                }, {
                    duration,
                    easing: SETTINGS.STYLE.EASING_TYPE,
                    complete: () => {
                        callback();
                    }
                }
            );
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
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);
