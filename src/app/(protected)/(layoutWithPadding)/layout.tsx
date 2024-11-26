import { Footer, Nav } from "@/components/shared";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutWithPadding({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-svh flex flex-col'>
      <Nav />
      <section className='flex-grow px-6'>{children}</section>
      <Footer />
      <Toaster />
    </main>
  );
}
