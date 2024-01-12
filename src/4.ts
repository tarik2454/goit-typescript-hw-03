class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;
  name: string;

  constructor(name: string, key: Key) {
    this.name = name;
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  door: boolean;
  key: Key;
  tenants: Person[] = [];

  constructor(door: boolean, key: Key) {
    this.door = door;
    this.key = key;
  }

  abstract openDoor(person: Person): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`${person.name} has entered the house.`);
    } else {
      console.log('The door is closed. Cannot let anyone in.');
    }
  }
}

class MyHouse extends House {
  constructor(key: Key) {
    super(false, key);
  }

  openDoor(person: Person): void {
    const isDoorUnlocked =
      person.getKey().getSignature() === this.key.getSignature();
    if (isDoorUnlocked) {
      this.door = true;
      console.log('The door is now open.');
    } else {
      console.log('The key does not match. Cannot open the door.');
    }
  }
}

const key = new Key();
const person = new Person('John', key);
const house = new MyHouse(key);

house.openDoor(person);
house.comeIn(person);
