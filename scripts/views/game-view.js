(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    class GameView {
        constructor() {
            this.$button = $('#start-game');
            
            this.setupListeners();
            this.disableStartButton();
        }
        
        setupListeners() {
            this.$button.on('click', (event, dto) => this.onClickHandler(event, dto));
        }
        
        destroyListeners() {
            this.$button.off('click');
        }
        
        enableStartButton() {
            this.$button.removeClass('disabled');
        }
        
        disableStartButton() {
            this.$button.addClass('disabled');
        }
        
        onClickHandler() {
            $(document).trigger(SETTINGS.EVENTS.GAME.START);
        }
    }
    
    root.puzzle.views.GameView = GameView;
})(window);
