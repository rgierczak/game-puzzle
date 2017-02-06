(function (root) {
    'use strict';
    
    class PuzzleElementView {
        constructor(model) {
            // this.model = {
            //     $node: null,
            //     index: null
            // };
            
            // this.createElement(index);
            // this.addListener();
            
            this.template = null;
            this.render(model);
        }
        
        render(model) {
            this.createElement(model.index);
        }
        
        createElement(index) {
            this.template = document.createElement('div');
            
            console.log('template: ', this.template);
            // this.setElementAttributes(index);
            // this.setElementDimensions();
            // this.setElementText(index);
        }
        
        // addListener() {
        //     this.template.addEventListener('click', this.clickElementHandler.bind(this));
        // }
        //
        // clickElementHandler(event) {
        //     console.log('element: ', event.target.id);
        // }
        //
        // setElementText(index) {
        //     this.template.innerText = index;
        // }
        //
        // setElementAttributes(index) {
        //     let $node = this.template;
        //     $node.setAttribute('class', 'element');
        //     $node.setAttribute('id', index.toString());
        // }
        //
        // setElementDimensions() {
        //     let $node = this.template;
        //     $node.style.width = (CUBE_SIZE - 2) + 'px';
        //     $node.style.height = (CUBE_SIZE - 2) + 'px';
        // }
    }
    
    root.puzzle.views.PuzzleElementView = PuzzleElementView;
})(window);


