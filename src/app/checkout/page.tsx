"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const baseSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Please enter your full address."),
  city: z.string().min(2, "Please enter your city."),
  zip: z.string().min(5, "Please enter a valid ZIP code."),
});

const checkoutSchema = z.discriminatedUnion("paymentMethod", [
  z.object({
    paymentMethod: z.literal("card"),
    cardName: z.string().min(2, "Name on card is required."),
    cardNumber: z.string().length(16, "Card number must be 16 digits."),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format."),
    cvc: z.string().length(3, "CVC must be 3 digits."),
  }).merge(baseSchema),
  z.object({
    paymentMethod: z.literal("upi"),
    upiId: z.string().min(3, "Please enter a valid UPI ID."),
  }).merge(baseSchema),
  z.object({
    paymentMethod: z.literal("cod"),
  }).merge(baseSchema)
]);

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { cartItems, cartTotal, itemCount } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: "",
            name: "",
            address: "",
            city: "",
            zip: "",
            paymentMethod: "card",
            cardName: "",
            cardNumber: "",
            expiry: "",
            cvc: "",
            upiId: "",
        },
    });

    function onSubmit(data: CheckoutFormValues) {
        console.log("Checkout data:", data);
        if (data.paymentMethod === 'cod') {
            alert("Your order has been confirmed! (This is a demo)");
        } else {
            alert("Thank you for your order! (This is a demo)");
        }
    }
    
    const onPaymentMethodChange = (value: "card" | "upi" | "cod") => {
        setPaymentMethod(value);
        form.setValue("paymentMethod", value);
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Shipping & Payment</CardTitle>
                    <CardDescription>Please enter your details to complete the purchase.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <h3 className="text-lg font-semibold">Shipping Address</h3>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Plant Lane" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <div className="flex gap-4">
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem className="flex-1"><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="zip" render={({ field }) => (
                                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <h3 className="text-lg font-semibold">Payment Method</h3>
                             <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                            onValueChange={onPaymentMethodChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem value="card" /></FormControl>
                                                    <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem value="upi" /></FormControl>
                                                    <FormLabel className="font-normal">UPI</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem value="cod" /></FormControl>
                                                    <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 rounded-md border p-4">
                                     <h3 className="text-md font-semibold">Card Details</h3>
                                     <FormField control={form.control} name="cardName" render={({ field }) => (
                                        <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                     <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="---- ---- ---- ----" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <div className="flex gap-4">
                                        <FormField control={form.control} name="expiry" render={({ field }) => (
                                            <FormItem className="flex-1"><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="cvc" render={({ field }) => (
                                            <FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="space-y-4 rounded-md border p-4">
                                     <h3 className="text-md font-semibold">UPI Details</h3>
                                     <FormField control={form.control} name="upiId" render={({ field }) => (
                                        <FormItem><FormLabel>UPI ID</FormLabel><FormControl><Input placeholder="yourname@bank" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                            )}

                            <Button type="submit" size="lg" className="w-full">
                                {paymentMethod === 'cod' ? 'Confirm Order' : 'Place Order'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div className="order-first lg:order-last">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.plant.id} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                    <Image src={item.plant.image} alt={item.plant.name} fill className="object-cover" data-ai-hint={`${item.plant.name.toLowerCase()} plant`} />
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.quantity}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{item.plant.name}</p>
                                </div>
                                <p className="font-semibold">₹{(item.plant.price * item.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                    <Separator className="my-4"/>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>₹{cartTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                         <Separator className="my-2"/>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>₹{cartTotal.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
