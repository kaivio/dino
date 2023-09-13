import React, { useContext, useEffect } from 'react';

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
      {data.NODE_ENV == 'development' &&
        (site.gstate?.editUrl &&
          <Button size={20} className='p-2' icon='edit-2' onClick={() => {
            history.push(site.gstate.editUrl)
          }} />
          || <QuickEntry />
        )
      }

      <Button size={20} className='p-2' icon='search' />

    </div>
  );
}

export function QuickEntry({ ...props }) {
  const history = router.useHistory()


  return (<>
    {history.location.pathname == '/blog'
      && <Button size={20} className='p-2' icon='plus' />
      || <Button size={20} className='p-2' icon='help-circle' />
    }

  </>)
}