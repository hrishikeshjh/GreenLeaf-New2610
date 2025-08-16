"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import type { Plant } from "@/lib/plants";
import { ShoppingCart } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
            <Image
                src={plant.image}
                alt={plant.name}
                fill
                className="object-cover"
                data-ai-hint={`${plant.name.toLowerCase()} plant`}
            />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-semibold text-lg mb-1">{plant.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{plant.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">₹{plant.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(plant)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
