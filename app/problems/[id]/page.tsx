import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { GradeChip } from '../../../components/GradeChip';
import { TagPills } from '../../../components/TagPills';
import { Button } from '../../../components/ui/button';
import { ReportButton } from '../../../components/ReportButton';
import { mockClient } from '../../../lib/mockClient';

interface ProblemDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProblemDetailPage({ params }: ProblemDetailPageProps) {
  const problem = mockClient.getProblem(params.id);
  const place = problem ? mockClient.getPlace(problem.placeId) : null;
  const user = problem ? mockClient.getUser(problem.userId) : null;
  const betas = problem ? mockClient.getBetasByProblem(problem.id) : [];
  const comments = problem ? mockClient.getCommentsByProblem(problem.id) : [];

  if (!problem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8">
          <Image
            src={problem.imageUrl}
            alt={problem.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div className="absolute top-4 right-4">
            <GradeChip grade={problem.gradeV} />
          </div>
        </div>

        {/* Problem Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{problem.title}</h1>
              {place && (
                <Link 
                  href={`/p/${place.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {place.name} • {place.city}
                </Link>
              )}
            </div>
            {user && (
              <Link 
                href={`/profile/${user.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium">{user.name[0]}</span>
                  )}
                </div>
                <span className="text-sm">{user.name}</span>
              </Link>
            )}
          </div>

          <TagPills tags={problem.tags} className="mb-4" />

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{betas.length} beta{betas.length !== 1 ? 's' : ''}</span>
            <div className="flex items-center space-x-4">
              <span>{mockClient.formatDate(problem.createdAt)}</span>
              <ReportButton targetType="problem" targetId={problem.id} />
            </div>
          </div>
        </div>

        {/* Betas Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Betas</h2>
            <Button size="sm">
              Add Beta
            </Button>
          </div>

          {betas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No betas yet. Be the first to share your solution!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {betas.map((beta) => (
                <div key={beta.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {beta.type === 'image' ? (
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500">Image Beta</span>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500">Video Beta</span>
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-sm text-gray-600">
                      Added {mockClient.formatDate(beta.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Comments</h2>
          
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No comments yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {comments.map((comment) => {
                const commentUser = mockClient.getUser(comment.userId);
                return (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      {commentUser?.avatarUrl ? (
                        <Image
                          src={commentUser.avatarUrl}
                          alt={commentUser.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium">{commentUser?.name[0] || '?'}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{commentUser?.name || 'Unknown'}</span>
                        <span className="text-sm text-gray-500">{mockClient.formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t pt-4">
            <textarea
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <Button size="sm">Post Comment</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}