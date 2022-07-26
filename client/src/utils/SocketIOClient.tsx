// https://stackoverflow.com/questions/14084406/typescript-and-socket-io

export declare module SocketIOClient {
    interface Socket {
        on(event: string, fn: Function): Socket;
        once(event: string, fn: Function): Socket;
        off(event?: string, fn?: Function): Socket;
        emit(event: string, ...args: any[]): Socket;
        listeners(event: string): Function[];
        hasListeners(event: string): boolean;
        connected: boolean;
    }

    interface ManagerStatic {
        (url: string, opts: any): SocketIOClient.Manager;
        new (url: string, opts: any): SocketIOClient.Manager;
    }

    interface Manager {
        reconnection(v: boolean): Manager;
        reconnectionAttempts(v: boolean): Manager;
        reconnectionDelay(v: boolean): Manager;
        reconnectionDelayMax(v: boolean): Manager;
        timeout(v: boolean): Manager;
    }
}