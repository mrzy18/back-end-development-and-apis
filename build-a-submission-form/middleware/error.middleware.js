function notFoundHandler(req, res, next){
    const err = new Error(`Can't found ${req.originalUrl}`)
    err.status = 404
    next(err)
}

function finalErrorHandler(err, req, res, next){
    err.status = err.status || 500
    res.status(err.status)
    console.log(err)
    res.json({
        error: true,
        status: err.status,
        message: err.status === 500 ? "Internal Server Error (Check Server Logs)" : err.message
    })
}

export {notFoundHandler, finalErrorHandler}