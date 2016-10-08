import Vector from './vector';
import World from './world';
import Critter from './critter';
import Wall from './wall';

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
