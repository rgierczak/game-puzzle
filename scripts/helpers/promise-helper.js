(function (root) {
    'use strict';
    
    let PromiseHelper = {
        resolveAll: function (array, callback) {
            Promise.all(array).then(callback);
        },
        
        resolveSequentially(array) {
            let result = Promise.resolve();
            
            array.forEach((promise) => {
                result = result.then(promise);
            });
            
            return result;
        },
        
        create(callback) {
            return new Promise((resolve, reject) => {
                callback(resolve, reject);
            })
        }
    };
    
    root.puzzle.helpers.PromiseHelper = PromiseHelper;
})(window);
