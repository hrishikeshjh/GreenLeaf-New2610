import { RecommendationClient } from "@/components/recommendations/RecommendationClient";
import { Sparkles } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <Sparkles className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl md:text-6xl font-bold mt-4">Find Your Perfect Plant</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
          Let our AI expert help you choose the ideal plant for your home and lifestyle. Just answer a few simple questions.
        </p>
      </section>
      <RecommendationClient />
    </div>
  );
}
