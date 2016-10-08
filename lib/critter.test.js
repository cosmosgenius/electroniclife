import Critter, { directions } from './critter';

const dkeys = Object.keys(directions);

test('Critter direction should be one of the dkeys', ()=> {
    let crit = new Critter();
    expect(dkeys).toContain(crit.direction);
});
