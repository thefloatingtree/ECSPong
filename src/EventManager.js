class Event {
    constructor() {
        this.waitingToSee = 0;
        this.haveSeen = 0;
        this.payloads = [];
    }
}

export class EventManager {
    constructor() {
        this.events = new Map();
    }

    send(eventType, payload = {}) {
        this._insureEventTypeExists(eventType);
        let event = this.events.get(eventType);
        if (event.waitingToSee === event.haveSeen) {
            event.haveSeen = 0;
            event.payloads = []
        }
        event.payloads.push(payload);
    }

    register(eventType) {
        this._insureEventTypeExists(eventType);
        this.events.get(eventType).waitingToSee++;
    }

    receive(eventType) {
        let event = this.events.get(eventType);
        if (event.payloads.length === 0) return [];
        if (event.waitingToSee === event.haveSeen) return [];
        event.haveSeen++;
        return event.payloads;
    }

    _insureEventTypeExists(eventType) {
        if (!this.events.get(eventType))
            this.events.set(eventType, new Event());
    }
}