import Image from 'next/image';
import Link from 'next/link';
import { Problem } from '../types';
import { GradeChip } from './GradeChip';
import { TagPills } from './TagPills';
import { mockClient } from '../lib/mockClient';

interface ProblemCardProps {
  problem: Problem;
  placeName?: string;
  betaCount?: number;
}

export function ProblemCard({ problem, placeName, betaCount = 0 }: ProblemCardProps) {
  return (
    <Link href={`/problems/${problem.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-[4/3]">
          <Image
            src={problem.imageUrl}
            alt={problem.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <GradeChip grade={problem.gradeV} />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
            {problem.title}
          </h3>
          
          {placeName && (
            <p className="text-sm text-gray-500 mb-2">{placeName}</p>
          )}
          
          <TagPills tags={problem.tags} className="mb-3" />
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{betaCount} beta{betaCount !== 1 ? 's' : ''}</span>
            <span>{mockClient.formatDate(problem.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}