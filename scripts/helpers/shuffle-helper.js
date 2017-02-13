(function (root) {
    'use strict';
    
    let ShuffleHelper = {
        lastMovedId: null,
    
        getRandomNumber: function (array) {
            return Math.floor(Math.random() * array.length);
        },
        
        getRandomModel(array) {
            let randomIndex = this.getRandomNumber(array);
            let isPreviousIndex = (array[randomIndex] === this.lastMovedId); 
            
            if (isPreviousIndex) {
                this.getRandomModel(array);
            } else {
                this.lastMovedId = array[randomIndex];
            }
            
            return this.lastMovedId;
        }
    };
    
    root.puzzle.helpers.ShuffleHelper = ShuffleHelper;
})(window);
