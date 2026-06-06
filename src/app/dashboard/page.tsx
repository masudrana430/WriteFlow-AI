import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FileText, Sparkles, Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  // Fetch the logged-in user's details from Clerk on the server side
  const user = await currentUser();

  // Guard clause: If a user somehow bypasses the proxy/middleware, redirect them to login
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {user.firstName || "Writer"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your AI documents, generation history, and workspaces here.
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Document
        </Button>
      </div>

      {/* Analytics/Status Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
            <h3 className="text-2xl font-bold tracking-tight">0</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/50 rounded-lg text-purple-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Words Generated</p>
            <h3 className="text-2xl font-bold tracking-tight">0</h3>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-lg text-amber-600">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Account Tier</p>
            <h3 className="text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">Free Trial</h3>
          </div>
        </div>
      </div>

      {/* Empty State Canvas */}
      <div className="rounded-xl border bg-card p-16 flex flex-col items-center justify-center text-center border-dashed">
        <div className="p-4 bg-muted rounded-full mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-1">No generated workflows yet</h2>
        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
          You have not generated any AI pieces yet. Start drafting a new template to see it listed here.
        </p>
        <Button variant="outline" className="border-purple-600/30 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-purple-600">
          Explore Templates
        </Button>
      </div>

    </div>
  );
}