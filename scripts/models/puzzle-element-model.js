(function (root) {
    'use strict';

    let DOMHelper = root.puzzle.helpers.DOMHelper;
    
    class PuzzleElementModel {
        constructor(id) {
            this.originId = id;
            this.position = {
                currentId: id,
                left: null,
                top: null
            };
        }
        
        setPosition(id) {
            this.position = {
                currentId: id,
                left: DOMHelper.setLeftPosition(id),
                top: DOMHelper.setTopPosition(id)
            }
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
