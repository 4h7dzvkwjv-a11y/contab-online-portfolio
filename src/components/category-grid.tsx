import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryIcon } from "./category-icon";

export function CategoryGrid({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <Link
          className="category-link"
          href={"/categorii/" + category.slug}
          key={category.slug}
        >
          <CategoryIcon category={category.slug} />
          <div>
            <Heading>{category.name}</Heading>
            <p>{category.description}</p>
          </div>
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
