import React, { useRef, useState } from 'react';
import Layout from '@theme/Layout';
import EditThisPage from '@theme/EditThisPage';
import Button from '../comp/button'


export default function CreatePage() {
  return (
    <Layout title="create content" description="__description__" >
      <div className='flex  justify-center min-h-[75vh] p-8'>
        <div class="flex flex-col  content-center">
          <Create />

        </div>

      </div>
      <div style={{ display: 'none' }}>
        <EditThisPage editURL="/edit/page#__filename__" />
      </div>
    </Layout>
  );
}


export function Create({ ...props }) {
  const [msg, setMsg] = useState('')
  const ref = useRef()
  async function handleCreateBlog(e) { }
  async function handleCreateDocs(e) { }
  async function handleCreatePage(e) {
    let title = ref.current.value.trim()
    if(!title){
      setMsg('No Title')
      return 
    }
    setMsg('create page: '+title)
  }
  return (<>
    <div className=''>
      <div className='h-16'>{msg}</div>
      <input ref={ref} className='w-full text-xl mt-5' />
      <div className='flex justify-end mt-8 space-x-3'>
        <Button className='p-2 bg-cyan-400 text-gray-50 font-bold'
          onClick={handleCreateBlog}> + Blog</Button>
        <Button className='p-2 bg-teal-400 text-gray-50 font-bold'
          onClick={handleCreateDocs}> + Docs</Button>
        <Button className='p-2 bg-pink-400 text-gray-50 font-bold'
          onClick={handleCreatePage}> + Page</Button>

      </div>
    </div>
  </>)
}

