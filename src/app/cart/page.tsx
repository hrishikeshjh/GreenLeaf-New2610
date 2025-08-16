"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, XCircle } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <XCircle className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-4xl font-bold mt-8">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-muted-foreground">Looks like you haven't added any plants yet.</p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/plants">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] hidden md:table-cell">Product</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {cartItems.map(item => (
                            <TableRow key={item.plant.id}>
                                <TableCell className="hidden md:table-cell">
                                    <Image src={item.plant.image} alt={item.plant.name} width={80} height={80} className="rounded-md object-cover" data-ai-hint={`${item.plant.name.toLowerCase()} plant`} />
                                </TableCell>
                                <TableCell>
                                    <p className="font-bold">{item.plant.name}</p>
                                    <p className="text-sm text-muted-foreground">₹{item.plant.price.toFixed(2)}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                                        <Input type="number" value={item.quantity} readOnly className="w-16 text-center" />
                                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-bold">₹{(item.plant.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeFromCart(item.plant.id)}><Trash2 className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
       </div>
    </div>
  );
}
