(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;

      this.initialiseSea();

      this.headsUpMessageBoard();

      const sailButton = document.querySelector('#sailbutton');
      sailButton.addEventListener('click', () => {
        if (document.querySelector('#sailbutton').disabled) {
          console.log('button disabled');
        } else {
          this.setSail();
        }
      });
    }

    get messageCurrentPort() {
      return this.ship.currentPort.name;
    }

    get messageNextPort() {
      const ship = this.ship;
      const indexOfNextPort =
        ship.itinerary.ports.indexOf(ship.currentPort) + 1;
      let nextPort;
      if (!this.endOfItinerary) {
        nextPort = ship.itinerary.ports[indexOfNextPort].name;
      } else {
        nextPort = 'End of cruise';
      }
      return nextPort;
    }

    get endOfItinerary() {
      const indexOfNextPort =
        this.ship.itinerary.ports.indexOf(this.ship.currentPort) + 1;
      return indexOfNextPort >= this.ship.itinerary.ports.length;
    }

    initialiseSea() {
      const backgrounds = ['./images/water0.png', './images/water1.png'];
      let waterImage = document.querySelector('#viewport');
      let counter = 0;
      window.setInterval(() => {
        waterImage.style.backgroundImage = `url('${
          backgrounds[counter % backgrounds.length]
        }')`;
        counter++;
      }, 1000);
    }

    renderPorts(ports) {
      let portsElement = document.querySelector('#ports');
      let portNameElement = document.querySelector('#portNames');
      portsElement.style.width = '0px';
      portNameElement.style.width = '0px';
      ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        const newPortNameElement = document.createElement('div');

        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        newPortElement.className = 'port';

        newPortNameElement.dataset.portName = port.name;
        newPortNameElement.dataset.portIndex = index;
        newPortNameElement.className = 'portName';
        newPortNameElement.innerHTML = `${port.name}`;

        portsElement.appendChild(newPortElement);
        newPortElement.appendChild(newPortNameElement);

        const portsElementWidth = parseInt(portsElement.style.width, 10);
        const portNameElementWidth = parseInt(portNameElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
        portNameElement.style.width = `${portNameElementWidth + 256}px`;
      });
    }

    renderShip() {
      const ship = this.ship;
      const indexOfCurrentPort = ship.itinerary.ports.indexOf(ship.currentPort);
      const currentPortElement = document.querySelector(
        `[data-port-index="${indexOfCurrentPort}"]`
      );
      const shipElement = document.querySelector('#ship');
      shipElement.style.visibility = 'visible';
      shipElement.style.top = `${currentPortElement.offsetTop + 15}px`;
      shipElement.style.left = `${currentPortElement.offsetLeft - 8}px`;
    }

    setSail() {
      const ship = this.ship;
      const indexOfNextPort =
        ship.itinerary.ports.indexOf(ship.currentPort) + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index="${indexOfNextPort}"]`
      );
      const sailButton = document.querySelector('#sailbutton');
      sailButton.innerHTML = 'Enjoy the journey';
      sailButton.disabled = true;
      this.headsUpMessageBoard();
      if (this.endOfItinerary) {
        this.renderMessage(`We have reached our final port`);
      } else {
        this.renderMessage(
          `We have now departed from ${ship.currentPort.name}`
        );
        const shipElement = document.querySelector('#ship');
        const end = parseInt(nextPortElement.offsetLeft, 10);
        let sailInterval = null;
        sailInterval = setInterval(() => {
          let posX = parseInt(shipElement.style.left, 10);
          if (posX === end - 8) {
            ship.setSail();
            ship.dock();
            this.renderMessage(`We have arrived at ${ship.currentPort.name}`);
            this.headsUpMessageBoard();
            sailButton.innerHTML = 'Sail to next port';
            sailButton.disabled = false;
            clearInterval(sailInterval);
          } else {
            shipElement.style.left = `${posX + 1}px`;
          }
        }, 20);
      }
    }

    renderMessage(message) {
      const siblingElement = document.querySelector('#sailbutton');
      const parentElement = document.querySelector('#sailbutton').parentNode;
      const newMessageElement = document.createElement('div');
      siblingElement.style.display = 'none';
      newMessageElement.id = 'message';
      if (this.endOfItinerary) {
        newMessageElement.innerHTML = `${message}, this is our final port.`;
      } else {
        newMessageElement.innerHTML = message;
      }
      parentElement.insertBefore(newMessageElement, siblingElement);
      if (!this.endOfItinerary) {
        setTimeout(() => {
          newMessageElement.remove();
          siblingElement.style.display = '';
        }, 2000);
      }
    }
    
    headsUpMessageBoard() {
      const headsUpElement = document.querySelector('#headsUpBoard');
      headsUpElement.innerHTML = `Current port: ${this.messageCurrentPort}
Next port: ${this.messageNextPort}`;
    }
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
})();
