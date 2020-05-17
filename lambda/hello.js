'use strict'

const Resp = require('./lib/response')

exports.handler = async function(event, context) {
    let body = []
    let name

    try {
        body = JSON.parse(event.body)
    } catch(e) {
        return Resp.errorName(500, "ERROR: Not JSON in Body")
    }
    if (!body.name) {
        name = "Guy"
    } else {
        name = body.name
    }

    return Resp.responseOk(200,{response: "Hello " + name} )

}