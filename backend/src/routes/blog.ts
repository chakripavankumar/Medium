import { verify } from 'hono/jwt';
import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge'

export const blogRouter= new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET_TOKEN:string;
    },
    Variables:{
        userId:string;
    }
}>();

blogRouter.use("/*" , async (c,next)=>{
    const authHeader=c.req.header("Authorization") || "";
    try{
        const user=  await verify( authHeader, c.env.JWT_SECRET_TOKEN);
        if(user){
            c.set("userId", user.id);
           await next();
        } else{
            c.status(403);
            return c.json({
                message:"please login frist"
            })
        }
    }catch(e){
        c.status(403)
        return c.json({
            message:"please login frist"
})
    }
});

blogRouter.post('/blog' ,  async(c)=>{
    const body= await c.req.json();
    const authorId=  c.get("userId")
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog= await prisma.blog.create({
        data: {
            title:body.title,
            content:body.content,
            authorId:Number(authorId)
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
  blogRouter.get('/bulk' ,  async (c)=>{
    const primsa=new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL
     }).$extends(withAccelerate())
     const blogs= await primsa.blog.findMany();
     return c.json({
       blogs
     })
     })
  blogRouter.get('/blog/:id' ,  async(c)=>{
    const id=  c.req.param("id");
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  try{
    const blog= await prisma.blog.findFirst({
        where:{
            id:Number(id)
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