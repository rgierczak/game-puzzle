(function (root) {
    'use strict';
    
    const SETTINGS = {
        STYLE: {
            ELEMENT_SIZE: 100,
            ELEMENTS_IN_ROW: 4,
            BORDER_SIZE: 3,
            EASING_TYPE: 'easeOutBack',
            MOVE_TIME: 300,
            INIT_MOVE_TIME: 100,
            DIALOG_WIDTH: 450,
            DIALOG_HEIGHT: 300,
            CORRECT_POSITION_COLOR: '#00d025',
            INCORRECT_POSITION_COLOR: '#018aff',
            SHUFFLE_ITERATIONS: 50,
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
                START: 'game:start'
            },
            DOM_CONTENT_LOADED: 'DOMContentLoaded',
            ELEMENT: {
                CLICK: 'element:click',
                MOVED: 'element:moved',
                ANIMATED: 'element:animated'
            },
            ELEMENTS: {
                RENDERED: 'elements:rendered',
                SHUFFLED: 'elements:shuffled'
            },
            DIALOG: {
                SHOW_OK: 'dialog:show-ok',
                SHOW_GAME_OVER: 'dialog:show-game-over',
                CLICKED_OK: 'dialog:clicked-ok'
            }
        },
        MESSAGES: {
            WELCOME: 'welcome',
            GAME_OVER: 'game-over'
        }
    };
    
    root.puzzle.settings = SETTINGS;
})(window);
