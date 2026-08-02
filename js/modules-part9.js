/**
 * تطبيق لسان (Lisan.ai) - الجزء التاسع والختامي
 * الميزة 23: لوحة تحكم المشرف والمدرب (Admin Control Center)
 * الميزة 24: ميزات التنافس الاستراتيجي (Ultimate Immersion & AR Features)
 */

/* ==========================================================================
   23. لوحة تحكم المشرف والمدرب (Admin Control Center)
   ========================================================================== */
class AdminControlModule {
  constructor() {
    this.activeTab = 'content'; // 'content', 'users', 'notifications'
    this.stats = { totalUsers: 12450, activeToday: 3120, totalLessons: 480 };
  }

  renderAdminView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-5xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">لوحة تحكم المشرف والمدرب (Admin Panel)</h3>
              <p class="text-xs text-slate-400">إدارة المناهج، رفع الدروس والصوتيات، ومتابعة النشاط</p>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="flex items-center space-x-2 space-x-reverse bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button onclick="AdminModule.switchTab('content')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.activeTab === 'content' ? 'bg-accent-purple text-white shadow' : 'text-slate-400 hover:text-white'}">
              📚 إضافة وتعديل المحتوى
            </button>
            <button onclick="AdminModule.switchTab('users')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.activeTab === 'users' ? 'bg-accent-purple text-white shadow' : 'text-slate-400 hover:text-white'}">
              👥 متابعة المتعلمين
            </button>
            <button onclick="AdminModule.switchTab('notifications')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${this.activeTab === 'notifications' ? 'bg-accent-purple text-white shadow' : 'text-slate-400 hover:text-white'}">
              🔔 إرسال إشعارات
            </button>
          </div>
        </div>

        <!-- Quick Top Metrics Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">إجمالي المستخدمين المسجلين</span>
            <span class="text-2xl font-black text-brand-500 font-en">${this.stats.totalUsers.toLocaleString()}</span>
          </div>
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">المستخدمين النشطين اليوم</span>
            <span class="text-2xl font-black text-accent-purple font-en">${this.stats.activeToday.toLocaleString()}</span>
          </div>
          <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center">
            <span class="text-[10px] text-slate-400 block mb-1">الدروس والسيناريوهات المتاحة</span>
            <span class="text-2xl font-black text-accent-amber font-en">${this.stats.totalLessons}</span>
          </div>
        </div>

        <!-- Tab 1: Content Creator Form -->
        ${this.activeTab === 'content' ? `
          <div class="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
            <h4 class="text-xs font-bold text-white flex items-center space-x-2 space-x-reverse">
              <i data-lucide="plus-circle" class="w-4 h-4 text-brand-500"></i>
              <span>إضافة درس جديد أو مفردة جديدة لقواعد البيانات:</span>
            </h4>

            <form onsubmit="AdminModule.handleContentSubmit(event)" class="space-y-3 text-xs">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-400 mb-1">الكلمة / النص بالإنجليزية:</label>
                  <input type="text" placeholder="مثال: Perceptive" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-en focus:outline-none focus:border-brand-500">
                </div>
                <div>
                  <label class="block text-slate-400 mb-1">الترجمة والمعنى بالعربية:</label>
                  <input type="text" placeholder="مثال: دقيق الملاحظة / سريع الفهم" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-400 mb-1">المستوى المستهدف:</label>
                  <select class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-en focus:outline-none">
                    <option value="A1">A1 - مبتدئ</option>
                    <option value="B1">B1 - متوسط</option>
                    <option value="B2" selected>B2 - فوق المتوسط</option>
                    <option value="C1">C1 - متقدم</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-400 mb-1">رفع الملف الصوتي للنطق (MP3):</label>
                  <input type="file" accept="audio/*" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-400">
                </div>
              </div>

              <button type="submit" class="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition shadow-lg shadow-brand-500/20">
                حفظ ونشر الدرس مباشرة للتطبيق 🚀
              </button>
            </form>
          </div>
        ` : ''}

        <!-- Tab 3: Push Notifications -->
        ${this.activeTab === 'notifications' ? `
          <div class="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
            <h4 class="text-xs font-bold text-white">إرسال إشعار لحظي للمتعلمين (Broadcast Notification):</h4>
            <div class="space-y-3 text-xs">
              <input type="text" id="admin-notif-title" placeholder="عنوان الإشعار (مثال: حان وقت تحدي اليوم 🔥)" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none">
              <textarea id="admin-notif-body" rows="3" placeholder="محتوى الإشعار..." class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none resize-none"></textarea>
              <button onclick="AdminModule.sendBroadcast()" class="px-6 py-2.5 bg-accent-purple hover:bg-indigo-600 text-white font-bold rounded-xl transition">
                إرسال لجميع المستخدمين (Push Broadcast)
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  switchTab(tabKey) {
    this.activeTab = tabKey;
    const view = document.getElementById('view-admin');
    if (view) view.innerHTML = this.renderAdminView();
    if (window.lucide) lucide.createIcons();
  }

  handleContentSubmit(e) {
    e.preventDefault();
    alert("✅ تم إضافة الدرس بنجاح وقواعد البيانات محدثة الآن!");
  }

  sendBroadcast() {
    alert("📢 تم إرسال الإشعار اللحظي لجميع المتعلمين بنجاح!");
  }
}
window.AdminModule = new AdminControlModule();


/* ==========================================================================
   24. ميزات التنافس الاستراتيجي المتقدمة (Ultimate Immersion & Unique Features)
   ========================================================================== */
class UltimateImmersionModule {
  constructor() {
    this.immersionLevel = 50; // percentage of UI converted to target language
    this.storyStep = 0;
    this.interactiveStory = [
      {
        context: "You just landed at John F. Kennedy Airport in New York. The immigration officer looks at your passport and asks:",
        officerLine: "'What is the main purpose of your visit to the United States?'",
        options: [
          { text: "I am here for a 2-week business conference and sightseeing.", nextStep: 1, correct: true },
          { text: "I want stay working here forever.", nextStep: 2, correct: false }
        ]
      },
      {
        context: "The officer nods approvingly and stamps your passport. 'Welcome to New York! Have a great stay.'",
        officerLine: "You head to the baggage claim area seamlessly.",
        options: [
          { text: "Continue to hotel taxi stand", nextStep: 0, correct: true }
        ]
      }
    ];
  }

  renderImmersionView() {
    const story = this.interactiveStory[this.storyStep];

    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">الميزات الفريدة ووضع الغمر الشامل (Immersion Features)</h3>
              <p class="text-xs text-slate-400">أدوات استراتيجية تجعلك تعيش اللغة كأهلها دون تشتيت</p>
            </div>
          </div>
          <span class="text-xs font-bold text-accent-amber bg-accent-amber/10 border border-accent-amber/20 px-3 py-1.5 rounded-full">
            Immersion Mode: ${this.immersionLevel}% 🌊
          </span>
        </div>

        <!-- Immersion Mode Slider Controller -->
        <div class="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-white">🔥 "وضع الغمر": يحول واجهة التطبيق تدريجياً للغة الإنجليزية لتعتاد عليها</span>
            <span class="font-en text-accent-amber font-bold">${this.immersionLevel}% EN</span>
          </div>
          <input type="range" min="0" max="100" value="${this.immersionLevel}" oninput="ImmersionModule.updateImmersion(this.value)" class="w-full accent-accent-amber cursor-pointer">
        </div>

        <!-- Sub-Feature 1: Interactive Branching Story (القصص التفاعلية) -->
        <div class="p-6 bg-slate-950/80 rounded-2xl border border-brand-500/30 space-y-4">
          <div class="flex items-center space-x-2 space-x-reverse text-brand-500">
            <i data-lucide="book-open" class="w-5 h-5"></i>
            <h4 class="text-sm font-bold">القصص التفاعلية متعددة الخيارات (Interactive Branching Story):</h4>
          </div>

          <div class="space-y-3 font-en text-sm">
            <p class="text-slate-300 leading-relaxed">${story.context}</p>
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800 text-brand-500 font-bold">
              ${story.officerLine}
            </div>

            <div class="space-y-2 pt-2">
              <span class="text-xs text-slate-400 font-sans block mb-1">اختر ردك المناسب لإكمال أحداث القصة:</span>
              ${story.options.map(opt => `
                <button onclick="ImmersionModule.advanceStory(${opt.nextStep})" class="w-full text-right p-3.5 rounded-xl bg-slate-900 hover:bg-brand-500/20 hover:border-brand-500/50 border border-slate-800 text-slate-100 text-xs font-semibold transition">
                  "${opt.text}"
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Sub-Feature 2: AR Camera Translation Simulator (ترجمة الكاميرا والشرح) -->
        <div class="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div class="space-y-1">
            <h4 class="text-sm font-bold text-white flex items-center space-x-2 space-x-reverse">
              <i data-lucide="camera" class="w-4 h-4 text-accent-purple"></i>
              <span>الترجمة عبر الكاميرا مع شرح الكلمات (Camera Translator)</span>
            </h4>
            <p class="text-xs text-slate-400">وجه الكاميرا على أي لافتة أو كتاب وسيتم شرح الكلمات وسياقها ببراعة.</p>
          </div>

          <button onclick="alert('جاري تشغيل كاميرا الجهاز لمسح النصوص وحفظها...')" class="px-5 py-2.5 bg-accent-purple hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition shadow-lg shrink-0">
            فتح الكاميرا 📸
          </button>
        </div>

      </div>
    `;
  }

  updateImmersion(val) {
    this.immersionLevel = val;
    const view = document.getElementById('view-immersion');
    if (view) view.innerHTML = this.renderImmersionView();
    if (window.lucide) lucide.createIcons();
  }

  advanceStory(nextStep) {
    this.storyStep = nextStep;
    const view = document.getElementById('view-immersion');
    if (view) view.innerHTML = this.renderImmersionView();
    if (window.lucide) lucide.createIcons();
  }
}
window.ImmersionModule = new UltimateImmersionModule();
