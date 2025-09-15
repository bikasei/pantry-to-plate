// Fetch = ask the internet for data. Await = "wait here until it arrives".
export function extractIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      items.push({
        name: ing.trim().toLowerCase(), // keep simple for now
        note: meas ? meas.trim() : ''   // free-text amounts like "200g"
      });
    }
  }
  return items;
}

export async function searchRecipesAPI(query) {
  const q = query.trim();
  if (!q) return []; // nothing typed

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();

  const meals = data.meals || [];
  return meals.map(m => ({
    id: m.idMeal,
    title: m.strMeal,
    area: m.strArea,
    category: m.strCategory,
    thumb: m.strMealThumb,
    ingredients: extractIngredients(m)
  }));
}
