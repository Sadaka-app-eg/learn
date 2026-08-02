/**
 * تطبيق لسان (Lisan.ai) - الجزء الثالث
 * الميزة 9: محرر الكتابة والتصحيح الذكي (Smart Writing & Essay Coach)
 * الميزة 10: شرح القواعد البصري التفاعلي (Visual Interactive Grammar Engine)
 */

/* ==========================================================================
   9. محرر ومعلم الكتابة الذكي (Smart Writing Coach)
   ========================================================================== */
class WritingCoachModule {
  constructor() {
    this.textType = 'email'; // email, essay, message, comment
    this.sampleDrafts = {
      email: "Dear Sir, I am writing for asking about the job position that was posted yesterday. I want to know if it is still available because I have many experiences in this field.",
      essay: "Technology has big impact on our daily life. People using smartphones all day which can be bad for social interactions.",
      message: "Hey bro, sorry for late reply I was busy with work yesterday. Let us meet up tonight if you free."
    };
  }

  renderWritingView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
              <i data-lucide="pen-tool" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">مساعد ومصحح الكتابة الاحترافي</h3>
              <p class="text-xs text-slate-400">اكتب مقالك أو رسالتك وسيتكفل الذكاء الاصطناعي بتصحيحها وتطوير بلاغتها</p>
            </div>
          </div>

          <!-- Document Type Selector -->
          <div class="flex items-center space-x-2 space-x-reverse bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button onclick="WritingModule.setType('email')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.textType === 'email' ? 'bg-accent-purple text-white shadow' : 'text-slate-400 hover:text-white'}">
              📧 إيميل عمل
            </button>
            <button onclick="WritingModule.setType('essay')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.textType === 'essay' ? 'bg-accent-purple text-white shadow' : 'text-slate-400 hover:text-white'}">
              📝 مقال acad
            </button>
            <button onclick="WritingModule.setType('message')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${this.textType === 'message' ? 'bg-accent-purple text-white shadow' : 'text-slate-400 hover:text-white'}">
              💬 رسالة شخصية
            </button>
          </div>
        </div>

        <!-- Text Editor & Live Counter -->
        <div class="space-y-3">
          <div class="relative">
            <textarea id="writing-input-text" rows="6" placeholder="اكتب نصك هنا باللغة الإنجليزية..." class="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 font-en placeholder-slate-500 focus:outline-none focus:border-accent-purple transition leading-relaxed resize-none">${this.sampleDrafts[this.textType] || ''}</textarea>
            
            <button onclick="WritingModule.analyzeText()" class="absolute bottom-4 left-4 px-5 py-2.5 bg-gradient-to-r from-accent-purple to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-accent-purple/20 flex items-center space-x-2 space-x-reverse">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
              <span>فحص وتصحيح النص</span>
            </button>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span id="writing-word-count">عدد الكلمات: 32 كلمة</span>
            <span>💡 نصيحة: يفضل استخدام الصيغ الرسمية عند اختيار إيميل العمل.</span>
          </div>
        </div>

        <!-- Detailed Feedback & Correction Dashboard (Hidden until analyzed) -->
        <div id="writing-analysis-panel" class="hidden space-y-6 border-t border-slate-800 pt-6">
          
          <!-- Overall Grade & Metrics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="p-4 rounded-2xl bg-slate-900 border border-accent-purple/40 text-center flex flex-col items-center justify-center">
              <span class="text-[10px] text-slate-400 mb-1">الدرجة الشاملة</span>
              <span class="text-3xl font-black text-accent-purple font-en">78<span class="text-xs text-slate-500">/100</span></span>
            </div>
            
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center col-span-3 grid grid-cols-3 gap-2">
              <div>
                <span class="text-[10px] text-slate-400 block mb-1">دقة القواعد</span>
                <span class="text-base font-bold text-amber-400 font-en">ملاحظتان ⚠️</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 block mb-1">تنوع المفردات</span>
                <span class="text-base font-bold text-brand-500 font-en">جيد (B2)</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 block mb-1">النبرة (Tone)</span>
                <span class="text-base font-bold text-accent-purple font-en">شبه رسمية</span>
              </div>
            </div>
          </div>

          <!-- Line-by-Line Corrections -->
          <div class="space-y-3">
            <h4 class="text-sm font-bold text-white flex items-center space-x-2 space-x-reverse">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-500"></i>
              <span>التصحيحات المباشرة والشرح:</span>
            </h4>

            <div class="space-y-3">
              <!-- Issue 1 -->
              <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-accent-rose font-bold font-en line-through">"writing for asking"</span>
                  <span class="text-brand-500 font-bold font-en">"writing to inquire" ✅</span>
                </div>
                <p class="text-xs text-slate-300">
                  <strong class="text-white">الشرح:</strong> في الرسائل الرسمية، من الأفضل استخدام الفعل <span class="font-en text-brand-500">inquire</span> بدلاً من <span class="font-en">ask</span>، وحرف الجر المناسب بعد write هو <span class="font-en">to + infinitive</span>.
                </p>
              </div>

              <!-- Issue 2 -->
              <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-accent-rose font-bold font-en line-through">"many experiences"</span>
                  <span class="text-brand-500 font-bold font-en">"extensive experience" ✅</span>
                </div>
                <p class="text-xs text-slate-300">
                  <strong class="text-white">الشرح:</strong> كلمة <span class="font-en">Experience</span> عندما تعني "الخبرة الكلية في مجال العمل" تكون غير معدودة (Uncountable)، وتوصف بـ <span class="font-en">extensive</span> بدلاً من <span class="font-en">many</span>.
                </p>
              </div>
            </div>
          </div>

          <!-- Superior Alternative Draft -->
          <div class="p-5 bg-gradient-to-br from-brand-card to-slate-900 rounded-2xl border border-brand-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-brand-500 flex items-center space-x-2 space-x-reverse">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                <span>الصياغة الاحترافية المحسّنة (Better Alternative):</span>
              </span>
              <button onclick="window.LisanTTS.speak(document.getElementById('improved-text-draft').innerText)" class="text-slate-400 hover:text-white p-1">
                <i data-lucide="volume-2" class="w-4 h-4"></i>
              </button>
            </div>
            <p id="improved-text-draft" class="text-sm font-en text-slate-100 leading-relaxed font-semibold">
              "Dear Sir/Madam, I am writing to inquire about the position advertised yesterday. I am eager to express my interest as I possess extensive experience in this domain."
            </p>
          </div>

        </div>

      </div>
    `;
  }

  setType(type) {
    this.textType = type;
    const view = document.getElementById('view-writing');
    if (view) view.innerHTML = this.renderWritingView();
    if (window.lucide) lucide.createIcons();
  }

  analyzeText() {
    const input = document.getElementById('writing-input-text');
    if (!input.value.trim()) return;

    const panel = document.getElementById('writing-analysis-panel');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
  }
}
window.WritingModule = new WritingCoachModule();


/* ==========================================================================
   10. تعلم القواعد البصري والتفاعلي (Visual Interactive Grammar)
   ========================================================================== */
class InteractiveGrammarModule {
  constructor() {
    this.currentTopic = 'present_perfect';
    this.topicsDb = {
      present_perfect: {
        title: "الماضي التام vs الماضي البسيط (Present Perfect)",
        concept: "حدث تم في الماضي وله أثر مباشر يستمر حتى اللحظة الحالية.",
        formula: "Subject + have / has + Past Participle (V3)",
        timeline: {
          past: "بداية الحدث في الماضي ⏳",
          present: "النتيجة والأثر الآن! ⚡",
          future: "تأثير مستمر"
        },
        examples: [
          { en: "I have lost my keys.", ar: "لقد فقدت مفاتيحي (والنتيجة: لا أستطيع دخول الشقة الآن)." },
          { en: "She has lived in Cairo for 5 years.", ar: "هي عاشت في القاهرة لـ 5 سنوات (وما زالت تعيش فيها حتى الآن)." }
        ],
        commonMistake: "لا تستخدم وقت محدد في الماضي مع هذا الزمن (مثال خطأ: I have seen him yesterday ❌ -> الصح: I saw him yesterday ✅).",
        quiz: {
          q: "اختر الجملة الصحيحة للتعبير عن حدث تم مؤخراً وله نتيجة حالية:",
          opts: ["I broke my leg yesterday", "I have broken my leg, so I can't play today", "I break my leg"],
          ans: 1
        }
      }
    };
  }

  renderGrammarView() {
    const topic = this.topicsDb[this.currentTopic];
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-4xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
              <i data-lucide="layers" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">${topic.title}</h3>
              <p class="text-xs text-slate-400">الفهم البصري والتطبيقي دون التعقيدات الأكاديمية</p>
            </div>
          </div>
          <span class="text-xs bg-slate-800 text-slate-300 font-en px-3 py-1 rounded-full">Grammar Visualizer</span>
        </div>

        <!-- Visual Timeline Diagram Component -->
        <div class="bg-slate-950/70 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 class="text-xs font-bold text-slate-400">المخطط الزمني للبناء الذهني (Visual Timeline):</h4>
          
          <div class="relative flex items-center justify-between py-6 px-4">
            <!-- Line background -->
            <div class="absolute left-8 right-8 top-1/2 h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
            <div class="absolute left-8 right-1/2 top-1/2 h-1 bg-gradient-to-r from-accent-amber to-brand-500 -translate-y-1/2 z-0"></div>

            <!-- Past Point -->
            <div class="relative z-10 flex flex-col items-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-slate-800 border-2 border-accent-amber flex items-center justify-center text-xs">⏳</div>
              <span class="text-[11px] font-bold text-slate-300">${topic.timeline.past}</span>
            </div>

            <!-- Present Point -->
            <div class="relative z-10 flex flex-col items-center space-y-2">
              <div class="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 text-sm font-bold animate-bounce">⚡</div>
              <span class="text-[11px] font-bold text-brand-500">${topic.timeline.present}</span>
            </div>

            <!-- Future Point -->
            <div class="relative z-10 flex flex-col items-center space-y-2">
              <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-500">🔮</div>
              <span class="text-[11px] font-medium text-slate-500">${topic.timeline.future}</span>
            </div>
          </div>

          <div class="p-3 bg-slate-900 rounded-xl text-center text-xs font-semibold text-slate-200 border border-slate-800">
            💡 ${topic.concept}
          </div>
        </div>

        <!-- Formula Banner -->
        <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">الصيغة التركيبية:</span>
          <code class="text-sm font-bold text-accent-purple font-en bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800">${topic.formula}</code>
        </div>

        <!-- Examples & Mistakes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <h5 class="text-xs font-bold text-brand-500">أمثلة سياقية تفاعلية:</h5>
            ${topic.examples.map(ex => `
              <div class="space-y-1 border-b border-slate-800/60 pb-2">
                <p class="text-xs font-bold text-white font-en">${ex.en}</p>
                <p class="text-[11px] text-slate-400">${ex.ar}</p>
              </div>
            `).join('')}
          </div>

          <div class="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2">
            <h5 class="text-xs font-bold text-accent-rose">⚠️ الخطأ الأكثر شيوعاً:</h5>
            <p class="text-xs text-slate-300 leading-relaxed">${topic.commonMistake}</p>
          </div>
        </div>

        <!-- Quick Interactive Practice Quiz -->
        <div class="p-5 bg-slate-950/80 rounded-2xl border border-brand-500/30 space-y-3">
          <h5 class="text-xs font-bold text-white flex items-center space-x-2 space-x-reverse">
            <i data-lucide="help-circle" class="w-4 h-4 text-brand-500"></i>
            <span>اختبار استيعاب سريع:</span>
          </h5>
          <p class="text-xs text-slate-300 font-semibold">${topic.quiz.q}</p>

          <div class="space-y-2">
            ${topic.quiz.opts.map((opt, idx) => `
              <button onclick="GrammarModule.checkQuiz(${idx})" class="w-full text-right p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-en transition">
                ${opt}
              </button>
            `).join('')}
          </div>
          <div id="grammar-quiz-result" class="hidden text-xs font-bold pt-1"></div>
        </div>

      </div>
    `;
  }

  checkQuiz(selectedIdx) {
    const topic = this.topicsDb[this.currentTopic];
    const res = document.getElementById('grammar-quiz-result');
    res.classList.remove('hidden', 'text-emerald-400', 'text-accent-rose');

    if (selectedIdx === topic.quiz.ans) {
      res.classList.add('text-emerald-400');
      res.innerText = 'إجابة ممتازة وصحيحة 100%! أحسنت فهم فكرة الأثر الحالي.';
    } else {
      res.classList.add('text-accent-rose');
      res.innerText = 'إجابة غير دقيقة. تذكر أن الماضي التام لا يحدد زامناً ماضياً منتهياً كـ yesterday.';
    }
  }
}
window.GrammarModule = new InteractiveGrammarModule();
