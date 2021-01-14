module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;

    switch (name) {
        case 'ALREADY_USED':
            name = 'ALREADY_USED';
            code = 409;
            message = 'Already Used!'
            break;
        case 'DATA_ERROR':
            name = 'DATA_ERROR';
            code = 500;
            message = 'Data ERORR!'
            break;
        case 'NOT_FOUND':
            name = 'NOT_FOUND';
            code = 404;
            message = 'No User Found!'
            break;
        case 'Salah_Password':
            name = 'Salah_Password'
            code = 401;
            message = 'salah nih ye'
            break;
        case 'INVALID_TOKEN':
            name = 'INVALID_TOKEN'
            code = 401
            message = 'Wrong Token'
            break;
        case 'TOKEN_NOT_FOUND':
            name = 'TOKEN_NOT_FOUND'
            code = 401
            message = 'Token Required'
            break;
        case 'GACUKUP':
            name = 'GACUKUP'
            code = 400
            message = 'foods sama golds gacukup woy'
            break;
        case 'FORBIDDEN':
            name = 'FORBIDDEN'
            code = 403
            message = 'bukan punya lu woy'
            break;
        case 'DELETED':
            name = 'DELETED'
            code = 404
            message = 'Already Deleted'
            break;
        case 'SABAR':
            name = 'SABAR'
            code = 409
            message = 'lagi generate sabar yak!'
            break;
        default:
            code = 500;
            message = 'Internal Server Error!'
    }
    console.log(err);
    res.status(code).json({ success: false, message });
};
