"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPlantRecommendations } from "@/app/recommendations/actions";
import { Loader2, Sprout } from "lucide-react";

const recommendationSchema = z.object({
  lightingConditions: z.string().min(1, "Please select lighting conditions"),
  careLevel: z.string().min(1, "Please select a care level"),
  desiredAesthetic: z.string().min(3, "Please describe your desired aesthetic"),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationClient() {
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
        lightingConditions: "",
        careLevel: "",
        desiredAesthetic: "",
    },
  });

  const onSubmit = (data: RecommendationFormValues) => {
    setError(null);
    setRecommendations([]);
    startTransition(async () => {
      const result = await getPlantRecommendations(data);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setRecommendations(result.data.recommendedPlants);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Your Preferences</CardTitle>
                <CardDescription>Fill out the form below to get your personalized plant recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="lightingConditions"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Lighting Conditions</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="e.g., bright, indirect light" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="bright indirect light">Bright, Indirect Light</SelectItem>
                                    <SelectItem value="low light">Low Light</SelectItem>
                                    <SelectItem value="direct sunlight">Direct Sunlight</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="careLevel"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Care Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="e.g., easy, moderate" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="easy">Easy (Beginner Friendly)</SelectItem>
                                    <SelectItem value="moderate">Moderate (Some experience)</SelectItem>
                                    <SelectItem value="difficult">Difficult (Green Thumb required)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="desiredAesthetic"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Desired Aesthetic</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., modern, tropical, minimalist" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending} size="lg">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Get Recommendations
                    </Button>
                </form>
            </Form>
            </CardContent>
        </Card>

        {isPending && (
             <div className="text-center mt-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Our plant expert is thinking...</p>
             </div>
        )}

        {error && <p className="text-destructive mt-4 text-center">{error}</p>}

        {recommendations.length > 0 && (
            <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold text-center mb-8">Our Recommendations For You</h2>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendations.map((plant, index) => (
                                <li key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                                    <Sprout className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-lg">{plant}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
