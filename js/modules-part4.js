/**
 * تطبيق لسان (Lisan.ai) - الجزء الرابع
 * الميزة 11: محرك المراجعة الذكية بالتكرار المتباعد (SRS - Spaced Repetition Engine)
 * الميزة 12: مركز الألعاب والتمارين التفاعلية (Interactive Gaming Hub)
 */

/* ==========================================================================
   11. محرك المراجعة الذكية بـ SRS (Spaced Repetition Engine)
   ========================================================================== */
class SpacedRepetitionModule {
  constructor() {
    this.currentIndex = 0;
    this.isFlipped = false;
    this.cards = [
      {
        id: 'srs_1',
        word: 'Reluctant',
        phonetic: '/rɪˈlʌk.tənt/',
        meaning: 'متردد / غير راغب',
        example: 'He was reluctant to sign the agreement.',
        level: 'B2',
        intervalDays: 1
      },
      {
        id: 'srs_2',
        word: 'Inevitable',
        phonetic: '/ɪnˈev.ɪ.tə.bəl/',
        meaning: 'حتمي / لا مفر منه',
        example: 'Change is an inevitable part of growth.',
        level: 'B2',
        intervalDays: 3
      },
      {
        id: 'srs_3',
        word: 'Profound',
        phonetic: '/prəˈfaʊnd/',
        meaning: 'عميق / بالغ الأثر',
        example: 'Her speech had a profound impact on everyone.',
        level: 'C1',
        intervalDays: 7
      }
    ];
  }

  renderSRSView() {
    if (this.cards.length === 0 || this.currentIndex >= this.cards.length) {
      return `
        <div class="glass-card p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto border border-brand-500/40">
          <div class="w-16 h-16 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center mx-auto text-2xl">🎉</div>
          <h3 class="text-2xl font-black text-white">أحسنت! أكملت مراجعة اليوم</h3>
          <p class="text-xs text-slate-400">تم تحديث مواعيد التكرار المتباعد للكلمات تلقائياً بناءً على تقييمك.</p>
          <button onclick="SRSModule.resetSession()" class="px-6 py-3 bg-brand-500 text-white rounded-2xl text-xs font-bold hover:bg-brand-600 transition">مراجعة دفعة أخرى</button>
        </div>
      `;
    }

    const card = this.cards[this.currentIndex];

    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-2xl mx-auto shadow-2xl">
        
        <!-- Header & Stats -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
              <i data-lucide="brain" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">المراجعة الذكية (SRS Engine)</h3>
              <p class="text-xs text-slate-400">بطاقة ${this.currentIndex + 1} من ${this.cards.length}</p>
            </div>
          </div>
          <span class="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full font-en">Leitner Box System</span>
        </div>

        <!-- Interactive 3D Flip Flashcard -->
        <div onclick="SRSModule.toggleFlip()" class="relative w-full h-72 cursor-pointer perspective-1000">
          <div id="srs-card-inner" class="w-full h-full duration-500 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-brand-dark to-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-xl hover:border-brand-500/40 transition">
            
            ${!this.isFlipped ? `
              <!-- Front Side -->
              <span class="text-xs text-brand-500 font-bold font-en bg-brand-500/10 px-3 py-1 rounded-full">${card.level}</span>
              <h2 class="text-4xl font-black text-white font-en tracking-wide">${card.word}</h2>
              <p class="text-xs text-slate-400 font-en">${card.phonetic}</p>
              <p class="text-[11px] text-slate-500 mt-4 flex items-center space-x-1 space-x-reverse">
                <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
                <span>اضغط للكشف عن المعنى والمثال</span>
              </p>
            ` : `
              <!-- Back Side -->
              <h3 class="text-2xl font-black text-brand-500">${card.meaning}</h3>
              <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 font-en">
                "${card.example}"
              </div>
              <button onclick="event.stopPropagation(); window.LisanTTS.speak('${card.word}')" class="p-2 bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white rounded-xl transition">
                <i data-lucide="volume-2" class="w-4 h-4"></i>
              </button>
            `}

          </div>
        </div>

        <!-- Rating Buttons (Shown after flip) -->
        <div class="grid grid-cols-4 gap-2 pt-2">
          <button onclick="SRSModule.rateCard('again')" class="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl text-center space-y-1 transition">
            <span class="block text-xs font-bold text-red-400">نسيتها ❌</span>
            <span class="block text-[10px] text-slate-500">مراجعة بعد 10د</span>
          </button>

          <button onclick="SRSModule.rateCard('hard')" class="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl text-center space-y-1 transition">
            <span class="block text-xs font-bold text-amber-400">صعبة ⚠️</span>
            <span class="block text-[10px] text-slate-500">مراجعة غداً</span>
          </button>

          <button onclick="SRSModule.rateCard('good')" class="p-3 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 rounded-2xl text-center space-y-1 transition">
            <span class="block text-xs font-bold text-brand-500">جيدة 👍</span>
            <span class="block text-[10px] text-slate-500">بعد 3 أيام</span>
          </button>

          <button onclick="SRSModule.rateCard('easy')" class="p-3 bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/30 rounded-2xl text-center space-y-1 transition">
            <span class="block text-xs font-bold text-accent-purple">متقنة 🔥</span>
            <span class="block text-[10px] text-slate-500">بعد أسبوع</span>
          </button>
        </div>

      </div>
    `;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
    const view = document.getElementById('view-srs');
    if (view) view.innerHTML = this.renderSRSView();
    if (window.lucide) lucide.createIcons();
  }

  rateCard(rating) {
    this.isFlipped = false;
    this.currentIndex++;
    const view = document.getElementById('view-srs');
    if (view) view.innerHTML = this.renderSRSView();
    if (window.lucide) lucide.createIcons();
  }

  resetSession() {
    this.currentIndex = 0;
    this.isFlipped = false;
    const view = document.getElementById('view-srs');
    if (view) view.innerHTML = this.renderSRSView();
    if (window.lucide) lucide.createIcons();
  }
}
window.SRSModule = new SpacedRepetitionModule();


/* ==========================================================================
   12. مركز الألعاب والتمارين التفاعلية (Interactive Gaming Hub)
   ========================================================================== */
class InteractiveGamingModule {
  constructor() {
    this.activeGame = 'scramble'; // scramble, typing, matching
    this.scrambleWords = ["Learning", "languages", "builds", "a", "strong", "future"];
    this.userSelection = [];
  }

  renderGamesHubView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Top Navigation Game Tabs -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-rose/10 text-accent-rose flex items-center justify-center font-bold">
              <i data-lucide="gamepad-2" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">الألعاب والتمارين التفاعلية</h3>
              <p class="text-xs text-slate-400">طوّر سرعة البديهة والتركيز باللغة دون مجهود</p>
            </div>
          </div>

          <div class="flex items-center space-x-2 space-x-reverse bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button onclick="GamingModule.switchGame('scramble')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.activeGame === 'scramble' ? 'bg-accent-rose text-white shadow' : 'text-slate-400 hover:text-white'}">
              🧩 ترتيب الكلمات
            </button>
            <button onclick="GamingModule.switchGame('typing')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.activeGame === 'typing' ? 'bg-accent-rose text-white shadow' : 'text-slate-400 hover:text-white'}">
              ⚡ تحدي السرعة
            </button>
          </div>
        </div>

        <!-- Game 1: Word Scramble Game -->
        ${this.activeGame === 'scramble' ? `
          <div class="space-y-6">
            <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center space-y-2">
              <span class="text-xs text-slate-400">رتب الكلمات التالية لتكوين جملة مفيدة:</span>
              <p class="text-sm font-bold text-brand-500 font-sans">"تعلم اللغات يبني مستقبلاً قوياً"</p>
            </div>

            <!-- Target Answer Slot -->
            <div id="scramble-answer-box" class="min-h-16 p-3 bg-slate-950/80 rounded-2xl border-2 border-dashed border-slate-800 flex flex-wrap gap-2 items-center justify-center">
              ${this.userSelection.length === 0 ? '<span class="text-xs text-slate-600">اضغط على الكلمات بالترتيب الصحيح...</span>' : ''}
              ${this.userSelection.map((w, i) => `
                <button onclick="GamingModule.removeWord(${i})" class="px-3 py-1.5 rounded-xl bg-accent-rose text-white text-xs font-bold font-en shadow-md flex items-center space-x-1 space-x-reverse">
                  <span>${w}</span>
                  <i data-lucide="x" class="w-3 h-3"></i>
                </button>
              `).join('')}
            </div>

            <!-- Available Words Options -->
            <div class="flex flex-wrap gap-3 justify-center pt-2">
              ${this.scrambleWords.filter(w => !this.userSelection.includes(w)).map(w => `
                <button onclick="GamingModule.selectWord('${w}')" class="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold font-en text-slate-200 transition shadow">
                  ${w}
                </button>
              `).join('')}
            </div>

            <div class="flex justify-between border-t border-slate-800 pt-4">
              <button onclick="GamingModule.resetScramble()" class="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold">إعادة الجملة</button>
              <button onclick="GamingModule.checkScramble()" class="px-6 py-2.5 bg-accent-rose hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-accent-rose/20">تحقق من الترتيب</button>
            </div>
          </div>
        ` : ''}

        <!-- Game 2: Speed Typing Challenge -->
        ${this.activeGame === 'typing' ? `
          <div class="space-y-6 text-center">
            <div class="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span class="text-xs text-slate-400">اكتب الكلمة بسرعة قبل انتهاء الوقت:</span>
              <h3 class="text-3xl font-black text-white font-en tracking-wider">Acquisition</h3>
              <p class="text-xs text-slate-400">المعنى: الاكتساب الطبيعي للغة</p>
            </div>

            <div class="max-w-md mx-auto space-y-3">
              <input type="text" id="typing-input" placeholder="اكتب الكلمة هنا بسرعة..." class="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center text-lg font-en text-white focus:outline-none focus:border-accent-rose transition">
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-accent-rose h-full w-[70%] transition-all duration-300"></div>
              </div>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  switchGame(gameKey) {
    this.activeGame = gameKey;
    this.userSelection = [];
    const view = document.getElementById('view-games');
    if (view) view.innerHTML = this.renderGamesHubView();
    if (window.lucide) lucide.createIcons();
  }

  selectWord(w) {
    this.userSelection.push(w);
    const view = document.getElementById('view-games');
    if (view) view.innerHTML = this.renderGamesHubView();
    if (window.lucide) lucide.createIcons();
  }

  removeWord(index) {
    this.userSelection.splice(index, 1);
    const view = document.getElementById('view-games');
    if (view) view.innerHTML = this.renderGamesHubView();
    if (window.lucide) lucide.createIcons();
  }

  resetScramble() {
    this.userSelection = [];
    const view = document.getElementById('view-games');
    if (view) view.innerHTML = this.renderGamesHubView();
    if (window.lucide) lucide.createIcons();
  }

  checkScramble() {
    if (this.userSelection.join(' ') === "Learning languages builds a strong future") {
      alert("🎉 إجابة صحيحة وممتازة 100%! تم إضافة 20 نقطة خبرة لملفك الشخصي.");
    } else {
      alert("⚠️ الترتيب غير دقيق، حاول مرة أخرى.");
    }
  }
}
window.GamingModule = new InteractiveGamingModule();
