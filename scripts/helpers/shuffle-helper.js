(function (root) {
    'use strict';
    
    let ShuffleHelper = {
        lastMovedId: null,
    
        getRandomNumber: function (array) {
            return Math.floor(Math.random() * array.length);
        },
        
        getRandomOriginId(array) {
            let randomIndex = ShuffleHelper.getRandomNumber(array);
            let isPreviousIndex = (array[randomIndex] === this.lastMovedId); 
            
            if (isPreviousIndex) {
                ShuffleHelper.getRandomOriginId(array);
            } else {
                ShuffleHelper.lastMovedId = array[randomIndex];
            }
            
            return this.lastMovedId;
        }
    };
    
    root.puzzle.helpers.ShuffleHelper = ShuffleHelper;
})(window);
