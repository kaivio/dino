import React, { useContext, useEffect, useState } from 'react';

// import SearchBar from '@theme-original/SearchBar';
import * as router from '@docusaurus/router';
import ctx from '@site/src/ctx'
import Link from '@docusaurus/Link';

import IconEdit from '@theme/Icon/Edit';
import { usePluginData } from '@docusaurus/useGlobalData';
import Button from '../comp/button'


export default function SearchBarWrapper(props) {
  const site = useContext(ctx)
  const history = router.useHistory()
  const data = usePluginData('my-plugin')


  // console.log(site.gstate);
  return (
    <div className='flex'>
      <Button size={20} className='p-2' icon='search' />

      <AdminTool />

      {/* {data.NODE_ENV == 'development' &&
        (site.gstate?.editUrl && <>
          <Button size={20} className='p-2' icon='edit-2' onClick={() => {
            history.push(site.gstate.editUrl)
          }} />
          </>
          || <QuickEntry />
        )
      } */}


    </div>
  );
}

export function AdminTool({ ...props }) {
  const site = useContext(ctx)
  const history = router.useHistory()
  const data = usePluginData('my-plugin')

  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClick = (e) => {
    setMenuOpen(true)
    e.stopPropagation()
  }
  const handleWindowClick = (e) => {
    setMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [])

  let menu_content = []
  if (data.NODE_ENV == 'development') {
    if (site.gstate?.editUrl) {
      menu_content.push({
        text: '编辑', click: () => {
          history.push(site.gstate.editUrl)
        }
      })
    }

    menu_content.push({
      text: '创建', click: () => {
        history.push('/create')

      }
    })
  }

  menu_content.push({
    text: '属性', click: () => {

    }
  })


  return (<div className='relative'>
    <Button size={20} className='p-2' icon='plus' onClick={handleMenuClick} />

    <div className={'dropdown-menu absolute right-[0] z-50 min-w-[100px] ' + (menuOpen ? '' : 'hidden')}>
      {/* 菜单栏及项目 */}
      {menu_content.map(({ text, click }, i) => text.startsWith('--') ?
        <div key={i} style={{ borderTop: '0.5px solid', opacity: 0.5 }} /> : (
          <Button key={i}
            className='block px-4 py-2 !w-full text-left whitespace-nowrap rounded-none'
            onClick={click}>
            {text}
          </Button>
        ))}
    </div>
  </div>)
}



