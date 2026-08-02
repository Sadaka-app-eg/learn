/**
 * تطبيق لسان (Lisan.ai) - الجزء الثاني
 * الميزة 7: محرك تقييم التحدث والنطق بالذكاء الاصطناعي (Speech Evaluator Engine)
 * الميزة 8: غرف وسيناريوهات المحادثة التفاعلية مع الذكاء الاصطناعي (AI Roleplay Sandbox)
 */

/* ==========================================================================
   7. ميزة التحدث المتقدمة وتقييم الصوت (Speech & Pronunciation Evaluator)
   ========================================================================== */
class SpeechEvaluatorModule {
  constructor() {
    this.isRecording = false;
    this.sampleSentence = "I would like to make a reservation for two people tonight at eight o'clock.";
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  renderSpeechPracticeView() {
    return `
      <div class="glass-card p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800 max-w-3xl mx-auto shadow-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <div class="w-10 h-10 rounded-xl bg-accent-rose/10 text-accent-rose flex items-center justify-center font-bold">
              <i data-lucide="mic" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">التقييم الذكي للنطق والطبيعية</h3>
              <p class="text-xs text-slate-400">اقرأ الجملة بصوتك ليقوم المحرك بتحليل نطقك وثقتك وسرعتك</p>
            </div>
          </div>
          <span class="text-xs bg-slate-800 text-slate-300 font-en px-3 py-1 rounded-full">Speech AI v2</span>
        </div>

        <!-- Target Sentence Card -->
        <div class="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden">
          <div class="flex items-start justify-between">
            <p id="target-speech-text" class="text-xl font-bold text-white font-en leading-relaxed">
              "${this.sampleSentence}"
            </p>
            <button onclick="window.LisanTTS.speak('${this.sampleSentence}')" class="p-2 bg-slate-800 hover:bg-brand-500 text-slate-300 hover:text-white rounded-xl transition shrink-0 mr-2" title="الاستماع للنطق الصحيح">
              <i data-lucide="volume-2" class="w-5 h-5"></i>
            </button>
          </div>
          <p class="text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            💡 الترجمة: "أود حجز طاولة لشخصين الليلة في الساعة الثامنة تماماً."
          </p>
        </div>

        <!-- Voice Waveform & Recording Control -->
        <div class="flex flex-col items-center justify-center py-6 space-y-4 bg-slate-950/40 rounded-2xl border border-slate-800/60">
          
          <!-- Animated Audio Wave Canvas -->
          <div id="speech-waveform" class="flex items-center justify-center space-x-1 h-12 w-48 opacity-30">
            <span class="w-1 bg-accent-rose h-4 rounded-full transition-all"></span>
            <span class="w-1 bg-accent-rose h-8 rounded-full transition-all"></span>
            <span class="w-1 bg-accent-rose h-12 rounded-full transition-all"></span>
            <span class="w-1 bg-accent-rose h-6 rounded-full transition-all"></span>
            <span class="w-1 bg-accent-rose h-10 rounded-full transition-all"></span>
            <span class="w-1 bg-accent-rose h-5 rounded-full transition-all"></span>
          </div>

          <!-- Big Record Button -->
          <button id="btn-speech-record" onclick="SpeechEvaluator.toggleRecording()" class="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-rose to-red-600 text-white flex items-center justify-center shadow-xl shadow-accent-rose/20 hover:scale-105 active:scale-95 transition">
            <i data-lucide="mic" class="w-8 h-8"></i>
          </button>
          <span id="speech-status-text" class="text-xs font-bold text-slate-400">اضغط للمسجل وابدأ التحدث</span>
        </div>

        <!-- Analysis Detailed Results (Hidden until evaluated) -->
        <div id="speech-results-panel" class="hidden space-y-5 border-t border-slate-800 pt-6">
          
          <h4 class="text-sm font-bold text-white flex items-center space-x-2 space-x-reverse">
            <i data-lucide="bar-chart-3" class="w-4 h-4 text-brand-500"></i>
            <span>نتيجة التقييم المفصلة:</span>
          </h4>

          <!-- Scores Overview Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 block mb-1">دقة النطق</span>
              <span class="text-xl font-black text-brand-500 font-en">92%</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 block mb-1">السرعة (WPM)</span>
              <span class="text-xl font-black text-accent-purple font-en">135</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 block mb-1">مستوى الثقة</span>
              <span class="text-xl font-black text-accent-amber font-en">88%</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span class="text-[10px] text-slate-400 block mb-1">التردد والوقفات</span>
              <span class="text-xl font-black text-emerald-400 font-en">منخفض</span>
            </div>
          </div>

          <!-- Phonetic Word Breakdown -->
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
            <span class="text-xs font-bold text-slate-400">تحليل الحروف والكلمات التي ينبغي تحسينها:</span>
            <div class="flex flex-wrap gap-2 text-sm font-en pt-1">
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">I</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">would</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">like</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">to</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">make</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">a</span>
              <span class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30" title="نطق حرف R يحتاج للضغط أكثر">reservation ⚠️</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">for</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">two</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">people</span>
            </div>
          </div>

          <!-- Improvement Suggestions -->
          <div class="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
            <p class="font-bold text-brand-500">💡 اقتراح التحسين المخصص:</p>
            <p>حاول عدم الفصل بين كلمة <strong class="font-en text-white">"make a"</strong> وقلهما ككلمة واحدة مجتمعة <strong class="font-en text-white">/meɪkə/</strong> للحصول على طلاقة طبيعية كأصحاب اللغة الأصلية.</p>
          </div>

        </div>

      </div>
    `;
  }

  toggleRecording() {
    const btn = document.getElementById('btn-speech-record');
    const status = document.getElementById('speech-status-text');
    const wave = document.getElementById('speech-waveform');
    const results = document.getElementById('speech-results-panel');

    if (!this.isRecording) {
      // Start Recording Simulation
      this.isRecording = true;
      btn.classList.add('animate-ping');
      wave.classList.remove('opacity-30');
      wave.classList.add('animate-pulse');
      status.innerText = 'جاري التسجيل... اتكلم الآن بنفس نبرتك الطبيعية';
      results.classList.add('hidden');

      // Auto stop after 4 seconds for analysis
      setTimeout(() => {
        this.stopRecording();
      }, 4000);
    } else {
      this.stopRecording();
    }
  }

  stopRecording() {
    this.isRecording = false;
    const btn = document.getElementById('btn-speech-record');
    const status = document.getElementById('speech-status-text');
    const wave = document.getElementById('speech-waveform');
    const results = document.getElementById('speech-results-panel');

    btn.classList.remove('animate-ping');
    wave.classList.add('opacity-30');
    wave.classList.remove('animate-pulse');
    status.innerText = 'تم التحليل بنجاح!';
    results.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}
window.SpeechEvaluator = new SpeechEvaluatorModule();


/* ==========================================================================
   8. الذكاء الاصطناعي - سيناريوهات الحوار الحقيقية (AI Live Roleplay Engine)
   ========================================================================== */
class AIRoleplayModule {
  constructor() {
    this.currentRole = 'receptionist';
    this.rolesDb = {
      receptionist: {
        title: 'موظف استقبال فندق (Hotel Receptionist)',
        avatar: '🏨',
        greeting: "Hello! Welcome to The Grand Horizon Hotel. How may I assist you with your booking today?",
        context: "أنت الآن تفاوض أو تسجل دخولك في فندق 5 نجوم."
      },
      doctor: {
        title: 'طبيب العيادة (Clinic Doctor)',
        avatar: '👨‍⚕️',
        greeting: "Good morning! Please have a seat. What symptoms have you been experiencing lately?",
        context: "استشِر الطبيب واشرح له معاناتك الصحية أو أعراضك."
      },
      interview: {
        title: 'مدير توظيف في شركة عالمية (Job Interviewer)',
        avatar: '💼',
        greeting: "Thanks for joining us today. To start off, could you tell me a bit about your professional background?",
        context: "مقابلة عمل رسمية لتقييم مهاراتك وخبرتك."
      },
      friend: {
        title: 'صديق في مقهى (Casual Friend)',
        avatar: '☕',
        greeting: "Hey there! Long time no see! How was your weekend trip?",
        context: "حوار عامي خفيف بدون قيود حول أحداث الأسبوع."
      }
    };

    this.chatHistory = [];
  }

  renderChatRoom() {
    const role = this.rolesDb[this.currentRole];
    return `
      <div class="glass-card p-4 md:p-6 rounded-3xl space-y-4 border border-slate-800 max-w-4xl mx-auto flex flex-col h-[650px]">
        
        <!-- Top Role Selector & Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div class="flex items-center space-x-3 space-x-reverse">
            <span class="text-3xl">${role.avatar}</span>
            <div>
              <h3 class="text-base font-bold text-white">${role.title}</h3>
              <p class="text-xs text-slate-400">${role.context}</p>
            </div>
          </div>

          <!-- Role Dropdown Switcher -->
          <select onchange="AIRoleplay.switchRole(this.value)" class="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-bold focus:outline-none focus:border-accent-purple">
            <option value="receptionist" ${this.currentRole === 'receptionist' ? 'selected' : ''}>🏨 موظف استقبال</option>
            <option value="doctor" ${this.currentRole === 'doctor' ? 'selected' : ''}>👨‍⚕️ طبيب</option>
            <option value="interview" ${this.currentRole === 'interview' ? 'selected' : ''}>💼 مقابلة عمل</option>
            <option value="friend" ${this.currentRole === 'friend' ? 'selected' : ''}>☕ صديق في مقهى</option>
          </select>
        </div>

        <!-- Chat Messages Container -->
        <div id="ai-chat-messages" class="flex-1 overflow-y-auto space-y-4 p-2 scroll-smooth">
          
          <!-- Initial AI Message -->
          <div class="flex items-start space-x-3 space-x-reverse">
            <div class="w-8 h-8 rounded-xl bg-accent-purple/20 text-accent-purple flex items-center justify-center font-bold shrink-0 text-sm">
              AI
            </div>
            <div class="bg-slate-900/90 border border-slate-800/90 p-3.5 rounded-2xl rounded-tr-none max-w-[80%] space-y-1">
              <p class="text-sm font-en text-slate-100">${role.greeting}</p>
              <button onclick="window.LisanTTS.speak('${role.greeting}')" class="text-[10px] text-accent-purple hover:underline flex items-center space-x-1 space-x-reverse font-bold">
                <i data-lucide="volume-2" class="w-3 h-3"></i>
                <span>استمع</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Chat Input & Voice Control Bar -->
        <div class="border-t border-slate-800/80 pt-3 shrink-0 space-y-2">
          
          <form onsubmit="AIRoleplay.sendMessage(event)" class="flex items-center space-x-2 space-x-reverse">
            <input id="ai-user-input" type="text" placeholder="اكتب ردك باللغة الإنجليزية أو تحدث..." class="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition font-en">
            
            <button type="button" onclick="AIRoleplay.voiceInputSim()" class="p-3 bg-slate-800 hover:bg-slate-700 text-accent-rose rounded-2xl transition" title="إدخال بصوتك">
              <i data-lucide="mic" class="w-5 h-5"></i>
            </button>

            <button type="submit" class="px-5 py-3 bg-accent-purple hover:bg-indigo-600 text-white rounded-2xl text-xs font-bold transition flex items-center space-x-1 space-x-reverse shadow-lg shadow-accent-purple/20">
              <span>إرسال</span>
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>

          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>💡 عند إنهاء المحادثة سيقوم الذكاء الاصطناعي بتنفيذ تصحيح شامل لجميع أخطائك القواعدية واللغوية.</span>
            <button onclick="AIRoleplay.finishAndCorrect()" class="text-accent-amber font-bold hover:underline">
              إنهاء وتصحيح المحادثة 📝
            </button>
          </div>

        </div>

      </div>
    `;
  }

  switchRole(roleKey) {
    this.currentRole = roleKey;
    const view = document.getElementById('view-ai-chat');
    if (view) view.innerHTML = this.renderChatRoom();
    if (window.lucide) lucide.createIcons();
  }

  sendMessage(e) {
    e.preventDefault();
    const input = document.getElementById('ai-user-input');
    const text = input.value.trim();
    if (!text) return;

    const chatContainer = document.getElementById('ai-chat-messages');

    // 1. Append User Message
    chatContainer.innerHTML += `
      <div class="flex items-start justify-end space-x-3 space-x-reverse">
        <div class="bg-brand-600 text-white p-3.5 rounded-2xl rounded-tl-none max-w-[80%] font-en text-sm">
          ${text}
        </div>
      </div>
    `;

    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 2. Simulate AI Typing & Intelligent Response
    setTimeout(() => {
      const aiReply = "That sounds interesting! Could you elaborate more on that point so I can help you better?";
      chatContainer.innerHTML += `
        <div class="flex items-start space-x-3 space-x-reverse">
          <div class="w-8 h-8 rounded-xl bg-accent-purple/20 text-accent-purple flex items-center justify-center font-bold shrink-0 text-sm">
            AI
          </div>
          <div class="bg-slate-900/90 border border-slate-800/90 p-3.5 rounded-2xl rounded-tr-none max-w-[80%] space-y-1">
            <p class="text-sm font-en text-slate-100">${aiReply}</p>
            <button onclick="window.LisanTTS.speak('${aiReply}')" class="text-[10px] text-accent-purple hover:underline flex items-center space-x-1 space-x-reverse font-bold">
              <i data-lucide="volume-2" class="w-3 h-3"></i>
              <span>استمع</span>
            </button>
          </div>
        </div>
      `;
      chatContainer.scrollTop = chatContainer.scrollHeight;
      if (window.lucide) lucide.createIcons();
    }, 1200);
  }

  voiceInputSim() {
    const input = document.getElementById('ai-user-input');
    input.value = "I am looking for a room with an ocean view for three nights.";
  }

  finishAndCorrect() {
    alert("🔍 جاري تحليل المحادثة بالكامل وتجميع تقرير الأخطاء القواعدية واقتراح التركيبات الأكثر بلاغة...");
  }
}
window.AIRoleplay = new AIRoleplayModule();
