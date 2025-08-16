import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { plants } from "@/lib/plants";
import { PlantCard } from "@/components/common/PlantCard";

export default function Home() {
  const featuredPlants = plants.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-20 lg:py-32">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold text-primary">
          Verdant Vista
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Discover the perfect plant to bring life and beauty into your space. Curated with care, delivered to your door.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/plants">
              Shop All Plants <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/recommendations">
              <Sparkles className="mr-2 text-accent" /> Find Your Perfect Plant
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Plants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>
    </div>
  );
}
