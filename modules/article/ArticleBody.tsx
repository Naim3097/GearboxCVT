import { MDXRemote } from 'next-mdx-remote/rsc'

export default function ArticleBody({ content }: { content: string }) {
  return (
    <section className="section-pad bg-surface" aria-label="Kandungan artikel">
      <div className="site-container">
        <div className="article-prose mx-auto">
          <MDXRemote source={content} />
        </div>
      </div>
    </section>
  )
}
