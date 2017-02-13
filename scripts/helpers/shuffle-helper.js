(function (root) {
    'use strict';
    
    let ShuffleHelper = {
        singleElementShuffle() {
            let arr = [];
            this.puzzleModels.list.forEach((model) => {
                if (this.setDirection(model.getPosition('currentId')) !== null) {
                    arr.push(model.getOriginId());
                }
            });
        
            let randomModelOriginId = this.getRandomModel(arr);
            let randomModel = this.puzzleModels.findByOriginId(randomModelOriginId);
            return this.movementHandler(null, randomModel, 50);
        }
    };
    
    root.puzzle.helpers.ShuffleHelper = ShuffleHelper;
})(window);
