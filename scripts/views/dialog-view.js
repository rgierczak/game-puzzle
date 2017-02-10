(function (root) {
    'use strict';
    
    let DOMHelper = root.puzzle.helpers.DOMHelper;
    let SETTINGS = root.puzzle.settings;
    const DIALOG_WIDTH = 400;
    const DIALOG_HEIGHT = 300;
    
    function getMessage(messageType) {
        switch (messageType) {
            case 'welcome':
                return {
                    title: 'Welcome in numeric puzzle game',
                    body: 'The goal is to set numeric sequence from 0 to 14 starting from top left corner, ' +
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
                width: DIALOG_WIDTH,
                height: DIALOG_HEIGHT,
                resizable: false,
                buttons: [
                    {
                        text: 'OK',
                        icons: {
                            primary: 'ui-icon-heart'
                        },
                        click: () => {
                            $(this).dialog('close');
                            $(document).trigger(SETTINGS.EVENTS.DIALOG.CLICKED_OK);
                        }
                    }
                ],
                hide: {
                    effect: 'explode',
                    duration: 1000
                }
            });
        }
    }
    
    root.puzzle.views.DialogView = DialogView;
})(window);
