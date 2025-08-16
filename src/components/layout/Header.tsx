"use client";

import Link from "next/link";
import { Leaf, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/plants", label: "Plants" },
  { href: "/recommendations", label: "Recommendations" },
];

export function Header() {
  const { itemCount } = useCart();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">Verdant Vista</span>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <CartButton itemCount={itemCount} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
            <CartButton itemCount={itemCount} />
          </div>
        )}
      </div>
    </header>
  );
}

function CartButton({ itemCount }: { itemCount: number }) {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart">
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {itemCount}
            </span>
          )}
        </div>
        <span className="sr-only">Shopping Cart</span>
      </Link>
    </Button>
  );
}
