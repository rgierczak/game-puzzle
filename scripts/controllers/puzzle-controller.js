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
    let DialogView = root.puzzle.views.DialogView;
    
    const ELEMENTS_AMOUNT = SETTINGS.STYLE.ELEMENTS_IN_ROW * SETTINGS.STYLE.ELEMENTS_IN_ROW;
    const CONTAINER_SIZE = SETTINGS.STYLE.ELEMENT_SIZE * (SETTINGS.STYLE.ELEMENTS_IN_ROW - 1);
    
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
            this.buildDialogView();
        }
    
        buildPuzzleModels() {
            this.puzzleModels = new PuzzleListModel();
            for (let i = 1; i < ELEMENTS_AMOUNT; i++)
                this.puzzleModels.add(new PuzzleElementModel(i));
        }
    
        buildResultsModel() {
            this.resultsModel = new ResultsModel();
        }
    
        buildDialogView() {
            this.dialogView = new DialogView();
        }
        
        buildStartButtonView() {
            this.startButtonView = new StartButtonView();
        }
    
        buildResultsView() {
            this.resultsView = new ResultsView(this.resultsModel);
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
            $(document).on(SETTINGS.EVENTS.GAME.OVER, (event) => this.onGameOver(event));
            $(document).on(SETTINGS.RESULTS.TIME.UPDATE, (event, dto) => this.onTimeUpdate(dto));
        }
        
        onTimeUpdate(dto) {
            this.resultsModel.setTime(dto);
            this.resultsView.renderTime(dto);
        }
        
        setupMovementListeners() {
            $(document).on(SETTINGS.EVENTS.ELEMENT.CLICK, (event, dto) => this.movementHandler(event, dto));
            $(document).on(SETTINGS.EVENTS.ELEMENT.ANIMATED, (event) => this.onElementAnimated());
        }
    
        destroyGameListeners() {
            $(document).off(SETTINGS.EVENTS.ELEMENTS.RENDERED);
            $(document).off(SETTINGS.EVENTS.ELEMENTS.SHUFFLED);
            $(document).off(SETTINGS.EVENTS.GAME.START);
            $(document).off(SETTINGS.EVENTS.GAME.OVER);
            $(document).off(SETTINGS.RESULTS.TIME.UPDATE);
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
            this.resultsView.renderMoves(this.resultsModel.getMoves());
            
            this.checkGameStatus();
        }
    
        checkGameStatus() {
            let isGameOver = this.puzzleModels.every((model) => {
                return model.isOnTargetPosition();
            });
    
            if (isGameOver) {
                this.resultsView.stopTimer();
                this.displayResults();
            }
        }
    
        displayResults() {
            let results = {
                time: this.resultsModel.getTime(),
                moves: this.resultsModel.getMoves()
            };
    
            this.dialogView.show(results);
        }
    
        onElementsShuffled() {
            this.resultsView.startTimer();
            this.isPuzzleViewShuffled = true;
            this.setupMovementListeners();
            this.startButtonView.enableStartButton();
        }
        
        onElementsRendered() {
            if (this.isPuzzleViewShuffled) {
                this.startShuffle();
            } else {
                this.startButtonView.enableStartButton();
            }
        }
        
        onGameStart() {
            if (this.isPuzzleViewShuffled) {
                this.setupGame();
            } else {
                this.startShuffle();
            }
        }
        
        onGameOver() {
            this.destroyMovementListeners();
        }
    
        startShuffle() {
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
