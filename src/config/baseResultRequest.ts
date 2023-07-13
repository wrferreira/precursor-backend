export class BaseRequestResult<T> {
    error: boolean = false;
    message: string | undefined;
    dataResult: T | undefined;
}