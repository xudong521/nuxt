const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  res.writeHeader('200', {'Content-Type':'text/html;charset=utf-8'});
  const app = new Vue({
    data: {
      url: req.url,
      msg: 'hello 1912',
      arr: [1,2,3]
    },
    computed: {
      getMsg() {
        return this.msg + '!!!!'
      }
    },
    template: `<div>
      <p>访问的 URL 是： {{ url }}</p>
      <p v-text='msg'></p>
      <h1 v-for='(item,idx) in arr' :key='idx' v-text='item'></h1>
      <p v-text='getMsg'></p>
    </div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>1912</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080, ()=>{
  console.log('server is running on 8080')
})
