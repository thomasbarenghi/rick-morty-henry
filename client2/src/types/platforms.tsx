export class PlatformsClass {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  static deserialize(input: any): PlatformsClass {
    return new PlatformsClass(input.id, input.name);
  }

  static deserializeList(input: any[]): PlatformsClass[] {
    console.log("input", input);
    return input?.map((room) => PlatformsClass.deserialize(room));
  }
}
