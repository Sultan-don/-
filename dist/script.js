/* ============================================================
   ORCHESTRA · Keynote Motion Engine
   Lenis + GSAP ScrollTrigger + SplitType + Internationalization
   ============================================================ */
(() => {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "power4.out";
  const chapters = Array.from(document.querySelectorAll("[data-chapter]"));

  /* =========================================================
     TRANSLATIONS (RU / UZ / EN)
     ========================================================= */
  const TRANSLATIONS = {
    ru: {
      loaderSub: "Инженерная ИИ-платформа",
      ovTitle: "Все разделы",
      heroEyebrow: "ORCHESTRA — ИНЖЕНЕРНАЯ ИИ-ПЛАТФОРМА",
      heroTitle1: "Один разработчик.",
      heroTitle2: "Команда ИИ-<em>инженеров</em>.",
      heroLead: "Подключите ваш GitHub. Превратите любой репозиторий в проект под управлением ИИ. Создавайте продукты за дни, а не месяцы.",
      scrollCueText: "Скролл",
      probEyebrow: "01 — ПРОБЛЕМА",
      probTitle: "Разработка стала главным узким местом.",
      stat1Cap: "рабочего времени уходит на баги, рефакторинг и рутину",
      stat2Cap: "дольше вывод на рынок, чем ожидают стейкхолдеры",
      stat3Cap: "рост стоимости команды инженеров за последние 10 лет",
      whyEyebrow: "02 — ПОЧЕМУ СЕЙЧАС",
      whyTitle: "Время пришло.",
      whyCap1: "мировой рынок разработки ПО — растёт с каждым годом",
      whyCap2: "разработчиков уже ежедневно используют ИИ-инструменты",
      whyCap3: "платформ с настоящей мультиагентной оркестрацией в GitHub",
      whyNote: "LLM достигли производственного качества. ИИ в кодинге стал нормой. Не хватало только инфраструктурного слоя.",
      solEyebrow: "03 — РЕШЕНИЕ",
      solTitle: "От репозитория до проекта под управлением ИИ за минуты.",
      step1Tag: "Интеграция",
      step1Title: "Подключите GitHub",
      step1Desc: "Привяжите аккаунт. Импортируйте существующие репозитории мгновенно с полным пониманием контекста.",
      step2Tag: "Движок задач",
      step2Title: "Создавайте задачи",
      step2Desc: "Описывайте задачи обычным языком. Наш роутинг разбивает сложные фичи на конкретные шаги.",
      step3Tag: "Параллельность",
      step3Title: "Запускайте агентов",
      step3Desc: "Несколько ИИ-инженеров работают параллельно — каждый со своей ролью в изолированной ветке.",
      step4Tag: "Рефакторинг",
      step4Title: "Генерация кода",
      step4Desc: "Агенты пишут чистый код, исправляют ошибки линтера, обновляют архитектуру и запускают тесты.",
      step5Tag: "Авто-PR",
      step5Title: "Ревью и мердж",
      step5Desc: "Pull Request создаётся автоматически с понятным описанием изменений. Вы ревьюите и мерджите в один клик.",
      step6Tag: "Ускорение",
      step6Title: "Релизим быстрее",
      step6Desc: "Ваш код развивается непрерывно с геометрической скоростью — быстрее, чем любая нанятая команда.",
      prodEyebrow: "04 — ПРОДУКТ",
      prodTitle: "Десять возможностей. Одно пространство.",
      cap1: "<b>Интеграция с GitHub</b> — подключение репозиториев, ветки, синхронизация в реальном времени",
      cap2: "<b>Управление задачами</b> — постановка задач, назначение агентов, отслеживание прогресса",
      cap3: "<b>ИИ-генерация кода</b> — агенты автономно пишут, рефакторят и исправляют код в ветках",
      cap4: "<b>Код-ревью и PR</b> — автоматическая проверка кода, анализ diff и создание Pull Request",
      cap5: "<b>Командный воркспейс</b> — общая среда, мониторинг проектов и история изменений",
      mktEyebrow: "05 — РЫНОК",
      mktTitle: "Инструменты разработки. Растущий рынок.",
      tamTitle: "Общий объем рынка (TAM)",
      samTitle: "Доступный рынок (SAM)",
      somTitle: "Реально достижимый (SOM)",
      tamDesc: "Глобальный рынок разработки программного обеспечения",
      samDesc: "ИИ-инструменты для разработчиков и ПО для повышения эффективности",
      somDesc: "Платформы мультиагентной разработки, доступный сегмент на 3 года",
      mktNote: "Источники: Gartner, IDC, a16z research. Оценки основаны на открытых отраслевых данных.",
      bizEyebrow: "06 — БИЗНЕС-МОДЕЛЬ",
      bizTitle: "Подписки. По мере использования. Enterprise.",
      bizCard1Title: "Место разработчика",
      bizCard1Desc: "Пользовательская подписка для индивидуальных разработчиков и небольших команд.",
      bizCard2Title: "Командный тариф",
      bizCard2Desc: "Общие репозитории, командное пространство, приоритетная очередь агентов.",
      bizCard3Title: "По мере использования",
      bizCard3Desc: "Оплата за агенто-часы для ресурсоёмких и масштабных вычислений.",
      bizCard3Metric: "за агенто-час",
      bizCard4Title: "Enterprise",
      bizCard4Desc: "Локальное развёртывание, SSO, аудит безопасности, выделенный SLA.",
      bizCard4Metric: "индивидуально",
      compEyebrow: "07 — КОНКУРЕНТЫ",
      compTitle: "Они делают ассистентов. Мы создаём команду.",
      compCol0: "Критерий / Фича", compCol1: "ORCHESTRA", compCol2: "Copilot / Cursor", compCol3: "Обычная команда",
      compRow1Label: "<b>Модель выполнения</b><span>Как делается работа</span>", compRow1Us: "✔ <b>Параллельность ИИ-агентов</b> <small>(Изолированные ветки)</small>", compRow1Other1: "✖ Автодополнение в IDE", compRow1Other2: "✔ Параллельно, но долго",
      compRow2Label: "<b>Автономность</b><span>Объем самостоятельной работы</span>", compRow2Us: "✔ <b>PR под ключ</b> <small>(План, код, тесты, ревью)</small>", compRow2Other1: "✖ Только сниппеты кода", compRow2Other2: "✔ Полный цикл (недели/месяцы)",
      compRow3Label: "<b>Интеграция с GitHub</b><span>Знание репозитория</span>", compRow3Us: "✔ <b>100% нативная синхронизация</b> <small>(Управление ветками)</small>", compRow3Other1: "~ Контекст локальных файлов", compRow3Other2: "✔ Ручной git-воркфлоу",
      compRow4Label: "<b>Скорость релиза</b><span>Время до продакшена</span>", compRow4Us: "⚡ <b>Минуты или часы</b> <small>(Ускорение в 10 раз)</small>", compRow4Other1: "⏱ Дни (зависит от человека)", compRow4Other2: "⏱ Недели и месяцы",
      compRow5Label: "<b>Экономика</b><span>Стоимость</span>", compRow5Us: "💰 <b>~$2 / агенто-час</b> <small>(Оплата по факту)</small>", compRow5Other1: "💲 $20/мес + зарплата", compRow5Other2: "💲 $80+ / час ($150K+/год)",
      compNote: "Orchestra — единственная платформа, объединяющая истинный параллелизм ИИ-агентов с полным управлением репозиториями GitHub.",
      techEyebrow: "08 — ТЕХНОЛОГИИ",
      techTitle: "GitHub API. Мультиагентная оркестрация. Синхронизация.",
      tech1Title: "GitHub API и управление контекстом",
      tech1Desc: "Полное понимание репозитория. Изоляция веток для каждого агента. Мгновенный синк.",
      tech2Title: "Мультиагентная оркестрация",
      tech2Desc: "Роутинг-движок распределяет задачи между параллельными агентами со специализациями.",
      tech3Title: "Инфраструктура LLM",
      tech3Desc: "Модельно-независимый слой. Лучшие LLM для генерации, рефакторинга и ревью кода.",
      tech4Title: "Слой безопасности",
      tech4Desc: "OAuth, разграничение прав, ваш код никогда не хранится за пределами вашего GitHub.",
      roadEyebrow: "09 — ДОРОЖНАЯ КАРТА",
      roadTitle: "От MVP до полноценной ИИ-платформы.",
      road1Desc: "Интеграция с GitHub, выполнение задач одним агентом, авто-PR, первые 500 пользователей.",
      road2Title: "Мультиагентность",
      road2Desc: "Параллельные агенты, ролевая модель, управление ветками, командные воркспейсы.",
      road3Title: "Платформа",
      road3Desc: "Enterprise-тариф, self-hosted версия, мультирепозитории, экосистема интеграций.",
      road4Title: "ИИ-платформа разработки",
      road4Desc: "Полный автономный цикл разработки. Агенты сами проектируют, пишут, тестируют и деплоят.",
      visEyebrow: "10 — ВИДЕНИЕ",
      visTitle1: "Будущее разработки —",
      visTitle2: "один человек во главе команды <em>ИИ-инженеров</em>.",
      invEyebrow: "11 — ИНВЕСТИЦИИ",
      invTitle: "Раунд инвестиций.",
      invRound: "Seed · SAFE",
      invUse1: "Команда инженеров",
      invUse2: "LLM и инфраструктура",
      invUse3: "Разработка продукта",
      invUse4: "Рост и международная экспансия",
      invNote: "18 месяцев runway. Цель: 10K активных разработчиков, первые enterprise-контракты, готовность к Series A.",
      thanksSlogan: "Один разработчик. Команда ИИ-инженеров.",
      zoomHintText: "Увеличить",
      ch0: "Главная", ch1: "Проблема", ch2: "Почему сейчас", ch3: "Решение", ch4: "Продукт", ch5: "Рынок",
      ch6: "Бизнес-модель", ch7: "Конкуренты", ch8: "Технологии", ch9: "Дорожная карта", ch10: "Видение", ch11: "Инвестиции", ch12: "Контакты"
    },
    uz: {
      loaderSub: "AI Muhandislik Platformasi",
      ovTitle: "Barcha bo'limlar",
      heroEyebrow: "ORCHESTRA — AI MUHANDISLIK PLATFORMASI",
      heroTitle1: "Bitta dasturchi.",
      heroTitle2: "AI <em>muhandislar</em> jamoasi.",
      heroLead: "GitHub hisobingizni ulang. Har qanday repozitoriyni AI boshqaruvidagi loyihaga aylantiring. Oylar emas, kunlar ichida mahsulot yarating.",
      scrollCueText: "Pastga",
      probEyebrow: "01 — MUAMMO",
      probTitle: "Dasturlash jarayoni asosiy to'siqqa aylandi.",
      stat1Cap: "dasturchi vaqti xatolar, refaktoring va takrorlanuvchi kodlarga sarflanmoqda",
      stat2Cap: "bozorga chiqish vaqti kutilganidan uzoqroq davom etmoqda",
      stat3Cap: "so'nggi o'n yillikda muhandislar xarajatining o'sishi",
      whyEyebrow: "02 — NEGA AYNAN HOZIR",
      whyTitle: "Waqti keldi.",
      whyCap1: "global dasturiy ta'minot bozori — har yili barqaror o'smoqda",
      whyCap2: "dasturchilar allaqachon AI kodlash vositalaridan har kuni foydalanmoqda",
      whyCap3: "GitHub-da haqiqiy ko'p agentli orkestratsiyani taklif qiluvchi platformalar",
      whyNote: "LLM modellar ishlab chiqarish sifatiga yetdi. AI yordamida kodlash odatiy holga aylandi. Faqat infratuzilma qatlami yetishmayotgan edi.",
      solEyebrow: "03 — YECHIM",
      solTitle: "Repozitoriydan AI boshqaruvidagi loyihagacha bir necha daqiqada.",
      step1Tag: "Sinxronizatsiya",
      step1Title: "GitHub-ni ulang",
      step1Desc: "Hisobingizni ulang. Mavjud loyihalaringizni to'liq kontekst tushunchasi bilan lahzada import qiling.",
      step2Tag: "Vazifalar dvigateli",
      step2Title: "Vazifa yarating",
      step2Desc: "Vazifalarni oddiy tilda yozing. Bizning routing tizimimiz murakkab funksiyalarni aniq qadamlarga ajratadi.",
      step3Tag: "Parallel ishchilar",
      step3Title: "Agentlarni ishga tushiring",
      step3Desc: "Bir necha AI muhandislar parallel ishlaydi — har biri maxsus rol va alohida git branch bilan.",
      step4Tag: "Kodlash va refaktoring",
      step4Title: "Kod generatsiyasi",
      step4Desc: "Agentlar toza kod yozadi, linter xatolarini tuzatadi, arxitekturani yangilaydi va testlarni o'tkazadi.",
      step5Tag: "Avto PR",
      step5Title: "Tekshirish va birlashtirish",
      step5Desc: "Pull Request avtomatik ravishda tushunarli diff izohi bilan ochiladi. Siz tekshirasiz va bir klik bilan merj qilasiz.",
      step6Tag: "Tezlashtirish",
      step6Title: "Tezroq reliz qiling",
      step6Desc: "Kod bazangiz doimiy va tez sur'atda o'sadi — istalgan yollangan jamoaga qaraganda tezroq.",
      prodEyebrow: "04 — MAHSULOT",
      prodTitle: "O'nlab imkoniyatlar. Yagona ish hududi.",
      cap1: "<b>GitHub integratsiyasi</b> — repozitoriylarni ulovchi, branchlar va real vaqtda sinxronizatsiya",
      cap2: "<b>Vazifalarni boshqarish</b> — vazifa qo'yish, agentlarni tayinlash va jarayonni kuzatish",
      cap3: "<b>AI kod generatsiyasi</b> — agentlar branchlarda mustaqil kod yozadi va xatolarni tuzatadi",
      cap4: "<b>Code Review & PR</b> — kodni avtomatik tekshirish, diff tahlili va Pull Request yaratish",
      cap5: "<b>Jamoaviy ish hududi</b> — umumiy muhit, loyihani monitoring qilish va o'zgarishlar tarixi",
      mktEyebrow: "05 — BOZOR",
      mktTitle: "Dasturchilar vositalari. Doimiy o'suvchi bozor.",
      tamTitle: "Umumiy bozor hajmi (TAM)",
      samTitle: "Xizmat ko'rsatish bozori (SAM)",
      somTitle: "Erishiladigan bozor (SOM)",
      tamDesc: "Global dasturiy ta'minot ishlab chiqarish bozori",
      samDesc: "AI dasturlash vositalari va muhandislik samaradorligi dasturlari",
      somDesc: "Ko'p agentli dasturlash platformalari, 3 yillik maqsadli segment",
      mktNote: "Manbalar: Gartner, IDC, a16z tahlillari. Qiymatlar ochiq sanoat ma'lumotlariga asoslangan.",
      bizEyebrow: "06 — BIZNES MODEL",
      bizTitle: "Abonent. Foydalanishga qarab. Enterprise.",
      bizCard1Title: "Dasturchi o'rni",
      bizCard1Desc: "Yakkabosh dasturchilar va kichik jamoalar uchun oylik obuna.",
      bizCard2Title: "Jamoaviy reja",
      bizCard2Desc: "Umumiy ish hududi, jamoaviy repozitoriylar, agentlar uchun ustuvor navbat.",
      bizCard3Title: "Foydalanishga qarab",
      bizCard3Desc: "Katta va murakkab hisoblashlar uchun sarflangan agent-soatiga to'lov.",
      bizCard3Metric: "har agent-soatiga",
      bizCard4Title: "Enterprise",
      bizCard4Desc: "Shaxsiy serverda o'rnatish, SSO, xavfsizlik auditi, maxsus SLA.",
      bizCard4Metric: "kelishilgan holda",
      compEyebrow: "07 — RAQOBAT",
      compTitle: "Boshqalar yordamchi yaratadi. Biz jamoa kuramiz.",
      compCol0: "Mezon / Imkoniyat", compCol1: "ORCHESTRA", compCol2: "Copilot / Cursor", compCol3: "An'anaviy jamoa",
      compRow1Label: "<b>Bajarish modeli</b><span>Ish qanday bajariladi</span>", compRow1Us: "✔ <b>Ko'p agentli parallellik</b> <small>(Alohida branchlar)</small>", compRow1Other1: "✖ IDE-da avtomat to'ldirish", compRow1Other2: "✔ Parallel, ammo sekin",
      compRow2Label: "<b>Avtonomlik</b><span>Mustaqil ish ko'lami</span>", compRow2Us: "✔ <b>To'liq PR tayyorlash</b> <small>(Reja, kod, review)</small>", compRow2Other1: "✖ Faqat kod qismlari", compRow2Other2: "✔ To'liq sikl (haftalar/oylar)",
      compRow3Label: "<b>GitHub integratsiyasi</b><span>Repozitoriy tushunchasi</span>", compRow3Us: "✔ <b>100% nativ sinxronizatsiya</b> <small>(Branchlar)</small>", compRow3Other1: "~ Mahalliy fayllar konteksti", compRow3Other2: "✔ Qo'lda git jarayonlari",
      compRow4Label: "<b>Reliz tezligi</b><span>Prodga chiqish vaqti</span>", compRow4Us: "⚡ <b>Daqiqa yoki soatlar</b> <small>(10x tezlik)</small>", compRow4Other1: "⏱ Kunlar (insonga bog'liq)", compRow4Other2: "⏱ Haftalar va oylar",
      compRow5Label: "<b>Iqtisodiy samaradorlik</b><span>Xarajat</span>", compRow5Us: "💰 <b>~$2 / agent-soat</b> <small>(Foydalanishingizga qarab)</small>", compRow5Other1: "💲 $20/oy + oylik maosh", compRow5Other2: "💲 $80+ / soat ($150K+/yil)",
      compNote: "Orchestra — AI agentlar parallelligini GitHub repozitoriylarini to'liq boshqarish bilan birlashtiruvchi yagona platforma.",
      techEyebrow: "08 — TEXNOLOGIYALAR",
      techTitle: "GitHub API. Ko'p agentli orkestratsiya. Sinxronizatsiya.",
      tech1Title: "GitHub API va kontekstni boshqarish",
      tech1Desc: "Repozitoriyni to'liq tushunish. Har bir agent uchun alohida branch. Lahzalik sinxronizatsiya.",
      tech2Title: "Ko'p agentli orkestratsiya",
      tech2Desc: "Vazifalarni taqsimlash tizimi ishlarni ixtisoslashgan parallel agentlarga yo'naltiradi.",
      tech3Title: "LLM infratuzilmasi",
      tech3Desc: "Modelga bog'liq bo'lmagan qatlam. Kod yozish va review uchun eng ilg'or LLM modellar.",
      tech4Title: "Xavfsizlik qatlami",
      tech4Desc: "OAuth, aniq ruxsatlar, sizning kodingiz hech qachon GitHub-dan tashqarida saqlanmaydi.",
      roadEyebrow: "09 — YO'L XARITASI",
      roadTitle: "MVP dan AI Muhandislik Platformasigacha.",
      road1Desc: "GitHub integratsiyasi, yagona agent bilan vazifa bajarish, avto PR, ilk 500 foydalanuvchi.",
      road2Title: "Ko'p agentlilik",
      road2Desc: "Parallel agentlar, rollar taqsimoti, branchlarni boshqarish, jamoaviy hududlar.",
      road3Title: "Platforma",
      road3Desc: "Enterprise daraja, self-hosted opsiyasi, multi-repozitoriy, integratsiyalar ekotizimi.",
      road4Title: "AI Muhandislik Platformasi",
      road4Desc: "To'liq avtonom muhandislik sikli. Agentlar o'zi rejalashtirib, kodlab, testdan o'tkazib deploy qiladi.",
      visEyebrow: "10 — KELAJAK KO'RISHI",
      visTitle1: "Dasturlash kelajagi —",
      visTitle2: "AI <em>muhandislar</em> jamoasini boshqaruvchi bir inson.",
      invEyebrow: "11 — INVESTITSIYA",
      invTitle: "Investitsiya raundi.",
      invRound: "Seed · SAFE",
      invUse1: "Muhandislar jamoasi",
      invUse2: "LLM va infratuzilma",
      invUse3: "Mahsulotni rivojlantirish",
      invUse4: "O'sish va xalqaro bozorga chiqish",
      invNote: "18 oylik zaxira. Maqsad: 10K faol dasturchilar, ilk enterprise shartnomalar, Series A tayyorgarligi.",
      thanksSlogan: "Bitta dasturchi. AI muhandislar jamoasi.",
      zoomHintText: "Kattalashtirish",
      ch0: "Bosh sahifa", ch1: "Muammo", ch2: "Nega hozir", ch3: "Yechim", ch4: "Mahsulot", ch5: "Bozor",
      ch6: "Biznes model", ch7: "Raqobat", ch8: "Texnologiya", ch9: "Yo'l xaritasi", ch10: "Kelajak", ch11: "Investitsiya", ch12: "Aloqa"
    },
    en: {
      loaderSub: "AI Engineering Platform",
      ovTitle: "All Sections",
      heroEyebrow: "ORCHESTRA — AI ENGINEERING PLATFORM",
      heroTitle1: "One developer.",
      heroTitle2: "A team of AI <em>engineers</em>.",
      heroLead: "Connect your GitHub. Turn any repository into an AI-managed project. Ship in days, not months.",
      scrollCueText: "Scroll",
      probEyebrow: "01 — THE PROBLEM",
      probTitle: "Development became the bottleneck.",
      stat1Cap: "of dev time lost to bugs, refactoring, and boilerplate",
      stat2Cap: "longer time-to-market than stakeholders expect",
      stat3Cap: "engineer cost increase in the last decade",
      whyEyebrow: "02 — WHY NOW",
      whyTitle: "The moment is here.",
      whyCap1: "global software development market — growing every year",
      whyCap2: "of developers now use AI coding tools daily",
      whyCap3: "platforms offering true multi-agent dev orchestration on GitHub",
      whyNote: "LLMs reached production quality. AI coding went mainstream. The infrastructure layer is missing.",
      solEyebrow: "03 — SOLUTION",
      solTitle: "From repository to AI-managed project in minutes.",
      step1Tag: "GitHub Sync",
      step1Title: "Connect GitHub",
      step1Desc: "Link your account. Import existing repositories instantly with full context awareness and branch mapping.",
      step2Tag: "Task Engine",
      step2Title: "Create Tasks",
      step2Desc: "Define tasks in plain language. Our routing engine breaks down complex features into actionable steps.",
      step3Tag: "Parallel Workers",
      step3Title: "Deploy Agents",
      step3Desc: "Multiple AI engineers work in parallel — each assigned a specialized role on an isolated git branch.",
      step4Tag: "Code & Refactor",
      step4Title: "Generate Code",
      step4Desc: "Agents write production-ready code, resolve linter warnings, refactor legacy modules, and run unit tests.",
      step5Tag: "Automated PRs",
      step5Title: "Review & Merge",
      step5Desc: "Pull requests are automatically opened with comprehensive diff summaries. You review, approve, and merge in one click.",
      step6Tag: "Continuous Delivery",
      step6Title: "Ship Faster",
      step6Desc: "Your codebase evolves continuously with compounding engineering velocity — faster than any human team could scale.",
      prodEyebrow: "04 — PRODUCT",
      prodTitle: "Ten capabilities. One workspace.",
      cap1: "<b>GitHub Integration</b> — connect repos, import branches, sync in real time",
      cap2: "<b>Task Management</b> — create tasks, assign agents, track progress",
      cap3: "<b>AI Code Generation</b> — agents write, refactor, and fix code autonomously",
      cap4: "<b>Code Review & PRs</b> — automated review, diff analysis, pull request creation",
      cap5: "<b>Team Workspace</b> — shared environment, project monitoring, history tracking",
      mktEyebrow: "05 — MARKET",
      mktTitle: "Developer tools. A market that keeps growing.",
      tamTitle: "Total Addressable Market",
      samTitle: "Serviceable Addressable Market",
      somTitle: "Serviceable Obtainable Market",
      tamDesc: "Global software development market",
      samDesc: "AI developer tools & engineering productivity software",
      somDesc: "Multi-agent dev platforms, 3-year addressable segment",
      mktNote: "Sources: Gartner, IDC, a16z market research. Estimates based on published industry data.",
      bizEyebrow: "06 — BUSINESS MODEL",
      bizTitle: "Seat-based. Usage-based. Enterprise.",
      bizCard1Title: "Developer Seats",
      bizCard1Desc: "Per-seat subscription for individual developers and small teams.",
      bizCard2Title: "Team Plan",
      bizCard2Desc: "Shared workspace, team repos, priority agent queues.",
      bizCard3Title: "Usage-Based AI",
      bizCard3Desc: "Pay per agent-hour for compute-intensive workloads.",
      bizCard3Metric: "per agent-hour",
      bizCard4Title: "Enterprise",
      bizCard4Desc: "Self-hosted deployment, SSO, audit logs, SLA.",
      bizCard4Metric: "custom",
      compEyebrow: "07 — COMPETITIVE LANDSCAPE",
      compTitle: "Code assistants. We build the team.",
      compCol0: "Feature / Criterion", compCol1: "ORCHESTRA", compCol2: "Copilot / Cursor", compCol3: "Human Dev Team",
      compRow1Label: "<b>Execution Model</b><span>How work is performed</span>", compRow1Us: "✔ <b>Multi-Agent Parallelism</b> <small>(Isolated branches)</small>", compRow1Other1: "✖ Single-prompt IDE autocomplete", compRow1Other2: "✔ Parallel but communication-heavy",
      compRow2Label: "<b>Task Autonomy</b><span>Scope of autonomous work</span>", compRow2Us: "✔ <b>End-to-End PR Delivery</b> <small>(Plan, code, review)</small>", compRow2Other1: "✖ Snippets &amp; file edits only", compRow2Other2: "✔ Full cycle (weeks/months)",
      compRow3Label: "<b>GitHub Integration</b><span>Repo awareness</span>", compRow3Us: "✔ <b>100% Native Sync</b> <small>(Branch mapping)</small>", compRow3Other1: "~ Local file/workspace context", compRow3Other2: "✔ Manual git workflows",
      compRow4Label: "<b>Time to Ship</b><span>Delivery velocity</span>", compRow4Us: "⚡ <b>Minutes to Hours</b> <small>(10x velocity)</small>", compRow4Other1: "⏱ Days (human dependent)", compRow4Other2: "⏱ Weeks to Months",
      compRow5Label: "<b>Cost Efficiency</b><span>Economics</span>", compRow5Us: "💰 <b>~$2 / agent-hour</b> <small>(Pay as you use)</small>", compRow5Other1: "💲 $20/mo + human salary", compRow5Other2: "💲 $80+ / hr ($150K+/yr)",
      compNote: "Orchestra is the only platform that combines true multi-agent parallelism with full GitHub repository management — not just a code assistant.",
      techEyebrow: "08 — TECHNOLOGY",
      techTitle: "GitHub API. Multi-agent orchestration. Real-time sync.",
      tech1Title: "GitHub API & Context Management",
      tech1Desc: "Full repository awareness. Branch isolation per agent. Real-time sync.",
      tech2Title: "Multi-Agent Orchestration",
      tech2Desc: "Task routing engine assigns work across parallel agents with defined roles.",
      tech3Title: "LLM Infrastructure",
      tech3Desc: "Model-agnostic layer. Best-in-class LLMs for code generation and review.",
      tech4Title: "Security Layer",
      tech4Desc: "OAuth, scoped permissions, no code stored outside your GitHub — ever.",
      roadEyebrow: "09 — ROADMAP",
      roadTitle: "From MVP to AI Engineering Platform.",
      road1Desc: "GitHub integration, single-agent task execution, PR generation, first 500 users.",
      road2Title: "Multi-Agent",
      road2Desc: "Parallel agents, role assignment, branch management, team workspaces.",
      road3Title: "Platform",
      road3Desc: "Enterprise tier, self-hosted option, multi-repo support, integrations ecosystem.",
      road4Title: "AI Engineering Platform",
      road4Desc: "Full autonomous engineering lifecycle. Agents that plan, build, test, and deploy.",
      visEyebrow: "10 — VISION",
      visTitle1: "The future of development",
      visTitle2: "is one human, leading a team of <em>AI engineers</em>.",
      invEyebrow: "11 — INVESTMENT",
      invTitle: "We are raising.",
      invRound: "Seed · SAFE",
      invUse1: "Engineering team",
      invUse2: "LLM & infrastructure",
      invUse3: "Product development",
      invUse4: "Growth & international expansion",
      invNote: "18-month runway. Goal: 10K active developers, first enterprise contracts, Series A ready.",
      thanksSlogan: "One developer. A team of AI engineers.",
      zoomHintText: "Zoom in",
      ch0: "Home", ch1: "Problem", ch2: "Why Now", ch3: "Solution", ch4: "Product", ch5: "Market",
      ch6: "Business Model", ch7: "Competition", ch8: "Technology", ch9: "Roadmap", ch10: "Vision", ch11: "Investment", ch12: "Contact"
    }
  };

  /* =========================================================
     LOADER
     ========================================================= */
  const loader = document.getElementById("loader");
  function finishLoad() {
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.start();
  }

  function runLoader() {
    if (REDUCED || !window.gsap) {
      if (loader) loader.style.display = "none";
      finishLoad();
      return;
    }
    document.body.style.overflow = "hidden";
    const word = loader.querySelector(".loader__word");
    const sub = loader.querySelector(".loader__sub");
    
    let letters = word.textContent;
    word.innerHTML = letters.split("").map((c) => `<span>${c}</span>`).join("");
    const spans = word.querySelectorAll("span");

    const tl = gsap.timeline({ onComplete: finishLoad });
    gsap.set("#c01", { y: window.innerHeight });
    gsap.set(spans, { yPercent: 120, opacity: 0 });
    gsap.set(sub, { opacity: 0 });
    tl.to(spans, { yPercent: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.04 }, 0.1)
      .to(sub, { opacity: 1, duration: 0.5 }, 0.4)
      .to({}, { duration: 0.2 })
      .to(spans, { y: -50, opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.02 }, 1.1)
      .to(sub, { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" }, 1.1)
      .to("#c01", { y: 0, duration: 1.2, ease: "power4.out" }, 1.3)
      .to(loader, { opacity: 0, duration: 0.8, ease: "power2.out" }, 1.3)
      .set(loader, { display: "none" })
      .add(() => loader.classList.add("is-done"));
  }

  /* =========================================================
     LENIS SMOOTH SCROLL
     ========================================================= */
  let lenis = null;
  if (window.Lenis && !REDUCED) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    lenis.stop();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
  }

  function scrollToChapter(i) {
    const el = chapters[i];
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
  }

  /* =========================================================
     GSAP SETUP & REVEALS
     ========================================================= */
  let demoST = null;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* ---- TEXT: split-line reveals (headlines) ---- */
    function initSplitLines() {
      document.querySelectorAll("[data-split]").forEach((el) => {
        if (REDUCED) return;
        if (el._splitInstance) el._splitInstance.revert();
        const split = new SplitType(el, { types: "lines", lineClass: "line-inner" });
        el._splitInstance = split;
        split.lines.forEach((ln) => {
          if (ln.parentNode && !ln.parentNode.classList.contains("split-wrap")) {
            const wrap = document.createElement("span");
            wrap.className = "split-wrap";
            wrap.style.display = "block";
            wrap.style.overflow = "hidden";
            ln.parentNode.insertBefore(wrap, ln);
            wrap.appendChild(ln);
          }
        });
        gsap.set(split.lines, { yPercent: 115 });
        ScrollTrigger.create({
          trigger: el, start: "top 85%",
          onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.08, overwrite: "auto" }),
        });
      });
    }
    initSplitLines();
    window._initSplitLines = initSplitLines;

    /* ---- HERO / VISION line masks ---- */
    document.querySelectorAll("[data-line]").forEach((line) => {
      const inner = document.createElement("span");
      inner.style.display = "block";
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
      if (REDUCED) return;
      gsap.set(inner, { yPercent: 120 });
      ScrollTrigger.create({
        trigger: line, start: "top 92%",
        onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.2, ease: EASE }),
      });
    });

    /* ---- Generic reveals ---- */
    if (!REDUCED) {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el, start: "top 88%",
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: EASE }),
        });
      });
      /* Step Cards reveal */
      gsap.utils.toArray(".step-card").forEach((card, idx) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, delay: (idx % 3) * 0.1, ease: EASE,
          scrollTrigger: { trigger: card, start: "top 88%" }
        });
      });
    } else {
      gsap.set("[data-reveal], .step-card", { opacity: 1, y: 0 });
    }

    /* ---- Parallax media ---- */
    if (!REDUCED) {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax) || 0.15;
        const target = el.querySelector(".problem__visual-grid, .vision__bg-glow") || el;
        gsap.fromTo(target, { yPercent: -amt * 50 }, {
          yPercent: amt * 50, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }

    /* ---- Number count-ups ---- */
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count) || 0;
      const dec = parseInt(el.dataset.decimals || (el.dataset.count.includes(".") ? "1" : "0"), 10);
      const pre = el.dataset.prefix || "";
      const suf = el.dataset.suffix || "";
      const text = el.dataset.text || null;
      const render = (v) => {
        const num = typeof v === "number" ? v : parseFloat(v) || 0;
        el.textContent = text && num >= end ? text : pre + num.toFixed(dec) + suf;
      };
      if (REDUCED) { render(end); return; }
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => gsap.to(obj, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => render(obj.v) }),
      });
    });

    /* ---- Rings (market) ---- */
    ScrollTrigger.create({
      trigger: ".rings", start: "top 78%", once: true,
      onEnter: () => {
        if (REDUCED) { gsap.set(".ring", { xPercent: -50, yPercent: -50, opacity: 1, scale: 1 }); return; }
        gsap.to(".ring--tam", { opacity: 1, scale: 1, duration: 1, ease: EASE });
        gsap.to(".ring--sam", { opacity: 1, scale: 1, duration: 1, ease: EASE, delay: 0.15 });
        gsap.to(".ring--som", { opacity: 1, scale: 1, duration: 1, ease: EASE, delay: 0.3 });
      },
    });
    gsap.set(".ring", { xPercent: -50, yPercent: -50, scale: 0.3, opacity: 0 });

    /* ---- Timeline fill + milestones ---- */
    const tFill = document.getElementById("timelineFill");
    if (tFill) {
      if (REDUCED) tFill.style.width = "100%";
      else gsap.to(tFill, { width: "100%", ease: "none",
        scrollTrigger: { trigger: "#timeline", start: "top 70%", end: "bottom 85%", scrub: 0.5 } });
    }
    document.querySelectorAll(".milestone").forEach((m) => {
      ScrollTrigger.create({ trigger: m, start: "top 80%", onEnter: () => m.classList.add("is-in") });
    });

    /* ---- Investment use bars ---- */
    gsap.utils.toArray(".use").forEach((u) => {
      const bar = u.querySelector(".use__bar span");
      const w = getComputedStyle(u).getPropertyValue("--w").trim() || "50%";
      if (REDUCED) { bar.style.width = w; return; }
      ScrollTrigger.create({ trigger: u, start: "top 85%", once: true,
        onEnter: () => gsap.to(bar, { width: w, duration: 1.2, ease: EASE }) });
    });

    /* ---- Product demo: horizontal pin scroll with Indicator Update ---- */
    const track = document.getElementById("demoTrack");
    if (track && !REDUCED && window.innerWidth > 600) {
      const getDist = () => Math.max(track.scrollWidth - window.innerWidth + 80, 0);
      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: "#c05",
          start: "top top",
          end: () => "+=" + getDist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateDemoIndicator(self.progress);
          }
        }
      });
      demoST = ScrollTrigger.getAll().find((st) => st.trigger === document.getElementById("c05"));
    }

    function updateDemoIndicator(progress) {
      const dots = document.querySelectorAll("#demoDots .demo__dot");
      const ind = document.getElementById("demoIndicator");
      if (!dots.length) return;
      const idx = Math.min(Math.floor(progress * dots.length), dots.length - 1);
      dots.forEach((d, k) => d.classList.toggle("is-active", k === idx));
      if (ind) ind.textContent = `0${idx + 1} / 0${dots.length}`;
    }

    /* Clickable indicator dots to scroll horizontally */
    document.querySelectorAll("#demoDots .demo__dot").forEach((dot, k) => {
      dot.style.cursor = "pointer";
      dot.addEventListener("click", () => {
        if (!demoST) return;
        const targetY = demoST.start + (k / 4) * (demoST.end - demoST.start);
        if (lenis) lenis.scrollTo(targetY, { duration: 1.0 });
        else window.scrollTo({ top: targetY, behavior: "smooth" });
      });
    });

    /* ---- Thank-you logo draw ---- */
    const tLogo = document.getElementById("thanksLogo");
    if (tLogo && !REDUCED) {
      gsap.set(tLogo, { opacity: 0, scale: 0.94, filter: "blur(8px)" });
      ScrollTrigger.create({ trigger: tLogo, start: "top 80%", once: true,
        onEnter: () => gsap.to(tLogo, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: EASE }) });
    }

    /* ---- Per-chapter theme + nav state ---- */
    chapters.forEach((ch, i) => {
      ScrollTrigger.create({
        trigger: ch, start: "top 55%", end: "bottom 55%",
        onToggle: (self) => { if (self.isActive) setActive(i, ch); },
      });
    });
  }

  /* =========================================================
     NAV: dots, chapter label, theme, scrub
     ========================================================= */
  const rail = document.getElementById("rail");
  const navNum = document.getElementById("navNum");
  const navName = document.getElementById("navName");
  const scrubBar = document.getElementById("scrubBar");
  const themeMap = chapters.map((c) => c.dataset.theme || "light");

  chapters.forEach((ch, i) => {
    const dot = document.createElement("button");
    dot.className = "rail__dot";
    dot.setAttribute("aria-label", (i + 1) + ". " + ch.dataset.name);
    dot.addEventListener("click", () => scrollToChapter(i));
    rail.appendChild(dot);
  });
  const dots = Array.from(rail.children);
  let current = 0;

  function setActive(i, ch) {
    current = i;
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    navNum.textContent = String(i + 1).padStart(2, "0");
    const activeLang = document.documentElement.lang || "ru";
    const t = TRANSLATIONS[activeLang] || TRANSLATIONS["ru"];
    navName.textContent = t["ch" + i] || ch.dataset.name;
    document.body.setAttribute("data-theme", themeMap[i]);
  }
  chapters.forEach((ch) => ch.setAttribute("data-theme", ch.dataset.theme || "light"));

  /* ---- Scrub bar on scroll ---- */
  function updateScrub() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? window.scrollY / h : 0;
    scrubBar.style.width = (p * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateScrub, { passive: true });
  if (lenis) lenis.on("scroll", updateScrub);
  updateScrub();

  /* =========================================================
     OVERVIEW GRID
     ========================================================= */
  const overview = document.getElementById("overview");
  const ovGrid = document.getElementById("overviewGrid");
  const navChapter = document.getElementById("navChapter");
  const ovClose = document.getElementById("overviewClose");

  chapters.forEach((ch, i) => {
    const b = document.createElement("button");
    b.className = "ov-card";
    const activeLang = document.documentElement.lang || "ru";
    const tName = (TRANSLATIONS[activeLang] && TRANSLATIONS[activeLang]["ch" + i]) || ch.dataset.name;
    b.innerHTML = `<span>${String(i + 1).padStart(2, "0")}</span><b>${tName}</b>`;
    b.addEventListener("click", () => { closeOverview(); scrollToChapter(i); });
    ovGrid.appendChild(b);
  });
  function openOverview() { overview.classList.add("is-open"); overview.setAttribute("aria-hidden", "false"); navChapter.setAttribute("aria-expanded", "true"); }
  function closeOverview() { overview.classList.remove("is-open"); overview.setAttribute("aria-hidden", "true"); navChapter.setAttribute("aria-expanded", "false"); }
  navChapter.addEventListener("click", () => overview.classList.contains("is-open") ? closeOverview() : openOverview());
  ovClose.addEventListener("click", closeOverview);

  /* =========================================================
     KEYBOARD + WHEEL PIN STEPPING + FULLSCREEN
     ========================================================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overview.classList.contains("is-open") ? closeOverview() : openOverview();
    }
    else if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      /* Step through horizontal slides in Section 04 (#c05) before scrolling down */
      if (demoST && ((chapters[current] && chapters[current].id === "c05") || (window.scrollY >= demoST.start - 80 && window.scrollY <= demoST.end - 15))) {
        const sy = window.scrollY;
        const startY = demoST.start;
        const endY = demoST.end;
        const stepDist = (endY - startY) / 4;
        if (sy < endY - 15) {
          for (let k = 1; k <= 4; k++) {
            const targetY = startY + k * stepDist;
            if (targetY > sy + 15) {
              if (lenis) lenis.scrollTo(targetY, { duration: 1.0 });
              else window.scrollTo({ top: targetY, behavior: "smooth" });
              return;
            }
          }
        }
      }
      scrollToChapter(Math.min(current + 1, chapters.length - 1));
    }
    else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey)) {
      e.preventDefault();
      /* Step backwards through horizontal slides in Section 04 (#c05) */
      if (demoST && ((chapters[current] && chapters[current].id === "c05") || (window.scrollY >= demoST.start + 15 && window.scrollY <= demoST.end + 80))) {
        const sy = window.scrollY;
        const startY = demoST.start;
        const endY = demoST.end;
        const stepDist = (endY - startY) / 4;
        if (sy > startY + 15) {
          for (let k = 3; k >= 0; k--) {
            const targetY = startY + k * stepDist;
            if (targetY < sy - 15) {
              if (lenis) lenis.scrollTo(targetY, { duration: 1.0 });
              else window.scrollTo({ top: targetY, behavior: "smooth" });
              return;
            }
          }
        }
      }
      scrollToChapter(Math.max(current - 1, 0));
    }
    else if (e.key === "Home") { e.preventDefault(); scrollToChapter(0); }
    else if (e.key === "End") { e.preventDefault(); scrollToChapter(chapters.length - 1); }
    else if (e.key === "f" || e.key === "F") { toggleFullscreen(); }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.preventDefault(); scrollToChapter(parseInt(btn.dataset.goto, 10)); });
  });

  /* =========================================================
     LANGUAGE SWITCHER (RU / UZ / EN)
     ========================================================= */
  function setLanguage(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    document.documentElement.lang = lang;
    document.querySelectorAll("#langSwitcher .lang-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    
    Object.keys(t).forEach(id => {
      if (id.startsWith("ch")) {
        const idx = parseInt(id.replace("ch", ""), 10);
        if (chapters[idx]) {
          chapters[idx].dataset.name = t[id];
          const dot = rail.children[idx];
          if (dot) dot.setAttribute("aria-label", (idx + 1) + ". " + t[id]);
          const ovCard = ovGrid.children[idx];
          if (ovCard) {
            const b = ovCard.querySelector("b");
            if (b) b.textContent = t[id];
          }
        }
        if (current === idx && navName) navName.textContent = t[id];
      } else if (id === "zoomHintText") {
        document.querySelectorAll(".zoom-hint-text").forEach(el => el.textContent = t[id]);
      } else {
        const el = document.getElementById(id);
        if (el) el.innerHTML = t[id];
      }
    });

    if (window._updateLightboxLanguage) window._updateLightboxLanguage();

    if (window._initSplitLines) window._initSplitLines();
    if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 150);
  }

  document.querySelectorAll("#langSwitcher .lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* =========================================================
     FULLSCREEN BUTTON
     ========================================================= */
  const fsBtn = document.getElementById("fullscreenBtn");
  if (fsBtn) {
    const iconExpand = fsBtn.querySelector(".icon-expand");
    const iconCompress = fsBtn.querySelector(".icon-compress");
    const fsText = fsBtn.querySelector(".fullscreen-btn__text");

    function updateFullscreenUI() {
      const isFullscreen = !!document.fullscreenElement;
      if (iconExpand) iconExpand.style.display = isFullscreen ? "none" : "";
      if (iconCompress) iconCompress.style.display = isFullscreen ? "" : "none";
      if (fsText) fsText.textContent = isFullscreen ? "Exit" : "Fullscreen";
    }

    fsBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    document.addEventListener("fullscreenchange", updateFullscreenUI);
    updateFullscreenUI();
  }

  /* =========================================================
     LIGHTBOX & ZOOM ENGINE (CLOSE-UP VIEWER)
     ========================================================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxZoomIn = document.getElementById("lightboxZoomIn");
  const lightboxZoomOut = document.getElementById("lightboxZoomOut");
  const lightboxZoomReset = document.getElementById("lightboxZoomReset");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxViewport = document.getElementById("lightboxViewport");

  let lbCurrentIndex = 0;
  let lbSlides = [];
  let currentZoom = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function collectSlides() {
    lbSlides = [];
    document.querySelectorAll("#demoTrack .device").forEach((article, idx) => {
      const img = article.querySelector(".device__screen");
      const cap = article.querySelector(".device__cap");
      if (img && img.style.opacity !== "0" && img.src && !img.src.endsWith("undefined")) {
        let titleText = "Slide " + (idx + 1);
        if (cap) {
          const b = cap.querySelector("b");
          if (b) titleText = b.textContent.trim();
        }
        lbSlides.push({
          element: article,
          imgUrl: img.src,
          title: titleText,
          captionHtml: cap ? cap.innerHTML : "",
          index: idx
        });
      }
    });
  }

  function updateTransform() {
    if (lightboxImg) {
      lightboxImg.style.transform = `scale(${currentZoom}) translate(${panX}px, ${panY}px)`;
      lightboxImg.classList.toggle("is-zoomed", currentZoom > 1);
    }
  }

  function resetZoom() {
    currentZoom = 1;
    panX = 0;
    panY = 0;
    updateTransform();
  }

  function renderSlide(idx) {
    if (lbSlides.length === 0) return;
    lbCurrentIndex = (idx + lbSlides.length) % lbSlides.length;
    const slide = lbSlides[lbCurrentIndex];
    resetZoom();
    if (lightboxImg) lightboxImg.src = slide.imgUrl;
    if (lightboxTitle) lightboxTitle.textContent = slide.title;
    if (lightboxCaption) lightboxCaption.innerHTML = slide.captionHtml;
    if (lightboxCounter) lightboxCounter.textContent = `${lbCurrentIndex + 1} / ${lbSlides.length}`;
  }

  function openLightbox(slideIdx) {
    collectSlides();
    if (lbSlides.length === 0) return;
    let foundIdx = lbSlides.findIndex(s => s.index === slideIdx);
    if (foundIdx === -1) foundIdx = 0;
    renderSlide(foundIdx);
    if (lightbox) lightbox.classList.add("is-open");
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("is-open");
    resetZoom();
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.start();
  }

  window._updateLightboxLanguage = () => {
    if (lightbox && lightbox.classList.contains("is-open")) {
      collectSlides();
      renderSlide(lbCurrentIndex);
    }
  };

  document.querySelectorAll("#demoTrack .device").forEach((article, idx) => {
    const frame = article.querySelector(".device__frame");
    if (frame) {
      frame.addEventListener("click", () => {
        const img = article.querySelector(".device__screen");
        if (img && img.style.opacity !== "0" && img.src) {
          openLightbox(idx);
        }
      });
    }
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => renderSlide(lbCurrentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => renderSlide(lbCurrentIndex + 1));

  if (lightboxZoomIn) lightboxZoomIn.addEventListener("click", () => {
    currentZoom = Math.min(currentZoom + 0.5, 4);
    updateTransform();
  });
  if (lightboxZoomOut) lightboxZoomOut.addEventListener("click", () => {
    currentZoom = Math.max(currentZoom - 0.5, 1);
    if (currentZoom === 1) { panX = 0; panY = 0; }
    updateTransform();
  });
  if (lightboxZoomReset) lightboxZoomReset.addEventListener("click", resetZoom);

  if (lightboxImg) {
    lightboxImg.addEventListener("dblclick", () => {
      if (currentZoom === 1) {
        currentZoom = 2;
      } else {
        currentZoom = 1;
        panX = 0;
        panY = 0;
      }
      updateTransform();
    });

    lightboxImg.addEventListener("mousedown", (e) => {
      if (currentZoom > 1) {
        isDragging = true;
        startX = e.clientX - panX * currentZoom;
        startY = e.clientY - panY * currentZoom;
        e.preventDefault();
      }
    });
  }

  window.addEventListener("mousemove", (e) => {
    if (isDragging && currentZoom > 1) {
      panX = (e.clientX - startX) / currentZoom;
      panY = (e.clientY - startY) / currentZoom;
      updateTransform();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) isDragging = false;
  });

  if (lightboxViewport) {
    lightboxViewport.addEventListener("wheel", (e) => {
      if (!lightbox || !lightbox.classList.contains("is-open")) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      currentZoom = Math.min(Math.max(currentZoom + delta, 1), 4);
      if (currentZoom === 1) { panX = 0; panY = 0; }
      updateTransform();
    }, { passive: false });
  }

  window.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") renderSlide(lbCurrentIndex - 1);
    else if (e.key === "ArrowRight") renderSlide(lbCurrentIndex + 1);
    else if (e.key === "+" || e.key === "=") { currentZoom = Math.min(currentZoom + 0.5, 4); updateTransform(); }
    else if (e.key === "-") { currentZoom = Math.max(currentZoom - 0.5, 1); if (currentZoom === 1) { panX = 0; panY = 0; } updateTransform(); }
    else if (e.key === "0") resetZoom();
  });

  /* =========================================================
     BOOT
     ========================================================= */
  window.addEventListener("load", () => {
    runLoader();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 200); });

  setActive(0, chapters[0]);
  setLanguage("ru");
})();
