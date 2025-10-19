'use client';

import { useState } from 'react';
import { Button } from './ui/button';

interface ImageAnnotatorStubProps {
  imageUrl: string;
  onSave?: (annotations: any) => void;
  className?: string;
}

export function ImageAnnotatorStub({ imageUrl, onSave, className }: ImageAnnotatorStubProps) {
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [selectedTool, setSelectedTool] = useState<'circle' | 'arrow' | null>(null);

  const handleToolSelect = (tool: 'circle' | 'arrow') => {
    setSelectedTool(selectedTool === tool ? null : tool);
  };

  const handleUndo = () => {
    setAnnotations(prev => prev.slice(0, -1));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(annotations);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={selectedTool === 'circle' ? 'default' : 'outline'}
            onClick={() => handleToolSelect('circle')}
          >
            Circle
          </Button>
          <Button
            size="sm"
            variant={selectedTool === 'arrow' ? 'default' : 'outline'}
            onClick={() => handleToolSelect('arrow')}
          >
            Arrow
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndo}
            disabled={annotations.length === 0}
          >
            Undo
          </Button>
          <div className="flex-1" />
          <Button
            size="sm"
            onClick={handleSave}
            disabled={annotations.length === 0}
          >
            Save Beta
          </Button>
        </div>
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img
          src={imageUrl}
          alt="Problem image"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay for annotations */}
        <div className="absolute inset-0">
          {annotations.map((annotation, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: annotation.x,
                top: annotation.y,
                width: annotation.width,
                height: annotation.height,
                border: '2px solid #3B82F6',
                borderRadius: annotation.type === 'circle' ? '50%' : '0',
              }}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
          <p className="text-sm">
            {selectedTool ? `Click and drag to add ${selectedTool}` : 'Select a tool to start annotating'}
          </p>
        </div>
      </div>
    </div>
  );
}