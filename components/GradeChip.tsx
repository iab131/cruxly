import { mockClient } from '../lib/mockClient';

interface GradeChipProps {
  grade: number;
  className?: string;
}

export function GradeChip({ grade, className }: GradeChipProps) {
  const color = mockClient.getGradeColor(grade);
  
  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      V{grade}
    </div>
  );
}