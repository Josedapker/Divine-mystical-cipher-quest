import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from './ui/alert';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AICipherAssistantProps {
  currentLevel: number;
  currentHint: string;
}

export const AICipherAssistant: React.FC<AICipherAssistantProps> = ({
  currentLevel,
  currentHint,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      console.log('Sending message to Claude...');
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: {
          messages: [
            { 
              role: 'system', 
              content: `Current puzzle level: ${currentLevel}
                       Current hint: ${currentHint}`
            },
            ...messages,
            { role: 'user', content: userMessage }
          ]
        }
      });

      console.log('Claude response:', data);

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.response) {
        throw new Error('No response received from Claude');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      toast({
        title: "Message received",
        description: "The Divine Guide has responded to your query.",
      });
    } catch (error) {
      console.error('Error calling Claude:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to get response from the Divine Guide. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 mb-8 border border-white/10">
      <h3 className="text-lg font-serif mb-4">Divine AI Guide</h3>
      
      <ScrollArea className="h-[200px] mb-4 rounded-md border border-white/10 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'assistant' ? 'text-blue-400' : 'text-white'
            }`}
          >
            <span className="font-bold">
              {message.role === 'assistant' ? 'Divine Guide: ' : 'You: '}
            </span>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-white/60 animate-pulse">Divine Guide is thinking...</div>
        )}
      </ScrollArea>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for guidance..."
          className="min-h-[80px] bg-white/5 border-white/10 text-white"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="px-4"
        >
          Send
        </Button>
      </form>
    </div>
  );
};