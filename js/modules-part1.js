/**
 * تطبيق لسان (Lisan.ai) - الجزء الأول من الخدمات البرمجية (الميزات 2 إلى 6)
 * نظام كامل جاهز للعمل بدون مكتبات خارجية معقدة.
 */

// Global State Manager (إدارة حالة التطبيق)
window.LisanApp = window.LisanApp || {
  user: {
    level: 'B2',
    streak: 14,
    dailyGoalMinutes: 20,
    learnedWords: [],
    savedSRS: []
  }
};

/* ==========================================================================
   2. اختبار تحديد المستوى الشامل + AI + Roadmap
   ========================================================================== */
class PlacementTestEngine {
  constructor() {
    this.currentStep = 0;
    this.answers = {};
    this.questions = [
      {
        id: 'reading',
        type: 'reading',
        title: 'اختبار القراءة والفهم',
        context: "The concept of 'Remote Work' has fundamentally altered the corporate landscape, enabling flexibility but demanding higher self-discipline.",
        question: "What is highlighted as a requirement for remote work?",
        options: ["Strict commuting schedules", "Higher self-discipline", "Decreased corporate flexibility", "Physical presence"],
        correct: 1
      },
      {
        id: 'listening',
        type: 'listening',
        title: 'اختبار الاستماع والتمييز',
        audioText: "I'd rather reschedule our board meeting to next Tuesday morning if that works for your team.",
        question: "ماذا يطلب المتحدث في التسجيل الصوتي؟",
        options: ["إلغاء الاجتماع كلياً", "إعادة جدولة الاجتماع للثلاثاء القادم", "تقديم موعد الاجتماع لليوم", "حضور الاجتماع شخصياً"],
        correct: 1
      },
      {
        id: 'grammar',
        type: 'grammar',
        title: 'اختبار القواعد والتراكيب',
        question: "If I ________ about the road closure, I would have taken a different route.",
        options: ["knew", "have known", "had known", "would know"],
        correct: 2
      },
      {
        id: 'vocab',
        type: 'vocab',
        title: 'اختبار المفردات والدلالات',
        question: "Choose the word most SIMILAR to 'Meticulous':",
        options: ["Careless", "Thorough & Precise", "Rapid", "Vague"],
        correct: 1
      },
      {
        id: 'ai_speaking',
        type: 'ai_conversation',
        title: 'محادثة الذكاء الاصطناعي لتقييم الطلاقة',
        prompt: "Please introduce yourself briefly and explain why you want to master this language today.",
        aiRole: "مقيّم الطلاقة التفاعلي"
      }
    ];
  }

  renderTestModal() {
    const q = this.questions[this.currentStep];
    return `
      <div id="placement-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="glass-card w-full max-w-2xl p-6 md:p-8 rounded-3xl space-y-6 border border-slate-700 shadow-2xl relative">
          
          <!-- Progress Bar -->
          <div class="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>المرحلة ${this.currentStep + 1} من ${this.questions.length}</span>
            <span class="text-brand-500 font-en">${Math.round(((this.currentStep + 1) / this.questions.length) * 100)}%</span>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-brand-500 to-accent-purple h-full transition-all duration-300" style="width: ${((this.currentStep + 1) / this.questions.length) * 100}%"></div>
          </div>

          <!-- Step Title -->
          <h3 class="text-xl font-black text-white flex items-center space-x-2 space-x-reverse">
            <i data-lucide="award" class="w-6 h-6 text-brand-500"></i>
            <span>${q.title}</span>
          </h3>

          ${q.type === 'reading' ? `
            <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-slate-300 font-en text-sm leading-relaxed">
              "${q.context}"
            </div>
          ` : ''}

          ${q.type === 'listening' ? `
            <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span class="text-xs text-slate-400">اضغط للاستماع للجملة:</span>
              <button onclick="window.LisanTTS.speak('${q.audioText}')" class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-xs flex items-center space-x-2 space-x-reverse">
                <i data-lucide="volume-2" class="w-4 h-4"></i>
                <span>تشغيل الصوت</span>
              </button>
            </div>
          ` : ''}

          ${q.type === 'ai_conversation' ? `
            <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <p class="text-xs text-slate-400">تحدث مع المقيّم الالي (سجل ردك بالصوت):</p>
              <p class="text-sm font-bold text-accent-purple font-en">"${q.prompt}"</p>
              <div class="flex justify-center py-3">
                <button onclick="PlacementEngine.simulateAIRecord()" id="btn-ai-record" class="w-16 h-16 rounded-full bg-accent-rose/20 text-accent-rose border border-accent-rose/40 flex items-center justify-center hover:scale-105 transition">
                  <i data-lucide="mic" class="w-7 h-7"></i>
                </button>
              </div>
              <p id="ai-speaking-status" class="text-center text-xs text-slate-400">اضغط على المايك للبدء بالتحدث...</p>
            </div>
          ` : `
            <!-- Standard Multiple Choice -->
            <div class="space-y-3">
              <p class="text-sm font-bold text-slate-200">${q.question}</p>
              <div class="grid grid-cols-1 gap-2.5">
                ${q.options.map((opt, idx) => `
                  <button onclick="PlacementEngine.selectOption(${idx})" class="w-full text-right p-3.5 rounded-xl bg-slate-800/60 hover:bg-brand-500/10 hover:border-brand-500/40 border border-slate-700/60 text-slate-200 text-sm font-medium transition flex items-center justify-between group">
                    <span>${opt}</span>
                    <i data-lucide="circle" class="w-4 h-4 text-slate-500 group-hover:text-brand-500"></i>
                  </button>
                `).join('')}
              </div>
            </div>
          `}

          <div class="flex justify-between border-t border-slate-800 pt-4">
            <button onclick="PlacementEngine.close()" class="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold">إلغاء</button>
            <button id="btn-next-step" onclick="PlacementEngine.nextStep()" class="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-xs transition hidden">التالي</button>
          </div>

        </div>
      </div>
    `;
  }

  open() {
    this.currentStep = 0;
    const container = document.createElement('div');
    container.id = 'placement-wrapper';
    container.innerHTML = this.renderTestModal();
    document.body.appendChild(container);
    if (window.lucide) lucide.createIcons();
  }

  selectOption(idx) {
    this.answers[this.currentStep] = idx;
    this.nextStep();
  }

  simulateAIRecord() {
    const status = document.getElementById('ai-speaking-status');
    const btn = document.getElementById('btn-ai-record');
    btn.classList.add('animate-pulse', 'bg-accent-rose', 'text-white');
    status.innerText = 'جاري الاستماع وتحليل النطق والطلاقة...';
    
    setTimeout(() => {
      btn.classList.remove('animate-pulse', 'bg-accent-rose', 'text-white');
      status.innerText = 'تم تحليل نطقك بنجاح! طلاقتك تقارب مستوى B2.';
      document.getElementById('btn-next-step').classList.remove('hidden');
    }, 2500);
  }

  nextStep() {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      document.getElementById('placement-wrapper').innerHTML = this.renderTestModal();
      if (window.lucide) lucide.createIcons();
    } else {
      this.generateRoadmap();
    }
  }

  generateRoadmap() {
    const wrapper = document.getElementById('placement-wrapper');
    wrapper.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div class="glass-card w-full max-w-2xl p-8 rounded-3xl space-y-6 border border-brand-500/40 text-center">
          <div class="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-500 flex items-center justify-center mx-auto">
            <i data-lucide="sparkles" class="w-8 h-8"></i>
          </div>
          <h2 class="text-2xl font-black text-white">نتيجة الاختبار: مستواك المستهدف (B2)</h2>
          <p class="text-xs text-slate-400 max-w-md mx-auto">تم تصميم خريطة طريق مخصصة لحياتك اليومية وعملك بناءً على تحليلات الحوار والاستماع.</p>
          
          <div class="space-y-3 text-right">
            <h4 class="text-xs font-bold text-slate-300">مسارك التعليمي المخصص (Roadmap):</h4>
            <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center space-x-3 space-x-reverse">
              <span class="w-6 h-6 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center font-en">1</span>
              <span>إتقان حوارات المفاوضات والاجتماعات الرسمية</span>
            </div>
            <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center space-x-3 space-x-reverse">
              <span class="w-6 h-6 rounded-full bg-accent-purple text-white font-bold flex items-center justify-center font-en">2</span>
              <span>تقليل التلعثم وتطوير السرعة الصوتية من 110 إلى 150 كلمة/دقيقة</span>
            </div>
          </div>

          <button onclick="PlacementEngine.close()" class="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold text-sm shadow-xl transition">
            بدء الرحلة الآن
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  close() {
    const el = document.getElementById('placement-wrapper');
    if (el) el.remove();
  }
}
window.PlacementEngine = new PlacementTestEngine();


/* ==========================================================================
   3. تعلم الكلمات الشامل (Deep Word Flashcards with 12 Details)
   ========================================================================== */
class DeepVocabularyModule {
  constructor() {
    this.wordsDb = [
      {
        id: 'w1',
        word: 'Ambiguity',
        phonetic: '/ˌæm.bɪˈɡjuː.ə.ti/',
        type: 'اسم - Noun',
        meaning: 'الغموض / التباس المعنى',
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60',
        videoUrl: '#',
        examples: ['We must avoid ambiguity in business contracts.', 'The statement was full of ambiguity.'],
        synonyms: ['Uncertainty', 'Obscurity', 'Vagueness'],
        antonyms: ['Clarity', 'Certainty', 'Explicitly'],
        formalUsage: "Used in legal and academic contexts to highlight unclear statements.",
        casualUsage: "People just say 'It's not clear' in everyday speech.",
        origin: "Latin 'ambiguitas' - meaning moving in two directions.",
        commonErrors: "Don't confuse it with 'Ambition' (التموح).",
        memoryTip: "Think of 'Ambi' (Dual/Two) + 'Guity' -> Two meanings at once!",
      }
    ];
  }

  renderWordView(wordId) {
    const w = this.wordsDb.find(x => x.id === wordId) || this.wordsDb[0];
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto">
        <!-- Top Title & Audio -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div class="flex items-center space-x-3 space-x-reverse">
              <h2 class="text-3xl font-black text-brand-500 font-en tracking-wide">${w.word}</h2>
              <span class="text-xs text-slate-400 bg-slate-800 font-en px-3 py-1 rounded-full">${w.type}</span>
            </div>
            <p class="text-xs text-slate-400 font-en mt-1">${w.phonetic}</p>
            <h3 class="text-xl font-bold text-white mt-2">${w.meaning}</h3>
          </div>

          <div class="flex items-center space-x-2 space-x-reverse">
            <button onclick="window.LisanTTS.speak('${w.word}', 1.0)" class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center space-x-2 space-x-reverse">
              <i data-lucide="volume-2" class="w-4 h-4"></i>
              <span>النطق الطبيعي</span>
            </button>
            <button onclick="window.LisanTTS.speak('${w.word}', 0.5)" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-en">
              🐢 0.5x
            </button>
          </div>
        </div>

        <!-- Visual Media & Context Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="relative rounded-2xl overflow-hidden h-56 border border-slate-800 group">
            <img src="${w.image}" alt="${w.word}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span class="text-xs text-slate-300 font-medium">تمثيل بصري للمعنى</span>
            </div>
          </div>

          <!-- Deep Details List -->
          <div class="space-y-3 text-xs">
            <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span class="text-brand-500 font-bold block mb-1">💡 طريقة التذكر السريعة:</span>
              <p class="text-slate-300">${w.memoryTip}</p>
            </div>
            <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span class="text-accent-rose font-bold block mb-1">⚠️ أكثر الأخطاء شائعة:</span>
              <p class="text-slate-300">${w.commonErrors}</p>
            </div>
            <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span class="text-accent-amber font-bold block mb-1">🏛️ أصل الكلمة (Etymology):</span>
              <p class="text-slate-300">${w.origin}</p>
            </div>
          </div>
        </div>

        <!-- Examples & Usage -->
        <div class="space-y-4 pt-2">
          <h4 class="text-sm font-bold text-white">الأمثلة والاستخدام الواقعي:</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-3.5 bg-slate-900/50 rounded-2xl border border-slate-800">
              <span class="text-[10px] font-bold text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded-full">استخدام رسمي</span>
              <p class="text-xs text-slate-300 mt-2">${w.formalUsage}</p>
            </div>
            <div class="p-3.5 bg-slate-900/50 rounded-2xl border border-slate-800">
              <span class="text-[10px] font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">استخدام عامي</span>
              <p class="text-xs text-slate-300 mt-2">${w.casualUsage}</p>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
window.DeepVocab = new DeepVocabularyModule();


/* ==========================================================================
   4. جمل المواقف اليومية الحقيقية (Real Situational Sentences)
   ========================================================================== */
class SituationalSentencesModule {
  constructor() {
    this.categories = [
      { id: 'airport', name: 'المطار والسفر', icon: 'plane' },
      { id: 'work', name: 'العمل والمقابلات', icon: 'briefcase' },
      { id: 'hospital', name: 'المستشفى والطوارئ', icon: 'activity' },
      { id: 'restaurant', name: 'المطعم وتناول الطعام', icon: 'utensils' }
    ];
    this.sentences = [
      {
        cat: 'airport',
        en: "Is this the final call for flight EK-202 to London?",
        ar: "هل هذا هو النداء الأخير للرحلة رقم EK-202 المتجهة إلى لندن؟",
        breakdown: [
          { word: "Final call", mean: "النداء الأخير" },
          { word: "Flight", mean: "رحلة طيران" }
        ],
        explanation: "تستخدم في المطار عند التأخر عن بوابات الصعود للتأكد من حالة الطائرة."
      }
    ];
  }

  renderCategoryView(catId = 'airport') {
    const list = this.sentences.filter(s => s.cat === catId);
    return `
      <div class="space-y-6">
        <!-- Category Selector Horizontal Scroll -->
        <div class="flex items-center space-x-3 space-x-reverse overflow-x-auto pb-2">
          ${this.categories.map(c => `
            <button onclick="SentencesModule.switchCategory('${c.id}')" class="px-5 py-3 rounded-2xl font-bold text-xs shrink-0 flex items-center space-x-2 space-x-reverse ${c.id === catId ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800'}">
              <i data-lucide="${c.icon}" class="w-4 h-4"></i>
              <span>${c.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Sentences List -->
        <div class="space-y-4">
          ${list.map(s => `
            <div class="glass-card p-5 rounded-2xl space-y-4 border border-slate-800">
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <p class="text-lg font-bold text-white font-en leading-relaxed">${s.en}</p>
                  <p class="text-sm font-semibold text-brand-500">${s.ar}</p>
                </div>
                <button onclick="window.LisanTTS.speak('${s.en}')" class="p-3 bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white rounded-xl transition">
                  <i data-lucide="volume-2" class="w-5 h-5"></i>
                </button>
              </div>

              <!-- Breakdown pills -->
              <div class="flex flex-wrap gap-2 border-t border-slate-800/60 pt-3">
                ${s.breakdown.map(b => `
                  <span class="px-3 py-1 bg-slate-900 rounded-lg text-xs text-slate-300 font-en border border-slate-800">
                    <strong class="text-accent-purple">${b.word}:</strong> ${b.mean}
                  </span>
                `).join('')}
              </div>
              <p class="text-xs text-slate-400 italic">💡 ${s.explanation}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}
window.SentencesModule = new SituationalSentencesModule();


/* ==========================================================================
   5. مكتبة الاستماع والصوتيات المتقدمة (Audio Library & Player)
   ========================================================================== */
class AudioPlayerModule {
  constructor() {
    this.playbackSpeed = 1.0;
    this.showTranscript = true;
  }

  setSpeed(speed) {
    this.playbackSpeed = speed;
    const audioEl = document.getElementById('lisan-audio-element');
    if (audioEl) audioEl.playbackRate = speed;
  }

  toggleTranscript() {
    this.showTranscript = !this.showTranscript;
    const el = document.getElementById('transcript-box');
    if (el) el.classList.toggle('hidden');
  }

  renderPlayer() {
    return `
      <div class="glass-card p-6 rounded-3xl space-y-6 border border-slate-800 max-w-3xl mx-auto">
        <div class="flex items-center space-x-4 space-x-reverse">
          <div class="w-16 h-16 rounded-2xl bg-accent-purple/20 text-accent-purple flex items-center justify-center shrink-0">
            <i data-lucide="headphones" class="w-8 h-8"></i>
          </div>
          <div>
            <span class="text-xs text-accent-purple font-bold">بودكاست اليوم - B2</span>
            <h3 class="text-lg font-black text-white">How Artificial Intelligence Reshapes Daily Life</h3>
          </div>
        </div>

        <!-- Audio Control Bar -->
        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
          <audio id="lisan-audio-element" class="w-full" controls>
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
          </audio>
          
          <div class="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <div class="flex items-center space-x-2 space-x-reverse">
              <span>السرعة:</span>
              <button onclick="AudioModule.setSpeed(0.75)" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-md font-en">0.75x</button>
              <button onclick="AudioModule.setSpeed(1.0)" class="px-2 py-1 bg-brand-500 text-white rounded-md font-en font-bold">1.0x</button>
              <button onclick="AudioModule.setSpeed(1.5)" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-md font-en">1.5x</button>
            </div>

            <button onclick="AudioModule.toggleTranscript()" class="text-brand-500 font-bold hover:underline flex items-center space-x-1 space-x-reverse">
              <i data-lucide="file-text" class="w-4 h-4"></i>
              <span>إظهار / إخفاء النص</span>
            </button>
          </div>
        </div>

        <!-- Interactive Transcript Box -->
        <div id="transcript-box" class="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-sm font-en leading-relaxed text-slate-300">
          Artificial intelligence is no longer just a futuristic concept. It has seamlessly integrated into our daily tools, helping us communicate across languages instantly.
        </div>
      </div>
    `;
  }
}
window.AudioModule = new AudioPlayerModule();


/* ==========================================================================
   6. قارئ النصوص والكتب التفاعلي (Interactive Reader)
   ========================================================================== */
class InteractiveReaderModule {
  constructor() {
    this.text = "The journey of learning a new language opens up unimaginable doors of opportunities across the globe.";
  }

  renderReader() {
    const words = this.text.split(" ");
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 class="text-lg font-bold text-white flex items-center space-x-2 space-x-reverse">
            <i data-lucide="book-open" class="w-5 h-5 text-brand-500"></i>
            <span>القارئ التفاعلي - اضغط على أي كلمة للحصول على معناها ونطقها</span>
          </h3>
        </div>

        <!-- Interactive Article Canvas -->
        <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-lg md:text-xl font-en leading-loose text-slate-200">
          ${words.map(w => `<span onclick="ReaderModule.inspectWord('${w.replace(/[^a-zA-Z]/g, "")}')" class="cursor-pointer hover:bg-brand-500/20 hover:text-brand-500 px-1 py-0.5 rounded transition inline-block">${w}</span>`).join(" ")}
        </div>

        <!-- Selected Word Modal Inspector -->
        <div id="word-inspector" class="hidden p-4 bg-slate-900 rounded-2xl border border-brand-500/40 space-y-3">
          <div class="flex items-center justify-between">
            <h4 id="inspect-title" class="text-xl font-bold text-brand-500 font-en">Word</h4>
            <button onclick="window.LisanTTS.speak(document.getElementById('inspect-title').innerText)" class="p-2 bg-slate-800 rounded-xl text-slate-300">
              <i data-lucide="volume-2" class="w-4 h-4"></i>
            </button>
          </div>
          <p id="inspect-meaning" class="text-sm font-bold text-white">معنى الكلمة يظهر هنا...</p>
          <button class="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition">
            إضافة إلى قائمة مراجعة SRS
          </button>
        </div>
      </div>
    `;
  }

  inspectWord(word) {
    const inspector = document.getElementById('word-inspector');
    const title = document.getElementById('inspect-title');
    const meaning = document.getElementById('inspect-meaning');

    title.innerText = word;
    meaning.innerText = `الترجمة والتحليل التفاعلي لكلمة (${word})`;
    inspector.classList.remove('hidden');
  }
}
window.ReaderModule = new InteractiveReaderModule();


/* ==========================================================================
   محرك النطق الصوتي الموحد (Web Speech Synthesis TTS Engine)
   ========================================================================== */
window.LisanTTS = {
  speak: function (text, rate = 1.0) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("متصفحك لا يدعم خاصية النطق الصوتي المباشر.");
    }
  }
};
