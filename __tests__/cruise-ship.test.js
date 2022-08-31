const Ship = require("../src/cruise-ship");

describe("Ship", () => {
  describe("Ship instantiation", () => {
    let ship;
    let itinerary;
    let port;

    beforeEach(() => {
      port = {
        name: "Dover",
        ships: [],
        addShip: jest.fn(),
        removeShip: jest.fn(),
      };
      itinerary = { ports: [port] };
      ship = new Ship(itinerary);
    });

    it("returns an object", () => {
      expect(ship).toBeInstanceOf(Object);
    });

    it("initial starting point is Dover", () => {
      expect(ship.currentPort).toEqual(port);
    });

    it("previous port initialises with null", () => {
      expect(ship.previousPort).toEqual(null);
    });

    it("Ship gets added to Port property ships on instantiation", () => {
      expect(port.addShip).toHaveBeenCalled();
    });

  });
});

describe("Ship methods", () => {
  describe("setSail and dock", () => {
    let dover;
    let calais;
    let itinerary;
    let ship;

    beforeEach(() => {
      dover = {
        name: "Dover",
        ships: [],
        addShip: jest.fn(),
        removeShip: jest.fn(),
      };
      calais = {
        name: "Calais",
        ships: [],
        addShip: jest.fn(),
        removeShip: jest.fn(),
      };
      itinerary = { ports: [dover, calais] };
      ship = new Ship(itinerary);
    });
    
    it("has a method called set sail", () => {
      expect(ship.setSail).toBeInstanceOf(Function);
    });

    it("can set sail", () => {
      ship.setSail();

      expect(ship.currentPort).toBeFalsy();
      expect(dover.removeShip).toHaveBeenCalledWith(ship);
    });

    it("can dock", () => {
      ship.setSail();
      ship.dock();

      expect(calais.addShip).toHaveBeenCalledWith(ship);
      expect(() => ship.setSail()).toThrow("End of itinerary");
    });
  });
});
