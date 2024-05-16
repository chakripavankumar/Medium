import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";

export const blogRouter= new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET_TOKEN:string;
    }
}>();

blogRouter.use("/*" , (c,next)=>{
    next();
})

blogRouter.post('/blog' ,  async(c)=>{
    const body= await c.req.json();
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog= await prisma.blog.create({
        data: {
            title:body.title,
            content:body.content,
            authorId:1
        }
    })
    return c.json({
        id:blog.id
    })
  })
blogRouter.put('/blog' , async (c)=>{
    const body= await c.req.json();
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog= await prisma.blog.update({
        where:{
            id:body.id
        },
        data: {
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        id:blog.id
    })
  })
  blogRouter.get('/blog/:id' ,  async(c)=>{
    const body= await c.req.json();
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  try{
    const blog= await prisma.blog.findFirst({
        where:{
            id:body.id
        }
    })
    return c.json({
            blog
    })
}catch(e){
     c.status(411);
     return c.json({
        message:"error while fetching data blog"
     })
}
  })
  blogRouter.get('/bulk' ,  async (c)=>{
 const primsa=new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const blogs= await primsa.blog.findMany();

  return c.json({
    blogs
  })
  })