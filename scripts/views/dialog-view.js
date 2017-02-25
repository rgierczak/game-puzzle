(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    
    class DialogView {
        constructor() {
            this.$template = $('.modal');
            
            this.setup();
        }
        
        setup() {
            this.$template.modal({
                dismissible: true,
                opacity: .5,
                inDuration: 150,
                outDuration: 200,
                complete: () => {
                    $(document).trigger(SETTINGS.EVENTS.GAME.OVER);
                }
            });
        }
        
        show(data) {
            this.$template.find('#time-dialog').text(data.time);
            this.$template.find('#moves-dialog').text(data.moves);
    
            this.$template.modal('open');
        }
    }
    
    root.puzzle.views.DialogView = DialogView;
})(window);
