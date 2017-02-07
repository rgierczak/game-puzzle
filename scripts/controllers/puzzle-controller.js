(function (root) {
    'use strict';
    
    const PUZZLE_ELEMENT_SIZE = 30;
    const PUZZLE_ELEMENTS_AMOUNT = 16;
    const PUZZLE_ELEMENTS_IN_ROW = 4;
    const PUZZLE_CONTAINER_SIZE =  PUZZLE_ELEMENT_SIZE * (PUZZLE_ELEMENTS_IN_ROW - 1);
    
    let PuzzleHelper = root.puzzle.helpers.PuzzleHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    
    class PuzzleController {
        constructor() {
            this.puzzle = new PuzzleListModel();
            this.clicked = null;
            this.setup();
        }
        
        setup() {
            this.setupPuzzle();
            this.setupListeners();
        }
        
        setupPuzzle() {
            for (let i = 0; i < PUZZLE_ELEMENTS_AMOUNT - 1; i++)
                this.puzzle.addPuzzleElement(new PuzzleElementModel(i));
            
            //let shuffledList = PuzzleHelper.shuffle(this.puzzle.list);
    
            this.puzzle.each((element) => {
                new PuzzleElementView(element);
            });
        }
        
        setupListeners() {
            document.addEventListener('puzzle:click', (event) => this.clickHandler(event));
        }
        
        clickHandler(event) {
            console.log(event.detail);
            let direction = this.getMovementDirection(event.detail);
        }
    
        getMovementDirection(clickedId) {
            this.clicked = this.puzzle.list.find((element) => {
                return element.id === Number(clickedId);
            });
            
            switch(true) {
                case this.checkMoveRight():
                    return 'right';
                case this.checkMoveLeft():
                    return 'left';
                case this.checkMoveTop():
                    return 'top';
                case this.checkMoveBottom():
                    return 'bottom';
                default:
                    return null;
            }
        }
    
        checkMoveRight() {
            let isRightElement = this.checkRightElement();
            let isRightBorderReached = this.clicked.position.left + PUZZLE_ELEMENT_SIZE > PUZZLE_CONTAINER_SIZE;
            return !isRightElement && !isRightBorderReached;
        }
        
        checkMoveLeft() {
            let isPreviousElement = this.checkLeftElement();
            let isLeftBorderReached = this.clicked.position.left - PUZZLE_ELEMENT_SIZE < 0;
            return !isPreviousElement && !isLeftBorderReached;
        }
    
        checkMoveTop() {
            let isTopElement = this.checkTopElement();
            let isTopBorderReached = this.clicked.position.top - PUZZLE_ELEMENT_SIZE < 0;
            return !isTopElement && !isTopBorderReached;
        }
    
        checkMoveBottom() {
            let isBottomElement = this.checkBottomElement();
            let isBottomBorderReached = this.clicked.position.top + PUZZLE_ELEMENT_SIZE > PUZZLE_CONTAINER_SIZE;
            return !isBottomElement && !isBottomBorderReached;
        }
    
        checkRightElement() {
            return this.puzzle.list.find((el) => {
                let isTopEqual = el.position.top === this.clicked.position.top;
                let isRight = el.position.left === this.clicked.position.left + PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
    
        checkLeftElement() {
            return this.puzzle.list.find((el) => {
                let isTopEqual = el.position.top === this.clicked.position.top;
                let isLeft = el.position.left === this.clicked.position.left - PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        checkTopElement() {
            return this.puzzle.list.find((el) => {
                let isLeftEqual = el.position.left === this.clicked.position.left;
                let isTop = el.position.top === this.clicked.position.top - PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
    
        checkBottomElement() {
            return this.puzzle.list.find((el) => {
                let isLeftEqual = el.position.left === this.clicked.position.left;
                let isBottom = el.position.top === this.clicked.position.top + PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
