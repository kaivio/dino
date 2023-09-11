/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useContext, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import IconEdit from '@theme/Icon/Edit';
import Link from '@docusaurus/Link';
import ctx from '@site/src/ctx'

export default function EditThisPage({editUrl}) {
 const site = useContext(ctx)
 useEffect(()=>{
  site.setGstate((state)=>{
    return {editUrl, ...state}
  })
 },[])
  return (
    <Link
      id='edit-this-page-link'
      to={editUrl}
      rel="noreferrer noopener"
      className={ThemeClassNames.common.editThisPage}>
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page">
        Edit this page
      </Translate>
    </Link>
  );
}
