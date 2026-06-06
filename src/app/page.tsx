import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 pt-20 pb-16 text-center overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]" />

        {/* Badge */}
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold mb-8 bg-secondary/50 text-secondary-foreground">
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          WriteFlow AI 2.0 is live
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Agentic Workspace</span> for Modern Content Teams
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          WriteFlow AI does not just suggest text — it acts as a background agent that runs tasks autonomously to plan, generate, review, and publish your content.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 z-10">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto text-md h-12 px-8 shadow-lg transition-transform hover:-translate-y-1">
              Start Writing Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-md h-12 px-8 bg-background/50 backdrop-blur-sm">
              Explore Templates
            </Button>
          </Link>
        </div>

        {/* ANIMATION REQUIREMENT: Floating Mock-Editor Card */}
        <div className="relative w-full max-w-3xl mx-auto hidden md:block">
          {/* Card glow behind */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/20 blur-3xl rounded-full" />
          
          {/* The actual floating card using native Tailwind animations */}
          <div className="relative rounded-xl border bg-card text-card-foreground shadow-2xl p-6 transition-transform duration-1000 ease-in-out animate-[pulse_4s_ease-in-out_infinite] hover:-translate-y-2">
            
            {/* Fake Window Controls */}
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground font-mono ml-4">agent-draft.ts (Running...)</span>
            </div>
            
            {/* Fake Content Loading */}
            <div className="space-y-4 text-left">
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse delay-75" />
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse delay-150" />
            </div>

          </div>
        </div>
      </section>

      {/* Placeholders for the remaining 7 sections */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <h2 className="text-2xl font-bold mb-4">Other 7 Landing Page Sections Coming Soon...</h2>
          <p>Features | How it Works | Popular Templates | Pricing | Statistics | Testimonials | FAQ</p>
        </div>
      </section>

    </div>
  );
}