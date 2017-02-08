(function (root) {
    'use strict';
    
    const settings = {
        ELEMENT_SIZE: 120,
        ELEMENTS_AMOUNT: 16,
        ELEMENTS_IN_ROW: 4,
        POSITIONS: {
            LEFT: 'left',
            RIGHT: 'right',
            TOP: 'top',
            BOTTOM: 'bottom'
        },
        BORDER_SIZE: 3
    };
    
    root.puzzle.settings = settings;
})(window);
