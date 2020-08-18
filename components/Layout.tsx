import '../styles/index.css';
import React from 'react';
import Link from 'next/link';

const Layout: React.FC = ({ children }) => (
    <div className='page'>
      <Link href='/'>
        <a>
          <img src='/logo.png' alt='logo' className='logo' />
        </a>
      </Link>
      {children}
    </div>
);

export default Layout;
