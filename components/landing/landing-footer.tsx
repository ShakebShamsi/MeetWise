import Link from "next/link";
import { Calendar } from "lucide-react";

export function LandingFooter() {
   return (
      <footer className="border-t bg-white py-6 dark:bg-zinc-950">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
               <div className="flex items-center gap-6">
                  <Link href="/" className="flex items-center gap-2">
                     <span >
                        <img src="/favicon-black.ico" alt="logo" width={28} height={28} className="translate-y-0.5" />
                     </span>
                     <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        MeetWise
                     </span>
                  </Link>
                  <Link
                     href="/pricing"
                     className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  >
                     Pricing
                  </Link>
               </div>
               <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Built with ❤️ by{" "}
                  <Link
                     href="https://synkodex.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                     SYNKODEX
                  </Link>
               </p>

            </div>
         </div>
      </footer>
   );
}
