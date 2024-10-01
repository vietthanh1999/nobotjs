import { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';
declare class Bot {
    private proxy?;
    constructor(proxy?: string);
    wait(ms: number): Promise<unknown>;
    executeTask(taskName: string, config: AxiosRequestConfig, waitTimeMs?: number): Promise<any>;
    countdown(ms: number): Promise<void>;
    logStatus(status: string): void;
    logError(error: string): void;
    logSuccess(message: string): void;
    createProxyAgent(url: string | undefined): HttpsProxyAgent<string> | HttpProxyAgent<string> | undefined;
}
export default Bot;
