

export default class InfiniteQueue {
  private innerArray: Array<string>;

  constructor(elements: string[]) {
    this.innerArray = elements;
  }

  private enqueue(value: string) {
    this.innerArray.push(value);
  }
  private dequeue(): string {
    return this.innerArray.shift()!;
  }

  public peek(): string {
    let returnVal:string = this.innerArray[0]!;
    this.shiftUp();
    return returnVal;

  }

  private shiftUp() {
    return this.enqueue(this.dequeue());
  }
}
