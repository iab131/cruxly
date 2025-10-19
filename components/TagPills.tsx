import { Badge } from './ui/badge';
import { ProblemTag } from '../types';

interface TagPillsProps {
  tags: string[];
  className?: string;
}

export function TagPills({ tags, className }: TagPillsProps) {
  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-200"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}