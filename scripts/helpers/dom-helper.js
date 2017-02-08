(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    let DOMHelper = {
        render($wrapper, $element) {
            $wrapper.appendChild($element);
        },
    
        setTopPosition(id) {
            return SETTINGS.ELEMENT_SIZE * Math.floor(id / 4);
        },
    
        setLeftPosition(id) {
            return SETTINGS.ELEMENT_SIZE * (id % 4);
        }
    };
    
    root.puzzle.helpers.DOMHelper = DOMHelper;
})(window);


