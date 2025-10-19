import { Navbar } from '../../../components/Navbar';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { EmptyState } from '../../../components/EmptyState';
import { mockClient } from '../../../lib/mockClient';

export default function AdminReportsPage() {
  const reports = mockClient.getReports();
  const users = mockClient.getUsers();
  const problems = mockClient.getProblems();
  const betas = mockClient.getBetas();
  const comments = mockClient.getComments();

  const getTargetInfo = (report: any) => {
    switch (report.targetType) {
      case 'problem':
        const problem = problems.find(p => p.id === report.targetId);
        return problem ? { type: 'Problem', name: problem.title } : { type: 'Problem', name: 'Unknown' };
      case 'beta':
        const beta = betas.find(b => b.id === report.targetId);
        return beta ? { type: 'Beta', name: `Beta for problem ${beta.problemId}` } : { type: 'Beta', name: 'Unknown' };
      case 'comment':
        const comment = comments.find(c => c.id === report.targetId);
        return comment ? { type: 'Comment', name: comment.text.substring(0, 50) + '...' } : { type: 'Comment', name: 'Unknown' };
      case 'user':
        const user = users.find(u => u.id === report.targetId);
        return user ? { type: 'User', name: user.name } : { type: 'User', name: 'Unknown' };
      default:
        return { type: 'Unknown', name: 'Unknown' };
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason.toLowerCase()) {
      case 'inappropriate content':
        return 'destructive';
      case 'spam':
        return 'secondary';
      case 'incorrect beta':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Reports</h1>
          <p className="text-gray-600">Review and manage community reports</p>
        </div>

        {reports.length === 0 ? (
          <EmptyState
            title="No reports"
            description="There are no pending reports to review."
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Report Queue</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {reports.map((report) => {
                const reporter = users.find(u => u.id === report.userId);
                const targetInfo = getTargetInfo(report);
                
                return (
                  <div key={report.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant={getReasonColor(report.reason)}>
                            {report.reason}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {targetInfo.type}
                          </span>
                        </div>
                        
                        <h3 className="font-medium text-gray-900 mb-1">
                          {targetInfo.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          Reported by {reporter?.name || 'Unknown'} • {mockClient.formatDate(report.createdAt)}
                        </p>
                        
                        <div className="text-sm text-gray-500">
                          Target ID: {report.targetId}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}