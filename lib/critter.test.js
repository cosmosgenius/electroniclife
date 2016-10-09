import Critter, { directions } from './critter';
import View from './view';
import Vector from './vector';
import World from './world';
import Wall from './wall';

const dkeys = Object.keys(directions);


test('Critter direction should be one of the dkeys', ()=> {
    let crit = new Critter();
    expect(dkeys).toContain(crit.direction);
});

test('Critter act should look for empty space and give action details', () => {
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
    const crit = new Critter();

    const vec = new Vector(4, 2);
    let vw = new View(wor, vec);

    const directionwithspace = 'w';
    const directionwithoutspace = 'n';

    crit.direction = directionwithspace;
    vw.find = jest.fn();
    let action = crit.act(vw);
    expect(vw.find).toHaveBeenCalledTimes(0);
    expect(crit.direction).toBe(directionwithspace);
    expect(action.direction).toBe(directionwithspace);

    crit.direction = directionwithoutspace;
    vw = new View(wor, vec);
    vw.find = jest.fn(() => 'viewvalue');
    action = crit.act(vw);
    expect(vw.find).toHaveBeenCalledTimes(1);
    expect(crit.direction).toBe('viewvalue');
    expect(action.direction).toBe('viewvalue');

    crit.direction = directionwithoutspace;
    vw = new View(wor, vec);
    vw.find = jest.fn(() => undefined);
    action = crit.act(vw);
    expect(vw.find).toHaveBeenCalledTimes(1);
    expect(crit.direction).toBe('s');
    expect(action.direction).toBe('s');

});
