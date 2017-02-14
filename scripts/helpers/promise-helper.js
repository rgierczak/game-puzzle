(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    function* sequenceGenerator(array) {
        let id = 0;
        
        while (id < array.length - 1) {
            yield id++;
        }
    }
    
    function execute(generator, callback) {
        let next = generator.next();
        
        if (next.done) {
            callback();
        }
    }
    
    let PromiseHelper = {
        resolveAll: function (array, callback) {
            Promise.all(array).then(callback);
        },
        
        resolveSequentially(array) {
            let result = Promise.resolve();
            let generator = sequenceGenerator(array);
            
            array.forEach((promise) => {
                result = result.then(promise).then(() => {
                    execute(generator, this.sequenceHandler);
                });
            });
            
            return result;
        },

        create(callback) {
            return new Promise((resolve, reject) => {
                callback(resolve, reject);
            })
        },
    
        sequenceHandler() {
            $(document).trigger(SETTINGS.EVENTS.ELEMENTS.SHUFFLED);
        }
    };
    
    root.puzzle.helpers.PromiseHelper = PromiseHelper;
})(window);
