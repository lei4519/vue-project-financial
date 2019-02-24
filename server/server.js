const path = require('path')
const express = require('express')
const compression = require('compression')
const microcache = require('route-cache')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const app = express()

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.use(compression({ threshold: 0 }))
app.use('/dist', serve('../dist', true))
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

let handleSSR
if (isProd) {
  handleSSR = require('./route/ssr')
} else {
  handleSSR = require('./route/dev-ssr')(app)
  console.log(handleSSR);
}
app.get('*', handleSSR)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
