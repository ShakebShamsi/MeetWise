const steps = [
   {
      number: "01",
      title: "Define Your Availability",
      description:
         "Use the interactive calendar to visually set time slots when you’re available. Sync your Google Calendar to automatically block busy periods.",
   },
   {
      number: "02",
      title: "Set Up Meeting Options",
      description:
         "Create multiple meeting types such as quick catch-ups, consultations, or intro calls, each with its own custom duration.",
   },
   {
      number: "03",
      title: "Share Your Booking Link",
      description:
         "Send your personalized MeetWise link. Invitees choose a meeting type, view available slots in their timezone, and book instantly.",
   },
   {
      number: "04",
      title: "Join Meetings Seamlessly",
      description:
         "Get instant booking confirmations with auto-generated Google Meet links. Monitor responses and manage all meetings from one dashboard.",
   },
];

export function HowItWorksSection() {
   return (
      <section className="bg-zinc-50 py-20 sm:py-32 dark:bg-zinc-900">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
               <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                  How MeetWise works
               </h2>
               <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                  Get started in minutes with a simple, no-stress setup.
               </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
               {steps.map((step) => (
                  <div key={step.number} className="relative flex gap-6">
                     <div className="flex flex-col items-center">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
                           {step.number}
                        </div>
                        <div className="mt-2 h-full w-px bg-blue-200 dark:bg-blue-800" />
                     </div>
                     <div className="pb-12">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                           {step.title}
                        </h3>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                           {step.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
