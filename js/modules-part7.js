/**
 * تطبيق لسان (Lisan.ai) - الجزء السابع
 * الميزة 17: محرك التعلم بواسطة مشاهد الأفلام (Movie Clip Immersion Engine)
 * الميزة 18: محرك التعلم بالأغاني والموسيقى (Interactive Song & Lyrics Trainer)
 */

/* ==========================================================================
   17. محرك التعلم بواسطة مشاهد الأفلام (Movie Clip Immersion Engine)
   ========================================================================== */
class MovieClipLearningModule {
  constructor() {
    this.currentClipIndex = 0;
    this.activeTab = 'vocabulary'; // 'vocabulary', 'roleplay', 'quiz'
    this.isRoleplaying = false;
    
    this.clipsDb = [
      {
        id: 'clip_1',
        movieTitle: 'The Pursuit of Happyness (2006)',
        sceneTitle: 'مشهد مقابلة العمل الشهيرة (The Job Interview)',
        level: 'B2 / C1',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // فيديو توضيحي عالي الجودة
        quote: "Don't ever let somebody tell you... You can't do something. Not even me.",
        quoteAr: "لا تسمح لأحد أبداً أن يخبرك بأنه لا يمكنك فعل شيء.. ولا حتى أنا.",
        dialogue: [
          { speaker: "Chris", line: "Don't ever let somebody tell you... You can't do something.", targetRole: false },
          { speaker: "Christopher", line: "Okay.", targetRole: true },
          { speaker: "Chris", line: "You got a dream... You gotta protect it.", targetRole: false }
        ],
        vocabExtracted: [
          { word: "Gotta", mean: "اختصار عامي لـ (Have got to / Must)", note: "شائعة جداً في المحادثات الأمريكية اليومية." },
          { word: "Pursuit", mean: "السعي الحثيث أو المطاردة", note: "تستخدم في السياقات الرسمية والعامية." }
        ],
        quiz: {
          question: "ما المعنى الضمني لقول الشحصية الرئيسية 'You gotta protect it'؟",
          options: [
            "حماية الحلم والدفاع عنه بالحفاظ على الإصرار والعمل",
            "اختيار وظيفة آمنة وبسيطة",
            "الابتعاد عن التحديات والمخاطرة"
          ],
          correct: 0
        }
      }
    ];
  }

  renderMovieView() {
    const clip = this.clipsDb[this.currentClipIndex];

    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-rose/10 text-accent-rose flex items-center justify-center font-bold">
              <i data-lucide="film" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">${clip.movieTitle}</h3>
              <p class="text-xs text-slate-400">${clip.sceneTitle}</p>
            </div>
          </div>
          <span class="text-xs font-bold text-accent-rose bg-accent-rose/10 border border-accent-rose/20 px-3 py-1 rounded-full font-en">
            ${clip.level}
          </span>
        </div>

        <!-- HTML5 Video Player Container -->
        <div class="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video shadow-xl">
          <video id="movie-video-element" class="w-full h-full object-cover" controls poster="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800">
            <source src="${clip.videoUrl}" type="video/mp4">
            متصفحك لا يدعم مشغل الفيديو المباشر.
          </video>
        </div>

        <!-- Featured Quote Banner -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1 text-center">
          <p class="text-base font-bold text-white font-en leading-relaxed">"${clip.quote}"</p>
          <p class="text-xs text-brand-500 font-semibold">${clip.quoteAr}</p>
        </div>

        <!-- Sub-features Interactive Navigation Tabs -->
        <div class="flex items-center space-x-2 space-x-reverse bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button onclick="MovieModule.switchTab('vocabulary')" class="flex-1 py-2 rounded-xl text-xs font-bold transition ${this.activeTab === 'vocabulary' ? 'bg-accent-rose text-white shadow' : 'text-slate-400 hover:text-white'}">
            📚 المفردات المستخرجة
          </button>
          <button onclick="MovieModule.switchTab('roleplay')" class="flex-1 py-2 rounded-xl text-xs font-bold transition ${this.activeTab === 'roleplay' ? 'bg-accent-rose text-white shadow' : 'text-slate-400 hover:text-white'}">
            🎭 تمثيل المشهد سينمائياً
          </button>
          <button onclick="MovieModule.switchTab('quiz')" class="flex-1 py-2 rounded-xl text-xs font-bold transition ${this.activeTab === 'quiz' ? 'bg-accent-rose text-white shadow' : 'text-slate-400 hover:text-white'}">
            🧩 اختبار الفهم
          </button>
        </div>

        <!-- Tab Content 1: Extracted Vocabulary -->
        ${this.activeTab === 'vocabulary' ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${clip.vocabExtracted.map(v => `
              <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="text-base font-black text-brand-500 font-en">${v.word}</h4>
                  <button onclick="window.LisanTTS.speak('${v.word}')" class="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg transition">
                    <i data-lucide="volume-2" class="w-4 h-4"></i>
                  </button>
                </div>
                <p class="text-xs font-bold text-white">${v.mean}</p>
                <p class="text-[11px] text-slate-400">💡 ${v.note}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Tab Content 2: Cinematic Scene Roleplay -->
        ${this.activeTab === 'roleplay' ? `
          <div class="space-y-4">
            <div class="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <span class="text-xs text-slate-400 font-bold block">قم بقراءة الدور المظلل بالأحمر حين يصل الدور عليك:</span>
              
              <div class="space-y-2 font-en text-sm">
                ${clip.dialogue.map(d => `
                  <div class="p-3 rounded-xl border ${d.targetRole ? 'bg-accent-rose/10 border-accent-rose/40 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-300'}">
                    <span class="text-xs text-slate-400 block mb-0.5">${d.speaker}:</span>
                    <p>"${d.line}"</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="flex items-center justify-between pt-2">
              <span id="roleplay-status" class="text-xs font-bold text-slate-400">اضغط على المايك لبدء تسجيل دورك في المشهد</span>
              <button onclick="MovieModule.toggleRoleplayRecord()" id="btn-movie-roleplay" class="px-5 py-2.5 bg-accent-rose hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-accent-rose/20 flex items-center space-x-2 space-x-reverse">
                <i data-lucide="mic" class="w-4 h-4"></i>
                <span>تمثيل الدور الآن</span>
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Tab Content 3: Quiz -->
        ${this.activeTab === 'quiz' ? `
          <div class="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <h4 class="text-sm font-bold text-white">${clip.quiz.question}</h4>
            <div class="space-y-2">
              ${clip.quiz.options.map((opt, idx) => `
                <button onclick="MovieModule.checkQuiz(${idx})" class="w-full text-right p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-medium transition">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div id="movie-quiz-feedback" class="hidden text-xs font-bold pt-1"></div>
          </div>
        ` : ''}

      </div>
    `;
  }

  switchTab(tabKey) {
    this.activeTab = tabKey;
    const view = document.getElementById('view-movies');
    if (view) view.innerHTML = this.renderMovieView();
    if (window.lucide) lucide.createIcons();
  }

  toggleRoleplayRecord() {
    const btn = document.getElementById('btn-movie-roleplay');
    const status = document.getElementById('roleplay-status');
    
    if (!this.isRoleplaying) {
      this.isRoleplaying = true;
      btn.classList.add('animate-pulse', 'bg-red-600');
      status.innerText = '🔴 جاري التسجيل.. اتكلم بصوت واضح كالممثل!';
      
      setTimeout(() => {
        this.isRoleplaying = false;
        btn.classList.remove('animate-pulse', 'bg-red-600');
        status.innerText = '🎉 أحسنت! تم تقييم أداء المشهد بنسبة 94% من المطابقة السينمائية.';
      }, 3000);
    }
  }

  checkQuiz(selectedIdx) {
    const clip = this.clipsDb[this.currentClipIndex];
    const feedback = document.getElementById('movie-quiz-feedback');
    feedback.classList.remove('hidden', 'text-brand-500', 'text-accent-rose');

    if (selectedIdx === clip.quiz.correct) {
      feedback.classList.add('text-brand-500');
      feedback.innerText = 'إجابة صحيحة 100%! فهمت المغزى السينمائي العميق للمشهد.';
    } else {
      feedback.classList.add('text-accent-rose');
      feedback.innerText = 'حاول مراجعة المشهد مرة أخرى واستماع الحوار بتركيز أكبر.';
    }
  }
}
window.MovieModule = new MovieClipLearningModule();


/* ==========================================================================
   18. محرك التعلم بالأغاني والموسيقى (Interactive Song & Lyrics Trainer)
   ========================================================================== */
class SongLearningModule {
  constructor() {
    this.songsDb = [
      {
        id: 'song_1',
        title: 'Count on Me',
        artist: 'Bruno Mars',
        level: 'A2 / B1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        lyrics: [
          { time: '00:05', line: "If you ever find yourself stuck in the middle of the sea...", translation: "إذا وجدت نفسك يوماً ما عالقاً في منتصف البحر..." },
          { time: '00:12', line: "I'll sail the world to find you.", translation: "سأبحر حول العالم لأجدك." },
          { time: '00:18', line: "You can count on me like one two three, I'll be there.", translation: "يمكنك الاعتماد عليّ تماماً، وسأكون هناك بجانبك.", blankWord: "count" }
        ],
        slangExplanations: [
          { phrase: "Count on me", mean: "اعتمد عليّ بثقة كاملة", type: "تعبير عامي شهير (Idiom)" },
          { phrase: "Stuck in", mean: "عالق أو محتجز في موقف صعب", type: "فعل مركب (Phrasal Verb)" }
        ]
      }
    ];
    this.currentSongIndex = 0;
    this.userBlanksInput = {};
  }

  renderSongView() {
    const song = this.songsDb[this.currentSongIndex];

    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
              <i data-lucide="music" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">${song.title}</h3>
              <p class="text-xs text-slate-400">الفنان: ${song.artist}</p>
            </div>
          </div>
          <span class="text-xs font-bold text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full font-en">
            ${song.level}
          </span>
        </div>

        <!-- Audio Player Widget -->
        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
          <audio id="song-audio-element" class="w-full" controls>
            <source src="${song.audioUrl}" type="audio/mpeg">
          </audio>
        </div>

        <!-- Dynamic Lyrics Box with Fill-in-the-blanks -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-slate-400 flex items-center space-x-2 space-x-reverse">
            <i data-lucide="file-text" class="w-4 h-4 text-brand-500"></i>
            <span>كلمات الأغنية التفاعلية وتحدي ملء الفراغات:</span>
          </h4>

          <div class="space-y-3">
            ${song.lyrics.map((l, idx) => `
              <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
                <div class="flex items-start justify-between">
                  <span class="text-[10px] text-slate-500 font-en font-bold">${l.time}</span>
                  <button onclick="window.LisanTTS.speak('${l.line}')" class="p-1 text-slate-400 hover:text-white">
                    <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>

                <!-- Sentence line with blank if exists -->
                ${l.blankWord ? `
                  <div class="text-base font-bold text-white font-en leading-relaxed flex items-center flex-wrap gap-2">
                    <span>You can</span>
                    <input type="text" id="blank-input-${idx}" placeholder="اكتب الكلمة الناقصة..." class="bg-slate-950 border border-accent-purple text-accent-purple px-3 py-1 rounded-xl text-xs font-en w-36 text-center focus:outline-none">
                    <span>on me like one two three, I'll be there.</span>
                    <button onclick="SongModule.checkBlank(${idx}, '${l.blankWord}')" class="px-3 py-1 bg-accent-purple text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition">تحقق</button>
                  </div>
                ` : `
                  <p class="text-base font-bold text-white font-en leading-relaxed">"${l.line}"</p>
                `}

                <p class="text-xs text-brand-500 font-medium">${l.translation}</p>
                <div id="blank-feedback-${idx}" class="hidden text-xs font-bold pt-1"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Slang & Idioms Breakdown Grid -->
        <div class="space-y-3 border-t border-slate-800 pt-4">
          <h4 class="text-xs font-bold text-slate-400">تفكيك التعبيرات العامية والصور البلاغية (Slang & Idioms):</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${song.slangExplanations.map(s => `
              <div class="p-3.5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-1">
                <span class="text-[10px] font-bold text-accent-amber bg-accent-amber/10 px-2 py-0.5 rounded-full">${s.type}</span>
                <h5 class="text-sm font-bold text-white font-en mt-1">"${s.phrase}"</h5>
                <p class="text-xs text-slate-300">${s.mean}</p>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  checkBlank(idx, correctWord) {
    const input = document.getElementById(`blank-input-${idx}`);
    const feedback = document.getElementById(`blank-feedback-${idx}`);
    const userVal = input.value.trim().toLowerCase();

    feedback.classList.remove('hidden', 'text-brand-500', 'text-accent-rose');

    if (userVal === correctWord.toLowerCase()) {
      feedback.classList.add('text-brand-500');
      feedback.innerText = 'إجابة صحيحة! استماعك دقيق جداً 🎯';
    } else {
      feedback.classList.add('text-accent-rose');
      feedback.innerText = `غير دقيقة. الكلمة الصحيحة هي (${correctWord})`;
    }
  }
}
window.SongModule = new SongLearningModule();
