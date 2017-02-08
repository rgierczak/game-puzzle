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
            let rightElementId = Number(id) + 1;
            let leftElementPosition = this.getModelPosition(id, 'left');
            let isRightBorderReached = leftElementPosition + SETTINGS.ELEMENT_SIZE > CONTAINER_SIZE;
            return !this.isNextElement(rightElementId) && !isRightBorderReached;
        }
        
        checkMoveLeft(id) {
            let leftElementId = Number(id) - 1;
            let leftElementPosition = this.getModelPosition(id, 'left');
            let isLeftBorderReached = leftElementPosition - SETTINGS.ELEMENT_SIZE < 0;
            return !this.isNextElement(leftElementId) && !isLeftBorderReached;
        }
        
        checkMoveTop(id) {
            let topElementId = Number(id) - SETTINGS.ELEMENTS_IN_ROW;
            let topElementPosition = this.getModelPosition(id, 'top');
            let isTopBorderReached = topElementPosition - SETTINGS.ELEMENT_SIZE < 0;
            return !this.isNextElement(topElementId) && !isTopBorderReached;
        }
        
        checkMoveBottom(id) {
            let bottomElementId = Number(id) + SETTINGS.ELEMENTS_IN_ROW;
            let topElementPosition = this.getModelPosition(id, 'top');
            let isBottomBorderReached = topElementPosition + SETTINGS.ELEMENT_SIZE > CONTAINER_SIZE;
            return !this.isNextElement(bottomElementId) && !isBottomBorderReached;
        }
    
        isNextElement(id) {
            return this.puzzleModels.list.find((element) => {
                return Boolean(element.position.currentId == id);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
