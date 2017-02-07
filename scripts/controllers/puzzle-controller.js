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
    
        shufflePuzzleModels() {
            PuzzleHelper.shuffle(this.puzzleModels.list);
        }
    
        buildPuzzleViews() {
            this.puzzleViews = new PuzzleListView();
            this.puzzleModels.setPosition((element) => {
                this.puzzleViews.add(new PuzzleElementView(element));
            });
        }
    
        buildPuzzleModels() {
            this.puzzleModels = new PuzzleListModel();
            for (let i = 0; i < SETTINGS.PUZZLE_ELEMENTS_AMOUNT - 1; i++)
                this.puzzleModels.add(new PuzzleElementModel(i));
        }
        
        setupListeners() {
            document.addEventListener('puzzle:click', (event) => this.getMovementDirection(event));
        }
        
        buildClickedObject(payload) {
            return {
                model: this.puzzleModels.list.find((element) => {
                    return element.position.currentId === Number(payload.currentId);
                }),
                template: payload.template
            };
        }

        updateClickedElementPosition(payload, clicked) {
            this.puzzleModels.list.forEach((element) => {
                if (element.position.currentId === Number(payload.currentId)) {
                    element.position = clicked.model.position;
                }
            });
        }
        
        setClickedElementPosition(payload, clicked, position) {
            clicked.model.setCurrentPosition(position);
            this.updateClickedElementPosition(payload, clicked);
         
            let puzzleElementView = this.puzzleViews.list.find((element) => {
                return element.originId === Number(payload.originId);
            });
            
            console.log('puzzleElementView: ', puzzleElementView);
            puzzleElementView.setPosition(clicked.model);
        }
        
        getMovementDirection(event) {
            let position = null;
            let payload = event.detail;
            let clicked = this.buildClickedObject(payload);
            let currentId = clicked.model.position.currentId;

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
            let clicked = this.buildClickedObject(payload);
            let isRightElement = this.checkRightElement(payload);
            let puzzleContainerSize = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
            let isRightBorderReached = clicked.model.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE > puzzleContainerSize;
            return !isRightElement && !isRightBorderReached;
        }
        
        checkMoveLeft(payload) {
            let clicked = this.buildClickedObject(payload);
            let isPreviousElement = this.checkLeftElement(payload);
            let isLeftBorderReached = clicked.model.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isPreviousElement && !isLeftBorderReached;
        }
        
        checkMoveTop(payload) {
            let clicked = this.buildClickedObject(payload);
            let isTopElement = this.checkTopElement(payload);
            let isTopBorderReached = clicked.model.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isTopElement && !isTopBorderReached;
        }
        
        checkMoveBottom(payload) {
            let clicked = this.buildClickedObject(payload);
            let isBottomElement = this.checkBottomElement(payload);
            let puzzleContainerSize = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
            let isBottomBorderReached = clicked.model.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE > puzzleContainerSize;
            return !isBottomElement && !isBottomBorderReached;
        }
        
        checkRightElement(payload) {
            let clicked = this.buildClickedObject(payload);
            return this.puzzleModels.list.find((el) => {
                let isTopEqual = el.position.top === clicked.model.position.top;
                let isRight = el.position.left === clicked.model.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
        
        checkLeftElement(payload) {
            let clicked = this.buildClickedObject(payload);
            return this.puzzleModels.list.find((el) => {
                let isTopEqual = el.position.top === clicked.model.position.top;
                let isLeft = el.position.left === clicked.model.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        checkTopElement(payload) {
            let clicked = this.buildClickedObject(payload);
            return this.puzzleModels.list.find((el) => {
                let isLeftEqual = el.position.left === clicked.model.position.left;
                let isTop = el.position.top === clicked.model.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
        
        checkBottomElement(payload) {
            let clicked = this.buildClickedObject(payload);
            return this.puzzleModels.list.find((el) => {
                let isLeftEqual = el.position.left === clicked.model.position.left;
                let isBottom = el.position.top === clicked.model.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
