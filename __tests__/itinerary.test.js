const Itinerary = require("../src/itinerary");

describe("Itinerary", () => {
  describe("Itinerary instantiation", () => {
    let itinerary;
    let dover;
    let calais;

    beforeEach(() => {
      dover = jest.fn();
      calais = jest.fn();
      itinerary = new Itinerary([dover, calais]);
    });

    it("itinerary is an object", () => {
      expect(itinerary).toBeInstanceOf(Object);
    });

    it("ports is a property of Itinerary", () => {
      expect(itinerary.ports.length).toEqual(2);
      expect(itinerary.ports).toEqual([dover, calais]);
    });
    
  });
});
