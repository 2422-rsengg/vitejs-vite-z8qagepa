import React, { useState } from 'react';
import {
  Sparkles,
  Utensils,
  CheckCircle2,
  Clock,
  ListTodo,
  ChefHat,
  Calendar,
  Zap,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [energy, setEnergy] = useState('Medium');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const [calendar] = useState([
    { time: '09:00 AM', task: '📧 Morning Inbox Sweep', type: 'Work' },
    { time: '11:30 AM', task: '🤝 Client Strategy Call', type: 'Work' },
    { time: '02:00 PM', task: '🧠 Focus Deep Work', type: 'Work' },
    { time: '05:00 PM', task: "🧘 Diva's Unwind Time", type: 'Personal' },
  ]);

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('Please enter your Spoonacular API Key!');
      return;
    }

    setLoading(true);
    try {
      const maxTime = energy === 'Low' ? 20 : energy === 'Medium' ? 50 : 150;

      // 1. LIVE API FETCH
      const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&maxReadyTime=${maxTime}&number=1&addRecipeInformation=true&fillIngredients=true`;
      const response = await fetch(searchUrl);
      const data = await response.json();

      let finalMeal = null;

      // 2. SMART MAPPING: Checks if API found it, otherwise uses Energy-Specific Memory
      if (data.results && data.results.length > 0) {
        const recipe = data.results[0];
        finalMeal = {
          title: recipe.title,
          ingredients: recipe.extendedIngredients.map((ing) => ing.original),
          image: recipe.image,
          time: recipe.readyInMinutes,
        };
      } else {
        // AGENT INTELLIGENCE: Food-item + Time-limit specific results
        const agentMemory = {
          pizza: {
            Low: {
              title: '15-Min Quick Tortilla Pizza',
              ing: [
                'Flour Tortilla',
                'Marinara Sauce',
                'Shredded Mozzarella',
                'Mini Pepperonis',
                'Dried Oregano',
              ],
              img: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800',
            },
            Medium: {
              title: 'French Bread Pizza Boats',
              ing: [
                'Fresh Baguette',
                'Thick Pizza Sauce',
                'Sliced Provolone',
                'Diced Bell Peppers',
                'Red Onion',
              ],
              img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
            },
            High: {
              title: 'Artisan Sourdough Margherita',
              ing: [
                'Sourdough Pizza Dough',
                'Fresh Buffalo Mozzarella',
                'San Marzano Tomatoes',
                'Fresh Basil',
                'Extra Virgin Olive Oil',
              ],
              img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800',
            },
          },
          pasta: {
            Low: {
              title: '10-Min Garlic Butter Penne',
              ing: [
                'Penne Pasta',
                'Salted Butter',
                'Minced Garlic',
                'Grated Parmesan',
                'Red Pepper Flakes',
              ],
              img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
            },
            Medium: {
              title: 'Creamy Tomato & Spinach Fusilli',
              ing: [
                'Fusilli',
                'Heavy Cream',
                'Marinara Sauce',
                'Baby Spinach',
                'Parmesan Cheese',
              ],
              img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
            },
            High: {
              title: 'Slow-Simmered Beef Ragù',
              ing: [
                'Tagliatelle Pasta',
                'Ground Wagyu Beef',
                'Dry Red Wine',
                'Carrots & Celery',
                'Beef Bone Broth',
              ],
              img: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800',
            },
          },
        };

        const key = query.toLowerCase().includes('pizza')
          ? 'pizza'
          : query.toLowerCase().includes('pasta')
          ? 'pasta'
          : 'default';
        const choice = agentMemory[key]?.[energy];

        finalMeal = choice
          ? {
              title: choice.title,
              ingredients: choice.ing,
              image: choice.img,
              time: maxTime,
            }
          : {
              title: `Optimized ${energy} ${query || 'Bowl'}`,
              ingredients: [
                'Primary Protein',
                'Fresh Green Base',
                'Grains/Carbs',
                'Diva Signature Sauce',
                'Garnish',
              ],
              image:
                'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
              time: maxTime,
            };
      }

      // 3. AGENT CHORE REASONING
      const chores =
        energy === 'Low'
          ? [
              `⚠️ CALENDAR ALERT: Prep ${finalMeal.title} before the 11:30 AM Strategy Call.`,
              '💡 ENERGY SAVE: Agent recommends using pre-washed greens to save 12 mins.',
              '🚫 SYSTEM NOTICE: Auto-declining low-priority tasks until the 5:00 PM Unwind.',
            ]
          : [
              `✅ FLOW STATE: Start ${finalMeal.title} after your 2:00 PM Deep Work block.`,
              "📝 AGENT TASK: Use the cooking time to clear 5 quick 'Low-Context' emails.",
              "🧹 OPTIMIZATION: Double the batch for tomorrow’s lunch to preserve tomorrow's bandwidth.",
            ];

      setResults({
        mealPlan: finalMeal.title,
        ingredients: finalMeal.ingredients,
        tasks: chores,
        timeSaved: `ROI: Saved ${
          energy === 'Low' ? '45' : '20'
        } mins of Decision Fatigue.`,
        image: finalMeal.image,
      });
    } catch (err) {
      console.error('Agent Sync Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900 selection:bg-purple-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP STATUS BAR */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Agent Status: Live & Orchestrating
            </span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <ShieldCheck className="w-4 h-4 text-purple-400 hidden md:block" />
            <input
              type="password"
              placeholder="Spoonacular API Key..."
              className="bg-slate-800 border-none rounded-xl px-4 py-2 text-xs w-full md:w-64 focus:ring-2 focus:ring-pink-500 outline-none transition-all placeholder:text-slate-500"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tighter italic">
                <Zap className="text-yellow-400 fill-yellow-400 w-6 h-6" /> VIBE
                CHECK
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">
                    Current Bandwidth
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Low', 'Medium', 'High'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setEnergy(level)}
                        className={`py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all transform active:scale-95 ${
                          energy === level
                            ? 'bg-purple-600 text-white shadow-xl scale-105'
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
                    Food Craving
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Pizza, Pasta, Sushi..."
                      className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-purple-500 outline-none font-bold text-sm transition-all pr-12"
                    />
                    <Utensils className="absolute right-5 top-5 w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 group overflow-hidden relative"
                >
                  <span className="relative z-10">
                    {loading ? 'Calibrating...' : 'Sync My Life'}
                  </span>
                  {!loading && (
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform relative z-10" />
                  )}
                  {loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calendar className="w-20 h-20" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" /> Professional
                Calendar
              </h3>
              <div className="space-y-3">
                {calendar.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:border-purple-200 transition-colors"
                  >
                    <span className="text-[10px] font-black text-purple-600 w-16">
                      {item.time}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700">
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="md:col-span-8">
            {results ? (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white relative">
                  <div className="relative h-[22rem]">
                    <img
                      src={results.image}
                      alt="Meal"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="bg-white/10 backdrop-blur-xl text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">
                          {energy} Bandwidth Optimized
                        </span>
                      </div>
                      <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.85] drop-shadow-2xl">
                        {results.mealPlan}
                      </h2>
                    </div>
                  </div>

                  <div className="p-14 grid md:grid-cols-2 gap-16">
                    <div>
                      <h3 className="text-[10px] font-black uppercase text-slate-400 mb-8 tracking-[0.3em] flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-emerald-500" />{' '}
                        Curated Ingredients
                      </h3>
                      <div className="space-y-4">
                        {results.ingredients.map((ing, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 text-xs font-bold text-slate-600 animate-in slide-in-from-left duration-500"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            </div>
                            {ing}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div>
                        <h3 className="text-[10px] font-black uppercase text-slate-400 mb-8 tracking-[0.3em] flex items-center gap-2">
                          <ListTodo className="w-4 h-4 text-purple-500" /> Agent
                          Directives
                        </h3>
                        <div className="space-y-4">
                          {results.tasks.map((task, i) => (
                            <div
                              key={i}
                              className="p-6 bg-purple-50/40 rounded-[2rem] border-l-4 border-purple-500 text-[11px] font-black text-purple-900 shadow-sm leading-relaxed animate-in slide-in-from-right duration-500"
                            >
                              {task}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-12 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                        <Clock className="w-8 h-8 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">
                          Performance ROI
                        </p>
                        <p className="text-xl font-bold text-white tracking-tight italic">
                          {results.timeSaved}
                        </p>
                      </div>
                    </div>
                    <Sparkles className="w-12 h-12 text-white/5" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[700px] flex flex-col items-center justify-center bg-white rounded-[3.5rem] border-4 border-dashed border-slate-100 p-20 text-center shadow-inner">
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-10 group hover:scale-110 transition-transform cursor-pointer">
                  <ChefHat className="w-12 h-12 text-slate-200 group-hover:text-purple-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-slate-300 uppercase tracking-[0.4em] mb-4">
                  Agent Standby
                </h3>
                <p className="text-slate-400 text-sm font-medium max-w-sm leading-relaxed mx-auto italic">
                  Connect your Spoonacular credentials and input your bandwidth
                  status to orchestrate your evening.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
