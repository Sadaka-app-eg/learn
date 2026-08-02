/**
 * تطبيق لسان (Lisan.ai) - الجزء الخامس
 * الميزة 13: لوائح الترتيب والتحديات الجماعية (Leaderboards & Competitions Engine)
 * الميزة 14: لوحة الإنجازات والأوسمة (Achievements & Milestones System)
 */

/* ==========================================================================
   13. لوائح الترتيب والتحديات التنافسية (Leaderboards & Competitions)
   ========================================================================== */
class LeaderboardModule {
  constructor() {
    this.currentScope = 'university'; // 'global', 'country', 'university'
    this.leaderboardsDb = {
      global: [
        { rank: 1, name: "Sophia Martinez", points: 14200, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120", country: "🇪🇸" },
        { rank: 2, name: "Alexander Wright", points: 12850, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120", country: "🇬🇧" },
        { rank: 3, name: "أحمد علي (أنت)", points: 9450, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120", country: "🇪🇬", isUser: true }
      ],
      country: [
        { rank: 1, name: "عمر الشريف", points: 11200, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120", country: "🇪🇬" },
        { rank: 2, name: "أحمد علي (أنت)", points: 9450, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120", country: "🇪🇬", isUser: true },
        { rank: 3, name: "مريم حسن", points: 8900, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120", country: "🇪🇬" }
      ],
      university: [
        { rank: 1, name: "أحمد علي (أنت)", points: 9450, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120", uni: "جامعة عين شمس", isUser: true },
        { rank: 2, name: "كريم محمود", points: 8100, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120", uni: "جامعة عين شمس" },
        { rank: 3, name: "سارة إبراهيم", points: 7650, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120", uni: "جامعة عين شمس" }
      ]
    };
  }

  renderLeaderboardView() {
    const list = this.leaderboardsDb[this.currentScope];
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header & Scope Selector -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
              <i data-lucide="trophy" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">لوحة الصدارة والتحديات</h3>
              <p class="text-xs text-slate-400">نافس أصدقاءك ومتعلمي اللغة في منطقتك وجامعتك</p>
            </div>
          </div>

          <!-- Tabs for Global / Country / Uni -->
          <div class="flex items-center space-x-2 space-x-reverse bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button onclick="Leaderboard.setScope('university')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.currentScope === 'university' ? 'bg-accent-amber text-slate-950 shadow font-black' : 'text-slate-400 hover:text-white'}">
              🏛️ جامعة عين شمس
            </button>
            <button onclick="Leaderboard.setScope('country')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.currentScope === 'country' ? 'bg-accent-amber text-slate-950 shadow font-black' : 'text-slate-400 hover:text-white'}">
              🇪🇬 مصر
            </button>
            <button onclick="Leaderboard.setScope('global')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.currentScope === 'global' ? 'bg-accent-amber text-slate-950 shadow font-black' : 'text-slate-400 hover:text-white'}">
              🌍 العالم
            </button>
          </div>
        </div>

        <!-- Weekly Challenge Active Banner -->
        <div class="p-4 bg-gradient-to-r from-accent-amber/10 via-slate-900 to-slate-900 rounded-2xl border border-accent-amber/30 flex items-center justify-between">
          <div class="flex items-center space-x-3 space-x-reverse">
            <span class="text-2xl">🔥</span>
            <div>
              <h4 class="text-xs font-bold text-white">تحدي الأسبوع: "إتقان 50 جملة سفر"</h4>
              <p class="text-[11px] text-slate-400">ينتهي التحدي بعد 3 أيام • جائزة الفائز 500 نقطة</p>
            </div>
          </div>
          <button class="px-4 py-2 bg-accent-amber text-slate-950 font-black rounded-xl text-xs hover:bg-amber-400 transition">
            الانضمام للتحدي
          </button>
        </div>

        <!-- Leaderboard List -->
        <div class="space-y-3">
          ${list.map(user => `
            <div class="p-4 rounded-2xl flex items-center justify-between transition ${user.isUser ? 'bg-brand-500/15 border-2 border-brand-500/50 shadow-lg' : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'}">
              
              <div class="flex items-center space-x-4 space-x-reverse">
                <!-- Rank Badge -->
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm font-en ${user.rank === 1 ? 'bg-amber-400 text-slate-950' : user.rank === 2 ? 'bg-slate-300 text-slate-950' : user.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'}">
                  ${user.rank}
                </div>

                <!-- User Avatar & Info -->
                <img src="${user.avatar}" alt="${user.name}" class="w-11 h-11 rounded-xl object-cover ring-2 ${user.isUser ? 'ring-brand-500' : 'ring-slate-800'}">
                
                <div>
                  <h4 class="text-sm font-bold text-white flex items-center space-x-2 space-x-reverse">
                    <span>${user.name}</span>
                    ${user.country ? `<span class="text-xs">${user.country}</span>` : ''}
                  </h4>
                  <p class="text-[11px] text-slate-400 font-en">${user.uni || 'مستوى B2 • 14 يوم متتالي'}</p>
                </div>
              </div>

              <!-- Points -->
              <div class="text-left">
                <span class="text-base font-black text-accent-amber font-en">${user.points.toLocaleString()}</span>
                <span class="text-[10px] text-slate-400 block -mt-1 font-sans">نقطة خبرة XP</span>
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  setScope(scope) {
    this.currentScope = scope;
    const view = document.getElementById('view-leaderboard');
    if (view) view.innerHTML = this.renderLeaderboardView();
    if (window.lucide) lucide.createIcons();
  }
}
window.Leaderboard = new LeaderboardModule();


/* ==========================================================================
   14. نظام الإنجازات والأوسمة التكريمية (Achievements System)
   ========================================================================== */
class AchievementsModule {
  constructor() {
    this.achievements = [
      {
        id: 'ach_1',
        title: 'الخطوة الأولى',
        desc: 'أكملت أول أسبوع من التعلم المتواصل 🔥',
        icon: 'zap',
        progress: 100,
        unlocked: true,
        date: 'منذ 5 أيام'
      },
      {
        id: 'ach_2',
        title: 'حافظة المفردات',
        desc: 'حفظ وإتقان أول 100 كلمة بنظام SRS 🧠',
        icon: 'book-open',
        progress: 100,
        unlocked: true,
        date: 'منذ يومين'
      },
      {
        id: 'ach_3',
        title: 'المتحدث الجريء',
        desc: 'أجريت أول محادثة صوتية مع الذكاء الاصطناعي 🎙️',
        icon: 'bot',
        progress: 100,
        unlocked: true,
        date: 'اليوم'
      },
      {
        id: 'ach_4',
        title: 'المستمع الاحترافي',
        desc: 'الاستماع لأكثر من 60 دقيقة من البودكاست والمحادثات 🎧',
        icon: 'headphones',
        progress: 65,
        unlocked: false
      },
      {
        id: 'ach_5',
        title: 'الكاتب البليغ',
        desc: 'كتابة أول 5 مقالات وحصولك على درجة أعلى من 80% 📝',
        icon: 'pen-tool',
        progress: 40,
        unlocked: false
      },
      {
        id: 'ach_6',
        title: 'إتقان الاختبار الشامل',
        desc: 'اجتياز اختبار المستوى بتقدير ممتاز C1 🏆',
        icon: 'award',
        progress: 20,
        unlocked: false
      }
    ];
  }

  renderAchievementsView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
              <i data-lucide="award" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">لوحة الإنجازات والأوسمة الرقمية</h3>
              <p class="text-xs text-slate-400">تابع تقدمك الحقيقي وتطور مهاراتك خطوة بخطوة</p>
            </div>
          </div>

          <span class="text-xs bg-brand-500/10 border border-brand-500/20 text-brand-500 font-bold px-3 py-1.5 rounded-full">
            تم فتح 3 من 6 أوسمة 🏅
          </span>
        </div>

        <!-- Badges Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${this.achievements.map(ach => `
            <div class="p-5 rounded-2xl border space-y-3 transition ${ach.unlocked ? 'bg-slate-900/90 border-brand-500/30' : 'bg-slate-950/40 border-slate-800/80 opacity-60'}">
              
              <div class="flex items-start space-x-3.5 space-x-reverse">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${ach.unlocked ? 'bg-gradient-to-tr from-brand-600 to-emerald-400 text-white' : 'bg-slate-800 text-slate-500'}">
                  <i data-lucide="${ach.icon}" class="w-6 h-6"></i>
                </div>

                <div class="min-w-0 flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-bold text-white">${ach.title}</h4>
                    ${ach.unlocked ? `
                      <span class="text-[10px] font-bold text-brand-500 bg-brand-500/10 px-2.5 py-0.5 rounded-full">تم الفتح ✨</span>
                    ` : `
                      <span class="text-[10px] font-bold text-slate-500 font-en">${ach.progress}%</span>
                    `}
                  </div>
                  <p class="text-xs text-slate-400 leading-relaxed">${ach.desc}</p>
                </div>
              </div>

              <!-- Progress bar for locked ones -->
              ${!ach.unlocked ? `
                <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-brand-500 h-full rounded-full" style="width: ${ach.progress}%"></div>
                </div>
              ` : `
                <p class="text-[10px] text-slate-500 border-t border-slate-800/60 pt-2 text-left font-en">Unlocked: ${ach.date}</p>
              `}

            </div>
          `).join('')}
        </div>

      </div>
    `;
  }
}
window.Achievements = new AchievementsModule();
