import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET_TOKEN:string;
  }
}>()


app.post('/api/v1/user/signup' , async (c)=>{
  const body= await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

try{
 const user= prisma.user.create({
    data:{
      username:body.username,
      password:body.password,
      name:body.name
    }
  })
  const  jwt= await sign({
    id: (await user).id
  },c.env.JWT_SECRET_TOKEN)

  return  c.text(jwt)
} catch(e){
  c.status(411);
 return c.text('invalid')
}

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


