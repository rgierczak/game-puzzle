(function (root) {
    'use strict';

    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementModel {
        constructor(id) {
            this.originId = id;
            this.position = {
                currentId: null,
                left: null,
                top: null
            };
        }
        
        setPosition(id) {
            this.position = {
                currentId: id,
                left: DOMHelper.setLeftPosition(id),
                top: DOMHelper.setTopPosition(id)
            };
        }
        
        getPosition(property) {
            return this.position[property];
        }
        
        getOriginId() {
            return this.originId;
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
