(function (root) {
    'use strict';
    
    let ShuffleHelper = {
        lastMovedId: null,
    
        getRandomNumber: function (array) {
            return Math.floor(Math.random() * array.length);
        },
        
        getRandomOriginId(array) {
            let randomIndex = this.getRandomNumber(array);
            let isPreviousIndex = (array[randomIndex] === this.lastMovedId); 
            
            if (isPreviousIndex) {
                this.getRandomOriginId(array);
            } else {
                this.lastMovedId = array[randomIndex];
            }
            
            return this.lastMovedId;
        }
    };
    
    root.puzzle.helpers.ShuffleHelper = ShuffleHelper;
})(window);
