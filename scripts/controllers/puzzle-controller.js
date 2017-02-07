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
            document.addEventListener('element-view:click', (event) => this.getMovementDirection(event));
        }
        
        updateClickedElementPosition(payload, clicked) {
            this.puzzleModels.list.forEach((element) => {
                if (element.position.currentId === Number(payload.currentId)) {
                    element.position = clicked.position;
                }
            });
        }
        
        setClickedElementPosition(payload, puzzleElementModel, position) {
            puzzleElementModel.setPosition(position);
            this.updateClickedElementPosition(payload, puzzleElementModel);
            
            let puzzleElementView = this.getPuzzleElementView(payload);
            puzzleElementView.setPosition(puzzleElementModel);
        }
    
        getPuzzleElementView(payload) {
            return this.puzzleViews.list.find((element) => {
                return element.originId === Number(payload.originId);
            });
        }
        
        getMovementDirection(event) {
            let position = null;
            let payload = event.detail;
            let payloadId = payload.currentId;
            let puzzleElementModel = this.puzzleModels.find(payloadId);
            let currentId = puzzleElementModel.position.currentId;
            
            switch (true) {
                case this.checkMoveRight(payloadId):
                    position = currentId + 1;
                    break;
                
                case this.checkMoveLeft(payloadId):
                    position = currentId - 1;
                    break;
                
                case this.checkMoveTop(payloadId):
                    position = currentId - SETTINGS.PUZZLE_ELEMENTS_IN_ROW;
                    break;
                
                case this.checkMoveBottom(payloadId):
                    position = currentId + SETTINGS.PUZZLE_ELEMENTS_IN_ROW;
                    break;
                
                default:
                    return null;
            }
            
            this.setClickedElementPosition(payload, puzzleElementModel, position);
        }
        
        checkMoveRight(id) {
            let clicked = this.puzzleModels.find(id);
            let isRightElement = this.checkRightElement(id);
            let puzzleContainerSize = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
            let isRightBorderReached = clicked.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE > puzzleContainerSize;
            return !isRightElement && !isRightBorderReached;
        }
        
        checkMoveLeft(id) {
            let clicked = this.puzzleModels.find(id);
            let isPreviousElement = this.checkLeftElement(id);
            let isLeftBorderReached = clicked.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isPreviousElement && !isLeftBorderReached;
        }
        
        checkMoveTop(id) {
            let clicked = this.puzzleModels.find(id);
            let isTopElement = this.checkTopElement(id);
            let isTopBorderReached = clicked.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isTopElement && !isTopBorderReached;
        }
        
        checkMoveBottom(id) {
            let clicked = this.puzzleModels.find(id);
            let isBottomElement = this.checkBottomElement(id);
            let puzzleContainerSize = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
            let isBottomBorderReached = clicked.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE > puzzleContainerSize;
            return !isBottomElement && !isBottomBorderReached;
        }
        
        checkRightElement(id) {
            let clicked = this.puzzleModels.find(id);
            return this.puzzleModels.list.find((el) => {
                let isTopEqual = el.position.top === clicked.position.top;
                let isRight = el.position.left === clicked.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
        
        checkLeftElement(id) {
            let clicked = this.puzzleModels.find(id);
            return this.puzzleModels.list.find((el) => {
                let isTopEqual = el.position.top === clicked.position.top;
                let isLeft = el.position.left === clicked.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        checkTopElement(id) {
            let clicked = this.puzzleModels.find(id);
            return this.puzzleModels.list.find((el) => {
                let isLeftEqual = el.position.left === clicked.position.left;
                let isTop = el.position.top === clicked.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
        
        checkBottomElement(id) {
            let clicked = this.puzzleModels.find(id);
            return this.puzzleModels.list.find((el) => {
                let isLeftEqual = el.position.left === clicked.position.left;
                let isBottom = el.position.top === clicked.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
