import {
  BookOpen,
  Percent,
  FileText,
  UsersRound,
  BriefcaseBusiness,
  Compass,
} from "lucide-react";
import { getCategory, type CategorySlug } from "@/data/categories";

const icons = {
  book: BookOpen,
  percent: Percent,
  file: FileText,
  users: UsersRound,
  briefcase: BriefcaseBusiness,
  compass: Compass,
};

export function CategoryIcon({
  category,
  small = false,
}: {
  category: CategorySlug;
  small?: boolean;
}) {
  const item = getCategory(category)!;
  const Icon = icons[item.icon];
  return (
    <span
      className={
        "category-icon color-" +
        item.color +
        (small ? " category-icon-small" : "")
      }
      aria-hidden="true"
    >
      <Icon size={small ? 19 : 24} strokeWidth={1.75} />
    </span>
  );
}
