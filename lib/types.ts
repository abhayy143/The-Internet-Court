export type Case = {
  id: string;
  title: string;
  category: string;
  story: string;
  created_at: string;
  views_count: number;
};

export type Verdict = {
  id: string;
  case_id: string;
  guilty_party: string;
  blame_split: string;
  toxicity_score: number;
  red_flag_count: number;
  sentence: string;
  verdict_text: string;
  created_at: string;
};

export type VoteCount = {
  GUILTY: number;
  NOT_GUILTY: number;
  BOTH_CLOWNS: number;
  NEEDS_THERAPY: number;
};