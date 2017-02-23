(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PuzzleController = root.puzzle.controllers.PuzzleController;
    let DialogView = root.puzzle.views.DialogView;
    
    class App {
        constructor() {
            this.setupListeners();
        }
        
        onLoadedHandler() {
            new PuzzleController();
        }
        
        setupListeners() {
            $(document).on(SETTINGS.EVENTS.DOM_CONTENT_LOADED, () => this.onLoadedHandler());
            $(document).on(SETTINGS.EVENTS.DIALOG.SHOW_GAME_OVER, () => new DialogView(SETTINGS.MESSAGES.GAME_OVER));
        }
    }
    
    new App();
})(window);
