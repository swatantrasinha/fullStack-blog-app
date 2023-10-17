"use client";

import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type UpdateBlogParams= {
    id: string,
    title: string,
    description: string
}

const updateBlog = async(data: UpdateBlogParams) => {
    const res= fetch(`/api/blog/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({title: data.title, description: data.description}),
        //@ts-ignore
        "Content-Type" : "application/json",
    })

    return (await res).json
}

const deleteBlog = async(id: string) => {
    const res= fetch(`/api/blog/${id}`, {
        method: 'DELETE',
       //@ts-ignore
        "Content-Type" : "application/json",
    })

    return (await res).json
}

const getBlogById = async(id: string) => {
    const res= await fetch(`/api/blog/${id}`)
    const data= await res.json();
    return data.post;
};
const EditBlog = ({params}: {params:{id:string}}) => {
    console.log('EditBlog : ', params.id);
    const router= useRouter()
    
    const titleRef= useRef<HTMLInputElement | null>(null)
    const descriptionRef= useRef<HTMLTextAreaElement | null>(null)
    useEffect(() => {
      toast.loading('Fetching Blog Details', {id: "1"})
      getBlogById(params.id).then((data) => {
        if(titleRef.current && descriptionRef.current) {
            titleRef.current.value = data.title;
            descriptionRef.current.value= data.description;
            toast.success('fetching completed', {id: "1"})
        }
      }).catch((err) => {
        console.log('Error in catch block ', err)
        toast.success('error in fetching blog', {id: "1"})
      }
      )
    
     
    }, [])
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(titleRef.current && descriptionRef.current) {
            console.log('title : ', titleRef?.current?.value);
            console.log('description : ', descriptionRef?.current?.value);
            toast.loading('Sending request', {id:"1"})
            await updateBlog({
                title: titleRef?.current?.value,
                description: descriptionRef?.current?.value,
                id: params.id
            })
            toast.success('Blog edited successfully', {id: "1"})
            router.push("/")
        }
       
    };   

    const handleDelete = async (e: any) => {
      toast.loading('Deleting Blog', {id: "2"})
      await deleteBlog(params.id)
      toast.success('Blog Deleted',{id: "2"})
      router.push("/")

    };

  return (
   <Fragment>
        <Toaster />
        <div className='w-full m-auto flex my-4'>
            <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">Edit The Blog</p>
                <form onSubmit={handleSubmit}>
                    <input ref={titleRef} placeholder='Enter title' type='text' className='rounded-md w-full px-4 py-2 my-2' />
                    <textarea ref={descriptionRef} placeholder='Enter description' className='rounded-md px-4 py-2 w-full my-2 '></textarea>
                    <div className='flex justify-between'>
                        <button className='font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto my-2 hover:bg-slate-100'>Update</button>
                    </div>
                </form>
                <hr/>
                <div>
                    <button onClick={handleDelete} className='font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg mt-2 hover:bg-slate-100'>Delete</button>
                </div>
                
            </div>
        </div>
   </Fragment>
  )
}

export default EditBlog;
