export interface BaseEvent {
    name: string,
    once: boolean,
    execute: (...args: any[]) => void;
}