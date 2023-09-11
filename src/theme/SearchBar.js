import React, { useContext, useEffect } from 'react';

import SearchBar from '@theme-original/SearchBar';
import * as router from '@docusaurus/router';
import ctx from '@site/src/ctx'
import Link from '@docusaurus/Link';

import IconEdit from '@theme/Icon/Edit';

export default function SearchBarWrapper(props) {
  const site = useContext(ctx)
  const localtion =  router.useLocation()
  // console.log(site.gstate);
  return (
    <>
      <Link
        to={site.gstate.editUrl||('/edit/page#'+ localtion.pathname  )}
        rel="noreferrer noopener"
        className="">
        <IconEdit />
      </Link>
    </>
  );
}
