export const sortMiddleware = (req, res, next) => {

    res.locals.sort = {
        enabled: false,
        type: 'desc'
    }

    if(req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals.sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column
        })
    }

    next()
}