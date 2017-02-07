(function (root) {
    'use strict';
    
    const PUZZLE_ELEMENT_SIZE = 30;
    const PUZZLE_ELEMENTS_AMOUNT = 16;
    const PUZZLE_ELEMENTS_IN_ROW = 4;
    const PUZZLE_CONTAINER_SIZE = PUZZLE_ELEMENT_SIZE * (PUZZLE_ELEMENTS_IN_ROW - 1);
    
    let PuzzleHelper = root.puzzle.helpers.PuzzleHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    
    class PuzzleController {
        constructor() {
            this.puzzle = new PuzzleListModel();
            this.setup();
        }
        
        setup() {
            this.setupPuzzle();
            this.setupListeners();
        }
        
        setupPuzzle() {
            for (let i = 0; i < PUZZLE_ELEMENTS_AMOUNT - 1; i++)
                this.puzzle.addPuzzleElement(new PuzzleElementModel(i));
            
            PuzzleHelper.shuffle(this.puzzle.list);
            
            this.puzzle.setElementPosition((element) => {
                new PuzzleElementView(element);
            });
        }
        
        setupListeners() {
            document.addEventListener('puzzle:click', (event) => this.getMovementDirection(event.detail));
        }
        
        buildClickedObject(clicked) {
            return {
                model: this.puzzle.list.find((element) => {
                    return element.position.currentId === Number(clicked.currentId);
                }),
                template: clicked.template
            };
        }
        
        setClickedObjectProperties(clicked) {
            clicked.template.style.left = clicked.model.position.left + 'px';
            clicked.template.style.top = clicked.model.position.top + 'px';
            clicked.template.setAttribute('data-id', clicked.model.position.currentId);
        }
        
        updateClickedElementPosition(clicked, clickedObject) {
            this.puzzle.list.forEach((element) => {
                if (element.position.currentId === Number(clicked.currentId)) {
                    element.position = clickedObject.model.position;
                }
            });
        }
        
        setClickeElementPosition(clicked, clickedObject, position) {
            clickedObject.model.setCurrentPosition(position);
            this.updateClickedElementPosition(clicked, clickedObject);
            this.setClickedObjectProperties(clickedObject);
        }
        
        getMovementDirection(clicked) {
            let position = null;
            let clickedObject = this.buildClickedObject(clicked);
            let currentId = clickedObject.model.position.currentId;

            switch (true) {
                case this.checkMoveRight(clicked):
                    position = currentId + 1;
                    break;
                
                case this.checkMoveLeft(clicked):
                    position = currentId - 1;
                    break;
                
                case this.checkMoveTop(clicked):
                    position = currentId - PUZZLE_ELEMENTS_IN_ROW;
                    break;
                
                case this.checkMoveBottom(clicked):
                    position = currentId + PUZZLE_ELEMENTS_IN_ROW;
                    break;
                
                default:
                    return null;
            }

            this.setClickeElementPosition(clicked, clickedObject, position);
        }
        
        checkMoveRight(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            let isRightElement = this.checkRightElement(clicked);
            let isRightBorderReached = clickedObject.model.position.left + PUZZLE_ELEMENT_SIZE > PUZZLE_CONTAINER_SIZE;
            return !isRightElement && !isRightBorderReached;
        }
        
        checkMoveLeft(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            let isPreviousElement = this.checkLeftElement(clicked);
            let isLeftBorderReached = clickedObject.model.position.left - PUZZLE_ELEMENT_SIZE < 0;
            return !isPreviousElement && !isLeftBorderReached;
        }
        
        checkMoveTop(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            let isTopElement = this.checkTopElement(clicked);
            let isTopBorderReached = clickedObject.model.position.top - PUZZLE_ELEMENT_SIZE < 0;
            return !isTopElement && !isTopBorderReached;
        }
        
        checkMoveBottom(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            let isBottomElement = this.checkBottomElement(clicked);
            let isBottomBorderReached = clickedObject.model.position.top + PUZZLE_ELEMENT_SIZE > PUZZLE_CONTAINER_SIZE;
            return !isBottomElement && !isBottomBorderReached;
        }
        
        checkRightElement(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            return this.puzzle.list.find((el) => {
                let isTopEqual = el.position.top === clickedObject.model.position.top;
                let isRight = el.position.left === clickedObject.model.position.left + PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
        
        checkLeftElement(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            return this.puzzle.list.find((el) => {
                let isTopEqual = el.position.top === clickedObject.model.position.top;
                let isLeft = el.position.left === clickedObject.model.position.left - PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        checkTopElement(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            return this.puzzle.list.find((el) => {
                let isLeftEqual = el.position.left === clickedObject.model.position.left;
                let isTop = el.position.top === clickedObject.model.position.top - PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
        
        checkBottomElement(clicked) {
            let clickedObject = this.buildClickedObject(clicked);
            return this.puzzle.list.find((el) => {
                let isLeftEqual = el.position.left === clickedObject.model.position.left;
                let isBottom = el.position.top === clickedObject.model.position.top + PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
