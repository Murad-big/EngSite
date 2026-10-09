export const programs = [
  {
    id: 'life', label: 'Для жизни', title: 'Жизнь без субтитров.',
    description: 'Обсуждайте фильмы, знакомьтесь с людьми и говорите о том, что вам действительно интересно.',
    skills: ['Живые разговоры', 'Понятная грамматика'], note: 'Hello,\nnew world!', color: 'lavender',
  },
  {
    id: 'travel', label: 'Для путешествий', title: 'Мир без переводчика.',
    description: 'Закажите любимый кофе, спросите дорогу и найдите друзей там, где раньше не хватало слов.',
    skills: ['Ситуации из поездок', 'Уверенность в общении'], note: 'Next stop:\neverywhere.', color: 'sand',
  },
  {
    id: 'work', label: 'Для работы', title: 'Ваши идеи. Без барьеров.',
    description: 'От первого hello на созвоне до презентации своей идеи. Английский для задач, которые важны вам.',
    skills: ['Рабочие диалоги', 'Ясные формулировки'], note: 'Big ideas.\nYour voice.', color: 'mint',
  },
  {
    id: 'start', label: 'С самого начала', title: 'Большое начинается с hello.',
    description: 'Разберитесь в основах, соберите первые фразы и постепенно почувствуйте: английский вам по силам.',
    skills: ['Основы без спешки', 'Первые разговоры'], note: 'Small steps.\nBig world.', color: 'peach',
  },
] as const;
export type Goal = typeof programs[number]['id'];

export const steps = [
  { title: 'Знакомимся с вами', text: 'Ваши интересы, ваш уровень, ваши цели. С этого начинается маршрут.' },
  { title: 'Говорим о настоящем', text: 'Обсуждаем работу, любимые сериалы и планы. Ошибаться — часть процесса.' },
  { title: 'Замечаем прогресс', text: 'Возвращаемся к сложному, закрепляем новое и постепенно говорим свободнее.' },
];

export const practiceQuestions = [
  { situation: 'В кофейне', title: 'Как заказать кофе?', prompt: 'Выберите фразу, которая звучит естественно.',
    options: ['I’d like a coffee, please.', 'I like coffee, please.', 'I am a coffee, please.'], correct: 0,
    explanation: 'I’d like… — вежливый способ сказать «Я бы хотел(а)…». А please делает заказ ещё приятнее.' },
  { situation: 'На знакомстве', title: 'Расскажите о своей работе.', prompt: 'Как сказать «Я работаю удалённо»?',
    options: ['I working remotely.', 'I work remotely.', 'I am work remotely.'], correct: 1,
    explanation: 'Для привычного действия используем Present Simple: I work. Remotely значит «удалённо».' },
  { situation: 'В новом городе', title: 'Как спросить дорогу?', prompt: 'Вам нужно узнать, как добраться до вокзала.',
    options: ['Where I go station?', 'What is the station go?', 'How do I get to the station?'], correct: 2,
    explanation: 'How do I get to…? — полезная фраза, чтобы спросить, как добраться до любого места.' },
];

export const levelQuestions = [
  { question: 'Hi! What ___ your name?', options: ['is', 'are', 'am'], correct: 0, explanation: 'What is your name? — «Как тебя зовут?»' },
  { question: 'She ___ English every day.', options: ['study', 'studies', 'studying'], correct: 1, explanation: 'С she в Present Simple добавляем -s. Study → studies.' },
  { question: 'We ___ to London last year.', options: ['go', 'have go', 'went'], correct: 2, explanation: 'Last year указывает на прошлое. Прошедшая форма go — went.' },
  { question: 'I’ve lived here ___ 2020.', options: ['for', 'since', 'during'], correct: 1, explanation: 'Since используем с точкой начала: since 2020.' },
  { question: 'If I had more time, I ___ travel more.', options: ['will', 'would', 'can'], correct: 1, explanation: 'Во втором условном предложении: If + Past Simple, would + глагол.' },
  { question: 'There isn’t ___ milk left.', options: ['many', 'much', 'a few'], correct: 1, explanation: 'Milk — неисчисляемое существительное. Для количества используем much.' },
  { question: 'Could you ___ me the way to the station?', options: ['say', 'speak', 'tell'], correct: 2, explanation: 'Tell someone the way — объяснить кому-то дорогу.' },
  { question: 'I was cooking when the phone ___.', options: ['rings', 'rang', 'has rung'], correct: 1, explanation: 'Длительное действие в прошлом (was cooking) прерывается коротким событием (rang).' },
  { question: 'This book is ___ than the last one.', options: ['more interesting', 'most interesting', 'interestinger'], correct: 0, explanation: 'У длинных прилагательных сравнительная степень образуется с more: more interesting.' },
  { question: 'The report ___ yesterday.', options: ['finished', 'was finished', 'has finish'], correct: 1, explanation: 'Пассивный залог в прошлом: was + третья форма глагола. Отчёт был завершён.' },
  { question: 'I’m looking forward to ___ you.', options: ['see', 'saw', 'seeing'], correct: 2, explanation: 'В выражении look forward to слово to — предлог. После него используется форма на -ing.' },
  { question: 'If I had known, I ___ you.', options: ['would have told', 'will tell', 'would tell'], correct: 0, explanation: 'Для нереального условия в прошлом: If + Past Perfect, would have + третья форма.' },
];

export const faqs = [
  { question: 'Можно начать с нуля?', answer: 'Да. Начните с раздела «С самого начала»: базовые фразы, понятная грамматика и небольшие шаги. Не нужно знать английский, чтобы начать его учить.' },
  { question: 'Как проходят онлайн-занятия?', answer: 'Для занятия нужен ноутбук или планшет, наушники и стабильный интернет. Формат строится вокруг живого диалога с преподавателем и практики. Подробное расписание и программу обсудим при знакомстве.' },
  { question: 'Что делать, если я боюсь говорить?', answer: 'Начать с коротких фраз и знакомых тем. Не нужно говорить идеально с первой попытки. Спокойная практика и поддержка помогают постепенно почувствовать уверенность.' },
  { question: 'Как выбрать программу?', answer: 'Подумайте, где вам нужен английский: в поездках, на работе или в повседневной жизни. Посмотрите программы и попробуйте короткий тест. Его результат — ориентир для знакомства, а не официальная оценка уровня.' },
  { question: 'Сколько времени выделять на английский?', answer: 'В разделе «Форматы» можно собрать пример нагрузки: от одного до трёх занятий в неделю и короткая самостоятельная практика. Выберите ритм, который получается поддерживать. Расчёт не является обещанием достичь уровня за определённый срок.' },
  { question: 'Что можно попробовать бесплатно?', answer: 'Все материалы библиотеки, словарный тренажёр, мини-практика и тест открыты без регистрации. В статьях есть упражнения с разбором и скачиваемые памятки. Прогресс словарных карточек сохраняется на вашем устройстве.' },
  { question: 'Где узнать стоимость и условия занятий?', answer: 'Стоимость платных программ в этой версии сайта пока не опубликована. В форме можно указать цель, пожелания и удобную нагрузку. Конструктор плана не оформляет покупку и не бронирует занятия.' },
  { question: 'Куда отправляется заявка?', answer: 'В текущем демонстрационном режиме заявка сохраняется только в вашем браузере. Форма явно сообщает об этом. Вы можете скачать её копию или удалить запись. Отправка в школу заработает после подключения сервиса приёма заявок.' },
];
