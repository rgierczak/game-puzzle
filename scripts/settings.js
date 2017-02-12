(function (root) {
    'use strict';
    
    const SETTINGS = {
        STYLE: {
            ELEMENT_SIZE: 100,
            ELEMENTS_IN_ROW: 4,
            BORDER_SIZE: 3,
            EASING_TYPE: 'easeOutBack',
            MOVEMENT_DURATION: 150,
            INIT_MOVEMENT_DURATION: 60,
            DIALOG_WIDTH: 450,
            DIALOG_HEIGHT: 300,
            CORRECT_POSITION_COLOR: '#00d025',
            INCORRECT_POSITION_COLOR: '#018aff'
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
                CLICK: 'element:click',
                MOVED: 'element:moved',
                COLOR: 'element:color'
            },
            ELEMENTS: {
                RENDERED: 'elements:rendered'
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
