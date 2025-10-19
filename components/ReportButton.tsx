'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { mockClient } from '../lib/mockClient';

interface ReportButtonProps {
  targetType: 'problem' | 'beta' | 'comment' | 'user';
  targetId: string;
  className?: string;
}

const REPORT_REASONS = [
  'Inappropriate content',
  'Spam',
  'Incorrect beta',
  'Harassment',
  'Copyright violation',
  'Other',
];

export function ReportButton({ targetType, targetId, className }: ReportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add report to mock data
    mockClient.addReport({
      targetType,
      targetId,
      userId: 'user-1', // Mock user ID
      reason: selectedReason === 'Other' ? customReason : selectedReason,
    });

    setIsSubmitting(false);
    setIsModalOpen(false);
    setSelectedReason('');
    setCustomReason('');
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        Report
      </Button>

      {/* Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Content</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for reporting
                </label>
                <div className="space-y-2">
                  {REPORT_REASONS.map(reason => (
                    <label key={reason} className="flex items-center">
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedReason === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please specify
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Describe the issue..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedReason || (selectedReason === 'Other' && !customReason.trim()) || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}