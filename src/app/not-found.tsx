import { Empty, Footer, Nav } from "@/components/shared";
import { Routes } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className='min-h-svh flex flex-col'>
      <Nav />
      <section className='flex-grow px-4'>
        <Empty
          description='The page your currently looking for is not available! Check correct URL on your browser, go to home or try again later.'
          iconUrl='/svgs/black-logo.svg'
          link={Routes.Home}
          linkText='Go Home'
          title='Page not found!'
        />
      </section>
      <Footer />
    </main>
  );
}
