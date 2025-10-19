import { User, Place, Problem, Beta, Comment, Report } from '../types';
import usersData from '../mocks/users.json';
import placesData from '../mocks/places.json';
import problemsData from '../mocks/problems.json';
import betasData from '../mocks/betas.json';
import commentsData from '../mocks/comments.json';
import reportsData from '../mocks/reports.json';
import { sortByDistance } from './haversine';

// In-memory storage for new data (not persisted)
let newProblems: Problem[] = [];
let newComments: Comment[] = [];
let newBetas: Beta[] = [];

export const mockClient = {
  // Users
  getUsers: (): User[] => usersData as User[],
  getUser: (id: string): User | undefined => 
    usersData.find(user => user.id === id) as User | undefined,

  // Places
  getPlaces: (): Place[] => placesData as Place[],
  getPlace: (id: string): Place | undefined => 
    placesData.find(place => place.id === id) as Place | undefined,
  addPlace: (place: Omit<Place, 'id'>): Place => {
    const newPlace: Place = {
      ...place,
      id: `place-${Date.now()}`,
    };
    placesData.push(newPlace);
    return newPlace;
  },

  // Problems
  getProblems: (): Problem[] => [...(problemsData as Problem[]), ...newProblems],
  getProblem: (id: string): Problem | undefined => {
    const allProblems = [...(problemsData as Problem[]), ...newProblems];
    return allProblems.find(problem => problem.id === id);
  },
  getProblemsByPlace: (placeId: string): Problem[] => {
    const allProblems = [...(problemsData as Problem[]), ...newProblems];
    return allProblems.filter(problem => problem.placeId === placeId);
  },
  getProblemsByUser: (userId: string): Problem[] => {
    const allProblems = [...(problemsData as Problem[]), ...newProblems];
    return allProblems.filter(problem => problem.userId === userId);
  },
  addProblem: (problem: Omit<Problem, 'id' | 'createdAt'>): Problem => {
    const newProblem: Problem = {
      ...problem,
      id: `problem-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    newProblems.push(newProblem);
    return newProblem;
  },
  searchProblems: (query: string, filters?: {
    tags?: string[];
    gradeMin?: number;
    gradeMax?: number;
    placeId?: string;
  }): Problem[] => {
    let results = [...(problemsData as Problem[]), ...newProblems];
    
    // Text search
    if (query) {
      const searchLower = query.toLowerCase();
      results = results.filter(problem => 
        problem.title.toLowerCase().includes(searchLower)
      );
    }
    
    // Tag filter
    if (filters?.tags && filters.tags.length > 0) {
      results = results.filter(problem =>
        filters.tags!.some(tag => problem.tags.includes(tag))
      );
    }
    
    // Grade filter
    if (filters?.gradeMin !== undefined) {
      results = results.filter(problem => problem.gradeV >= filters.gradeMin!);
    }
    if (filters?.gradeMax !== undefined) {
      results = results.filter(problem => problem.gradeV <= filters.gradeMax!);
    }
    
    // Place filter
    if (filters?.placeId) {
      results = results.filter(problem => problem.placeId === filters.placeId);
    }
    
    return results;
  },
  getNearbyProblems: (userLat: number, userLng: number): Problem[] => {
    const allProblems = [...(problemsData as Problem[]), ...newProblems];
    const places = placesData as Place[];
    return sortByDistance(allProblems, userLat, userLng, places);
  },

  // Betas
  getBetas: (): Beta[] => [...(betasData as Beta[]), ...newBetas],
  getBetasByProblem: (problemId: string): Beta[] => {
    const allBetas = [...(betasData as Beta[]), ...newBetas];
    return allBetas.filter(beta => beta.problemId === problemId);
  },
  getBetasByUser: (userId: string): Beta[] => {
    const allBetas = [...(betasData as Beta[]), ...newBetas];
    return allBetas.filter(beta => beta.userId === userId);
  },
  addBeta: (beta: Omit<Beta, 'id' | 'createdAt'>): Beta => {
    const newBeta: Beta = {
      ...beta,
      id: `beta-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    newBetas.push(newBeta);
    return newBeta;
  },

  // Comments
  getComments: (): Comment[] => [...(commentsData as Comment[]), ...newComments],
  getCommentsByProblem: (problemId: string): Comment[] => {
    const allComments = [...(commentsData as Comment[]), ...newComments];
    return allComments.filter(comment => comment.problemId === problemId);
  },
  getCommentsByBeta: (betaId: string): Comment[] => {
    const allComments = [...(commentsData as Comment[]), ...newComments];
    return allComments.filter(comment => comment.betaId === betaId);
  },
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>): Comment => {
    const newComment: Comment = {
      ...comment,
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    newComments.push(newComment);
    return newComment;
  },

  // Reports
  getReports: (): Report[] => reportsData as Report[],
  addReport: (report: Omit<Report, 'id' | 'createdAt'>): Report => {
    const newReport: Report = {
      ...report,
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    reportsData.push(newReport);
    return newReport;
  },

  // Utility functions
  getGradeColor: (grade: number): string => {
    if (grade <= 2) return '#22C55E';
    if (grade <= 4) return '#F59E0B';
    if (grade <= 6) return '#EF4444';
    if (grade <= 8) return '#3B82F6';
    if (grade <= 10) return '#A855F7';
    return '#0EA5E9';
  },

  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  },
};