const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { initializeSocket } = require('./dist/src/lib/socket/server')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

// When using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      // Handle Socket.io upgrade requests
      if (pathname === '/socket.io/') {
        // Socket.io will handle this
        return
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // Initialize Socket.io
  const socketManager = initializeSocket(server)
  
  server
    .once('error', (err) => {
      console.error('Server error:', err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
      console.log(`> Socket.io server initialized`)
    })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...')
    socketManager.close()
    server.close(() => {
      console.log('Process terminated')
    })
  })

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...')
    socketManager.close()
    server.close(() => {
      console.log('Process terminated')
    })
  })
})