import { Queue } from "../structures/queue";

export class QueueManager {

    private static queues: Map<string, Queue<any>> = new Map();

    static getQueue<T>(name: string): Queue<T> {
        let queue = QueueManager.queues.get(name);

        if (!queue) {
            queue = new Queue<T>();
            QueueManager.queues.set(name, queue);
        }

        return queue;
    }

}