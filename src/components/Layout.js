import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import useSiteMetadata from './SiteMetadata'

import 'sanitize.css'
import './main.scss'
import styles from './layout.module.scss'


export default ({ children, mainClassName }) => {
  const { title, description } = useSiteMetadata()

  return (
    <Fragment>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <header className={styles.header}>
        <h1>
          <a href='https://kramer.run'>Josh Kramer</a>
        </h1>

        <nav className={styles.nav}>
          <ul>
            <li>
              <a href='https://kramer.run/resume.pdf'>Resume</a>
            </li>
            <li>
              <Link to='/'>Blog</Link>
            </li>
          </ul>
        </nav>

      </header>
      <main className={styles.main + ' ' + (mainClassName || '')}>
        {children}
      </main>
    </Fragment>
  )
}
