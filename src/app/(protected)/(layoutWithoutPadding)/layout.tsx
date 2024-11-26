import { Footer, Nav } from "@/components/shared";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutWithoutPadding({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-svh flex flex-col'>
      <Nav />
      <section className='flex-grow'>{children}</section>
      <Footer />
      <Toaster />
    </main>
  );
}
