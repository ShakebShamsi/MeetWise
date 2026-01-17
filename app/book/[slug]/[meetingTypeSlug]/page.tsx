"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
   MEETING_TYPE_BY_SLUGS_QUERY,
} from "@/sanity/queries/meetingTypes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Mail, MapPin, Video, Phone, ArrowLeft } from "lucide-react";

interface MeetingTypeDetail {
   _id: string;
   name: string | null;
   slug: string | null;
   duration: number | null;
   description: string | null;
   host: {
      _id: string;
      name: string | null;
      email: string | null;
      slug: string | null;
      availability: Array<{
         _key: string;
         startDateTime: string | null;
         endDateTime: string | null;
      }> | null;
      connectedAccounts: Array<{
         _key: string;
         accountId: string | null;
         email: string | null;
         isDefault: boolean | null;
         accessToken?: string | null;
         refreshToken?: string | null;
         expiryDate?: number | null;
      }> | null;
   } | null;
}

export default function MeetingTypeBookingPage() {
   const params = useParams();
   const slug = params?.slug as string;
   const meetingTypeSlug = params?.meetingTypeSlug as string;
   const [meetingType, setMeetingType] = useState<MeetingTypeDetail | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!slug || !meetingTypeSlug) return;

      const fetchData = async () => {
         try {
            setLoading(true);
            const data = await client.fetch(MEETING_TYPE_BY_SLUGS_QUERY, {
               hostSlug: slug,
               meetingTypeSlug,
            });

            setMeetingType(data);
            if (!data) {
               setError("Meeting type not found");
            }
         } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load booking page");
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [slug, meetingTypeSlug]);

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
               <p className="text-muted-foreground">Loading...</p>
            </div>
         </div>
      );
   }

   if (error || !meetingType || !meetingType.host) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
               <CardHeader>
                  <CardTitle>Meeting Type Not Found</CardTitle>
                  <CardDescription>
                     {error || "This meeting type doesn't exist"}
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Button asChild className="w-full">
                     <Link href={`/book/${slug}`} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Booking Page
                     </Link>
                  </Button>
               </CardContent>
            </Card>
         </div>
      );
   }

   const hasAvailability = meetingType.host.availability && meetingType.host.availability.length > 0;
   const hasConnectedAccount = meetingType.host.connectedAccounts && meetingType.host.connectedAccounts.length > 0;

   return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
         <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-6">
               <Link href={`/book/${slug}`} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
               </Link>
            </Button>

            {/* Host Info Card */}
            <Card className="mb-6">
               <CardHeader>
                  <div className="flex justify-between items-start">
                     <div>
                        <CardTitle className="text-2xl mb-2">{meetingType.host.name || "Booking"}</CardTitle>
                        <CardDescription>{meetingType.host.email || "Available for booking"}</CardDescription>
                     </div>
                  </div>
               </CardHeader>
            </Card>

            {/* Meeting Type Details */}
            <Card className="mb-6">
               <CardHeader>
                  <CardTitle>{meetingType.name}</CardTitle>
                  {meetingType.description && (
                     <CardDescription>{meetingType.description}</CardDescription>
                  )}
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                     <Clock className="h-5 w-5 text-muted-foreground" />
                     <span>{meetingType.duration || 30} minutes</span>
                  </div>

                  {/* Availability Status */}
                  <div className="border-t pt-4">
                     {hasAvailability ? (
                        <div className="flex items-start gap-3 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                           <Calendar className="h-5 w-5 mt-0.5" />
                           <div>
                              <p className="font-medium">Available to book</p>
                              <p className="text-xs text-green-600 mt-1">
                                 Check the calendar to see available time slots
                              </p>
                           </div>
                        </div>
                     ) : (
                        <div className="flex items-start gap-3 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                           <Calendar className="h-5 w-5 mt-0.5" />
                           <div>
                              <p className="font-medium">No availability set</p>
                              <p className="text-xs text-amber-600 mt-1">
                                 {meetingType.host.name} hasn't shared their availability yet
                              </p>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Connected Account Status */}
                  {!hasConnectedAccount && (
                     <div className="border-t pt-4">
                        <div className="flex items-start gap-3 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                           <Video className="h-5 w-5 mt-0.5" />
                           <div>
                              <p className="font-medium">Calendar not connected</p>
                              <p className="text-xs text-amber-600 mt-1">
                                 The host hasn't connected a calendar service yet
                              </p>
                           </div>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            {/* Booking Information */}
            <Card>
               <CardHeader>
                  <CardTitle className="text-lg">Booking Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-3">
                     <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                           <p className="text-sm font-medium">Date & Time</p>
                           <p className="text-xs text-muted-foreground">
                              {hasAvailability ? "Select from available slots" : "No slots available"}
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                           <p className="text-sm font-medium">Confirmation</p>
                           <p className="text-xs text-muted-foreground">
                              You'll receive a confirmation email
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                           <p className="text-sm font-medium">Meeting Type</p>
                           <p className="text-xs text-muted-foreground">
                              {meetingType.name || "Meeting"} ({meetingType.duration || 30} min)
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* CTA */}
                  {hasAvailability && hasConnectedAccount ? (
                     <Button disabled className="w-full mt-6">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Now (Coming Soon)
                     </Button>
                  ) : (
                     <div className="mt-6 p-4 rounded-lg bg-slate-100 text-center">
                        <p className="text-sm text-slate-600">
                           {!hasAvailability && !hasConnectedAccount
                              ? "Calendar is not connected and no availability is set"
                              : !hasAvailability
                                 ? "No availability has been set"
                                 : "Calendar is not connected"}
                        </p>
                     </div>
                  )}
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
