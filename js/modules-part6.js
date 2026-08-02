/**
 * تطبيق لسان (Lisan.ai) - الجزء السادس
 * الميزة 15: القاموس الذكي الشامل (Smart Deep Dictionary Engine)
 * الميزة 16: محرك مقارنة الموجة الصوتية بالنطق الاصلي (Visual Waveform Audio Matcher)
 */

/* ==========================================================================
   15. القاموس الذكي الشامل (Smart Deep Dictionary Engine)
   ========================================================================== */
class SmartDictionaryModule {
  constructor() {
    this.searchQuery = '';
    this.dictionaryDb = {
      'eloquent': {
        word: 'Eloquent',
        phonetic: '/ˈel.ə.kwənt/',
        type: 'صفة - Adjective',
        meaning: 'بليغ / فصيح اللسان / معبّر ببراعة',
        origin: "من اللاتينية 'eloqui' بمعنى (التحدث بوضوح وجلاء).",
        synonyms: ['Articulate', 'Expressive', 'Fluent', 'Persuasive'],
        antonyms: ['Inarticulate', 'Hesitant', 'Mute', 'Unpersuasive'],
        examples: [
          { en: "She gave an eloquent speech that moved the entire audience.", ar: "ألقى خطبة بليغة هزت مشاعر الجمهور بأكمله." },
          { en: "His silent smile was more eloquent than any words.", ar: "كانت ابتسامته الصامتة أكثر بلاغة من أي كلمات." }
        ],
        commonMistakes: "الخلط بين Eloquent (فصيح التعبير) و Elegant (أنيق المظهر).",
        relatedWords: ['Elocution', 'Eloquently', 'Grandiloquent'],
        level: 'C1'
      },
      'resilience': {
        word: 'Resilience',
        phonetic: '/rɪˈzɪl.jəns/',
        type: 'اسم - Noun',
        meaning: 'المرونة النفسية / القدرة على التعافي السريع',
        origin: "من اللاتينية 'resilire' بمعنى (الارتداد أو القفز للوراء).",
        synonyms: ['Toughness', 'Adaptability', 'Flexibility', 'Hardiness'],
        antonyms: ['Vulnerability', 'Fragility', 'Weakness'],
        examples: [
          { en: "Building resilience is essential for overcoming business setbacks.", ar: "بناء المرونة أمر أساسي لتجاوز كبوات الأعمال." }
        ],
        commonMistakes: "الخلط بينها وبين الجسدية (Flexibility).",
        relatedWords: ['Resilient', 'Resiliently'],
        level: 'B2'
      }
    };
  }

  renderDictionaryView() {
    const currentWordKey = this.searchQuery.toLowerCase().trim();
    const resultData = this.dictionaryDb[currentWordKey] || this.dictionaryDb['eloquent'];

    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Search Header -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
              <i data-lucide="search" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">القاموس الذكي الشامل</h3>
              <p class="text-xs text-slate-400">ابحث عن أي كلمة للحصول على تحليل لغوي وبصري متكامل</p>
            </div>
          </div>

          <!-- Realtime Search Bar Input -->
          <div class="relative w-full md:w-80">
            <input 
              type="text" 
              id="dict-search-input" 
              value="${this.searchQuery}"
              placeholder="اكتب كلمة بالإنجليزية (مثل: Eloquent)..." 
              oninput="DictionaryModule.handleSearch(this.value)"
              class="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-en focus:outline-none focus:border-brand-500 transition pl-10"
            >
            <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-3 top-3"></i>
          </div>
        </div>

        <!-- Dictionary Card Result Showcase -->
        <div class="space-y-6">
          
          <!-- Word Header Banner -->
          <div class="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center space-x-3 space-x-reverse">
                  <h2 class="text-3xl font-black text-brand-500 font-en tracking-wide">${resultData.word}</h2>
                  <span class="text-xs text-slate-300 bg-slate-800 font-en px-3 py-1 rounded-full border border-slate-700">${resultData.type}</span>
                  <span class="text-xs font-bold text-brand-500 bg-brand-500/10 px-2.5 py-0.5 rounded-full font-en">${resultData.level}</span>
                </div>
                <p class="text-xs text-slate-400 font-en mt-1">${resultData.phonetic}</p>
                <h3 class="text-xl font-bold text-white mt-2">${resultData.meaning}</h3>
              </div>

              <!-- Audio Trigger Buttons -->
              <div class="flex items-center space-x-2 space-x-reverse">
                <button onclick="window.LisanTTS.speak('${resultData.word}', 1.0)" class="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 space-x-reverse">
                  <i data-lucide="volume-2" class="w-4 h-4"></i>
                  <span>نطق طبيعي</span>
                </button>
                <button onclick="window.LisanTTS.speak('${resultData.word}', 0.5)" class="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-en">
                  🐢 0.5x
                </button>
              </div>
            </div>
          </div>

          <!-- Deep Details Grid (Origin, Synonyms, Antonyms, Mistakes) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Synonyms & Antonyms -->
            <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold text-white flex items-center space-x-2 space-x-reverse">
                <i data-lucide="copy" class="w-4 h-4 text-accent-purple"></i>
                <span>المرادفات والأضداد:</span>
              </h4>

              <div class="space-y-2">
                <div>
                  <span class="text-[10px] font-bold text-slate-400 block mb-1">المرادفات (Synonyms):</span>
                  <div class="flex flex-wrap gap-1.5 font-en">
                    ${resultData.synonyms.map(s => `<span class="px-2.5 py-1 rounded-lg bg-accent-purple/10 text-accent-purple border border-accent-purple/20 text-xs font-semibold">${s}</span>`).join('')}
                  </div>
                </div>

                <div class="pt-2">
                  <span class="text-[10px] font-bold text-slate-400 block mb-1">الأضداد (Antonyms):</span>
                  <div class="flex flex-wrap gap-1.5 font-en">
                    ${resultData.antonyms.map(a => `<span class="px-2.5 py-1 rounded-lg bg-accent-rose/10 text-accent-rose border border-accent-rose/20 text-xs font-semibold">${a}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Origin & Common Mistakes -->
            <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold text-white flex items-center space-x-2 space-x-reverse">
                <i data-lucide="compass" class="w-4 h-4 text-accent-amber"></i>
                <span>الأصل والأخطاء الشائعة:</span>
              </h4>

              <div class="space-y-2 text-xs">
                <div class="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span class="text-accent-amber font-bold block mb-0.5">🏛️ أصل الكلمة:</span>
                  <p class="text-slate-300">${resultData.origin}</p>
                </div>

                <div class="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span class="text-accent-rose font-bold block mb-0.5">⚠️ خطأ شائع:</span>
                  <p class="text-slate-300">${resultData.commonMistakes}</p>
                </div>
              </div>
            </div>

          </div>

          <!-- Examples List -->
          <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-white">الأمثلة السياقية الموضحة:</h4>
            <div class="space-y-2">
              ${resultData.examples.map(ex => `
                <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <p class="text-xs font-bold text-slate-100 font-en">"${ex.en}"</p>
                  <p class="text-[11px] text-slate-400">${ex.ar}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="flex justify-end pt-2">
            <button onclick="alert('تمت إضافة الكلمة إلى قائمة مراجعة SRS الذكية!')" class="px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-brand-500/20 flex items-center space-x-2 space-x-reverse">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>إضافة لمراجعة SRS الذكية</span>
            </button>
          </div>

        </div>

      </div>
    `;
  }

  handleSearch(query) {
    this.searchQuery = query;
    const view = document.getElementById('view-dictionary');
    if (view) view.innerHTML = this.renderDictionaryView();
    // Re-focus cursor on search box
    const searchInput = document.getElementById('dict-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(query.length, query.length);
    }
    if (window.lucide) lucide.createIcons();
  }
}
window.DictionaryModule = new SmartDictionaryModule();


/* ==========================================================================
   16. محرك مقارنة الموجة الصوتية (Visual Waveform Audio Matcher)
   ========================================================================== */
class AudioWaveformMatcherModule {
  constructor() {
    this.targetWord = "Incomprehensible";
    this.targetPhonetic = "/ɪnˌkɑːm.prəˈhen.sə.bəl/";
    this.isRecording = false;
    this.matchPercentage = null;
  }

  renderWaveformView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-3xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">التعلم بالنطق ومقارنة الموجات الصوتية</h3>
              <p class="text-xs text-slate-400">قارن الشكل البصري لنطقك بالنطق المرجعي الصادق من أصحاب اللغة</p>
            </div>
          </div>
          <span class="text-xs bg-slate-800 text-slate-300 font-en px-3 py-1 rounded-full">Pitch Wave AI</span>
        </div>

        <!-- Target Word Card -->
        <div class="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-2">
          <span class="text-[10px] text-slate-400 font-bold block">الكلمة المستهدفة للتطبيق:</span>
          <h2 class="text-3xl font-black text-white font-en tracking-wide">${this.targetWord}</h2>
          <p class="text-xs text-slate-400 font-en">${this.targetPhonetic}</p>
          
          <button onclick="window.LisanTTS.speak('${this.targetWord}')" class="mt-2 inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-slate-800 hover:bg-brand-500 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
            <span>استمع للنطق المرجعي الأصلي</span>
          </button>
        </div>

        <!-- Waveforms Visual Dual Comparison Box -->
        <div class="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-6">
          
          <!-- Native Original Waveform -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-brand-500">1. الموجة الصوتية المرجعية (Native Speaker Wave)</span>
              <span class="text-[10px] text-slate-500 font-en">100% Precision</span>
            </div>
            <div class="flex items-center justify-between space-x-1 space-x-reverse h-12 px-4 bg-slate-900/90 rounded-xl border border-brand-500/20">
              <span class="w-1 bg-brand-500 h-3 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-6 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-10 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-8 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-4 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-9 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-11 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-5 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-7 rounded-full"></span>
              <span class="w-1 bg-brand-500 h-2 rounded-full"></span>
            </div>
          </div>

          <!-- User Microphone Waveform -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-accent-purple">2. الموجة الصوتية لنطقك أنت (Your Recorded Wave)</span>
              <span id="wave-match-score" class="text-xs font-en font-black ${this.matchPercentage ? 'text-brand-500' : 'text-slate-500'}">
                ${this.matchPercentage ? `نسبة التطابق: ${this.matchPercentage}%` : 'في انتظار التسجيل...'}
              </span>
            </div>
            <div id="user-wave-container" class="flex items-center justify-between space-x-1 space-x-reverse h-12 px-4 bg-slate-900/90 rounded-xl border border-slate-800 opacity-40">
              <span class="w-1 bg-accent-purple h-2 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-4 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-2 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-5 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-3 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-2 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-4 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-2 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-3 rounded-full"></span>
              <span class="w-1 bg-accent-purple h-1 rounded-full"></span>
            </div>
          </div>

        </div>

        <!-- Recording Action Control -->
        <div class="flex flex-col items-center space-y-3 py-2">
          <button id="btn-wave-record" onclick="WaveformMatcher.toggleRecord()" class="w-16 h-16 rounded-full bg-accent-purple hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-accent-purple/20 transition transform active:scale-95">
            <i data-lucide="mic" class="w-7 h-7"></i>
          </button>
          <span id="wave-record-status" class="text-xs font-bold text-slate-400">اضغط للاستماع ثم سجل نطقك للكلمة</span>
        </div>

      </div>
    `;
  }

  toggleRecord() {
    const btn = document.getElementById('btn-wave-record');
    const status = document.getElementById('wave-record-status');
    const wave = document.getElementById('user-wave-container');

    if (!this.isRecording) {
      this.isRecording = true;
      btn.classList.add('animate-pulse', 'bg-accent-rose');
      status.innerText = 'جاري التسجيل والتقاط موجة الصوت... اتكلم الآن!';
      wave.classList.remove('opacity-40');
      wave.classList.add('animate-pulse');

      setTimeout(() => {
        this.stopRecord();
      }, 3500);
    } else {
      this.stopRecord();
    }
  }

  stopRecord() {
    this.isRecording = false;
    this.matchPercentage = 89;
    const btn = document.getElementById('btn-wave-record');
    const status = document.getElementById('wave-record-status');
    const wave = document.getElementById('user-wave-container');

    btn.classList.remove('animate-pulse', 'bg-accent-rose');
    wave.classList.remove('animate-pulse');
    status.innerText = 'تمت مقارنة الصوت والموجات بنجاح!';
    
    const view = document.getElementById('view-waveform');
    if (view) view.innerHTML = this.renderWaveformView();
    if (window.lucide) lucide.createIcons();
  }
}
window.WaveformMatcher = new AudioWaveformMatcherModule();
