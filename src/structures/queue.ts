export class Queue<T> {

    private queue: T[] = [];

    public push(item: T): void {
        this.queue.push(item);
    }

    public pop(): T | undefined {
        return this.queue.shift();
    }

    public peek(): T | undefined {
        return this.queue[0];
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    public size(): number {
        return this.queue.length;
    }

    public clear(): void {
        this.queue = [];
    }

    public forEach(callback: (item: T, index: number) => void): void {
        this.queue.forEach(callback);
    }

}