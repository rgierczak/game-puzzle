(function (root) {
    'use strict';
    
    const settings = {
        STYLE: {
            ELEMENT_SIZE: 120,
            ELEMENTS_AMOUNT: 16,
            ELEMENTS_IN_ROW: 4,
            BORDER_SIZE: 3
        },
        POSITIONS: {
            LEFT: 'left',
            RIGHT: 'right',
            TOP: 'top',
            BOTTOM: 'bottom'
        },
        EVENTS: {
            DOM_CONTENT_LOADED: 'DOMContentLoaded',
            ELEMENT: {
                CLICK: 'element:click'
            }
        }
    };
    
    root.puzzle.settings = settings;
})(window);
