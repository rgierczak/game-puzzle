(function (root) {
    'use strict';

    class PuzzleListView {
        constructor() {
            this.list = [];
        }
    
        add(element) {
            this.list.push(element);
        }
    
        findById(id) {
            return this.list.find((element) => {
                return element.originId === Number(id);
            });
        }
    }
    
    root.puzzle.views.PuzzleListView = PuzzleListView;
})(window);
