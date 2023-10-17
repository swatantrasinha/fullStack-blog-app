"use client";

import { useRouter } from 'next/navigation';
import React, { Fragment, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const postBlog = async({title,description}: {title: string, description: string}) => {
    const res= fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        //@ts-ignore
        "Content-Type" : "application/json",
    })

    return (await res).json
}

const AddBlog = () => {
    const router= useRouter()
    const titleRef= useRef<HTMLInputElement | null>(null)
    const descriptionRef= useRef<HTMLTextAreaElement | null>(null)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(titleRef.current && descriptionRef.current) {
            console.log('title : ', titleRef?.current?.value);
            console.log('description : ', descriptionRef?.current?.value);
            toast.loading('Sending request', {id:"1"})
            await postBlog({
                title: titleRef?.current?.value,
                description: descriptionRef?.current?.value,
            })
            toast.success('Blog posted successfully', {id: "1"})
            router.push("/")
        }
       
    }   
  return (
   <Fragment>
        <Toaster />
        <div className='w-full m-auto flex my-4'>
            <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">Add A Blog</p>
                <form onSubmit={handleSubmit}>
                    <input ref={titleRef} placeholder='Enter title' type='text' className='rounded-md w-full px-4 py-2 my-2' />
                    <textarea ref={descriptionRef} placeholder='Enter description' className='rounded-md px-4 py-2 w-full my-2 '></textarea>
                    <button className='font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100'>Submit</button>
                </form>
            </div>
        </div>
   </Fragment>
  )
}

export default AddBlog;