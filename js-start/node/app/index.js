const express = require('express')
const app = express()
const port = 3000

let str;

app.use((request, response, next) => {
    console.log(request.headers)
    str = JSON.stringify(request.headers);
    next()
})

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
})

app.get('/', (request, response) => {
    response.send('<b>Hello from Express!</b><script>alert();</script>\n' + str);
    
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})