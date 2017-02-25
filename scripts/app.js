(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PuzzleController = root.puzzle.controllers.PuzzleController;
    
    $(document).on(SETTINGS.EVENTS.DOM_CONTENT_LOADED, () => new PuzzleController());
})(window);
