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
          <DialogTitle className="text-2xl font-serif">Divine Secret Santa Cipher Guide</DialogTitle>
          <DialogDescription>A mystical journey to unlock the treasure</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 pb-6">
            <section>
              <h3 className="text-lg font-serif mb-2">The Sacred Journey</h3>
              <p className="text-muted-foreground">
                You are about to embark on a mystical quest to unlock a special Solana wallet
                containing treasure for one chosen DIVINE member. Through three sacred trials,
                you'll piece together the key fragments needed to access this gift.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">The Three Sacred Trials</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">1. The Numerical Trial</h4>
                  <p className="text-sm text-muted-foreground">
                    Decode a sequence of mystical symbols representing numbers.
                    Each symbol corresponds to a specific digit in our sacred numerical system.
                    Success reveals the first key fragment.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">2. The Riddle Trial</h4>
                  <p className="text-sm text-muted-foreground">
                    Solve an ancient riddle using wisdom and intuition.
                    Your answer, when correct, will unveil the second key fragment.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">3. The Final Trial</h4>
                  <p className="text-sm text-muted-foreground">
                    Decode one final message related to our blockchain realm.
                    This will reveal the last key fragment needed to access the treasure.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">Divine Guidance</h3>
              <p className="text-muted-foreground mb-4">
                If you find yourself stuck, you may seek divine guidance through hints.
                Each trial offers three hints to help illuminate your path.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">The Sacred Key</h3>
              <p className="text-muted-foreground mb-4">
                As you complete each trial, you'll receive a fragment of the sacred key.
                All three fragments combined will reveal the path to the Solana wallet
                containing the treasure prepared for our chosen DIVINE member.
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-center">
                  Complete all trials to unlock the treasure
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">Begin Your Quest</h3>
              <p className="text-muted-foreground">
                Click "Begin Quest" to start your journey through the Divine Secret Santa trials.
                May wisdom guide your path to the treasure.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CipherGuide;