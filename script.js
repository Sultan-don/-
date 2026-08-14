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
      whyCap1: "корпоративного кода будет генерироваться ИИ к 2028 году (Gartner)",
      whyCap2: "разработчиков уже ежедневно используют ИИ-инструменты",
      whyCap3: "платформ с настоящей мультиагентной оркестрацией в GitHub",
      whyNote: "LLM достигли производственного качества. ИИ в кодинге стал нормой. Не хватало только инфраструктурного слоя.",
      solEyebrow: "03 — РЕШЕНИЕ",
      solTitle: "От репозитория до проекта под управлением ИИ за минуты.",
      step1Tag: "Интеграция",
      step1Title: "Подключите GitHub",
      step1Desc: "Привяжите аккаунт и импортируйте репозитории в один клик.",
      step2Tag: "Движок задач",
      step2Title: "Создавайте задачи",
      step2Desc: "Описывайте задачи текстом. Система сама разобьет их на шаги.",
      step3Tag: "Параллельность",
      step3Title: "Запускайте агентов",
      step3Desc: "Агенты работают параллельно, каждый в своей ветке.",
      step4Tag: "Рефакторинг",
      step4Title: "Генерация кода",
      step4Desc: "Они пишут код, фиксят ошибки и запускают тесты.",
      step5Tag: "Авто-PR",
      step5Title: "Ревью и мердж",
      step5Desc: "Автоматические PR с описанием. Ревью и мердж в один клик.",
      step6Tag: "Ускорение",
      step6Title: "Релизим быстрее",
      step6Desc: "Разработка идет непрерывно, быстрее чем с нанятой командой.",
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
      mktNote: "База: 48.4M разработчиков по всему миру (Q3 2025). Источники: Gartner, IDC, a16z research. Оценки основаны на открытых отраслевых данных.",
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
      compCol0: "Критерий / Фича", compCol1: "ORCHESTRA", compCol2: "Copilot / Cursor", compCol3: "Обычная команда", compCol4: "Devin",
      compRow1Label: "<b>Модель выполнения</b><span>Как делается работа</span>", compRow1Us: "✔ <b>Параллельность ИИ-агентов</b> <small>(Изолированные ветки)</small>", compRow1Other1: "✖ Автодополнение в IDE", compRow1Other2: "✔ Параллельно, но долго", compRow1Other3: "✔ Автономные AI-сессии",
      compRow2Label: "<b>Автономность</b><span>Объем самостоятельной работы</span>", compRow2Us: "✔ <b>PR под ключ</b> <small>(План, код, тесты, ревью)</small>", compRow2Other1: "✖ Только сниппеты кода", compRow2Other2: "✔ Полный цикл (недели/месяцы)", compRow2Other3: "~ Не полностью надёжен <small>(<a href='https://docs.devin.ai/get-started/devin-intro' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compRow3Label: "<b>Интеграция с GitHub</b><span>Знание репозитория</span>", compRow3Us: "✔ <b>100% нативная синхронизация</b> <small>(Управление ветками)</small>", compRow3Other1: "~ Контекст локальных файлов", compRow3Other2: "✔ Ручной git-воркфлоу", compRow3Other3: "✔ GitHub + PR + CI <small>(<a href='https://app.devin.ai/' target='_blank' style='text-decoration: underline; color: inherit;'>Link</a>)</small>",
      compRow4Label: "<b>Скорость релиза</b><span>Время до продакшена</span>", compRow4Us: "⚡ <b>Минуты или часы</b> <small>(Ускорение в 10 раз)</small>", compRow4Other1: "⏱ Дни (зависит от человека)", compRow4Other2: "⏱ Недели и месяцы", compRow4Other3: "⏱ Зависит от сложности <small>(<a href='https://docs.devin.ai/get-started/devin-intro' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compRow5Label: "<b>Экономика</b><span>Стоимость</span>", compRow5Us: "💰 <b>~$2 / агенто-час</b> <small>(Оплата по факту)</small>", compRow5Other1: "💲 $20/мес + зарплата", compRow5Other2: "💲 $80+ / час ($150K+/год)", compRow5Other3: "💲 Usage-based <small>(<a href='https://docs.devin.ai/admin/billing/self-serve' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
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
      invRound: "10% Equity · Оценка $800K",
      invUse1: "Product & Engineering",
      invUse2: "AI / API / Infrastructure",
      invUse3: "Marketing & Customer Acquisition",
      invUse4: "Team & Operations",
      invUse5: "Legal & Accounting",
      invUse6: "Reserve",
      invFounders: "* Капитал-эффективность: 3 фаундера · ~$1K / мес общая з/п (по 4M UZS/мес)",
      invNote: "$80K → 18 Месяцев → Product-Market Fit → Scale",
      thanksSlogan: "Один разработчик. Команда ИИ-инженеров.",
      zoomHintText: "Увеличить",
      navMenuLabel: "Меню",
      tTitle: "orchestra-cli — github.com/orchestradev/core",
      tCmd: 'orchestra deploy --agents 4 --task "Рефакторинг модуля аутентификации и написание e2e тестов"',
      tLog1: "✔ GitHub репозиторий синхронизирован (ветка: main → feat/auth-refactor)",
      tLog2: "ℹ Агент @architect назначен: анализ 42 зависимостей...",
      tLog3: "ℹ Агент @codegen назначен: написание OAuth2 токен провайдера...",
      tLog4: "ℹ Агент @tester назначен: генерация тестов Jest...",
      tLog5: "✔ Создано 3 PR, готовых к автоматическому мерджу.",
      probBadge1: "Старый подход", probCard1Title: "Бесконечный бэклог PR", probCard1Desc: "Ручное код-ревью, сломанный CI/CD, переключение контекста, 60% рутинного кода.",
      probBadge2: "Эра Orchestra", probCard2Title: "Параллельное ИИ-исполнение", probCard2Desc: "Автономное исправление багов, авто-ревью PR, мгновенный синк веток, ускорение разработки в 10 раз.",
      demoS1: "Слайд 1", demoS1Sub: "Поместите фото в assets/images/demo-1.png",
      demoS2: "Слайд 2", demoS2Sub: "Поместите фото в assets/images/demo-2.png",
      demoS3: "Слайд 3", demoS3Sub: "Поместите фото в assets/images/demo-3.png",
      demoS4: "Слайд 4", demoS4Sub: "Поместите фото в assets/images/demo-4.png",
      demoS5: "Слайд 5", demoS5Sub: "Поместите фото в assets/images/demo-5.png",
      mktSeg1Title: "Глобальный рынок", mktStat1L: "TAM (Проф. разрабы)", mktStat1S: "36.5М польз. × $250/год",
      mktStat2L: "SAM (Активные в ИИ)", mktStat2S: "29.2М польз. × $250/год",
      mktStat3L: "SOM (Цель 3-5 лет)", mktStat3S: "10,000 польз. × $250/год", tArr: "ARR",
      mktSrc1: "Источники: SlashData (2025) 47.2М всего / 36.5М проф. GitHub Octoverse (2025) ~80% ИИ. Базовый ARPU: $250/год.",
      mktSeg2Title: "Узбекистан", mktStat4L: "TAM (IT-Ядро)", mktStat4S: "40,000 польз. × $250/год",
      mktStat5L: "SAM (Активные в ИИ)", mktStat5S: "32,000 польз. × $250/год",
      mktStat6L: "SOM (Локальная цель)", mktStat6S: "1,000 польз. × $250/год",
      mktSrc2: "Источники: President.uz (2025) 40К высокооплачиваемых IT-специалистов. Прогноз 80% интеграции ИИ.",
      mktSeg3Title: "B2B и Команды", mktStat7L: "Целевые компании", mktStat7S: "Технологичные софтверные компании",
      mktStat8L: "ARPU команды", mktStat8S: "Сред. 10 мест в команде",
      mktStat9L: "Объем рынка (TAM)", mktStat9S: "B2B сегмент ПО",
      mktSrc3: "Источники: Агрегаторы (TechBehemoths, AscendixTech SaaS отчет 2025).",
      bizT1: "Basic", bizT2: "Standard", bizT3: "Pro", bizT4: "Advanced",
      tMo: " /мес.", tCr: "Кредиты", tAg: "Одновременные агенты", tRep: "Репозитории", tFil: "Файлы", tD: "дней", tMem: "Память", tUnl: "Безлимит",
      cbHero: "Платформа", cbAst: "Ассистенты", cbTrad: "Традиционные", cbAgt: "Агент",
      tracEyebrow: "TRACTION", tracTitle: "20+ АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ", tracSub: "2 НЕДЕЛИ ПОСЛЕ ЗАПУСКА MVP",
      tMvp: "Запуск MVP", tRu: "Реальные пользователи", tCf: "Непрерывный фидбек",
      tracDesc: "Они реально используют Orchestra и регулярно дают обратную связь, на основе которой мы улучшаем продукт.",
      footText: "© 2026 Orchestra · Инженерная ИИ-Платформа",
      ch0: "Главная", ch1: "Проблема", ch2: "Почему сейчас", ch3: "Решение", ch4: "Продукт", ch5: "Рынок",
      ch6: "Бизнес-модель", ch7: "Конкуренты", ch8: "Traction", ch9: "Дорожная карта", ch10: "Видение", ch11: "Инвестиции", ch12: "Контакты"
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
      whyCap1: "korporativ kod 2028 yilgacha AI tomonidan yaratiladi (Gartner)",
      whyCap2: "dasturchilar allaqachon AI kodlash vositalaridan har kuni foydalanmoqda",
      whyCap3: "GitHub-da haqiqiy ko'p agentli orkestratsiyani taklif qiluvchi platformalar",
      whyNote: "LLM modellar ishlab chiqarish sifatiga yetdi. AI yordamida kodlash odatiy holga aylandi. Faqat infratuzilma qatlami yetishmayotgan edi.",
      solEyebrow: "03 — YECHIM",
      solTitle: "Repozitoriydan AI boshqaruvidagi loyihagacha bir necha daqiqada.",
      step1Tag: "Sinxronizatsiya",
      step1Title: "GitHub-ni ulang",
      step1Desc: "Hisobni ulang va repozitoriylarni bir marta bosish orqali import qiling.",
      step2Tag: "Vazifalar dvigateli",
      step2Title: "Vazifa yarating",
      step2Desc: "Vazifalarni matn bilan yozing. Tizim ularni qadamlarga ajratadi.",
      step3Tag: "Parallel ishchilar",
      step3Title: "Agentlarni ishga tushiring",
      step3Desc: "Agentlar o'z branchlarida parallel ravishda ishlaydi.",
      step4Tag: "Kodlash va refaktoring",
      step4Title: "Kod generatsiyasi",
      step4Desc: "Ular kod yozadi, xatolarni tuzatadi va testlarni o'tkazadi.",
      step5Tag: "Avto PR",
      step5Title: "Tekshirish va birlashtirish",
      step5Desc: "Tushunarli PRlar avtomatik ochiladi. Bir klik bilan merj qiling.",
      step6Tag: "Tezlashtirish",
      step6Title: "Tezroq reliz qiling",
      step6Desc: "Rivojlanish doimiy, har qanday yollangan jamoadan tezroq.",
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
      mktNote: "Baza: Dunyo bo'ylab 48.4M dasturchilar (Q3 2025). Manbalar: Gartner, IDC, a16z tahlillari. Qiymatlar ochiq sanoat ma'lumotlariga asoslangan.",
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
      invRound: "10% Ulush · Baholash $800K",
      invUse1: "Product & Engineering",
      invUse2: "AI / API / Infrastructure",
      invUse3: "Marketing & Customer Acquisition",
      invUse4: "Team & Operations",
      invUse5: "Legal & Accounting",
      invUse6: "Reserve",
      invFounders: "* Sarmoya samaradorligi: 3 ta asoschi · ~$1K / oy jami maosh (har biriga 4M UZS/oy)",
      invNote: "$80K → 18 Oy → Product-Market Fit → Scale",
      thanksSlogan: "Bitta dasturchi. AI muhandislar jamoasi.",
      zoomHintText: "Kattalashtirish",
      navMenuLabel: "Menyu",
      tTitle: "orchestra-cli — github.com/orchestradev/core",
      tCmd: 'orchestra deploy --agents 4 --task "Autentifikatsiya modulini refaktoring qilish va e2e testlar yozish"',
      tLog1: "✔ GitHub repozitoriysi sinxronizatsiya qilindi (tarmoq: main → feat/auth-refactor)",
      tLog2: "ℹ Agent @architect tayinlandi: 42 ta bog'liqliklarni tahlil qilmoqda...",
      tLog3: "ℹ Agent @codegen tayinlandi: OAuth2 token provayderini yozmoqda...",
      tLog4: "ℹ Agent @tester tayinlandi: Jest testlarini yaratmoqda...",
      tLog5: "✔ 3 ta PR yaratildi va avtomatik birlashtirishga tayyor.",
      probBadge1: "Eski yondashuv", probCard1Title: "Tuganmas PR navbatlari", probCard1Desc: "Qo'lda kod-revyu qilish, singan CI/CD, kontekstni o'zgartirish muammosi, 60% takrorlanuvchi kod.",
      probBadge2: "Orchestra davri", probCard2Title: "Parallel AI ijrosi", probCard2Desc: "Avtonom xatolarni to'g'rilash, avtomatlashtirilgan PR revyu, tarmoqlarni tezkor sinxronlash, dasturlash tezligini 10 barobar oshirish.",
      demoS1: "Slayd 1", demoS1Sub: "Rasmni assets/images/demo-1.png ga joylashtiring",
      demoS2: "Slayd 2", demoS2Sub: "Rasmni assets/images/demo-2.png ga joylashtiring",
      demoS3: "Slayd 3", demoS3Sub: "Rasmni assets/images/demo-3.png ga joylashtiring",
      demoS4: "Slayd 4", demoS4Sub: "Rasmni assets/images/demo-4.png ga joylashtiring",
      demoS5: "Slayd 5", demoS5Sub: "Rasmni assets/images/demo-5.png ga joylashtiring",
      mktSeg1Title: "Global Bozor", mktStat1L: "TAM (Pro Dasturchilar)", mktStat1S: "36.5M foyd. × $250/yil",
      mktStat2L: "SAM (AI-Faol)", mktStat2S: "29.2M foyd. × $250/yil",
      mktStat3L: "SOM (3-5 yillik maqsad)", mktStat3S: "10,000 foyd. × $250/yil", tArr: "ARR",
      mktSrc1: "Manbalar: SlashData (2025) 47.2M jami / 36.5M pro dasturchilar. GitHub Octoverse (2025) ~80% AI. Baza ARPU: $250/yil.",
      mktSeg2Title: "O'zbekiston", mktStat4L: "TAM (IT Asosi)", mktStat4S: "40,000 foyd. × $250/yil",
      mktStat5L: "SAM (AI-Faol)", mktStat5S: "32,000 foyd. × $250/yil",
      mktStat6L: "SOM (Mahalliy maqsad)", mktStat6S: "1,000 foyd. × $250/yil",
      mktSrc2: "Manbalar: President.uz (2025) 40K yuqori daromadli IT yoshlar. 80% AI joriy qilinishi kutilmoqda.",
      mktSeg3Title: "B2B va Jamoalar", mktStat7L: "Maqsadli Kompaniyalar", mktStat7S: "Texnologik dasturiy kompaniyalar",
      mktStat8L: "Jamoa ARPU", mktStat8S: "O'rtacha har jamoaga 10 o'rin",
      mktStat9L: "Bozor hajmi (TAM)", mktStat9S: "B2B dasturiy ta'minot segmenti",
      mktSrc3: "Manbalar: Agregatorlar (TechBehemoths, AscendixTech SaaS hisoboti 2025).",
      bizT1: "Asosiy", bizT2: "Standart", bizT3: "Pro", bizT4: "Murakkab",
      tMo: " /oy", tCr: "Kreditlar", tAg: "Bir vaqtning o'zida ishlaydigan agentlar", tRep: "Repozitoriylar", tFil: "Fayllar", tD: "kun", tMem: "Xotira", tUnl: "Cheksiz",
      cbHero: "Platforma", cbAst: "Yordamchilar", cbTrad: "An'anaviy", cbAgt: "Agent",
      compCol0: "Mezon / Imkoniyat", compCol1: "ORCHESTRA", compCol2: "Copilot / Cursor", compCol3: "An'anaviy jamoa", compCol4: "Devin",
      compRow1Label: "<b>Bajarish modeli</b><span>Ish qanday bajariladi</span>", compRow1Us: "✔ <b>Ko'p agentli parallellik</b> <small>(Alohida branchlar)</small>", compRow1Other1: "✖ IDE-da avtomat to'ldirish", compRow1Other2: "✔ Parallel, ammo sekin", compRow1Other3: "✔ Avtonom AI seanslari",
      compRow2Label: "<b>Avtonomlik</b><span>Mustaqil ish ko'lami</span>", compRow2Us: "✔ <b>To'liq PR tayyorlash</b> <small>(Reja, kod, review)</small>", compRow2Other1: "✖ Faqat kod qismlari", compRow2Other2: "✔ To'liq sikl (haftalar/oylar)", compRow2Other3: "~ To'liq ishonchli emas <small>(<a href='https://docs.devin.ai/get-started/devin-intro' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compRow3Label: "<b>GitHub integratsiyasi</b><span>Repozitoriy tushunchasi</span>", compRow3Us: "✔ <b>100% nativ sinxronizatsiya</b> <small>(Branchlar)</small>", compRow3Other1: "~ Mahalliy fayllar konteksti", compRow3Other2: "✔ Qo'lda git jarayonlari", compRow3Other3: "✔ GitHub + PR + CI <small>(<a href='https://app.devin.ai/' target='_blank' style='text-decoration: underline; color: inherit;'>Link</a>)</small>",
      compRow4Label: "<b>Reliz tezligi</b><span>Prodga chiqish vaqti</span>", compRow4Us: "⚡ <b>Daqiqa yoki soatlar</b> <small>(10x tezlik)</small>", compRow4Other1: "⏱ Kunlar (insonga bog'liq)", compRow4Other2: "⏱ Haftalar va oylar", compRow4Other3: "⏱ Murakkablikka bog'liq <small>(<a href='https://docs.devin.ai/get-started/devin-intro' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compRow5Label: "<b>Iqtisodiy samaradorlik</b><span>Xarajat</span>", compRow5Us: "💰 <b>~$2 / agent-soat</b> <small>(Foydalanishga qarab)</small>", compRow5Other1: "💲 $20/oy + oylik maosh", compRow5Other2: "💲 $80+ / soat ($150K+/yil)", compRow5Other3: "💲 Usage-based <small>(<a href='https://docs.devin.ai/admin/billing/self-serve' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compNote: "Orchestra — AI agentlar parallelligini GitHub repozitoriylarini to'liq boshqarish bilan birlashtiruvchi yagona platforma.",
      tracEyebrow: "TORTISHISH (TRACTION)", tracTitle: "20+ FAOL FOYDALANUVCHILAR", tracSub: "MVP ISHGA TUSHIRILGANDAN KEYIN 2 HAFTA",
      tMvp: "MVP ishga tushirish", tRu: "Haqiqiy foydalanuvchilar", tCf: "Uzluksiz fikr-mulohaza",
      tracDesc: "Ular Orchestradan faol foydalanishmoqda va muntazam fikr-mulohazalar bildirishmoqda, bu orqali mahsulotni yaxshilayapmiz.",
      footText: "© 2026 Orchestra · AI Muhandislik Platformasi",
      ch0: "Bosh sahifa", ch1: "Muammo", ch2: "Nega hozir", ch3: "Yechim", ch4: "Mahsulot", ch5: "Bozor",
      ch6: "Biznes model", ch7: "Raqobat", ch8: "Traction", ch9: "Yo'l xaritasi", ch10: "Kelajak", ch11: "Investitsiya", ch12: "Aloqa"
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
      whyCap1: "of enterprise code will be AI-generated by 2028 (Gartner)",
      whyCap2: "of developers now use AI coding tools daily",
      whyCap3: "platforms offering true multi-agent dev orchestration on GitHub",
      whyNote: "LLMs reached production quality. AI coding went mainstream. The infrastructure layer is missing.",
      solEyebrow: "03 — SOLUTION",
      solTitle: "From repository to AI-managed project in minutes.",
      step1Tag: "GitHub Sync",
      step1Title: "Connect GitHub",
      step1Desc: "Link your account and import repositories in one click.",
      step2Tag: "Task Engine",
      step2Title: "Create Tasks",
      step2Desc: "Describe tasks in plain text. The system breaks them into steps.",
      step3Tag: "Parallel Workers",
      step3Title: "Deploy Agents",
      step3Desc: "Agents work in parallel, each on their isolated branch.",
      step4Tag: "Code & Refactor",
      step4Title: "Generate Code",
      step4Desc: "They write code, fix errors, and run tests autonomously.",
      step5Tag: "Automated PRs",
      step5Title: "Review & Merge",
      step5Desc: "Automated PRs with summaries. Review and merge in one click.",
      step6Tag: "Continuous Delivery",
      step6Title: "Ship Faster",
      step6Desc: "Continuous development, faster than any human team.",
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
      mktNote: "Base: 48.4M developers worldwide (Q3 2025). Sources: Gartner, IDC, a16z market research. Estimates based on published industry data.",
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
      invRound: "10% Equity · $800K Post-Money",
      invUse1: "Product & Engineering",
      invUse2: "AI / API / Infrastructure",
      invUse3: "Marketing & Customer Acquisition",
      invUse4: "Team & Operations",
      invUse5: "Legal & Accounting",
      invUse6: "Reserve",
      invFounders: "* Capital efficiency: 3 founders · ~$1K / month total salary (4M UZS/mo per founder)",
      invNote: "$80K → 18 Months → Product-Market Fit → Scale",
      thanksSlogan: "One developer. A team of AI engineers.",
      zoomHintText: "Zoom",
      navMenuLabel: "Menu",
      tTitle: "orchestra-cli — github.com/orchestradev/core",
      tCmd: 'orchestra deploy --agents 4 --task "Refactor authentication module and write end-to-end tests"',
      tLog1: "✔ GitHub repository synced (branch: main → feat/auth-refactor)",
      tLog2: "ℹ Agent @architect assigned: analyzing 42 dependencies...",
      tLog3: "ℹ Agent @codegen assigned: writing OAuth2 token provider...",
      tLog4: "ℹ Agent @tester assigned: generating Jest test suites...",
      tLog5: "✔ 3 pull requests created and ready for automated merge.",
      probBadge1: "Legacy Workflow", probCard1Title: "Endless PR Backlogs", probCard1Desc: "Manual code reviews, broken CI/CD pipelines, context switching overhead, 60% repetitive boilerplate code.",
      probBadge2: "Orchestra Era", probCard2Title: "Parallel AI Execution", probCard2Desc: "Autonomous bug fixing, automated PR reviews, instant branch sync, 10x developer velocity.",
      demoS1: "Slide 1", demoS1Sub: "Put image in assets/images/demo-1.png",
      demoS2: "Slide 2", demoS2Sub: "Put image in assets/images/demo-2.png",
      demoS3: "Slide 3", demoS3Sub: "Put image in assets/images/demo-3.png",
      demoS4: "Slide 4", demoS4Sub: "Put image in assets/images/demo-4.png",
      demoS5: "Slide 5", demoS5Sub: "Put image in assets/images/demo-5.png",
      mktSeg1Title: "Global Market", mktStat1L: "TAM (Pro Devs)", mktStat1S: "36.5M users × $250/yr",
      mktStat2L: "SAM (AI-Active)", mktStat2S: "29.2M users × $250/yr",
      mktStat3L: "SOM (3-5 Yr Goal)", mktStat3S: "10,000 users × $250/yr", tArr: "ARR",
      mktSrc1: "Sources: SlashData (2025) 47.2M total / 36.5M pro devs. GitHub Octoverse (2025) ~80% AI adoption. Base ARPU: $250/yr.",
      mktSeg2Title: "Uzbekistan", mktStat4L: "TAM (IT Core)", mktStat4S: "40,000 users × $250/yr",
      mktStat5L: "SAM (AI-Active)", mktStat5S: "32,000 users × $250/yr",
      mktStat6L: "SOM (Local Goal)", mktStat6S: "1,000 users × $250/yr",
      mktSrc2: "Sources: President.uz (2025) 40K high-income IT youth. Assuming 80% AI adoption rate.",
      mktSeg3Title: "B2B & Teams", mktStat7L: "Target Companies", mktStat7S: "Tech-enabled software firms",
      mktStat8L: "Team ARPU", mktStat8S: "Avg. 10 seats per team",
      mktStat9L: "TAM Value", mktStat9S: "B2B software segment",
      mktSrc3: "Sources: Aggregated directories (TechBehemoths, AscendixTech SaaS report 2025).",
      bizT1: "Basic", bizT2: "Standard", bizT3: "Pro", bizT4: "Advanced",
      tMo: " /mo.", tCr: "Credits", tAg: "Concurrent Agents", tRep: "Repositories", tFil: "Files", tD: "days", tMem: "Memory", tUnl: "Unlimited",
      cbHero: "Platform", cbAst: "Assistants", cbTrad: "Traditional", cbAgt: "Agent",
      compCol0: "Criteria / Feature", compCol1: "ORCHESTRA", compCol2: "Copilot / Cursor", compCol3: "Human Dev Team", compCol4: "Devin",
      compRow1Label: "<b>Execution Model</b><span>How work is performed</span>", compRow1Us: "✔ <b>Multi-Agent Parallelism</b> <small>(Isolated branches)</small>", compRow1Other1: "✖ Single-prompt IDE autocomplete", compRow1Other2: "✔ Parallel but communication-heavy", compRow1Other3: "✔ Autonomous AI sessions",
      compRow2Label: "<b>Task Autonomy</b><span>Scope of autonomous work</span>", compRow2Us: "✔ <b>End-to-End PR Delivery</b> <small>(Plan, code, review)</small>", compRow2Other1: "✖ Snippets & file edits only", compRow2Other2: "✔ Full cycle (weeks/months)", compRow2Other3: "~ Not fully reliable <small>(<a href='https://docs.devin.ai/get-started/devin-intro' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compRow3Label: "<b>GitHub Integration</b><span>Repo awareness</span>", compRow3Us: "✔ <b>100% Native Sync</b> <small>(Branch mapping)</small>", compRow3Other1: "~ Local file/workspace context", compRow3Other2: "✔ Manual git workflows", compRow3Other3: "✔ GitHub + PR + CI <small>(<a href='https://app.devin.ai/' target='_blank' style='text-decoration: underline; color: inherit;'>Link</a>)</small>",
      compRow4Label: "<b>Time to Ship</b><span>Delivery velocity</span>", compRow4Us: "⚡ <b>Minutes to Hours</b> <small>(10x velocity)</small>", compRow4Other1: "⏱ Days (human dependent)", compRow4Other2: "⏱ Weeks to Months", compRow4Other3: "⏱ Depends on complexity <small>(<a href='https://docs.devin.ai/get-started/devin-intro' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compRow5Label: "<b>Cost Efficiency</b><span>Economics</span>", compRow5Us: "💰 <b>~$2 / agent-hour</b> <small>(Pay as you use)</small>", compRow5Other1: "💲 $20/mo + human salary", compRow5Other2: "💲 $80+ / hr ($150K+/yr)", compRow5Other3: "💲 Usage-based <small>(<a href='https://docs.devin.ai/admin/billing/self-serve' target='_blank' style='text-decoration: underline; color: inherit;'>Docs</a>)</small>",
      compNote: "Orchestra is the only platform combining true AI agent parallelism with complete GitHub repository management.",
      tracEyebrow: "TRACTION", tracTitle: "20+ ACTIVE USERS", tracSub: "2 WEEKS SINCE MVP LAUNCH",
      tMvp: "MVP Launch", tRu: "Real Users", tCf: "Continuous Feedback",
      tracDesc: "They are actively using Orchestra and providing continuous feedback, driving product improvements.",
      footText: "© 2026 Orchestra · AI Engineering Platform",
      ch0: "Home", ch1: "Problem", ch2: "Why Now", ch3: "Solution", ch4: "Product", ch5: "Market",
      ch6: "Business Model", ch7: "Competition", ch8: "Traction", ch9: "Roadmap", ch10: "Vision", ch11: "Investment", ch12: "Contact"
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

    document.querySelectorAll("[data-split]").forEach(el => {
      if (el._splitInstance) {
        el._splitInstance.revert();
        el._splitInstance = null;
      }
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
      } else if (["tMo", "tCr", "tAg", "tRep", "tFil", "tD", "tMem", "tUnl", "tArr", "tMvp", "tRu", "tCf"].includes(id)) {
        const cls = ".t-" + id.substring(1).toLowerCase();
        document.querySelectorAll(cls).forEach(el => el.innerHTML = t[id]);
      } else {
        const el = document.getElementById(id);
        if (el) {
          if (el.hasAttribute("data-line")) {
            const inner = el.querySelector("span");
            if (inner) inner.innerHTML = t[id];
            else el.innerHTML = t[id];
          } else {
            el.innerHTML = t[id];
          }
        }
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
