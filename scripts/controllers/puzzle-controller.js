(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let ShuffleHelper = root.puzzle.helpers.ShuffleHelper;
    let PromiseHelper = root.puzzle.helpers.PromiseHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    let PuzzleListView = root.puzzle.views.PuzzleListView;
    
    const ELEMENTS_AMOUNT = SETTINGS.STYLE.ELEMENTS_IN_ROW * SETTINGS.STYLE.ELEMENTS_IN_ROW;
    const CONTAINER_SIZE = SETTINGS.STYLE.ELEMENT_SIZE * (SETTINGS.STYLE.ELEMENTS_IN_ROW - 1);
    
    class PuzzleController {
        constructor() {
            this.models = null;
            this.views = null;
            
            this.buildModels();
            this.buildViews();
            this.setupListeners();
        }
        
        buildModels() {
            this.models = new PuzzleListModel();
            for (let i = 0; i < ELEMENTS_AMOUNT - 1; i++)
                this.models.add(new PuzzleElementModel(i));
        }
        
        buildViews() {
            this.views = new PuzzleListView();
            this.models.setPosition((model) => this.views.add(new PuzzleElementView(model)));
            this.views.render(this.models);
        }
        
        setupListeners() {
            $(document).on(SETTINGS.EVENTS.ELEMENT.CLICK, (event, dto) => this.movementHandler(event, dto));
            $(document).on(SETTINGS.EVENTS.ELEMENT.ANIMATED, (event) => this.checkGameStatus());
            $(document).on(SETTINGS.EVENTS.ELEMENTS.RENDERED, (event) => this.onElementsRendered(event));
            $(document).on(SETTINGS.EVENTS.ELEMENTS.SHUFFLED, (event) => this.onElementsShuffled(event));
        }
        
        destroyListeners() {
            $(document).off(SETTINGS.EVENTS.ELEMENT.CLICK);
            $(document).off(SETTINGS.EVENTS.ELEMENTS.RENDERED);
            $(document).off(SETTINGS.EVENTS.ELEMENT.ANIMATED);
            $(document).off(SETTINGS.EVENTS.ELEMENTS.SHUFFLED);
        }
        
        checkGameStatus() {
            let isGameOver = this.models.every((model) => {
                return model.isOnTargetPosition();
            });
            
            if (isGameOver) {
                this.destroyListeners();
                $(document).trigger(SETTINGS.EVENTS.DIALOG.SHOW_GAME_OVER);
            }
        }
    
        onElementsShuffled() {
            console.log('All elements have been shuffled.');
        }
        
        onElementsRendered() {
            console.log('All elements have been rendered.');
            let promiseFactories = [];
            
            for (let i = 0; i < SETTINGS.STYLE.SHUFFLE_ITERATIONS; i++) {
                promiseFactories.push(() => {
                    return this.shuffleElement();
                });
            }
            
            PromiseHelper.resolveSequentially(promiseFactories);
        }
        
        shuffleElement() {
            let modelIds = this.getMovementModels();
            let originId = ShuffleHelper.getRandomOriginId(modelIds);
            let randomModelPosition = this.models.findByOriginId(originId).getPosition();
            
            return this.movementHandler(null, randomModelPosition, SETTINGS.STYLE.SHUFFLE_MOVE_TIME);
        }
        
        getMovementModels() {
            let models = [];
            
            this.models.each((model) => {
                let currentId = model.getPositionProperty('currentId');
                let isMovementPossible = (this.checkDirection(currentId) !== null);
                
                if (isMovementPossible) {
                    models.push(model.getOriginId());
                }
            });
            
            return models;
        }
        
        movementHandler(event, dto, duration = SETTINGS.STYLE.MOVE_TIME) {
            let model = this.models.findByCurrentId(dto.currentId);
            let updatedCurrentId = this.updateCurrentId(dto.currentId, model);
            
            return this.move(model, updatedCurrentId, duration);
        }
        
        move(model, id, duration) {
            if (id == null) 
                return;
            
            model.setPosition(id);
            
            let view = this.views.getCurrentView(model);
            return view.move(model, duration);
        }
        
        checkDirection(id) {
            switch (true) {
                case this.checkMoveRight(id):
                    return 'right';
                    
                case this.checkMoveLeft(id):
                    return 'left';
                    
                case this.checkMoveTop(id):
                    return 'top';
                    
                case this.checkMoveBottom(id):
                    return 'bottom';
                    
                default:
                    return null;
            }
        }
        
        updateCurrentId(id, model) {
            let direction = this.checkDirection(id);
            let currentId = model.getPositionProperty('currentId');
            
            switch (direction) {
                case 'right':
                    return currentId + 1;
                    
                case 'left':
                    return currentId - 1;
                    
                case 'top':
                    return currentId - SETTINGS.STYLE.ELEMENTS_IN_ROW;
                    
                case 'bottom':
                    return currentId + SETTINGS.STYLE.ELEMENTS_IN_ROW;
                    
                default:
                    return null;
            }
        }
        
        getModelPosition(id, direction) {
            return this.models.findByCurrentId(id).getPositionProperty(direction);
        }
        
        checkMoveRight(id) {
            let rightElementId = Number(id) + 1;
            let leftElementPosition = this.getModelPosition(id, SETTINGS.POSITIONS.LEFT);
            let isRightBorderReached = leftElementPosition + SETTINGS.STYLE.ELEMENT_SIZE > CONTAINER_SIZE;
            return !this.isNextElement(rightElementId) && !isRightBorderReached;
        }
        
        checkMoveLeft(id) {
            let leftElementId = Number(id) - 1;
            let leftElementPosition = this.getModelPosition(id, SETTINGS.POSITIONS.LEFT);
            let isLeftBorderReached = leftElementPosition - SETTINGS.STYLE.ELEMENT_SIZE < 0;
            return !this.isNextElement(leftElementId) && !isLeftBorderReached;
        }
        
        checkMoveTop(id) {
            let topElementId = Number(id) - SETTINGS.STYLE.ELEMENTS_IN_ROW;
            let topElementPosition = this.getModelPosition(id, SETTINGS.POSITIONS.TOP);
            let isTopBorderReached = topElementPosition - SETTINGS.STYLE.ELEMENT_SIZE < 0;
            return !this.isNextElement(topElementId) && !isTopBorderReached;
        }
        
        checkMoveBottom(id) {
            let bottomElementId = Number(id) + SETTINGS.STYLE.ELEMENTS_IN_ROW;
            let topElementPosition = this.getModelPosition(id, SETTINGS.POSITIONS.TOP);
            let isBottomBorderReached = topElementPosition + SETTINGS.STYLE.ELEMENT_SIZE > CONTAINER_SIZE;
            return !this.isNextElement(bottomElementId) && !isBottomBorderReached;
        }
        
        isNextElement(id) {
            return this.models.list.find((element) => {
                return Boolean(element.getPositionProperty('currentId') == id);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
