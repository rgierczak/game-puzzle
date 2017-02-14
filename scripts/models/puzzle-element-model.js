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
        
        getPositionProperty(property) {
            return this.position[property];
        }
    
        getPosition() {
            return this.position;
        }
        
        getOriginId() {
            return this.originId;
        }
        
        isOnTargetPosition() {
            return this.getOriginId() == this.getPositionProperty('currentId');
        }
    }
    
    root.puzzle.models.PuzzleElementModel = PuzzleElementModel;
})(window);
