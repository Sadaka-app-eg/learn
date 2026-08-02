/**
 * تطبيق لسان (Lisan.ai) - الجزء الثامن
 * الميزة 19: وضع السفر بدون إنترنت (Offline Travel Survival Kit)
 * الميزة 20: مجتمع التفاعل والتعلم الجماعي (Interactive Community Hub)
 * الميزة 21: لوحة الإحصائيات الشاملة والنمو اللغوي (Advanced Analytics & Skills Radar)
 * الميزة 22: مركز تنزيل الدروس أوفلاين (Offline Content Downloader Manager)
 */

/* ==========================================================================
   19. وضع السفر بدون إنترنت (Offline Travel Survival Kit)
   ========================================================================== */
class TravelOfflineModule {
  constructor() {
    this.activeCategory = 'airport';
    this.categoriesDb = {
      airport: { name: 'المطار والجوازات', icon: 'plane' },
      hotel: { name: 'الفندق والإقامة', icon: 'building' },
      restaurant: { name: 'المطعم وطلب الطعام', icon: 'utensils' },
      taxi: { name: 'المواصلات والتاكسي', icon: 'car' },
      emergency: { name: 'الطوارئ والمستشفى', icon: 'shield-alert' }
    };

    this.travelSentences = [
      {
        cat: 'airport',
        en: "Where is the baggage claim area for international arrivals?",
        ar: "أين منطقة استلام الحقائب للرحلات القادمة الدولية؟",
        phonetic: "وير إز ذي باجيدج كليم إيريا فور إنترناشيونال أرايفالز؟"
      },
      {
        cat: 'hotel',
        en: "I have a reservation under the name of Ahmed. Can I check in?",
        ar: "لدي حجز باسم أحمد. هل يمكنني تسجيل الدخول؟",
        phonetic: "آي هاف أ ريزيرفيشن أندر ذي نيم أوف أحمد.."
      },
      {
        cat: 'restaurant',
        en: "Could we have the check, please? And do you accept credit cards?",
        ar: "هل يمكننا الحصول على الفاتورة من فضلك؟ وهل تقبلون البطاقات الائتمانية؟",
        phonetic: "كود وي هاف ذي تشيك بليز؟"
      },
      {
        cat: 'emergency',
        en: "I need urgent medical attention. Where is the nearest pharmacy?",
        ar: "أحتاج إلى رعاية طبية عاجلة. أين أقرب صيدلية؟",
        phonetic: "آي نيد أرجنت ميديكال أتنشن.."
      }
    ];
  }

  renderTravelView() {
    const sentences = this.travelSentences.filter(s => s.cat === this.activeCategory);

    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
              <i data-lucide="plane" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">وضع السفر والطوارئ (أوفلاين)</h3>
              <p class="text-xs text-slate-400">جمل جاهزة للاستخدام الفوري بدون الحاجة لاتصال بالإنترنت</p>
            </div>
          </div>
          <span class="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 space-x-reverse">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>وضع الأوفلاين مفعل 📶</span>
          </span>
        </div>

        <!-- Categories Selector Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
          ${Object.keys(this.categoriesDb).map(catKey => {
            const cat = this.categoriesDb[catKey];
            const isActive = catKey === this.activeCategory;
            return `
              <button onclick="TravelModule.setCategory('${catKey}')" class="p-3 rounded-2xl border text-center space-y-2 transition ${isActive ? 'bg-accent-amber text-slate-950 font-black border-accent-amber shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}">
                <i data-lucide="${cat.icon}" class="w-5 h-5 mx-auto"></i>
                <span class="text-[11px] block truncate">${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Offline Cards List -->
        <div class="space-y-4">
          ${sentences.map(s => `
            <div class="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <h4 class="text-lg font-bold text-white font-en leading-relaxed font-en">${s.en}</h4>
                  <p class="text-xs text-slate-400 font-en font-medium">${s.phonetic}</p>
                </div>
                <button onclick="window.LisanTTS.speak('${s.en}')" class="p-3 bg-slate-800 hover:bg-accent-amber hover:text-slate-950 text-slate-300 rounded-xl transition shrink-0">
                  <i data-lucide="volume-2" class="w-5 h-5"></i>
                </button>
              </div>
              <p class="text-sm font-semibold text-brand-500 border-t border-slate-800/80 pt-2">${s.ar}</p>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  setCategory(catKey) {
    this.activeCategory = catKey;
    const view = document.getElementById('view-travel');
    if (view) view.innerHTML = this.renderTravelView();
    if (window.lucide) lucide.createIcons();
  }
}
window.TravelModule = new TravelOfflineModule();


/* ==========================================================================
   20. مجتمع التفاعل والتعلم الجماعي (Interactive Community Hub)
   ========================================================================== */
class CommunityHubModule {
  constructor() {
    this.posts = [
      {
        id: 'post_1',
        author: 'مريم محمود',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
        time: 'منذ ساعتين',
        question: "ما الفرق الأنسب بين استخدام 'I will' و 'I am going to' عند التخطيط للعطلة الصيفية؟",
        corrections: [
          { author: 'أحمد علي', text: "'Going to' للخطة المحددة المسبقة، أما 'Will' للقرارات السريعة الآن!", likes: 12 }
        ]
      }
    ];
  }

  renderCommunityView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
              <i data-lucide="users" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">مجتمع متعلمي لسان</h3>
              <p class="text-xs text-slate-400">اطرح أسئلتك، أجب على زملائك، وصحح نصوص الآخرين لكسب النقاط</p>
            </div>
          </div>
          <button onclick="CommunityModule.openNewPostModal()" class="px-4 py-2 bg-accent-purple hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-accent-purple/20">
            + نشر سؤال جديد
          </button>
        </div>

        <!-- Feed List -->
        <div class="space-y-4">
          ${this.posts.map(p => `
            <div class="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
              <div class="flex items-center space-x-3 space-x-reverse">
                <img src="${p.avatar}" class="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-700">
                <div>
                  <h4 class="text-sm font-bold text-white">${p.author}</h4>
                  <span class="text-[10px] text-slate-500">${p.time}</span>
                </div>
              </div>

              <p class="text-xs text-slate-200 leading-relaxed font-semibold">${p.question}</p>

              <!-- Peer Corrections Section -->
              <div class="space-y-2 border-t border-slate-800/80 pt-3">
                <span class="text-[11px] font-bold text-brand-500">إجابات وتصحيحات الزملاء:</span>
                ${p.corrections.map(c => `
                  <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span class="font-bold text-white">${c.author}:</span>
                      <span class="text-slate-300 mr-1">${c.text}</span>
                    </div>
                    <span class="text-[10px] text-accent-amber font-bold font-en">❤️ ${c.likes}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Action Bar -->
              <div class="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                <input type="text" placeholder="اكتب تصحيحك أو إجابتك هنا..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 ml-2 focus:outline-none focus:border-accent-purple">
                <button class="px-3 py-1.5 bg-slate-800 text-slate-200 hover:bg-brand-500 hover:text-white rounded-xl font-bold transition">إرسال الإجابة</button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  openNewPostModal() {
    alert("سيتم فتح نافذة كتابة سؤال جديد للمجتمع!");
  }
}
window.CommunityModule = new CommunityHubModule();


/* ==========================================================================
   21. لوحة الإحصائيات الشاملة والرسم البياني (Advanced Analytics Engine)
   ========================================================================== */
class AnalyticsDashboardModule {
  constructor() {
    this.skills = [
      { name: 'الاستماع (Listening)', score: 85, color: 'bg-accent-purple' },
      { name: 'التحدث (Speaking)', score: 78, color: 'bg-accent-rose' },
      { name: 'القراءة (Reading)', score: 92, color: 'bg-brand-500' },
      { name: 'الكتابة (Writing)', score: 70, color: 'bg-accent-amber' },
      { name: 'القواعد (Grammar)', score: 88, color: 'bg-blue-500' }
    ];
  }

  renderAnalyticsView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
              <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">إحصائيات التطور والنمو اللغوي</h3>
              <p class="text-xs text-slate-400">تحليل المهارات الخمس ومعدل الساعات المنقضية</p>
            </div>
          </div>
          <span class="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full font-en">Lisan Analytics Engine</span>
        </div>

        <!-- Metric Top Overview Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">إجمالي ساعات التعلم</span>
            <span class="text-2xl font-black text-brand-500 font-en">18.5 <span class="text-xs text-slate-400 font-sans">ساعة</span></span>
          </div>
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">المفردات المتقنة</span>
            <span class="text-2xl font-black text-accent-purple font-en">428</span>
          </div>
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">محادثات الذكاء الاصطناعي</span>
            <span class="text-2xl font-black text-accent-amber font-en">14</span>
          </div>
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">نسبة طلاقة النطق</span>
            <span class="text-2xl font-black text-accent-rose font-en">84%</span>
          </div>
        </div>

        <!-- Detailed Skill Progress Bars (Radar Simulation) -->
        <div class="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
          <h4 class="text-xs font-bold text-slate-300">مستوى إتقان المهارات الأكاديمية والتطبيقية:</h4>

          <div class="space-y-3">
            ${this.skills.map(s => `
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-200">${s.name}</span>
                  <span class="font-bold text-white font-en">${s.score}%</span>
                </div>
                <div class="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div class="${s.color} h-full rounded-full transition-all duration-500" style="width: ${s.score}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }
}
window.Analytics = new AnalyticsDashboardModule();


/* ==========================================================================
   22. مركز تنزيل الدروس أوفلاين (Offline Content Downloader Manager)
   ========================================================================== */
class OfflineDownloaderModule {
  constructor() {
    this.downloads = [
      { id: 'd1', title: 'حزمة جمل السفر والمطار (صوت + نص)', size: '14.2 MB', downloaded: true },
      { id: 'd2', title: 'مجموعة المفردات الأساسية (B2 - 200 كلمة)', size: '8.5 MB', downloaded: true },
      { id: 'd3', title: 'بودكاست محادثات العمل والشركات (فيديو وصوت)', size: '45.0 MB', downloaded: false, progress: 0 }
    ];
  }

  renderDownloaderView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-rose/10 text-accent-rose flex items-center justify-center font-bold">
              <i data-lucide="download-cloud" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">إدارة المحتوى والمجموعات (Offline Download)</h3>
              <p class="text-xs text-slate-400">حمل الكلمات والملفات الصوتية والفيديو للتعلم بدون إنترنت في أي مكان</p>
            </div>
          </div>
          <span class="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full font-en">المساحة المستغلة: 22.7 MB</span>
        </div>

        <!-- Downloads Grid -->
        <div class="space-y-3">
          ${this.downloads.map(d => `
            <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
              
              <div class="flex items-center space-x-3 space-x-reverse">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold ${d.downloaded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}">
                  <i data-lucide="${d.downloaded ? 'check-circle' : 'download'}" class="w-5 h-5"></i>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">${d.title}</h4>
                  <span class="text-[10px] text-slate-500 font-en">${d.size}</span>
                </div>
              </div>

              ${d.downloaded ? `
                <button onclick="OfflineDownloader.deletePack('${d.id}')" class="px-4 py-2 bg-slate-800 hover:bg-accent-rose/20 text-slate-400 hover:text-accent-rose rounded-xl text-xs font-bold transition">
                  حذف من الذاكرة 🗑️
                </button>
              ` : `
                <button onclick="OfflineDownloader.startDownload('${d.id}')" id="btn-dl-${d.id}" class="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20">
                  تنزيل الآن 📥
                </button>
              `}

            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  startDownload(id) {
    const btn = document.getElementById(`btn-dl-${id}`);
    if (btn) {
      btn.innerText = "جاري التنزيل 45%...";
      btn.classList.add('animate-pulse', 'bg-accent-amber');
      setTimeout(() => {
        const item = this.downloads.find(x => x.id === id);
        if (item) item.downloaded = true;
        const view = document.getElementById('view-downloader');
        if (view) view.innerHTML = this.renderDownloaderView();
        if (window.lucide) lucide.createIcons();
      }, 2500);
    }
  }

  deletePack(id) {
    const item = this.downloads.find(x => x.id === id);
    if (item) item.downloaded = false;
    const view = document.getElementById('view-downloader');
    if (view) view.innerHTML = this.renderDownloaderView();
    if (window.lucide) lucide.createIcons();
  }
}
window.OfflineDownloader = new OfflineDownloaderModule();
