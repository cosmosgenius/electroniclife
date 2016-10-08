import Vector from './vector';

test('Vector should initialize properly', () => {
    let vec = new Vector(10, 20);
    expect(vec.x).toBe(10);
    expect(vec.y).toBe(20);
});

test('Vector plus should return new vector and add it', () => {
    let vec = new Vector(10, 20);
    let vec2 = new Vector(3, 4);

    let vec3 = vec.plus(vec2);
    expect(vec3.x).toBe(13);
    expect(vec3.y).toBe(24);
});
