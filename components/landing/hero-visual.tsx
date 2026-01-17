export function HeroVisual() {
   return (
      <div className="mt-16 sm:mt-24">
         <div className="relative mx-auto max-w-5xl">
            {/* Glow background */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-blue-500/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border bg-white/80 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] backdrop-blur dark:bg-zinc-900/80">
               {/* Browser header */}
               <div className="flex items-center gap-3 border-b bg-white/70 px-4 py-3 backdrop-blur dark:bg-zinc-950/70">
                  <div className="flex gap-1.5">
                     <div className="size-3 rounded-full bg-red-500" />
                     <div className="size-3 rounded-full bg-yellow-500" />
                     <div className="size-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm font-medium text-zinc-500">
                     meetwise.app/availability
                  </div>
               </div>

               {/* Main layout */}
               <div className="grid gap-6 p-6 sm:grid-cols-3">
                  {/* Sidebar */}
                  <div className="space-y-4">
                     <div className="h-4 w-28 rounded bg-blue-500/30" />

                     <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                           <div
                              key={i}
                              className="flex items-center gap-3 rounded-xl border bg-white/80 p-3 shadow-sm backdrop-blur dark:bg-zinc-800/80"
                           >
                              <div className="size-9 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40" />
                              <div className="space-y-1">
                                 <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                                 <div className="h-2 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Calendar */}
                  <div className="col-span-2 rounded-xl border bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-zinc-800/80">
                     <div className="mb-4 flex items-center justify-between">
                        <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-700" />
                        <div className="flex gap-2">
                           <div className="h-8 w-20 rounded-lg bg-blue-500/30" />
                           <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-700" />
                        </div>
                     </div>

                     <div className="grid grid-cols-7 gap-1.5">
                        {[...Array(35)].map((_, i) => (
                           <div
                              key={i}
                              className={`aspect-square rounded-lg transition ${[8, 9, 15, 16, 22, 23, 29, 30].includes(i)
                                    ? "bg-green-500/40"
                                    : [12, 19, 26].includes(i)
                                       ? "bg-blue-500/40"
                                       : "bg-zinc-100 dark:bg-zinc-700"
                                 }`}
                           />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
