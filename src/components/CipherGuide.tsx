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
          <DialogDescription>A mystical journey of holiday giving</DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 pb-6">
            <section>
              <h3 className="text-lg font-serif mb-2">Welcome to the Divine Secret Santa</h3>
              <p className="text-muted-foreground">
                In this mystical holiday experience, you'll embark on a journey to unlock a special
                gift for one of our DIVINE members through the art of sacred ciphers.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">The Three Sacred Tests</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">1. The Numerical Cipher</h4>
                  <p className="text-sm text-muted-foreground">
                    Your first challenge involves decoding a sequence of mystical symbols representing numbers.
                    Each symbol corresponds to a specific digit in our sacred numerical system.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">2. The Riddle of Keys</h4>
                  <p className="text-sm text-muted-foreground">
                    The second test presents you with an ancient riddle. Your answer must be encoded
                    using our divine cipher system to unlock the next fragment of the key.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">3. The Final Revelation</h4>
                  <p className="text-sm text-muted-foreground">
                    Your final challenge will test your mastery of the divine cipher system
                    as you decode a special message related to our blockchain realm.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">Divine Guidance System</h3>
              <p className="text-muted-foreground mb-4">
                Throughout your journey, you may seek divine guidance in the form of hints.
                However, remember that each hint used will slightly diminish the holiday magic
                multiplier of your final reward.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium mb-1">Using No Hints</p>
                  <p className="text-xs text-muted-foreground">100% Magic Multiplier</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium mb-1">Using All Hints</p>
                  <p className="text-xs text-muted-foreground">25% Magic Multiplier</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">The Sacred Key</h3>
              <p className="text-muted-foreground mb-4">
                Each completed test will reveal a fragment of the sacred key. All three fragments
                combined will unlock the special holiday gift prepared for our chosen DIVINE member.
              </p>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-center">
                  Key Format: XXX-XXX-XXX
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-serif mb-2">Ready to Begin?</h3>
              <p className="text-muted-foreground">
                Click "Begin Quest" to start your journey through the Divine Secret Santa cipher
                challenges. May the holiday spirit guide your path to enlightenment.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CipherGuide;