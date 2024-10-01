import { AxiosRequestConfig } from 'axios';
declare class Bot {
    private proxy?;
    constructor(proxy?: string);
    private wait;
    executeTask(taskName: string, config: AxiosRequestConfig, waitTimeMs?: number): Promise<any>;
    private countdown;
    logStatus(status: string): void;
    logError(error: string): void;
    logSuccess(message: string): void;
    private createProxyAgent;
}
export default Bot;
