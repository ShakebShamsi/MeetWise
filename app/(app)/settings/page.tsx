import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { USER_CONNECTED_ACCOUNTS_DISPLAY_QUERY } from "@/sanity/queries/users";
import { AccountManager } from "@/components/settings/account-manager";
import { getUserPlanLimits } from "@/lib/features";

export default async function SettingsPage({
   searchParams,
}: {
   searchParams: Promise<{ success?: string; error?: string }>;
}) {
   const { userId } = await auth();

   if (!userId) {
      redirect("/");
   }

   const [{ data: user }, planLimits] = await Promise.all([
      sanityFetch({
         query: USER_CONNECTED_ACCOUNTS_DISPLAY_QUERY,
         params: { clerkId: userId },
      }),
      getUserPlanLimits(),
   ]);

   const connectedAccounts = user?.connectedAccounts ?? [];
   const params = await searchParams;

   return (
      <main className="container mx-auto max-w-2xl px-4 py-10">
         {/* Header */}
         <div className="mb-10 rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm backdrop-blur">
            <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
               Manage your connected accounts and preferences.
            </p>
         </div>

         {/* Alerts */}
         <div className="space-y-4 mb-8">
            {params.success && (
               <div className="rounded-xl border border-green-200/60 bg-green-50/60 p-4 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-300">
                  {params.success === "account_connected" &&
                     "Google account connected successfully!"}
                  {params.success === "account_updated" &&
                     "Google account tokens refreshed."}
               </div>
            )}

            {params.error && (
               <div className="rounded-xl border border-red-200/60 bg-red-50/60 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300">
                  {params.error === "oauth_denied" &&
                     "Google account connection was denied."}
                  {params.error === "oauth_failed" &&
                     "Failed to connect Google account. Please try again."}
                  {params.error === "missing_params" && "Invalid OAuth response."}
                  {params.error === "state_expired" &&
                     "Connection request expired. Please try again."}
                  {params.error === "state_mismatch" &&
                     "Security validation failed. Please try again."}
                  {params.error === "invalid_state" &&
                     "Invalid security token. Please try again."}
               </div>
            )}
         </div>

         {/* Accounts */}
         <div className="space-y-6">
            <AccountManager
               connectedAccounts={connectedAccounts}
               maxCalendars={planLimits.maxConnectedCalendars}
               plan={planLimits.plan}
            />
         </div>

         {/* Billing */}
         <div className="mt-12 pt-8 border-t">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Billing</h2>

            <Link
               href="/pricing"
               className="
            flex items-center justify-between
            rounded-2xl border border-border/60
            p-5 transition-all
            hover:bg-muted/40
            hover:shadow-sm
          "
            >
               <div className="flex items-center gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10">
                     <CreditCard className="size-5 text-blue-500" />
                  </div>

                  <div>
                     <p className="font-medium">Manage Subscription</p>
                     <p className="text-sm text-muted-foreground">
                        View plans and billing details
                     </p>
                  </div>
               </div>

               <span className="text-muted-foreground text-lg">→</span>
            </Link>
         </div>
      </main>
   );
}
