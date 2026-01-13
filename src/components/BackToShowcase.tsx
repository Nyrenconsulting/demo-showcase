import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface BackToShowcaseProps {
  demoName: string;
}

const BackToShowcase = ({ demoName }: BackToShowcaseProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm text-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium hover:text-background/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka till alla demos
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-background/70">
            Demo: <span className="font-medium text-background">{demoName}</span>
          </span>
          <div className="flex items-center gap-1 text-xs text-background/50">
            <ExternalLink className="h-3 w-3" />
            Klickbar prototyp
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackToShowcase;
