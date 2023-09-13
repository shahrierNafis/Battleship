import Ship from "./Ship.js"


let ship = Ship.create(3)



test("factory", () => {
    expect(ship).toEqual({
        length: 3,
        hits: 0,
        hit: expect.any(Function),
        isSunk: expect.any(Function),
    });
})
test("hit function", () => {
    ship.hit()
    expect(ship.hits).toBe(1);
})
test("isSunk function", () => {
    ship.hit()
    expect(ship.isSunk()).toBeFalsy();
    ship.hit()
    expect(ship.isSunk()).toBeTruthy();
})