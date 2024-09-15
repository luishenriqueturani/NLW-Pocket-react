interface CreateGoalResponse {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal(body: CreateGoalResponse) {
  const res = await fetch(`http://localhost:3000/goal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data
}