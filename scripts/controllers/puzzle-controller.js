(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PuzzleHelper = root.puzzle.helpers.PuzzleHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    let PuzzleListView = root.puzzle.views.PuzzleListView;
    
    const PUZZLE_CONTAINER_SIZE = SETTINGS.PUZZLE_ELEMENT_SIZE * (SETTINGS.PUZZLE_ELEMENTS_IN_ROW - 1);
    
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
        
        updateClickedElementPosition(payload, model) {
            this.puzzleModels.each((element) => {
                if (element.position.currentId === Number(payload.currentId))
                    element.position = model.position;
            });
        }
        
        setClickedElementPosition(payload, model, position) {
            model.setPosition(position);
            this.updateClickedElementPosition(payload, model);
            
            let puzzleElementView = this.getPuzzleElementView(payload);
            puzzleElementView.setPosition(model);
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
            let model = this.puzzleModels.findById(payloadId);
            let currentId = model.position.currentId;
            
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
            
            this.setClickedElementPosition(payload, model, position);
        }
        
        checkMoveRight(id) {
            let model = this.puzzleModels.findById(id);
            let isRightElement = this.checkRightElement(id);
            let isRightBorderReached = model.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE > PUZZLE_CONTAINER_SIZE;
            return !isRightElement && !isRightBorderReached;
        }
        
        checkMoveLeft(id) {
            let model = this.puzzleModels.findById(id);
            let isPreviousElement = this.checkLeftElement(id);
            let isLeftBorderReached = model.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isPreviousElement && !isLeftBorderReached;
        }
        
        checkMoveTop(id) {
            let model = this.puzzleModels.findById(id);
            let isTopElement = this.checkTopElement(id);
            let isTopBorderReached = model.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE < 0;
            return !isTopElement && !isTopBorderReached;
        }
        
        checkMoveBottom(id) {
            let model = this.puzzleModels.findById(id);
            let isBottomElement = this.checkBottomElement(id);
            let isBottomBorderReached = model.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE > PUZZLE_CONTAINER_SIZE;
            return !isBottomElement && !isBottomBorderReached;
        }
        
        checkRightElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isTopEqual = el.position.top === model.position.top;
                let isRight = el.position.left === model.position.left + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
        
        checkLeftElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isTopEqual = el.position.top === model.position.top;
                let isLeft = el.position.left === model.position.left - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        checkTopElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isLeftEqual = el.position.left === model.position.left;
                let isTop = el.position.top === model.position.top - SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
        
        checkBottomElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isLeftEqual = el.position.left === model.position.left;
                let isBottom = el.position.top === model.position.top + SETTINGS.PUZZLE_ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
