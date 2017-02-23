(function (root) {
    'use strict';
    
    let SETTINGS = root.puzzle.settings;
    let ShuffleHelper = root.puzzle.helpers.ShuffleHelper;
    let PromiseHelper = root.puzzle.helpers.PromiseHelper;
    
    let PuzzleListModel = root.puzzle.models.PuzzleListModel;
    let PuzzleElementModel = root.puzzle.models.PuzzleElementModel;
    let ResultsModel = root.puzzle.models.ResultsModel;
    
    let PuzzleElementView = root.puzzle.views.PuzzleElementView;
    let PuzzleListView = root.puzzle.views.PuzzleListView;
    let StartButtonView = root.puzzle.views.StartButtonView;
    let ResultsView = root.puzzle.views.ResultsView;
    
    const ELEMENTS_AMOUNT = SETTINGS.STYLE.ELEMENTS_IN_ROW * SETTINGS.STYLE.ELEMENTS_IN_ROW;
    const CONTAINER_SIZE = SETTINGS.STYLE.ELEMENT_SIZE * (SETTINGS.STYLE.ELEMENTS_IN_ROW - 1);
    const MOVES = 0;
    const CORRECT_ELEMENTS = 60;
    const INCORRECT_ELEMENTS = 0;
    
    class PuzzleController {
        constructor() {
            this.startButtonView = null;
            this.resultsView = null;
            this.isPuzzleViewShuffled = false;
            this.setupGame();
        }
    
        setupGame() {
            this.resultsModel = null;
            this.puzzleModels = null;
            this.puzzleView = null;
            
            this.destroyListeners();
            this.buildModels();
            this.buildViews();
            this.setupGameListeners();
        }
        
        buildModels() {
            this.buildPuzzleModels();
            this.buildResultsModel();
        }
    
        buildViews() {
            this.buildStartButtonView();
            this.buildPuzzleView();
            this.buildResultsView();
        }
    
        buildPuzzleModels() {
            this.puzzleModels = new PuzzleListModel();
            for (let i = 0; i < ELEMENTS_AMOUNT - 1; i++)
                this.puzzleModels.add(new PuzzleElementModel(i));
        }
    
        buildResultsModel() {
            this.resultsModel = new ResultsModel({
                moves: MOVES,
                correctElements: CORRECT_ELEMENTS,
                incorrectElements: INCORRECT_ELEMENTS
            });
        }
    
        buildStartButtonView() {
            this.startButtonView = new StartButtonView();
        }
    
        buildResultsView() {
            this.resultsView = new ResultsView();
            this.resultsView.render(this.resultsModel);
        }
    
        buildPuzzleView() {
            this.puzzleView = new PuzzleListView();
            this.puzzleModels.setPosition((model) => this.puzzleView.add(new PuzzleElementView(model)));
            this.puzzleView.render(this.puzzleModels);
        }
        
        setupGameListeners() {
            $(document).on(SETTINGS.EVENTS.ELEMENTS.RENDERED, (event) => this.onElementsRendered(event));
            $(document).on(SETTINGS.EVENTS.ELEMENTS.SHUFFLED, (event) => this.onElementsShuffled(event));
            $(document).on(SETTINGS.EVENTS.GAME.START, (event) => this.onGameStart(event));
        }
        
        setupMovementListeners() {
            $(document).on(SETTINGS.EVENTS.ELEMENT.CLICK, (event, dto) => this.movementHandler(event, dto));
            $(document).on(SETTINGS.EVENTS.ELEMENT.ANIMATED, (event) => this.onElementAnimated());
        }
    
        destroyGameListeners() {
            $(document).off(SETTINGS.EVENTS.ELEMENTS.RENDERED);
            $(document).off(SETTINGS.EVENTS.ELEMENTS.SHUFFLED);
            $(document).off(SETTINGS.EVENTS.GAME.START);
        }
        
        destroyMovementListeners() {
            $(document).off(SETTINGS.EVENTS.ELEMENT.CLICK);
            $(document).off(SETTINGS.EVENTS.ELEMENT.ANIMATED);
        }
        
        destroyListeners() {
            this.destroyGameListeners();
            this.destroyMovementListeners();
        }
        
        onElementAnimated() {
            this.resultsModel.incrementMove();
            this.resultsView.setMoves(this.resultsModel.getMoves());
            
            this.checkGameStatus();
        }
    
        checkGameStatus() {
            let isGameOver = this.puzzleModels.every((model) => {
                return model.isOnTargetPosition();
            });
    
            if (isGameOver) {
                // this.destroyListeners();
                $(document).trigger(SETTINGS.EVENTS.DIALOG.SHOW_GAME_OVER);
            }
        }
    
        onElementsShuffled() {
            console.log('All elements have been shuffled.');
            
            this.isPuzzleViewShuffled = true;
            this.setupMovementListeners();
            this.startButtonView.enableStartButton();
        }
        
        onElementsRendered() {
            console.log('All elements have been rendered.');
            
            if (this.isPuzzleViewShuffled) {
                this.startShuffle();
            } else {
                this.startButtonView.enableStartButton();
            }
        }
        
        onGameStart() {
            if (this.isPuzzleViewShuffled) {
                console.log('setupGame');
                this.setupGame();
            } else {
                this.startShuffle();
            }
        }
    
        startShuffle() {
            console.log('startShuffle');
            this.destroyMovementListeners();
            this.startButtonView.disableStartButton();
            this.shuffle();
        }
        
        shuffle() {
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
            let randomModelPosition = this.puzzleModels.findByOriginId(originId).getPosition();
            
            return this.movementHandler(null, randomModelPosition, SETTINGS.STYLE.SHUFFLE_MOVE_TIME);
        }
        
        getMovementModels() {
            let models = [];
            
            this.puzzleModels.each((model) => {
                let currentId = model.getPositionProperty('currentId');
                let isMovementPossible = (this.checkDirection(currentId) !== null);
                
                if (isMovementPossible) {
                    models.push(model.getOriginId());
                }
            });
            
            return models;
        }
        
        movementHandler(event, dto, duration = SETTINGS.STYLE.MOVE_TIME) {
            let model = this.puzzleModels.findByCurrentId(dto.currentId);
            let updatedCurrentId = this.updateCurrentId(dto.currentId, model);
            
            return this.move(model, updatedCurrentId, duration);
        }
        
        move(model, id, duration) {
            if (id == null) 
                return;
            
            model.setPosition(id);
            
            let view = this.puzzleView.getCurrentView(model);
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
            return this.puzzleModels.findByCurrentId(id).getPositionProperty(direction);
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
                return Boolean(element.getPositionProperty('currentId') == id);
            });
        }
    }
    
    root.puzzle.controllers.PuzzleController = PuzzleController;
})(window);
