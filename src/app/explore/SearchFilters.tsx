"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("q", term);
    else params.delete("q");
    
    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category && category !== "all") params.set("category", category);
    else params.delete("category");
    
    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        placeholder="Search templates (e.g., SEO, Email)..."
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-md"
      />
      
      <Select onValueChange={handleCategory} defaultValue={searchParams.get("category")?.toString() || "all"}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Blog">Blog</SelectItem>
          <SelectItem value="Social Media">Social Media</SelectItem>
          <SelectItem value="Email">Email</SelectItem>
          <SelectItem value="Ad Copy">Ad Copy</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}