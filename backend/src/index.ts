import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/user/signup' , (c)=>{
  return c.text('Hello world')
})
app.post('/api/v1/user/signin' , (c)=>{
  return c.text('Hello world')
})
app.post('/api/v1/blog' , (c)=>{
  return c.text('Hello world')
})
app.put('/api/v1/blog' , (c)=>{
  return c.text('Hello world')
})
app.get('/api/v1/blog/:id' , (c)=>{
  return c.text('Hello world')
})
app.get('/api/v1/bulk' , (c)=>{
  return c.text('Hello world')
})
export default app


