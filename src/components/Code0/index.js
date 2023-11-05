import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Code0() {
  let canvas_ref = useRef()
  let res = useRef({})

  async function handleTap(e) {
    if(!(canvas_ref.current instanceof CanvasRenderingContext2D)){
      return
    }
    console.log(e)
    let x = e.clientX
    let y = e.clientY

    /**
     * @type {CanvasRenderingContext2D}
     */
    let d = canvas_ref.current.getContext("2d");
    let width = window.innerWidth
    let height = window.innerHeight
    canvas_ref.current.width = width
    canvas_ref.current.height = height
    let mx = canvas_ref.current.width
    let my = canvas_ref.current.height
    d.fillStyle = "green";
    // d.fillRect(0, 0, mx, my);
    // d.fillRect(10, 10, 150, 100);

    // requestAnimationFrame
    let t = 0
    let lastTime = 0
    let hue = Math.round(Math.random()*360)
    function anim(time) {
      // console.log('time', time);
      d.clearRect(0, 0, mx, my)
      d.strokeStyle = `hsla(${hue}, 100%, 50%, ${1.3-t/25})`
      // d.strokeStyle = `rgba(255, 215, 0, 1)`
      
      d.beginPath();
      d.ellipse(x, y, 5 + t, 5 + t, 0, 0, 2 * Math.PI);
      d.stroke();

      t += 1
      if (t <= 25) {
        requestAnimationFrame(anim);
      }
      if (t > 25) {
        d.clearRect(0, 0, mx, my)
      }


    }
    anim()



    console.log('tap ', x, y);
    console.log('at ', mx, my)

    // setTimeout(() => {
    //   d.clearRect(0, 0, mx, my)
    // }, 100)

  }

  useEffect(() => {
    // todo: listen touch
    window.addEventListener('click', handleTap)
    return () => {
      window.removeEventListener('click', handleTap)
    }
  }, [])

  return (
    <div className={styles.x}>
      <canvas ref={canvas_ref} className='h-full w-full'></canvas>
    </div>
  );
}
