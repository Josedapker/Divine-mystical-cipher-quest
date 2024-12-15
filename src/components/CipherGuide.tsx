import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CipherGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CipherGuide: React.FC<CipherGuideProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Divine Group Chat Ciphers</DialogTitle>
          <DialogDescription>A journey through our shared memories and adventures</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 pb-6">
            <section>
              <h3 className="text-lg font-serif mb-2">The Sacred Journey</h3>
              <p className="text-muted-foreground">
                Embark on a nostalgic quest through Divine's most memorable locations and adventures.
                Each cipher contains references to real places and moments we've shared together.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">The Three Sacred Trials</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">1. The Sacred Tokyo Journey</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigate through the neon-lit streets of our spiritual center in Japan.
                    Decode the coordinates that led to where it all began.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">2. The Car Enthusiast's Quest</h4>
                  <p className="text-sm text-muted-foreground">
                    Uncover the sacred grounds where JDM dreams come true.
                    Follow the trail of orange signs to automotive paradise.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">3. Island Paradise</h4>
                  <p className="text-sm text-muted-foreground">
                    Return to the crystal waters where five kayaks carved memories.
                    Decode the coordinates to our island sanctuary.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">Memory Markers</h3>
              <p className="text-muted-foreground mb-4">
                Each cipher contains references that only Divine members would understand.
                Use our shared experiences to guide you through the challenges.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">Divine Guidance</h3>
              <p className="text-muted-foreground">
                If you find yourself lost in memories, hints are available to light your path.
                Each hint draws from our actual adventures and inside jokes.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CipherGuide;