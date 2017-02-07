(function (root) {
    'use strict';

    class PuzzleListView {
        constructor() {
            this.list = [];
        }
    
        add(element) {
            this.list.push(element);
        }
    }
    
    root.puzzle.views.PuzzleListView = PuzzleListView;
})(window);
