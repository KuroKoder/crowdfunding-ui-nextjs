export type Campaign = {
  id: number;
  title: string;
  description: string | null;
  targetAmount: number;    
  currentAmount: number;   
  progressPercent: number; 
  status: 'OPEN' | 'CLOSED';
  validUntil: string | null;
  closedAt: string | null;
};