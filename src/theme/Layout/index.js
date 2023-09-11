/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * PageMetadata
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { createContext, useState } from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';

import styles from './styles.module.css';
import ctx from '@site/src/ctx'
export default function Layout(props) {
  const {
    children,
    noNavbar,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;
  useKeyboardNavigation();
  
  const [gstate, setGstate] = useState({he:'llo'})

  return (<ctx.Provider value={{gstate, setGstate}}>
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      {!noNavbar && <Navbar />}

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName,
        )}>
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  </ctx.Provider>
  );
}
