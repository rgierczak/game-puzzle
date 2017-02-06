(function (root) {
    'use strict';
        
    let PuzzleController = root.puzzle.controllers.PuzzleController;

    function setup() {
        new PuzzleController();
    }
    
    window.addEventListener('DOMContentLoaded', setup);
})(window);
