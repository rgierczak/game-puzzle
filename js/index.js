const CUBE_SIZE = 30;
const CUBE_ROW_AMOUNT = 16;

class Puzzle {
    constructor() {
        this.$puzzleWrapper = null;
        
        this.setupPuzzle();
    }
    
    setupPuzzle() {
        this.addPuzzleWrapper();
        this.addElementsToPuzzleWrapper();
    }
    
    addPuzzleWrapper() {
        this.$puzzleWrapper = document.createElement('div');
        this.$puzzleWrapper.setAttribute('id', 'puzzle');
        this.$puzzleWrapper.style.width = CUBE_SIZE * Math.sqrt(CUBE_ROW_AMOUNT) + 'px';
        document.body.appendChild(this.$puzzleWrapper);
    }
    
    addElementsToPuzzleWrapper() {
        for (let i = 0; i < CUBE_ROW_AMOUNT - 1; i++) {
            this.buildPuzzleElement(i);
        }
    }
    
    buildPuzzleElement(i) {
        let $element = document.createElement('div');
        $element.setAttribute('class', 'element');
        $element.setAttribute('id', String(i));
        $element.style.width = (CUBE_SIZE - 2) + 'px';
        $element.style.height = (CUBE_SIZE - 2) + 'px';
    
        $element.addEventListener('click', this.clickElementHandler.bind(this));
        this.$puzzleWrapper.appendChild($element);
    }
    
    clickElementHandler(event) {
        console.log('element: ', event.target.id);
    }
}

new Puzzle();
