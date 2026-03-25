import { getAllArticles } from '@/lib/mdx'
import HeroSection from '@/modules/home/HeroSection'
import StatsBar from '@/modules/home/StatsBar'
import FilteredArticleGrid from '@/modules/home/FilteredArticleGrid'

export const dynamic = 'force-static'

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <>
      <HeroSection />
      <StatsBar />
      <FilteredArticleGrid articles={articles} />
    </>
  )
}
