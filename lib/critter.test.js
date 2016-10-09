import Critter, { directions } from './critter';
import View from './view';
import Vector from './vector';
import World from './world';
import Wall from './wall';

const dkeys = Object.keys(directions);

const plan = [
    '##########',
    '#   ##   #',
    '#   o    #',
    '#   ## ###',
    '#      oo#',
    '##########'
];

const legend = {
    '#': Wall,
    'o': Critter
};

const wor = new World(plan, legend);

test('Critter direction should be one of the dkeys', ()=> {
    let crit = new Critter();
    expect(dkeys).toContain(crit.direction);
});

test('Critter act should look for empty space and give action details', () => {
    let crit = new Critter();

    let vec = new Vector(4, 2);
    let vw = new View(wor, vec);
    expect(['e', 'sw', 'w', 'nw']).toContain(vw.find(' '));

    let action = crit.act(vw);
    expect(action.type).toBe('move');
    expect(action.direction).toBe(crit.direction);

    let vec2 = new Vector(8, 4);
    let vw2 = new View(wor, vec2);
    let act2 = crit.act(vw2);
    expect(act2.direction).toBe('s');
});
