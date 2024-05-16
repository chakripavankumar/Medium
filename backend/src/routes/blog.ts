import { Hono } from "hono";

export const blogRouter= new Hono();

blogRouter.post('/api/v1/blog' , (c)=>{
    return c.text('Hello world')
  })
  blogRouter.put('/api/v1/blog' , (c)=>{
    return c.text('Hello world')
  })
  blogRouter.get('/api/v1/blog/:id' , (c)=>{
    return c.text('Hello world')
  })
  blogRouter.get('/api/v1/bulk' , (c)=>{
    return c.text('Hello world')
  })