"use client";

import Link from "next/link";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// Notice we are now importing "Show" instead of SignedIn/SignedOut
import { SignInButton, Show, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left Side: Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Wand2 className="h-5 w-5 text-purple-600" />
            <span>WriteFlow AI</span>
          </Link>

          {/* Navigation Links: Only show these if the user is actually signed in */}
          <Show when="signed-in">
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <Link href="/explore" className="hover:text-primary transition-colors">
                Explore
              </Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>
          </Show>
        </div>

        {/* Right Side: Authentication Buttons */}
        <div className="flex items-center gap-4">
          
          {/* State 1: Logged Out -> Show Sign In Button */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button size="sm" className="font-semibold">
                Sign In
              </Button>
            </SignInButton>
          </Show>

          {/* State 2: Logged In -> Show Profile Dropdown */}
          <Show when="signed-in">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9" // Matches the sizing of shadcn buttons
                }
              }}
            />
          </Show>

        </div>
      </div>
    </header>
  );
}