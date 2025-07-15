import LandingComponent from "@/components/LandingComponent"

export const revalidate = 1 // revalidate at most every hour

export default async function Home() {

  return (
    <>
      <LandingComponent />
    </>
  )
}