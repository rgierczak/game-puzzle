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
        this.createPuzzleWrapper();
        this.render(document.body, this.$puzzleWrapper);
    }
    
    createPuzzleWrapper() {
        this.$puzzleWrapper = document.createElement('div');
        this.$puzzleWrapper.setAttribute('id', 'puzzle');
        this.$puzzleWrapper.style.width = CUBE_SIZE * Math.sqrt(CUBE_ROW_AMOUNT) + 'px';
    }
    
    buildPuzzleElements() {
        for (let i = 0; i < CUBE_ROW_AMOUNT - 1; i++)
            this.puzzles.push(new PuzzleElement(i))
    }
    
    shuffleElements() {
        let shuffledElements = Utils.shuffle(this.puzzles);
    }
    
    displayElements() {
        this.puzzles.forEach((element, index) => {
            this.displayElement(element, index);
        })
    }
    
    displayElement(element, index) {
        let $element = this.setElementPosition(element, index);
        this.render(this.$puzzleWrapper, $element);
    }
    
    setElementPosition(element, index) {
        let $el = element.puzzleElement.$node;
        $el.style.left = CUBE_SIZE * (index % 4) + 'px';
        $el.style.top = CUBE_SIZE * Math.floor(index / 4) + 'px';
        return $el;
    }
    
    render($wrapper, $element) {
        $wrapper.appendChild($element);
    }
}

new Puzzle();
