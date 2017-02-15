(function (root) {
    'use strict';
    
    let MaterializeHelper = {
        initSideNav() {
            $(".button-collapse").sideNav({
                menuWidth: 500,
                edge: 'right'
            });
        }
    };
    
    root.puzzle.helpers.MaterializeHelper = MaterializeHelper;
})(window);
