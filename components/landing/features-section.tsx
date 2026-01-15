import {
   Calendar,
   CalendarCheck,
   Clock,
   Globe,
   Video,
   Zap,
} from "lucide-react";
import { FeatureCard } from "./feature-card";

const features = [
   {
      icon: Calendar,
      title: "Intelligent Availability",
      description:
         "Define your availability effortlessly with a visual, drag-and-drop calendar. MeetWise manages the rest automatically.",
   },
   {
      icon: Video,
      title: "Seamless Google Calendar Sync",
      description:
         "Connect multiple Google calendars to sync busy times instantly and avoid double bookings across all schedules.",
   },
   {
      icon: Zap,
      title: "One-Click Google Meet",
      description:
         "Every meeting includes an auto-generated Google Meet link—no setup, no extra steps required.",
   },
   {
      icon: Clock,
      title: "Custom Meeting Formats",
      description:
         "Design meetings that fit your workflow, from quick 15-minute check-ins to deep 90-minute sessions.",
   },
   {
      icon: Globe,
      title: "Smart Timezone Handling",
      description:
         "Availability is automatically displayed in each guest’s local timezone, eliminating confusion completely.",
   },
   {
      icon: CalendarCheck,
      title: "Live Booking Insights",
      description:
         "Track booking status in real time and instantly see who has confirmed, declined, or is pending.",
   },
];

export function FeaturesSection() {
   return (
      <section className="py-20 sm:py-32">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
               <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                  Everything you need to schedule smarter with MeetWise
               </h2>
               <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                  A powerful set of tools designed to remove scheduling hassles and
                  help you focus on what truly matters.
               </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {features.map((feature) => (
                  <FeatureCard
                     key={feature.title}
                     icon={feature.icon}
                     title={feature.title}
                     description={feature.description}
                  />
               ))}
            </div>
         </div>
      </section>
   );
}
