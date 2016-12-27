const CUBE_SIZE = 30;
const CUBE_ROW_AMOUNT = 16;

class Puzzle {
    constructor() {
        this.puzzles = [];
        this.$puzzleWrapper = null;
        
        this.setupPuzzle();
    }
    
    setupPuzzle() {
        this.addPuzzleWrapper();
        this.buildPuzzleElements();
        this.shuffleElements();
        this.displayElements();
    }
    
    addPuzzleWrapper() {
        this.$puzzleWrapper = document.createElement('div');
        this.$puzzleWrapper.setAttribute('id', 'puzzle');
        this.$puzzleWrapper.style.width = CUBE_SIZE * Math.sqrt(CUBE_ROW_AMOUNT) + 'px';
        document.body.appendChild(this.$puzzleWrapper);
    }
    
    buildPuzzleElements() {
        for (let i = 0; i < CUBE_ROW_AMOUNT - 1; i++) {
            this.buildPuzzleElement(i);
        }
    }
    
    shuffleElements() {
        let shuffledElements = Utils.shuffle(this.puzzles);
        console.log(shuffledElements);
    }
    
    addToArray($element, index) {
        this.puzzles.push({
            element: $element,
            index: index
        })
    }
    
    displayElements() {
        this.puzzles.forEach(($element) => {
            this.render($element);
        })
    }
    
    addListener($element) {
        $element.addEventListener('click', this.clickElementHandler.bind(this));
    }
    
    render($element) {
        this.$puzzleWrapper.appendChild($element.element);
    }
    
    buildPuzzleElement(i) {
        let $element = this.createPuzzleElement(i);
        this.addListener($element);
        this.addToArray($element, i);
    }
    
    createPuzzleElement(i) {
        let $element = document.createElement('div');
        $element.setAttribute('class', 'element');
        $element.setAttribute('id', String(i));
        $element.style.width = (CUBE_SIZE - 2) + 'px';
        $element.style.height = (CUBE_SIZE - 2) + 'px';
        $element.innerText = i;
        return $element;
    }
    
    clickElementHandler(event) {
        console.log('element: ', event.target.id);
    }
}

new Puzzle();
