(function (root) {
    'use strict';
    
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    let SETTINGS = root.puzzle.settings;
    
    function getMessage(messageType) {
        switch (messageType) {
            case 'welcome':
                return {
                    title: 'Welcome in numeric puzzle game',
                    body: 'The goal is to set number sequence in ascending order, starting from top left corner, ' +
                    'as fast as you can!' + '\<br/>\<br/>' + 'Good luck!'
                };
            case 'game-over':
                return {
                    title: 'GAME OVER',
                    body: 'Congratulations!'
                };
            default:
                return 'Unrecognized message type';
        }
    }
    
    class DialogView {
        constructor(messageType) {
            this.$template = $('#dialog');
            this.createDialog(messageType);
        }
        
        createDialog(messageType) {
            let message = getMessage(messageType);
            this.renderDialogBody(message);
            this.buildDialog(message);
        }
    
        renderDialogBody(message) {
            let $body = DOMHelper.createDialogBody(message);
            DOMHelper.html(this.$template, $body);
        }
    
        buildDialog(message) {
            this.$template.dialog({
                title: message.title,
                width: SETTINGS.STYLE.DIALOG_WIDTH,
                height: SETTINGS.STYLE.DIALOG_HEIGHT,
                resizable: false,
                buttons: [
                    {
                        text: 'OK',
                        icons: {
                            primary: 'ui-icon-heart'
                        },
                        click: function() {
                            $(this).dialog('close');
                            $(document).trigger(SETTINGS.EVENTS.DIALOG.CLICKED_OK);
                        }
                    }
                ]
            });
        }
    }
    
    root.puzzle.views.DialogView = DialogView;
})(window);
