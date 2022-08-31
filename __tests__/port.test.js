const Port = require('../src/port');

describe('Port', () => {
  describe('Port instantiation', () => {
    let port;

    beforeEach(() => {
      port = new Port('Calais');
    });

    it('is an object', () => {
      expect(port).toBeInstanceOf(Object);
    });

    it('has name Calais', () => {
      expect(port.name).toEqual('Calais');
    });

    it('ships initiates empty', () => {
      expect(port.ships.length).toEqual(0);
    });

  });
});

describe('Port method addShip', () => {
  describe('addShip', () => {
    let dover;
    let ship;

    beforeEach(() => {
      dover = new Port('Dover');
      ship = jest.fn();
    });

    it('add ship is a method and pushes a ship into the ships array', () => {
      dover.addShip(ship);

      expect(dover.addShip).toBeInstanceOf(Function);
      expect(dover.ships).toEqual([ship]);
    });

  });
});

describe('port method removeShip', () => {
  describe('removeShip', () => {
    let dover;
    let neptune;
    let atlantis;

    beforeEach(() => {
      dover = new Port('Dover');
      neptune = jest.fn();
      atlantis = jest.fn();
    });

    it('remove ship is a method and removes an element from an array', () => {
      dover.addShip(neptune);
      dover.addShip(atlantis);
      dover.removeShip(neptune);

      expect(dover.removeShip).toBeInstanceOf(Function);
      expect(dover.ships).toEqual([atlantis]);
    });
    
  });
});
