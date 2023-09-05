import React from 'react';
import Layout from '@theme/Layout';
// import Layout from '@site/src/comp/layout'
import Button from '../comp/button' 


import { useDocsContext } from '@docusaurus/useGlobalData';


function MyCustomPage() {
  const colors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ]


  const codes = colors.map((v, i) =>
    `<Button  className="bg-${v}-500 px-4 py-2" onClick={() => {
    console.log('hello ${v}');
  } }> ${v} </Button>`);
  //console.log(codes.join('\n'));


  return (<Layout title='Test'>
    <h1>Test</h1>
    <Button className="bg-blue-500 px-4 py-2" onClick={() => {
      console.log('hello');
    }}>button</Button>
    <Button className="bg-blue-50 px-4 py-2" onClick={() => {
      console.log('hello');
    }}>button</Button>
    <Button className="px-4 py-2" onClick={() => {
      console.log('hello');
    }}>button</Button>

    <hr />
    <div className="flex flex-wrap">
      <Button className="bg-slate-500 px-4 py-2" onClick={() => {
        console.log('hello slate');
      }}> slate </Button>
      <Button className="bg-gray-500 px-4 py-2" onClick={() => {
        console.log('hello gray');
      }}> gray </Button>
      <Button className="bg-zinc-500 px-4 py-2" onClick={() => {
        console.log('hello zinc');
      }}> zinc </Button>
      <Button className="bg-neutral-500 px-4 py-2" onClick={() => {
        console.log('hello neutral');
      }}> neutral </Button>
      <Button className="bg-stone-500 px-4 py-2" onClick={() => {
        console.log('hello stone');
      }}> stone </Button>
      <Button className="bg-red-500 px-4 py-2" onClick={() => {
        console.log('hello red');
      }}> red </Button>
      <Button className="bg-orange-500 px-4 py-2" onClick={() => {
        console.log('hello orange');
      }}> orange </Button>
      <Button className="bg-amber-500 px-4 py-2" onClick={() => {
        console.log('hello amber');
      }}> amber </Button>
      <Button className="bg-yellow-500 px-4 py-2" onClick={() => {
        console.log('hello yellow');
      }}> yellow </Button>
      <Button className="bg-lime-500 px-4 py-2" onClick={() => {
        console.log('hello lime');
      }}> lime </Button>
      <Button className="bg-green-500 px-4 py-2" onClick={() => {
        console.log('hello green');
      }}> green </Button>
      <Button className="bg-emerald-500 px-4 py-2" onClick={() => {
        console.log('hello emerald');
      }}> emerald </Button>
      <Button className="bg-teal-500 px-4 py-2" onClick={() => {
        console.log('hello teal');
      }}> teal </Button>
      <Button className="bg-cyan-500 px-4 py-2" onClick={() => {
        console.log('hello cyan');
      }}> cyan </Button>
      <Button className="bg-sky-500 px-4 py-2" onClick={() => {
        console.log('hello sky');
      }}> sky </Button>
      <Button className="bg-blue-500 px-4 py-2" onClick={() => {
        console.log('hello blue');
      }}> blue </Button>
      <Button className="bg-indigo-500 px-4 py-2" onClick={() => {
        console.log('hello indigo');
      }}> indigo </Button>
      <Button className="bg-violet-500 px-4 py-2" onClick={() => {
        console.log('hello violet');
      }}> violet </Button>
      <Button className="bg-purple-500 px-4 py-2" onClick={() => {
        console.log('hello purple');
      }}> purple </Button>
      <Button className="bg-fuchsia-500 px-4 py-2" onClick={() => {
        console.log('hello fuchsia');
      }}> fuchsia </Button>
      <Button className="bg-pink-500 px-4 py-2" onClick={() => {
        console.log('hello pink');
      }}> pink </Button>
      <Button className="bg-rose-500 px-4 py-2" onClick={() => {
        console.log('hello rose');
      }}> rose </Button>
    </div>
    <div className='mb-96'></div>
  </Layout>);
}

export default MyCustomPage;
