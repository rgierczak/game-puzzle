(function (root) {
    'use strict';
    
    let ShuffleHelper = {
        lastMovedId: null,
    
        getRandomNumber: function (array) {
            return Math.floor(Math.random() * array.length);
        },
        
        getRandomModelOriginId(array) {
            let randomIndex = ShuffleHelper.getRandomNumber(array);
            let isPreviousIndex = (array[randomIndex] === this.lastMovedId); 
            
            if (isPreviousIndex) {
                ShuffleHelper.getRandomModelOriginId(array);
            } else {
                ShuffleHelper.lastMovedId = array[randomIndex];
            }
            
            return this.lastMovedId;
        }
    };
    
    root.puzzle.helpers.ShuffleHelper = ShuffleHelper;
})(window);
