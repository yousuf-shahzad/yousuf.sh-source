import http from 'node:http'
import fs from 'node:fs/promises'
const html = await fs.readFile(
  new URL('../docs/showcase.html', import.meta.url),
)
http
  .createServer((request, response) => {
    if (request.url === '/favicon.ico') {
      response.writeHead(204)
      response.end()
      return
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(html)
  })
  .listen(4174, '127.0.0.1', () =>
    console.log(
      'Design showcase: http://127.0.0.1:4174 — run npm run preview alongside this.',
    ),
  )
