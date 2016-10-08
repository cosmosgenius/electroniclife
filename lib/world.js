import Grid from './grid';
import Vector from './vector';
import View from './view';
import { directions } from './critter';

class World {
    constructor(map, legend) {
        this.grid = new Grid(map[0].length, map.length);
        this.legend = legend;

        map.forEach((line, y) => {
            for(var x = 0; x < line.length; x++) {
                this.grid.set(new Vector(x, y), this.elementFromChar(line[x]));
            }
        });
    }

    turn() {
        const acted = new Set();

        this.grid.forEach((critter, vector) => {
            if(critter.act && !acted.has(critter)) {
                acted.add(critter);
                this.letAct(critter, vector);
            }
        });
    }

    letAct(critter, vector) {
        const action = critter.act(new View(this, vector));

        if(action && action.type === 'move') {
            let dest = this.checkDestination(action, vector);
            if(dest && this.grid.get(dest) === null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    }

    checkDestination(action, vector) {
        if(directions.hasOwnProperty(action.direction)) {
            const dest = vector.plus(directions[action.direction]);
            if(this.grid.isInside(dest)){
                return dest;
            }
        }
    }

    elementFromChar(ch) {
        const EleClass = this.legend[ch];
        if(EleClass) {
            const element = new EleClass();
            element.originChar = ch;
            return element;
        }
        return null;
    }

    charFromElement(element) {
        if(element === null) {
            return ' ';
        }
        return element.originChar;
    }

    toString() {
        let output = '';

        for(var y = 0; y < this.grid.height; y++) {
            for(var x = 0; x < this.grid.width; x++) {
                const element = this.grid.get(new Vector(x, y));
                output += this.charFromElement(element);
            }
            output += '\n';
        }
        return output;
    }
}

export default World;
