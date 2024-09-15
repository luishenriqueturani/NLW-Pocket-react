interface SummaryResponse {
  completed: number;
  total: number;
  goalsPerDay: Record<string, {
      completedAt: string;
      title: string;
      id: string;
  }[]>;
}

export async function getSummary() : Promise<SummaryResponse> {
  const res = await fetch('http://localhost:3000/summary')
  const data = await res.json()
  return data.summary
}