class PuzzleElement {
    constructor(index) {
        this.puzzleElement = {
            $node: null,
            index: null
        };
    
        this.createElement(index);
        this.addListener();
    }
    
    createElement(index) {
        this.puzzleElement.$node = document.createElement('div');
        this.puzzleElement.index = index;
        this.setElementAttributes(index);
        this.setElementDimensions();
        this.setElementText(index);
    }
    
    addListener() {
        this.puzzleElement.$node.addEventListener('click', this.clickElementHandler.bind(this));
    }
    
    clickElementHandler(event) {
        console.log('element: ', event.target.id);
    }
    
    setElementText(index) {
        this.puzzleElement.$node.innerText = index;
    }
    
    setElementAttributes(index) {
        let $node = this.puzzleElement.$node;
        $node.setAttribute('class', 'element');
        $node.setAttribute('id', index.toString());
    }
    
    setElementDimensions() {
        let $node = this.puzzleElement.$node;
        $node.style.width = (CUBE_SIZE - 2) + 'px';
        $node.style.height = (CUBE_SIZE - 2) + 'px';
    }
}
