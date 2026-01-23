"use client";

import { useState, useTransition } from "react";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { submitFeedback } from "@/lib/actions/feedback";

export function FeedbackForm() {
   const [content, setContent] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const [isPending, startTransition] = useTransition();

   const handleSubmit = () => {
      if (!content.trim()) return;

      startTransition(async () => {
         await submitFeedback(content);
         setSubmitted(true);
         setContent("");

         setTimeout(() => setSubmitted(false), 3000);
      });
   };

   if (submitted) {
      return (
         <Card className="w-full max-w-md border border-green-100/60 dark:border-green-900/40 shadow-xl rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
               <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
               </div>
               <p className="text-xl font-semibold tracking-tight">
                  Thanks for your feedback!
               </p>
               <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                  Your input helps us shape MeetWise into something better for everyone.
               </p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card className="w-full max-w-md rounded-2xl border border-border/60 shadow-xl backdrop-blur-sm">
         <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
               <MessageSquare className="size-7 text-blue-600 dark:text-blue-400" />
            </div>

            <CardTitle className="text-2xl font-semibold tracking-tight">
               Feature Feedback
            </CardTitle>

            <CardDescription className="mt-2 text-sm leading-relaxed">
               What features would you like to see? Share your ideas and help improve MeetWise
            </CardDescription>
         </CardHeader>

         <CardContent className="space-y-4 pt-4">
            <Textarea
               placeholder="I'd love to see a feature that..."
               value={content}
               onChange={(e) => setContent(e.target.value)}
               rows={5}
               className="
            resize-none rounded-xl
            border-border/70
            bg-background
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-0
            transition
          "
            />

            <Button
               onClick={handleSubmit}
               disabled={isPending || !content.trim()}
               className="
            w-full h-12
            rounded-xl
            bg-blue-600 hover:bg-blue-700
            text-white font-medium
            transition-all
            active:scale-[0.98]
            disabled:opacity-60
          "
            >
               {isPending ? "Submitting..." : "Submit Feedback"}
            </Button>
         </CardContent>
      </Card>
   );
}
