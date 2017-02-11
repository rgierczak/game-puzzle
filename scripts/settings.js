(function (root) {
    'use strict';
    
    const SETTINGS = {
        STYLE: {
            ELEMENT_SIZE: 120,
            ELEMENTS_AMOUNT: 16,
            ELEMENTS_IN_ROW: 4,
            BORDER_SIZE: 3,
            EASING_TYPE: 'easeOutBack',
            MOVEMENT_DURATION: 50,
            DIALOG_WIDTH: 400,
            DIALOG_HEIGHT: 250
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
                MOVED: 'element:moved'
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
