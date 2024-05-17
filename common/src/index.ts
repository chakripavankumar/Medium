 
 import z, { string } from 'zod';
 
 export const signedUpInput= z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
  })
  export const signedinInput= z.object({
    username:z.string().email(),
    password:z.string().min(6),
  })
export const createBlogInput= z.object({
       title:z.string(),
       content: string(),
   })
export const updateBlogInput= z.object({
    title:z.string(),
    content: string(),
    id:z.number()
})
   export type SignedUpInput= z.infer<typeof signedUpInput>
   export type SignedinInput= z.infer<typeof signedinInput>
   export type CreateBlogInput=z.infer<typeof createBlogInput>
   export type UpdateBlogInput=z.infer<typeof updateBlogInput>
 