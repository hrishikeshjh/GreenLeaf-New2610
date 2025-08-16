import { PlantCard } from "@/components/common/PlantCard";
import { plants } from "@/lib/plants";

export default function PlantsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold">Our Plant Collection</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Browse our curated selection of beautiful and healthy houseplants.
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}
