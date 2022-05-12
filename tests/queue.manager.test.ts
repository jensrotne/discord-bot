import { QueueManager } from "../src/managers/queue.manager";
import { Queue } from "../src/structures/queue";

describe('QueueManager tests', () => {

    it('Should get queue', () => {
        const queue: Queue<string> = QueueManager.getQueue('test');

        expect(queue).toBeDefined();
    });

    it('Should share items between calls', () => {
        let queue: Queue<string> = QueueManager.getQueue('test');

        queue.push('test');

        expect(queue.size()).toBe(1);

        queue = QueueManager.getQueue('test');

        queue.push('test2');

        expect(queue.size()).toBe(2);
    });

});