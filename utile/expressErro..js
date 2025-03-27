class expressError extends Error {
    constructor(status, message) {
        super(message); // ✅ Error class का constructor call करना जरूरी है
        this.status = status;
    }
}

module.exports = expressError;

