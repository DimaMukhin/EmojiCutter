/**
 *  1: invalid emoji name
 *  2: no file found
 *  3: Internal Server Error, cannot save file
 *  4: file format not supported
 *  5: Internal Server Error, could not read file
 *  6: Internal Server Erorr, failed to write emoji piece to disk
 *  7: Internal Server Error, could not remove file from disk
 *  8: Internal Server Error, could not remove directory from disk
 *  9: Internal Server Error, could not zip directory
 *  10: max file size exceeded
 */
class ServerError {
    constructor(code, message, delegatedError) {
        this.message = message;
        this.code = code;
        this.delegatedError = delegatedError;
    }
}

module.exports = ServerError;