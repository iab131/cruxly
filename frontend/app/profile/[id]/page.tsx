import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { ProblemCard } from '../../../components/ProblemCard';
import { EmptyState } from '../../../components/EmptyState';
import { Badge } from '../../../components/ui/badge';
import { mockClient } from '../../../lib/mockClient';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = mockClient.getUser(params.id);
  const problems = user ? mockClient.getProblemsByUser(user.id) : [];
  const betas = user ? mockClient.getBetasByUser(user.id) : [];
  const places = mockClient.getPlaces();

  if (!user) {
    notFound();
  }

  // Get beta counts for each problem
  const problemsWithBetaCounts = problems.map(problem => ({
    ...problem,
    betaCount: betas.filter(beta => beta.problemId === problem.id).length,
    placeName: places.find(place => place.id === problem.placeId)?.name || 'Unknown Place'
  }));

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <span className="text-2xl font-medium text-gray-600">{user.name[0]}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.isAdmin && (
                  <Badge variant="default">Admin</Badge>
                )}
              </div>
              <p className="text-gray-600 mb-4">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>{problems.length} problem{problems.length !== 1 ? 's' : ''}</span>
                <span>{betas.length} beta{betas.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
                Problems
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                Betas
              </button>
            </nav>
          </div>
        </div>

        {/* Problems Section */}
        <div>
          {problemsWithBetaCounts.length === 0 ? (
            <EmptyState
              title="No problems yet"
              description={`${user.name} hasn't shared any problems yet.`}
            />
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
}