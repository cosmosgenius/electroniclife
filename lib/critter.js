import Vector from './vector';

export const directions = {
    'n': new Vector(0, -1),
    'ne': new Vector(1, -1),
    'e': new Vector(1, 0),
    'se': new Vector(1, 1),
    's': new Vector(0, 1),
    'sw': new Vector(-1, -1),
    'w': new Vector(-1, 0),
    'nw': new Vector(-1, -1)
};

const dkeys = Object.keys(directions);

class Critter {
    constructor() {
        this.direction = dkeys[Math.floor(Math.random() * dkeys.length)];
    }

    act(view) {
        if(view.look(this.direction) !== ' ') {
            this.direction = view.find(' ') || 's';
        }
        return {
            type: 'move',
            direction: this.direction
        };
    }
}

export default Critter;
