interface IConfig {
    hostHttp: string,
    host: string,
    throttleTime: number,
    ws: WebSocket | null
}

const config: IConfig = {
    hostHttp: 'http://localhost:4001',
    host: 'ws://localhost:4000',
    throttleTime: 500,
    ws: null
};
export default config;
