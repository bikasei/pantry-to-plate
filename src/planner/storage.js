const PLANNER_KEY = 'planner_v1';
export const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export function emptyPlanner() {
  return DAYS.reduce((acc, d) => (acc[d] = [], acc), {});
}

export function savePlanner(planner) {
  localStorage.setItem(PLANNER_KEY, JSON.stringify(planner));
}

export function loadPlanner() {
  const raw = localStorage.getItem(PLANNER_KEY);
  if (!raw) return emptyPlanner();
  try {
    const obj = JSON.parse(raw);
    for (const d of DAYS) if (!Array.isArray(obj[d])) obj[d] = [];
    return obj;
  } catch {
    return emptyPlanner();
  }
}
