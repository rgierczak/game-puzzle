(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let ShuffleHelper = root.puzzle.helpers.ShuffleHelper;
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    let PuzzleListView = root.puzzle.views.PuzzleListView;
    
    const ELEMENTS_AMOUNT = SETTINGS.STYLE.ELEMENTS_IN_ROW * SETTINGS.STYLE.ELEMENTS_IN_ROW;
    const CONTAINER_SIZE = SETTINGS.STYLE.ELEMENT_SIZE * (SETTINGS.STYLE.ELEMENTS_IN_ROW - 1);
    
    class PuzzleController {
        constructor() {
            this.puzzleModels = null;
            this.puzzleViews = null;
            
            this.buildPuzzleModels();
            this.buildPuzzleViews();
            this.setupListeners();
        }
        
        buildPuzzleModels() {
            this.puzzleModels = new PuzzleListModel();
            for (let i = 0; i < ELEMENTS_AMOUNT - 1; i++)
                this.puzzleModels.add(new PuzzleElementModel(i));
        }
        
        buildPuzzleViews() {
            this.puzzleViews = new PuzzleListView();
            this.puzzleModels.setPosition((model) => this.puzzleViews.add(new PuzzleElementView(model)));
            this.puzzleViews.render(this.puzzleModels);
        }
        
        setupListeners() {
            $(document).on(SETTINGS.EVENTS.ELEMENT.CLICK, (event, dto) => this.movementHandler(event, dto));
            $(document).on(SETTINGS.EVENTS.ELEMENTS.RENDERED, (event) => this.onElementsRendered(event));
            $(document).on(SETTINGS.EVENTS.ELEMENT.ANIMATED, (event) => this.checkGameStatus());
        }
        
        destroyListeners() {
            $(document).off(SETTINGS.EVENTS.ELEMENT.CLICK);
            $(document).off(SETTINGS.EVENTS.ELEMENTS.RENDERED);
        }
        
        move(model, id, duration) {
            model.setPosition(id);
            
            return this.puzzleViews
                .getCurrentView(model)
                .move(model, duration);
        }

        checkGameStatus() {
            let isGameOver = this.puzzleModels.list.every((model) => {
                return model.isOnTargetPosition();
            });
            
            if (isGameOver) {
                this.destroyListeners();
                $(document).trigger(SETTINGS.EVENTS.DIALOG.SHOW_GAME_OVER);
            }
        }
        
        onElementsRendered() {
            console.log('All elements have been rendered.');
            
            let promiseFactories = [];
            for (let i = 0; i < 100; i++) {
                promiseFactories.push(() => {
                    return this.singleElementShuffle();
                });
            }
            
            this.executeSequentially(promiseFactories);
        }
        
        executeSequentially(promiseFactories) {
            let result = Promise.resolve();
            promiseFactories.forEach((promiseFactory) => {
                result = result.then(promiseFactory);
            });

            return result;
        }
        
        singleElementShuffle() {
            let arr = [];
            this.puzzleModels.list.forEach((model) => {
                if (this.setDirection(model.getPosition('currentId')) !== null) {
                    arr.push(model.getOriginId());
                }
            });
            
            let randomModelOriginId = ShuffleHelper.getRandomModel(arr);
            let randomModel = this.puzzleModels.findByOriginId(randomModelOriginId);
            return this.movementHandler(null, randomModel, 50);
        }
        
        movementHandler(event, dto, duration = SETTINGS.STYLE.MOVEMENT_DURATION) {
            let id = dto.currentId ? dto.currentId : dto.getPosition('currentId');
            let model = this.puzzleModels.findByCurrentId(id);
            let currentId = model.getPosition('currentId');
            let direction = this.setDirection(id);
            let positionId = this.setPositionId(direction, currentId);
            
            if (positionId !== null)
                return this.move(model, positionId, duration);
        }
        
        setDirection(id) {
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
        
        setPositionId(direction, currentId) {
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
            return this.puzzleModels.findByCurrentId(id).getPosition(direction);
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
            return this.puzzleModels.list.find((element) => {
                return Boolean(element.getPosition('currentId') == id);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
