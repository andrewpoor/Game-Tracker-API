export class ErrorBase extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}