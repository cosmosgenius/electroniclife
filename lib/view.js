import { directions } from './critter';

class View {
    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }

    look(direction) {
        const dirvec = directions[direction];
        const target = this.vector.plus(dirvec);
        if (this.world.grid.isInside(target)) {
            return this.world.charFromElement(this.world.grid.get(target));
        }
        return '#';
    }

    findAll(ch) {
        const dkeys = Object.keys(directions);

        return dkeys.filter((direction) => {
            return this.look(direction) === ch;
        });
    }

    find(ch) {
        const dirs = this.findAll(ch);
        return dirs[Math.floor(Math.random() * dirs.length)];
    }
}

export default View;
