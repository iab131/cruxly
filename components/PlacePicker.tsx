'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { mockClient } from '../lib/mockClient';
import { Place } from '../types';

interface PlacePickerProps {
  value: string;
  onChange: (placeId: string) => void;
  className?: string;
}

export function PlacePicker({ value, onChange, className }: PlacePickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: '',
    city: '',
    type: 'gym' as 'gym' | 'outdoor',
    lat: 0,
    lng: 0,
  });

  const places = mockClient.getPlaces();

  const handleAddPlace = () => {
    if (newPlace.name && newPlace.city) {
      const place = mockClient.addPlace(newPlace);
      onChange(place.id);
      setIsModalOpen(false);
      setNewPlace({ name: '', city: '', type: 'gym', lat: 0, lng: 0 });
    }
  };

  return (
    <div className={className}>
      <div className="flex space-x-2">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        >
          <option value="">Select a location...</option>
          {places.map(place => (
            <option key={place.id} value={place.id}>
              {place.name} • {place.city}
            </option>
          ))}
        </Select>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsModalOpen(true)}
        >
          Add Place
        </Button>
      </div>

      {/* Add Place Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Place</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place Name
                </label>
                <Input
                  value={newPlace.name}
                  onChange={(e) => setNewPlace(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Hub Climbing Toronto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  value={newPlace.city}
                  onChange={(e) => setNewPlace(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="e.g., Toronto, ON"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <Select
                  value={newPlace.type}
                  onChange={(e) => setNewPlace(prev => ({ ...prev, type: e.target.value as 'gym' | 'outdoor' }))}
                >
                  <option value="gym">Indoor Gym</option>
                  <option value="outdoor">Outdoor Crag</option>
                </Select>
              </div>
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
                onClick={handleAddPlace}
                disabled={!newPlace.name || !newPlace.city}
              >
                Add Place
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}