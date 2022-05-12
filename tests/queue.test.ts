import { Queue } from "../src/structures/queue";

describe('Queue tests', () => {
    let queue: Queue<string>;

    beforeEach(() => {
        queue = new Queue<string>();
    });

    it('should push items', () => {
        queue.push('test');
        expect(queue.size()).toBe(1);
    });

    it('should pop items', () => {
        queue.push('test');
        expect(queue.pop()).toBe('test');
        expect(queue.size()).toBe(0);
    });

    it('should peek items', () => {
        queue.push('test');
        expect(queue.peek()).toBe('test');
        expect(queue.size()).toBe(1);
    });

    it('should clear items', () => {
        queue.push('test');
        queue.clear();
        expect(queue.size()).toBe(0);
    });

    it('should check if empty', () => {
        expect(queue.isEmpty()).toBe(true);
    });

    it('should for each items', () => {
        queue.push('test');
        queue.push('test2');
        queue.forEach((item, index) => {
            expect(item).toBe(queue['queue'][index]);
        });
    });
});