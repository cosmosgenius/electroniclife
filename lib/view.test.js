import View from './view';
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

const wor = new World(plan, legend);

test('View look should give the ch in the given direction', () => {
    const vec = new Vector(4, 2);
    const vw = new View(wor, vec);
    expect(vw.look('n')).toBe('#');
    expect(vw.look('e')).toBe(' ');

    const outsidevec = new Vector(6, 6);
    const outvw = new View(wor, outsidevec);
    expect(outvw.look('n')).toBe('#');
    expect(outvw.look('e')).toBe('#');
});

test('View findAll should give direction to given ch', () => {
    const vec = new Vector(4, 2);
    const vw = new View(wor, vec);

    expect(vw.findAll('#')).toEqual(['n','ne', 'se', 's']);
    expect(vw.findAll(' ')).toEqual(['e', 'sw', 'w', 'nw']);
    expect(vw.findAll('o').length).toBe(0);
});

test('View find should give a random direction if exist', () => {
    const vec = new Vector(4, 2);
    const vw = new View(wor, vec);

    expect(['n','ne', 'se', 's']).toContain(vw.find('#'));
    expect(['e', 'sw', 'w', 'nw']).toContain(vw.find(' '));
    expect(vw.find('o')).toBeUndefined();

});
