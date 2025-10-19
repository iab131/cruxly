import { Navbar } from '../components/Navbar';
import { ProblemCard } from '../components/ProblemCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { EmptyState } from '../components/EmptyState';
import { mockClient } from '../lib/mockClient';
import { Suspense } from 'react';

export default function HomePage() {
  const problems = mockClient.getProblems();
  const places = mockClient.getPlaces();
  const betas = mockClient.getBetas();

  // Get beta counts for each problem
  const problemsWithBetaCounts = problems.map(problem => ({
    ...problem,
    betaCount: betas.filter(beta => beta.problemId === problem.id).length,
    placeName: places.find(place => place.id === problem.placeId)?.name || 'Unknown Place'
  }));

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Problems</h1>
          <p className="text-gray-600">Find and share bouldering beta from your community</p>
        </div>

        {problemsWithBetaCounts.length === 0 ? (
          <EmptyState
            title="No problems yet"
            description="Be the first to share a bouldering problem!"
            action={{
              label: "Add Problem",
              onClick: () => {
                // This would navigate to /problems/new
                console.log('Navigate to create problem');
              }
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemsWithBetaCounts.map((problem) => (
              <Suspense key={problem.id} fallback={<SkeletonCard />}>
                <ProblemCard
                  problem={problem}
                  placeName={problem.placeName}
                  betaCount={problem.betaCount}
                />
              </Suspense>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}