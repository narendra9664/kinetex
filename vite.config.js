import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Dev only: serve the Netlify lead function at the same path Netlify uses, so
// lead forms work under `npm run dev`. Without SLACK_WEBHOOK_URL set, the lead
// is only logged to the terminal.
function devLeadFunction() {
  return {
    name: 'dev-lead-function',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/lead', async (req, res) => {
        const chunks = []
        for await (const c of req) chunks.push(c)
        const body = Buffer.concat(chunks).toString()
        if (!process.env.SLACK_WEBHOOK_URL) {
          console.log('[dev lead]', body)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, dev: true }))
          return
        }
        const { default: handler } = await server.ssrLoadModule('/netlify/functions/lead.mjs')
        const response = await handler(
          new Request('http://localhost/.netlify/functions/lead', { method: req.method, headers: req.headers, body: req.method === 'POST' ? body : undefined })
        )
        res.statusCode = response.status
        response.headers.forEach((v, k) => res.setHeader(k, v))
        res.end(await response.text())
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devLeadFunction()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true
  }
})
