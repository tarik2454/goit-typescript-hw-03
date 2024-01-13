class Key {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(public name: string, private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  private tenants: Person[] = [];

  constructor(public door: boolean = false, public key: Key) {}

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
const house = new MyHouse(false, key);

house.openDoor(person);
house.comeIn(person);
