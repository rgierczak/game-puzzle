(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let PuzzleHelper = root.puzzle.helpers.PuzzleHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    let PuzzleListView = root.puzzle.views.PuzzleListView;
    
    const CONTAINER_SIZE = SETTINGS.ELEMENT_SIZE * (SETTINGS.ELEMENTS_IN_ROW - 1);
    
    class PuzzleController {
        constructor() {
            this.puzzleModels = null;
            this.puzzleViews = null;
    
            this.buildPuzzleModels();
            this.shufflePuzzleModels();
            this.buildPuzzleViews();
            this.setupListeners();
        }
    
        buildPuzzleModels() {
            this.puzzleModels = new PuzzleListModel();
            for (let i = 0; i < SETTINGS.ELEMENTS_AMOUNT - 1; i++)
                this.puzzleModels.add(new PuzzleElementModel(i));
        }
        
        shufflePuzzleModels() {
            PuzzleHelper.shuffle(this.puzzleModels.list);
        }
        
        buildPuzzleViews() {
            this.puzzleViews = new PuzzleListView();
            this.puzzleModels.setPosition((model) => this.puzzleViews.add(new PuzzleElementView(model)));
        }
        
        setupListeners() {
            document.addEventListener('element-view:click', (dto) => this.getMovementDirection(dto));
        }
        
        setClickedElementPosition(model, position) {
            model.setPosition(position);
            
            this.puzzleViews
                .findById(model.originId)
                .setPosition(model);
        }
        
        getMovementDirection(dto) {
            let position = null;
            let id = dto.detail.currentId;
            let model = this.puzzleModels.findById(id);
            let currentId = model.position.currentId;
            
            switch (true) {
                case this.checkMoveRight(id):
                    position = currentId + 1;
                    break;
                
                case this.checkMoveLeft(id):
                    position = currentId - 1;
                    break;
                
                case this.checkMoveTop(id):
                    position = currentId - SETTINGS.ELEMENTS_IN_ROW;
                    break;
                
                case this.checkMoveBottom(id):
                    position = currentId + SETTINGS.ELEMENTS_IN_ROW;
                    break;
                
                default:
                    return null;
            }
            
            this.setClickedElementPosition(model, position);
        }
        
        getModelPosition(id, direction) {
            return this.puzzleModels.findById(id).getPosition(direction);
        }
        
        checkMoveRight(id) {
            let leftPosition = this.getModelPosition(id, 'left');
            let isRightBorderReached = leftPosition + SETTINGS.ELEMENT_SIZE > CONTAINER_SIZE;
            return !this.isRightElement(id) && !isRightBorderReached;
        }
        
        checkMoveLeft(id) {
            let leftPosition = this.getModelPosition(id, 'left');
            let isLeftBorderReached = leftPosition - SETTINGS.ELEMENT_SIZE < 0;
            return !this.isLeftElement(id) && !isLeftBorderReached;
        }
        
        checkMoveTop(id) {
            let topPosition = this.getModelPosition(id, 'top');
            let isTopBorderReached = topPosition - SETTINGS.ELEMENT_SIZE < 0;
            return !this.isTopElement(id) && !isTopBorderReached;
        }
        
        checkMoveBottom(id) {
            let topPosition = this.getModelPosition(id, 'top');
            let isBottomBorderReached = topPosition + SETTINGS.ELEMENT_SIZE > CONTAINER_SIZE;
            return !this.isBottomElement(id) && !isBottomBorderReached;
        }
        
        isRightElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isTopEqual = PuzzleHelper.isPositionEqual(el, model, 'top');
                let isRight = el.getPosition('left') === model.getPosition('left') + SETTINGS.ELEMENT_SIZE;
                return Boolean(isTopEqual && isRight);
            });
        }
        
        isLeftElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isTopEqual = PuzzleHelper.isPositionEqual(el, model, 'top');
                let isLeft = el.getPosition('left') === model.getPosition('left') - SETTINGS.ELEMENT_SIZE;
                return Boolean(isTopEqual && isLeft);
            });
        }
        
        isTopElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isLeftEqual = PuzzleHelper.isPositionEqual(el, model, 'left');
                let isTop = el.getPosition('top') === model.getPosition('top') - SETTINGS.ELEMENT_SIZE;
                return Boolean(isLeftEqual && isTop);
            });
        }
        
        isBottomElement(id) {
            let model = this.puzzleModels.findById(id);
            return this.puzzleModels.find((el) => {
                let isLeftEqual = PuzzleHelper.isPositionEqual(el, model, 'left');
                let isBottom = el.getPosition('top') === model.getPosition('top') + SETTINGS.ELEMENT_SIZE;
                return Boolean(isLeftEqual && isBottom);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
