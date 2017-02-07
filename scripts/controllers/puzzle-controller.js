(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PuzzleHelper = root.puzzle.helpers.PuzzleHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    let PuzzleListView = root.puzzle.views.PuzzleListView;
    
    class PuzzleController {
        constructor() {
            this.puzzleModels = null;
            this.puzzleViews = null;
            this.setup();
        }
        
        setup() {
            this.buildPuzzleModels();
            this.shufflePuzzleModels();
            this.buildPuzzleViews();
            this.setupListeners();
        }
    
        buildPuzzleModels() {
            this.puzzleModels = new PuzzleListModel();
            for (let i = 0; i < SETTINGS.PUZZLE_ELEMENTS_AMOUNT - 1; i++)
                this.puzzleModels.add(new PuzzleElementModel(i));
        }
        
        shufflePuzzleModels() {
            PuzzleHelper.shuffle(this.puzzleModels.list);
        }
        
        buildPuzzleViews() {
            this.puzzleViews = new PuzzleListView();
            this.puzzleModels.setPosition((element) => {
                this.puzzleViews.add(new PuzzleElementView(element));
            });
        }
        
        setupListeners() {
            document.addEventListener('puzzle:click', (event) => this.getMovementDirection(event));
        }
        
        findPuzzleModel(payload) {
            return this.puzzleModels.list.find((element) => {
                return element.position.currentId === Number(payload.currentId);
            });
        }
        
        updateClickedElementPosition(payload, clicked) {
            this.puzzleModels.list.forEach((element) => {
                if (element.position.currentId === Number(payload.currentId)) {
                    element.position = clicked.position;
                }
            });
        }
        
        setClickedElementPosition(payload, clicked, position) {
            clicked.setCurrentPosition(position);
            this.updateClickedElementPosition(payload, clicked);
            let puzzleElementView = this.getPuzzleElementView(payload);
            puzzleElementView.setPosition(clicked);
        }
    
        getPuzzleElementView(payload) {
            return this.puzzleViews.list.find((element) => {
                return element.originId === Number(payload.originId);
            });
        }
        
        getMovementDirection(event) {
            let position = null;
            let payload = event.detail;
            let clicked = this.findPuzzleModel(payload);
            let currentId = clicked.position.currentId;
            
            switch (true) {
                case this.checkMoveRight(payload):
                    position = currentId + 1;
                    break;
                
                case this.checkMoveLeft(payload):
                    position = currentId - 1;
                    break;
                
                case this.checkMoveTop(payload):
                    position = currentId - SETTINGS.PUZZLE_ELEMENTS_IN_ROW;
                    break;
                
                case this.checkMoveBottom(payload):
                    position = currentId + SETTINGS.PUZZLE_ELEMENTS_IN_ROW;
                    break;
                
                default:
                    return null;
            }
            
            this.setClickedElementPosition(payload, clicked, position);
        }
        
        checkMoveRight(payload) {
            let clicked = this.findPuzzleModel(payload);
            let isRightElement = this.checkRightElement(payload);
            let puzzleContainerSize = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
            let isRightBorderReached = clicked.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE > puzzleContainerSize;
            return !isRightElement && !isRightBorderReached;
        }
        
        checkMoveLeft(payload) {
            let clicked = this.findPuzzleModel(payload);
            let isPreviousElement = this.checkLeftElement(payload);
            let isLeftBorderReached = clicked.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isPreviousElement && !isLeftBorderReached;
        }
        
        checkMoveTop(payload) {
            let clicked = this.findPuzzleModel(payload);
            let isTopElement = this.checkTopElement(payload);
            let isTopBorderReached = clicked.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isTopElement && !isTopBorderReached;
        }
        
        checkMoveBottom(payload) {
            let clicked = this.findPuzzleModel(payload);
            let isBottomElement = this.checkBottomElement(payload);
            let puzzleContainerSize = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
            let isBottomBorderReached = clicked.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE > puzzleContainerSize;
            return !isBottomElement && !isBottomBorderReached;
        }
        
        checkRightElement(payload) {
            let clicked = this.findPuzzleModel(payload);
            return this.puzzleModels.list.find((el) => {
                let isTopEqual = el.position.top === clicked.position.top;
                let isRight = el.position.left === clicked.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
        
        checkLeftElement(payload) {
            let clicked = this.findPuzzleModel(payload);
            return this.puzzleModels.list.find((el) => {
                let isTopEqual = el.position.top === clicked.position.top;
                let isLeft = el.position.left === clicked.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        checkTopElement(payload) {
            let clicked = this.findPuzzleModel(payload);
            return this.puzzleModels.list.find((el) => {
                let isLeftEqual = el.position.left === clicked.position.left;
                let isTop = el.position.top === clicked.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
        
        checkBottomElement(payload) {
            let clicked = this.findPuzzleModel(payload);
            return this.puzzleModels.list.find((el) => {
                let isLeftEqual = el.position.left === clicked.position.left;
                let isBottom = el.position.top === clicked.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
