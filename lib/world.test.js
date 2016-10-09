import Vector from './vector';
import World from './world';
import Critter, { directions } from './critter';
import Wall from './wall';
import View from './view';

const plan = [
    '##########',
    '#   ##   #',
    '#   o    #',
    '#   ###  #',
    '#       o#',
    '##########'
];

const legend = {
    '#': Wall,
    'o': Critter
};



test('World should initialize with correct objects',() => {
    const wor = new World(plan, legend);
    const critter_pos = plan.reduce((pos_arr, line, y) => {
        for(var x = 0; x < line.length; x++) {
            if(line[x] === 'o') {
                pos_arr.push(new Vector(x, y));
            }
        }
        return pos_arr;
    }, []);

    critter_pos.forEach((vec) => {
        let element = wor.grid.get(vec);
        expect(element).toBeDefined();
        expect(element).toBeInstanceOf(Critter);
    });
});

test('World toString should return plan', () => {
    const wor = new World(plan, legend);
    expect(wor.toString()).toEqual(plan.join('\n') + '\n');
});

test('World turn should pass all critter to letAct function', () => {
    let mockLetAct = jest.fn();
    const wor = new World(plan, legend);
    wor.letAct = mockLetAct;
    wor.turn();
    expect(mockLetAct).toHaveBeenCalledTimes(2);
});

test('World letAct should do action', () => {
    const wor = new World(plan, legend);
    let crit = new Critter();
    let vec = new Vector(4, 2);

    let nonactioncrit = new Critter();
    nonactioncrit.act = jest.fn(() => ({type: 'something else'}));
    expect(wor.letAct(nonactioncrit, vec)).toBeUndefined();
    expect(nonactioncrit.act).toHaveBeenCalledTimes(1);

    let vec1 = new Vector(3, 2);
    wor.checkDestination = jest.fn(() => vec1);
    wor.grid.set(vec1, null);
    wor.letAct(crit, vec);
    expect(wor.checkDestination).toHaveBeenCalledTimes(1);
    expect(wor.grid.get(vec1)).toBe(crit);
    expect(wor.grid.get(vec)).toBeNull();

    const randomobj = {};

    wor.grid.set(vec, crit);
    wor.grid.set(vec1, randomobj);
    wor.letAct(crit, vec);
    expect(wor.checkDestination).toHaveBeenCalledTimes(2);
    expect(wor.grid.get(vec1)).toBe(randomobj);
    expect(wor.grid.get(vec)).toBe(crit);
});

test('World checkDestination should verify action destination', () => {
    let crit = new Critter();
    const wor = new World(plan, legend);
    let vec = new Vector(4, 2);
    let vw = new View(wor, vec);
    let actn = crit.act(vw);

    let dest = vec.plus(directions[actn.direction]);
    expect(wor.grid.isInside(dest)).toBeTruthy();
    expect(wor.checkDestination(actn, vec)).toEqual(dest);

    actn.direction = undefined;
    expect(wor.checkDestination(actn, vec)).toBeUndefined();

    let veclast = new Vector(9, 5);
    let destout = veclast.plus(directions['s']);
    expect(wor.grid.isInside(destout)).toBeFalsy();
    expect(wor.checkDestination({'direction': 's'}, veclast)).toBeUndefined();
});
