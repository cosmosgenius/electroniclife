import Grid from './grid';
import Vector from './vector';

test('Grid should initialize space, width and height', () => {
    let g = new Grid(4,5);
    expect(g.space.length).toBe(4 * 5);
    expect(g.width).toBe(4);
    expect(g.height).toBe(5);
});

test('grid isInside should return true for vector inside', () => {
    let g = new Grid(5,5);
    let vec1 = new Vector(2, 3);
    let vec2 = new Vector(2, 5);
    let vec3 = new Vector(5, 2);
    let vec4 = new Vector(0, 0);
    let vec5 = new Vector(1, 0);
    let vec6 = new Vector(0, 1);
    let vec7 = new Vector(-1, 0);
    let vec8 = new Vector(0, -1);

    expect(g.isInside(vec1)).toBe(true);
    expect(g.isInside(vec2)).toBe(false);
    expect(g.isInside(vec3)).toBe(false);
    expect(g.isInside(vec4)).toBe(true);
    expect(g.isInside(vec5)).toBe(true);
    expect(g.isInside(vec6)).toBe(true);
    expect(g.isInside(vec7)).toBe(false);
    expect(g.isInside(vec8)).toBe(false);
});

test('grid set should set the value for vector and get should get the value', () => {
    let g = new Grid(5,5);
    let vec1 = new Vector(2, 3);

    g.set(vec1, 'test');
    expect(g.get(vec1)).toBe('test');
});

test('grid forEach to executed for all non space', () => {
    let g = new Grid(5,5);
    let data = [
        [null, null, null, null, null],
        [null, 'a', null, null, null],
        [null, null, null, 'm', null],
        ['r', null, null, null, null],
        [null, null, null, 'k', null]
    ];
    for(var y = 0; y < g.height; y++) {
        for(var x = 0; x < g.width; x++) {
            let vec = new Vector(x, y);
            g.set(vec, data[y][x]);
        }
    }

    let cb = jest.fn();
    g.forEach(cb);
    expect(cb).toHaveBeenCalledTimes(4);
    expect(cb).toHaveBeenLastCalledWith('k', new Vector(3, 4));
});
