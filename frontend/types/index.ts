export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  isAdmin?: boolean;
};

export type Place = {
  id: string;
  type: 'gym' | 'outdoor';
  name: string;
  lat: number;
  lng: number;
  city: string;
};

export type Problem = {
  id: string;
  userId: string;
  placeId: string;
  title: string;
  gradeV: number;
  tags: string[];
  imageUrl: string;
  createdAt: string;
};

export type Beta = {
  id: string;
  problemId: string;
  userId: string;
  type: 'image' | 'video';
  overlayJson?: any;
  overlayPngUrl?: string;
  videoUrl?: string;
  createdAt: string;
};

export type Comment = {
  id: string;
  problemId: string;
  betaId?: string;
  userId: string;
  text: string;
  createdAt: string;
};

export type Report = {
  id: string;
  targetType: 'problem' | 'beta' | 'comment' | 'user';
  targetId: string;
  userId: string;
  reason: string;
  createdAt: string;
};

export type GradeBand = {
  min: number;
  max: number;
  color: string;
  label: string;
};

export const GRADE_BANDS: GradeBand[] = [
  { min: 0, max: 2, color: '#22C55E', label: 'V0-V2' },
  { min: 3, max: 4, color: '#F59E0B', label: 'V3-V4' },
  { min: 5, max: 6, color: '#EF4444', label: 'V5-V6' },
  { min: 7, max: 8, color: '#3B82F6', label: 'V7-V8' },
  { min: 9, max: 10, color: '#A855F7', label: 'V9-V10' },
  { min: 11, max: 17, color: '#0EA5E9', label: 'V11+' },
];

export const PROBLEM_TAGS = [
  'slab',
  'overhang',
  'crimps',
  'dyno',
  'traverse',
  'campus',
  'mantle',
  'crack',
  'roof',
  'arete',
  'dihedral',
  'compression',
] as const;

export type ProblemTag = typeof PROBLEM_TAGS[number];