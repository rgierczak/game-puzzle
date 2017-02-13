(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PuzzleController = root.puzzle.controllers.PuzzleController;
    let DialogView = root.puzzle.views.DialogView;
    
    class App {
        constructor() {
            this.setupListeners();
        }
        
        setupListeners() {
            $(document).on(SETTINGS.EVENTS.DOM_CONTENT_LOADED, () => new PuzzleController());
            // $(document).on(SETTINGS.EVENTS.DOM_CONTENT_LOADED, () => new DialogView(SETTINGS.MESSAGES.WELCOME));
            // $(document).on(SETTINGS.EVENTS.DIALOG.SHOW_GAME_OVER, () => new DialogView(SETTINGS.MESSAGES.GAME_OVER));
            $(document).on(SETTINGS.EVENTS.DIALOG.CLICKED_OK, () => new PuzzleController());
        }
    }
    
    new App();
})(window);
