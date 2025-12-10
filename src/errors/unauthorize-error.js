class UnauthorizeError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizeError";
        this.statusCode = 401;
    }
}

export default UnauthorizeError;