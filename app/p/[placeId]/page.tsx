import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { ProblemCard } from '../../../components/ProblemCard';
import { EmptyState } from '../../../components/EmptyState';
import { Badge } from '../../../components/ui/badge';
import { mockClient } from '../../../lib/mockClient';

interface PlacePageProps {
  params: {
    placeId: string;
  };
}

export default function PlacePage({ params }: PlacePageProps) {
  const place = mockClient.getPlace(params.placeId);
  const problems = place ? mockClient.getProblemsByPlace(place.id) : [];
  const betas = mockClient.getBetas();

  if (!place) {
    notFound();
  }

  // Get beta counts for each problem
  const problemsWithBetaCounts = problems.map(problem => ({
    ...problem,
    betaCount: betas.filter(beta => beta.problemId === problem.id).length,
    placeName: place.name
  }));

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Place Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{place.name}</h1>
              <p className="text-gray-600 mb-4">{place.city}</p>
              <div className="flex items-center space-x-4">
                <Badge variant={place.type === 'gym' ? 'default' : 'secondary'}>
                  {place.type === 'gym' ? 'Indoor Gym' : 'Outdoor Crag'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {problems.length} problem{problems.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <Link
              href="/problems/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Problem
            </Link>
          </div>
        </div>

        {/* Problems Grid */}
        {problemsWithBetaCounts.length === 0 ? (
          <EmptyState
            title="No problems yet"
            description={`No problems have been added to ${place.name} yet.`}
            action={{
              label: "Add First Problem",
              onClick: () => {
                // This would navigate to /problems/new with place pre-selected
                console.log('Navigate to create problem');
              }
            }}
          />
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Problems</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problemsWithBetaCounts.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  placeName={problem.placeName}
                  betaCount={problem.betaCount}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}