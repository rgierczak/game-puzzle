(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    let DOMHelper = {
        render($wrapper, $element) {
            $wrapper.append($element);
        },
    
        setTopPosition(id) {
            return SETTINGS.STYLE.ELEMENT_SIZE * Math.floor(id / 4);
        },
    
        setLeftPosition(id) {
            return SETTINGS.STYLE.ELEMENT_SIZE * (id % 4);
        },
        
        createDialogBody(message) {
            return $('<p>' + message.body + '</p>');
        }
    };
    
    root.puzzle.helpers.DOMHelper = DOMHelper;
})(window);
