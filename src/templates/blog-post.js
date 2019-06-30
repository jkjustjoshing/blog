import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import styles from './blog-post.module.scss'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  date,
  tags,
  title,
  helmet,
  className
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className={className}>
      {helmet || ''}
      <div className="">
        <h1 className={styles.postTitle}>
          {title}
        </h1>
        <p className={styles.postDescription}>
          {description}
          <br />
          {date}
        </p>

        {tags && tags.length ? (
          <div className={styles.postTags}>
            <h4>Tags</h4>
            <ul>
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <PostContent className={styles.postContent} content={content} />
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  className: PropTypes.string
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={post.frontmatter.date}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:title" content={post.frontmatter.title + ' | Blog'} />
            <meta property="twitter:description" content={post.frontmatter.description} />
            <meta property="twitter:site" content="@jkjustjoshing" />
            {post.frontmatter.featuredimage && <meta property="twitter:image" content={post.frontmatter.featuredimage} />}

            <meta property="og:title" content={post.frontmatter.title + ' | Blog'} />
            <meta property="og:description" content={post.frontmatter.description} />
            <meta property="og:site_name" content="Josh Kramer Blog" />
            {post.frontmatter.featuredimage && <meta property="og:image" content={post.frontmatter.featuredimage} />}
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        className={styles.blogPostContainer}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags,
        featuredimage
      }
    }
  }
`
