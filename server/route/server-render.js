module.exports = async (req, res, renderer) => {
  const isProd = process.env.NODE_ENV === 'production'
  const s = Date.now()
  res.setHeader("Content-Type", "text/html")

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }
  const context = {
    url: req.url
  }
  try {
    const appStr = await renderer.renderToString(context)
    res.send(appStr)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  } catch (err) {
    return handleError(err)
  }
}