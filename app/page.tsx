import { getFooter, getHeader } from '../sanity/sanity-utils';

export const revalidate = 1 // revalidate at most every hour

export default async function Home() {
  const header = await getHeader();
  const footer = await getFooter();

  return (
    <>
    
    </>
  )
}