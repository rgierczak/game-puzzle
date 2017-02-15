(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    class GameView {
        constructor() {
            this.setupListeners();
        }
        
        setupListeners() {
            $('#start-game').on('click', (event, dto) => this.onClickHandler(event, dto));
        }
        
        destroyListeners() {
            $('#start-game').off('click');
        }
        
        onClickHandler() {
            $(document).trigger(SETTINGS.EVENTS.GAME.START);
        }
    }
    
    root.puzzle.views.GameView = GameView;
})(window);
