"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

export default function Workspace({ template }: { template: any }) {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [isCopied, setIsCopied] = useState(false); // State for the copy button

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate",
  });

  const handleGenerate = () => {
    if (!topic) {
      alert("Please enter a core topic first!");
      return;
    }
    complete(topic, {
      body: { topic, audience, guidelines, templateTitle: template.title }
    });
  };

  // Function to copy the generated text to clipboard
  const handleCopy = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side: Input Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="mb-1">{template.category}</Badge>
          <h1 className="text-2xl font-bold tracking-tight">{template.title}</h1>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Prompt Variables
            </CardTitle>
            <CardDescription>Fill out the parameters below to configure your generator context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Core Topic / Keyword</label>
              <Input 
                placeholder="e.g., Next.js 15 state management..." 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Input 
                placeholder="e.g., Professional Web Developers..." 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contextual Details / Guidelines</label>
              <Textarea 
                placeholder="Provide any additional guardrails or instructions..." 
                rows={4}
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
              />
            </div>

            <Button 
              className="w-full gap-2 mt-4" 
              size="lg" 
              onClick={handleGenerate}
              disabled={isLoading}
            >
              <Wand2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Generating...' : 'Generate Content'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Side: Output Live Stream Sandbox */}
      <div className="lg:col-span-2">
        <Card className="h-full min-h-[500px] flex flex-col border-dashed">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Live Output Sandbox
              </div>
              <div className="flex items-center gap-2">
                {isLoading && <Badge variant="secondary" className="animate-pulse">Generating...</Badge>}
                
                {/* The new Copy Button */}
                {completion && (
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 gap-2">
                    {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow p-6 overflow-auto">
            {completion ? (
              // The new Markdown Renderer
              <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
                <ReactMarkdown>{completion}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center opacity-50">
                <div className="p-4 bg-muted/40 rounded-full mb-4 border">
                  <Wand2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Your AI engine is standing by</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Fill in the template details configuration panel on the left and hit generate to stream down structured responses.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}