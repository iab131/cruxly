'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { TagPills } from '../../../components/TagPills';
import { GradeChip } from '../../../components/GradeChip';
import { PlacePicker } from '../../../components/PlacePicker';
import { mockClient } from '../../../lib/mockClient';
import { PROBLEM_TAGS } from '../../../types';

export default function CreateProblemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    gradeV: 3,
    placeId: '',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    tags: [] as string[],
  });

  const places = mockClient.getPlaces();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add problem to mock data
    const newProblem = mockClient.addProblem({
      ...formData,
      userId: 'user-1', // Mock user ID
    });

    router.push(`/problems/${newProblem.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Problem</h1>
          <p className="text-gray-600">Share a new bouldering problem with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Image</h2>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={formData.imageUrl}
                alt="Problem preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <GradeChip grade={formData.gradeV} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Image upload will be implemented later
            </p>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter problem name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade (V{formData.gradeV})
                </label>
                <input
                  type="range"
                  min="0"
                  max="17"
                  value={formData.gradeV}
                  onChange={(e) => setFormData(prev => ({ ...prev, gradeV: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>V0</span>
                  <span>V17</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <PlacePicker
                  value={formData.placeId}
                  onChange={(placeId) => setFormData(prev => ({ ...prev, placeId }))}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {PROBLEM_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.tags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Selected tags:</p>
                <TagPills tags={formData.tags} />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.placeId}
            >
              {isSubmitting ? 'Creating...' : 'Create Problem'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}