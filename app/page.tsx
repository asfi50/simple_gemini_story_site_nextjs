"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Wand2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateStory } from "@/lib/generate-story";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
});

export default function Home() {
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      setIsLoading(true);
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
      }
      const generatedStory = await generateStory(values.topic);
      setStory(generatedStory);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-4">
              ✨ Story Time Magic ✨
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What magical story would you like to hear today?
            </p>
          </div>

          {!process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Gemini API key is not configured. Please add your API key to the .env.local file.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter a topic (e.g., friendly dragon, space adventure)"
                          className="bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700"
                          {...field}
                        />
                        <Button 
                          type="submit" 
                          disabled={isLoading || !process.env.NEXT_PUBLIC_GEMINI_API_KEY}
                          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          {isLoading ? (
                            "Creating..."
                          ) : (
                            <>
                              <Wand2 className="mr-2 h-4 w-4" />
                              Create Story
                            </>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {story && (
            <div className="mt-8 p-6 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border-2 border-blue-200 dark:border-blue-700">
              <div className="prose dark:prose-invert max-w-none">
                {story.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}