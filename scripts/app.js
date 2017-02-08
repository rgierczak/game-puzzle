(function (root) {
    'use strict';
        
    let SETTINGS = root.puzzle.settings;
    let PuzzleController = root.puzzle.controllers.PuzzleController;

    function setup() {
        new PuzzleController();
    }
    
    window.addEventListener(SETTINGS.EVENTS.DOM_CONTENT_LOADED, setup);
})(window);
