(function (root) {
    'use strict';
    
    const SETTINGS = {
        STYLE: {
            ELEMENT_SIZE: 80,
            ELEMENTS_IN_ROW: 4,
            BORDER_SIZE: 6,
            EASING_TYPE: 'easeOutBack',
            MOVE_TIME: 300,
            INIT_MOVE_TIME: 100,
            DIALOG_WIDTH: 450,
            DIALOG_HEIGHT: 300,
            CORRECT_POSITION_COLOR: '#00d025',
            INCORRECT_POSITION_COLOR: '#018aff',
            SHUFFLE_ITERATIONS: 100,
            SHUFFLE_MOVE_TIME: 100
        },
        POSITIONS: {
            LEFT: 'left',
            RIGHT: 'right',
            TOP: 'top',
            BOTTOM: 'bottom'
        },
        EVENTS: {
            GAME: {
                START: 'game:start',
                OVER: 'game:over'
            },
            DOM_CONTENT_LOADED: 'DOMContentLoaded',
            ELEMENT: {
                CLICK: 'element:click',
                ANIMATED: 'element:animated'
            },
            ELEMENTS: {
                RENDERED: 'elements:rendered',
                SHUFFLED: 'elements:shuffled'
            }
        },
        RESULTS: {
            TIME: {
                UPDATE: 'time:update'
            }
        }
    };
    
    root.puzzle.settings = SETTINGS;
})(window);
