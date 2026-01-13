import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface DemoCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
}

const DemoCard = ({ title, description, image, category, href }: DemoCardProps) => {
  return (
    <Link
      to={href}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {category}
        </span>
        <h3 className="mt-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
          Visa demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default DemoCard;
