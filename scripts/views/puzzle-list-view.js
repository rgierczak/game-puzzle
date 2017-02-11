(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
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
        
        getElement(id) {
            return this.list[id];
        }
        
        findByOrigin(id) {
            return this.list.find((element) => {
                return element.originId === Number(id);
            });
        }
        
        render(models) {
            let promises = [];
            models.list.forEach((model, index) => {
                let element = this.getElement(index);
                let duration = index * SETTINGS.STYLE.INIT_MOVEMENT_DURATION;
    
                promises.push(element.render(model, duration));
            });
            
            Promise.all(promises).then(() => {
                $(document).trigger(SETTINGS.EVENTS.ELEMENTS.RENDERED);
            });
        }
    }
    
    root.puzzle.views.PuzzleListView = PuzzleListView;
})(window);
