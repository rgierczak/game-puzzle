(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PromiseHelper = root.puzzle.helpers.PromiseHelper;
    
    class PuzzleListView {
        constructor() {
            this.list = [];
            
            this.$template = $('#puzzle-wrapper').empty();
            this.setStyle();
        }
        
        setStyle() {
            let wrapperWidth =
                (SETTINGS.STYLE.ELEMENT_SIZE +
                SETTINGS.STYLE.BORDER_SIZE) *
                SETTINGS.STYLE.ELEMENTS_IN_ROW;
            
            this.$template.width(wrapperWidth + 'px');
        }
        
        add(element) {
            this.list.push(element);
        }
        
        each(callback) {
            this.list.forEach(callback);
        }
        
        getElement(id) {
            return this.list[id];
        }
        
        getCurrentView(model) {
            return this.findByOriginId(model.getOriginId());
        }
        
        findByOriginId(id) {
            return this.list.find((element) => {
                return element.getOriginId() === Number(id);
            });
        }
        
        render(models) {
            let promises = this.getElementsToRender(models);
            
            PromiseHelper.resolveAll(promises, () => {
                $(document).trigger(SETTINGS.EVENTS.ELEMENTS.RENDERED);
            });
        }
        
        getElementsToRender(models) {
            let promises = [];
            
            models.each((model, index) => {
                let element = this.getElement(index);
                let duration = index * SETTINGS.STYLE.INIT_MOVE_TIME;
                
                promises.push(element.render(model, duration));
            });
            
            return promises;
        }
    }
    
    root.puzzle.views.PuzzleListView = PuzzleListView;
})(window);
