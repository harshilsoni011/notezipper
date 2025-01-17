/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

module.exports = function (express) {
    global.HTTP_STATUS_CODES = {
        OK: 200, // For send data, message
        CREATED: 201, // Resource Created
        ACCEPTED: 202, // Update, edit, delete request accepted
        NO_BODY: 204, // No content
        PARTIAL_SUCCESS: 206, // Partial content, request success but some part might failed
        NO_MODIFIED: 304, // No Data change
        BAD_REQUEST: 400, // Validation failed
        UNAUTHORIZED: 401, // Access without login
        FORBIDDEN: 403, // Forbidden
        NOT_FOUND: 404, // URL, Route, Page not found
        METHOD_NOT_ALLOWED: 405, // HTTP method
        CONFLICT: 409, // Duplicate, Already identity available
        UNSUPPORTED_TYPE: 415, // Unsupported media type
        LOCKED: 423, // Resource Locked
        ILLEGAL_ACCESS: 451, // Resource restrict by admin/system
        SERVER_ERROR: 500,
        BAD_GATEWAY: 502, // Not able to connect third party service or other service.
        SERVICE_UNAVAILABLE: 503, // Current service not available
        NOT_ACCEPTABLE: 406, // Request is not acceptable as some thing is missing
    };
    express.response.sendNotAcceptable = function (message) {
        this.status(406).json({
            status: 406,
            message,
        });
    };
    express.response.sendBadGateway = function (message) {
        this.status(502).json({
            status: 502,
            message,
        });
    };
    // eslint-disable-next-line default-param-last
    express.response.sendSuccess = function (data = {}, customMessage) {
        this.status(200).send({
            status: 200,
            data,
            message: customMessage || undefined,
        });
    };
    express.response.sendInvalidIdForList = function (customMessage) {
        this.status(200).send({
            status: 200,
            data: { list: [], recordsTotal: 0, recordsFiltered: 0 },
            message: customMessage || undefined,
        });
    };
    express.response.sendDuplicate = function (message) {
        this.status(409).send({
            status: 409,
            message,
        });
    };
    express.response.sendIsExists = function (response) {
        const code = response ? 200 : 404; // 200 = Resource exists, 404 = Resource does not exit

        this.status(code).send();
    };
    express.response.sendCreated = function (message, data = {}) {
        this.status(201).json({
            status: 201,
            data,
            message,
        });
    };
    express.response.sendUpdated = function (message, data = {}) {
        this.status(202).json({
            status: 202,
            data,
            message,
        });
    };
    express.response.sendDeleted = function (message) {
        this.status(202).json({
            status: 202,
            message,
        });
    };
    express.response.sendInvalidRequest = function (message) {
        this.status(400).json({
            status: 400,
            message,
        });
    };
    express.response.sendMessage = function (title, message) {
        // We've set code 200 to send response message in body
        this.status(200).json({
            status: 204,
            messageOnly: true,
            title,
            message,
        });
    };
    express.response.sendResourceNotFound = function (message) {
        this.status(404).json({
            status: 404,
            message,
        });
    };
    express.response.sendLogin = function (message, fromLogin = false) {
        if (!fromLogin) {
            // Based on RFC:https://tools.ietf.org/html/rfc6750
            this.set(
                'WWW-Authenticate',
                'Bearer realm="orderhero", error="invalid_token", error_description="You are not authorize to access."',
            );
        }
        this.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
            status: HTTP_STATUS_CODES.UNAUTHORIZED,
            title: fromLogin ? 'Login Failed' : '',
            message: message || 'You are not authorize to access.',
        });
    };
    express.response.sendUnauthorized = function (message) {
        this.status(HTTP_STATUS_CODES.FORBIDDEN).json({
            status: HTTP_STATUS_CODES.FORBIDDEN,
            message: message || 'You are not allowed to access.',
        });
    };
    // eslint-disable-next-line complexity
    express.response.sendError = function (err) {
        if (err.name === 'MulterError') {
            // Multer Error
            if (err.code === 'LIMIT_FILE_SIZE') {
                this.status(413).json({
                    status: 413,
                    expose: true,
                    message: err.message,
                });
            }
        } else if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            // JSON validation field
            this.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                status: HTTP_STATUS_CODES.BAD_REQUEST,
                expose: false,
                message: 'JSON validation failed.',
            });
        } else if (err.name === 'ValidationError') {
            // Manage Mongoose error
            const message = [];
            let title = 'Validation Error';
            let code = HTTP_STATUS_CODES.BAD_REQUEST;
            let expose = true;
            const fields = {
                required: [],
                len: [],
                castError: [],
            };
            for (const field in err.errors) {
                if (Object.prototype.hasOwnProperty.call(err.errors, field)) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                switch (err.errors[field].kind) {
                    case 'required':
                        fields.required.push(field);
                        break;
                    case 'maxlength':
                    case 'minlength':
                        fields.len.push(field);
                        break;
                    case 'String':
                    case 'Number':
                        if (err.errors[field].name === 'CastError') {
                            fields.castError.push(field);
                        }
                        break;
                    default:
                        break;
                }
            }
            if (fields.required.length > 0) {
                message.push(`Following fields are required: ${fields.required.join(', ')}`);
            }
            if (fields.len.length > 0) {
                message.push(`Following fields do not match length criteria: ${fields.len.join(', ')}`);
            }
            if (fields.castError.length > 0) {
                message.push(`Following fields do not have valid value: ${fields.castError.join(', ', s)}`);
            }
            if (message.length === 0) {
                title = 'Error';
                code = 500;
                expose = false;
                message.push('Unknown Error');
            }
            this.status(code).json({
                data: err.data || undefined,
                status: code,
                expose,
                message: message.join(', '),
                title,
            });
        } else if (err.name === 'MongoError') {
            if (err.code === 11000) {
                // TODO:Manage duplicate key error.
                let msg = 'Duplicate Value.';
                const fields = [];
                try {
                    const field = err.errmsg.split('index:')[1].split('dup key')[0].split('_')[0].trim();
                    let value = '';
                    try {
                        value = err.errmsg.split('index:')[1].split('dup key')[1].split('"')[1].trim();
                        // eslint-disable-next-line no-shadow
                    } catch (err) { /* empty */ }
                    if (value === '') {
                        msg = `Value already exist or duplicate for '${field}' field`;
                    } else {
                        msg = `'${value}' value already exist or duplicate for '${field}' field`;
                    }
                    const fieldValue = {};
                    fieldValue[field] = value;
                    fields.push(fieldValue);
                    // eslint-disable-next-line no-shadow
                } catch (err) {
                    msg = 'Duplicate Value.';
                }
                this.status(HTTP_STATUS_CODES.CONFLICT).json({
                    data: err.data || undefined,
                    status: HTTP_STATUS_CODES.CONFLICT,
                    expose: true,
                    title: 'Value already exists.',
                    message: msg,
                    fields,
                });
            } else {
                this.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
                    data: err.data || undefined,
                    status: HTTP_STATUS_CODES,
                    expose: false,
                    title: 'System Error',
                    message: 'Unknown database error.',
                });
            }
        } else {
            const code = err.statusCode || err.code || HTTP_STATUS_CODES.SERVER_ERROR;
            if (code === HTTP_STATUS_CODES.SERVER_ERROR) {
                // eslint-disable-next-line no-console
                console.error(err);
            }
            const expose = HTTP_STATUS_CODES.SERVER_ERROR !== code;
            this.status(code).json({
                data: err.data || undefined,
                status: code,
                expose,
                message: err.message,
            });
        }
    };
};
