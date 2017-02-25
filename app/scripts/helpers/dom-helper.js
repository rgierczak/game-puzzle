(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    let DOMHelper = {
        append($wrapper, $element) {
            $wrapper.append($element);
        },
    
        html($wrapper, $element) {
            $wrapper.html($element);
        },
    
        setTopPosition(id) {
            return SETTINGS.STYLE.ELEMENT_SIZE * Math.floor(id / SETTINGS.STYLE.ELEMENTS_IN_ROW);
        },
    
        setLeftPosition(id) {
            return SETTINGS.STYLE.ELEMENT_SIZE * (id % SETTINGS.STYLE.ELEMENTS_IN_ROW);
        }
    };
    
    root.puzzle.helpers.DOMHelper = DOMHelper;
})(window);
