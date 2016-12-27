let Utils = {
    shuffle(array) {
        let result = array;
        
        for (let i = result.length - 1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let randomElement = result[randomIndex];
            
            result[randomIndex] = result[i];
            result[i] = randomElement;
        }
        
        return result;
    }
};
