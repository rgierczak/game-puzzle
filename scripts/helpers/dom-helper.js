(function (root) {
    'use strict';
    
    let DOMHelper = {
        render($wrapper, $element) {
            $wrapper.appendChild($element);
        }
    };
    
    root.puzzle.helpers.DOMHelper = DOMHelper;
})(window);


