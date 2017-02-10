(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    class PuzzleListView {
        constructor() {
            this.list = [];
            
            this.$template = $('#puzzle-wrapper');
            this.setStyle();
        }
        
        setStyle() {
            let wrapperWidth = (SETTINGS.STYLE.ELEMENT_SIZE + SETTINGS.STYLE.BORDER_SIZE) * SETTINGS.STYLE.ELEMENTS_IN_ROW;
            this.$template.width(wrapperWidth + 'px');
        }
        
        add(element) {
            this.list.push(element);
        }
        
        findById(id) {
            return this.list.find((element) => {
                return element.originId === Number(id);
            });
        }
    }
    
    root.puzzle.views.PuzzleListView = PuzzleListView;
})(window);
