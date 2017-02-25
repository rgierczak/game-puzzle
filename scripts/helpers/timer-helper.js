(function (root) {
    
    let SETTINGS = root.puzzle.settings;
    
    function parseUnit(unit) {
        let leadingZero = unit < 10 ? "0" : "";
        return  leadingZero + unit.toString();
    }
    
    let Timer = {
        index: null,
        timerId: 0,
        interval: 1000,
        seconds: 0,
        minutes: 0,
        time: null,
        
        start() {
            this.clearTime();
            
            this.timerId = setInterval(() => {
                this.setClock();
            }, this.interval);
        },
        
        stop() {
            clearInterval(this.timerId);
        },
        
        clearTime() {
            this.index = 0;
            this.time = 0;
            this.seconds = 0;
            this.minutes = 0;
        },
        
        setClock() {
            this.seconds += 1;
            
            if (this.seconds > 59) {
                this.seconds = 0;
                this.minutes += 1;
            }
            
            this.time = 
                parseUnit(this.minutes) + ':' + 
                parseUnit(this.seconds);
            
            $(document).trigger(SETTINGS.RESULTS.TIME.UPDATE, [this.time]);
        }
    };
    
    root.puzzle.helpers.Timer = Timer;
})(window);



