import type { Goal } from './data';

export const courseDetails: Record<Goal, { level: string; pace: string; outcome: string; modules: { title: string; text: string; task: string }[] }> = {
  life: { level: 'От A1', pace: 'В своём темпе', outcome: 'Поддержать разговор о себе, понять собеседника и выразить своё мнение.', modules: [
    { title: 'Знакомимся и рассказываем о себе', text: 'Вопросы, короткие ответы, интересы и привычки. To be и Present Simple в живом разговоре.', task: 'Запишите минутное знакомство: кто вы, чем занимаетесь и что любите.' },
    { title: 'Говорим о том, что случилось', text: 'Прошедшее время, истории выходного дня и уточняющие вопросы.', task: 'Расскажите об одном хорошем дне и задайте три вопроса собеседнику.' },
    { title: 'Делимся планами', text: 'Договорённости, приглашения и способы сказать о намерениях.', task: 'Договоритесь о встрече: предложите время, место и занятие.' },
    { title: 'Выражаем своё мнение', text: 'Согласие, вежливое несогласие и аргументы на знакомые темы.', task: 'Посоветуйте фильм и объясните, почему он вам понравился.' },
  ] },
  travel: { level: 'От A1', pace: 'Под вашу поездку', outcome: 'Самостоятельно решать повседневные задачи в путешествии.', modules: [
    { title: 'Аэропорт и дорога', text: 'Регистрация, багаж, пересадки, билеты и вопросы о маршруте.', task: 'Уточните, где ваш выход на посадку и включён ли багаж.' },
    { title: 'Отель без недоразумений', text: 'Бронирование, заселение, просьбы и описание проблем.', task: 'Попросите тихий номер и узнайте время завтрака.' },
    { title: 'За столиком в кафе', text: 'Заказ, ингредиенты, предпочтения и оплата.', task: 'Закажите обед, уточните состав блюда и попросите счёт.' },
    { title: 'Люди и впечатления', text: 'Небольшие разговоры, рекомендации и истории из поездки.', task: 'Спросите местного жителя о любимом месте в городе.' },
  ] },
  work: { level: 'От A2', pace: 'На ваших задачах', outcome: 'Понятно общаться с коллегами на созвонах и в переписке.', modules: [
    { title: 'Рассказываем о своей роли', text: 'Опыт, обязанности, навыки и цели без дословного перевода.', task: 'Подготовьте короткое представление для новой команды.' },
    { title: 'Участвуем в созвонах', text: 'Уточнения, обновления статуса, вопросы и подведение итогов.', task: 'Сообщите о прогрессе задачи и попросите обратную связь.' },
    { title: 'Пишем ясно и вежливо', text: 'Рабочие письма, сообщения, просьбы и договорённости.', task: 'Напишите письмо с просьбой перенести встречу.' },
    { title: 'Представляем идею', text: 'Структура выступления, аргументы и ответы на вопросы.', task: 'За две минуты объясните идею и её пользу для команды.' },
  ] },
  start: { level: 'С нуля · A0–A1', pace: 'Небольшими шагами', outcome: 'Собрать первые самостоятельные фразы и начать понимать базовые вопросы.', modules: [
    { title: 'Первое hello', text: 'Звуки, приветствия, имена, страны и глагол to be.', task: 'Представьтесь и спросите, как зовут собеседника.' },
    { title: 'Мой маленький мир', text: 'Семья, работа, вещи вокруг. Местоимения и простые вопросы.', task: 'Опишите три важных для вас предмета или человека.' },
    { title: 'Каждый день', text: 'Привычки, распорядок, время и Present Simple.', task: 'Расскажите о своём утре пятью короткими фразами.' },
    { title: 'Первый диалог', text: 'Числа, покупки, простые просьбы и ответы.', task: 'Разыграйте знакомство или заказ напитка без подсказки.' },
  ] },
};

export type MaterialCategory = 'Практика' | 'Грамматика' | 'Лексика' | 'Привычки';
export const materials: { id: string; category: MaterialCategory; title: string; description: string; time: string; mark: string; color: string; sections: { title: string; text: string; examples?: string[] }[]; exercise: { prompt: string; answer: string } }[] = [
  { id: 'small-talk', category: 'Практика', title: 'Разговор начинается с малого.', description: 'Фразы, с которыми проще познакомиться и продолжить беседу.', time: '5 минут', mark: 'Hello!', color: 'mint', sections: [
    { title: 'Начните с контекста', text: 'Не нужно придумывать остроумное вступление. Общая ситуация — встреча, поездка или занятие — уже даёт тему.', examples: ['Is this your first time here? — Вы здесь впервые?', 'How do you know the host? — Откуда вы знаете организатора?', 'What brings you here? — Что привело вас сюда?'] },
    { title: 'Добавьте открытый вопрос', text: 'После короткого ответа спросите о подробностях. Вопросы с what и how часто дают больше пространства для разговора.', examples: ['What do you enjoy most about it? — Что вам в этом нравится больше всего?', 'How did you get into that? — Как вы этим увлеклись?', 'That sounds interesting. Tell me more. — Звучит интересно. Расскажите подробнее.'] },
    { title: 'Поделитесь чем-то своим', text: 'Беседа — обмен, а не интервью. Добавьте одну связанную историю о себе и верните слово собеседнику.', examples: ['I’ve never tried that, but I’d love to. — Я этого не пробовал(а), но с удовольствием попробую.', 'I’m into photography too. — Я тоже увлекаюсь фотографией.'] },
  ], exercise: { prompt: 'Собеседник говорит: “I love cooking.” Придумайте открытый вопрос, чтобы продолжить разговор.', answer: 'Например: “What do you like cooking most?” или “How did you get into cooking?” Оба вопроса приглашают рассказать подробнее.' } },
  { id: 'present-simple', category: 'Грамматика', title: 'Present Simple. Про вашу жизнь.', description: 'Разбираем привычки, факты и вопросы на понятных примерах.', time: '7 минут', mark: 'Every day.', color: 'lavender', sections: [
    { title: 'Когда это время пригодится', text: 'Present Simple помогает говорить о привычках, регулярных действиях и фактах. Оно не ограничено действиями прямо сейчас.', examples: ['I work from home. — Я работаю из дома.', 'She reads before bed. — Она читает перед сном.', 'We usually have lunch at one. — Мы обычно обедаем в час.'] },
    { title: 'Окончание, которое легко забыть', text: 'С he, she и it в утвердительном предложении у смыслового глагола появляется -s или -es. У глагола to be свои формы: am, is, are.', examples: ['I watch → she watches', 'You study → he studies', 'We have → she has'] },
    { title: 'Вопросы и отрицания', text: 'Смысловому глаголу помогают do и does. После does окончание -s уже не нужно. В отрицании используйте don’t или doesn’t.', examples: ['Do you work on Saturdays?', 'Does she speak English?', 'He doesn’t drink coffee.'] },
  ], exercise: { prompt: 'Заполните пропуски: She ___ (work) remotely. ___ she like it? She ___ (not / work) on Sundays.', answer: 'She works remotely. Does she like it? She doesn’t work on Sundays. После does и doesn’t глагол остаётся в начальной форме.' } },
  { id: 'travel-phrases', category: 'Лексика', title: 'В поездку — со своими словами.', description: 'Полезные фразы для кафе, отеля и прогулки по новому городу.', time: '6 минут', mark: 'Let’s go.', color: 'sand', sections: [
    { title: 'Кафе и ресторан', text: 'I’d like… удобно использовать для вежливого заказа. Could I have…? подходит для просьбы.', examples: ['I’d like a table for two, please. — Столик на двоих, пожалуйста.', 'Does this contain nuts? — Здесь есть орехи?', 'Could we have the bill, please? — Можно счёт, пожалуйста?'] },
    { title: 'В отеле', text: 'Держите под рукой подтверждение бронирования. Если не расслышали ответ, спокойно попросите повторить.', examples: ['I have a reservation under the name… — У меня бронь на имя…', 'What time is check-out? — Во сколько нужно выехать?', 'Could you say that again, please? — Повторите, пожалуйста.'] },
    { title: 'В новом городе', text: 'Назовите место назначения и уточните транспорт. Ответ полезно повторить своими словами, чтобы проверить понимание.', examples: ['How do I get to the station? — Как пройти к вокзалу?', 'Is it within walking distance? — Туда можно дойти пешком?', 'Which stop should I get off at? — На какой остановке выходить?'] },
  ], exercise: { prompt: 'Попросите в кафе чай и уточните, можно ли оплатить картой.', answer: 'I’d like a tea, please. Can I pay by card? Возможны и другие вежливые формулировки: Could I have a tea, please?' } },
  { id: 'work-email', category: 'Практика', title: 'Письмо, которое поймут.', description: 'Как попросить, уточнить и договориться на английском.', time: '6 минут', mark: 'Sent. ✓', color: 'peach', sections: [
    { title: 'Одна ясная задача', text: 'Начните с цели письма. Затем добавьте нужный контекст и конкретное действие, которого ждёте от получателя.', examples: ['I’m writing to confirm our meeting. — Пишу, чтобы подтвердить встречу.', 'Could you send me the updated file? — Не могли бы вы прислать обновлённый файл?'] },
    { title: 'Вежливость без сложных оборотов', text: 'Could you…? делает просьбу мягче. Если есть срок, укажите его прямо, с датой и часовым поясом при необходимости.', examples: ['Could you share your feedback by Friday?', 'Would Tuesday at 10 am work for you?', 'Please let me know if you have any questions.'] },
    { title: 'Проверьте перед отправкой', text: 'Понятна ли тема? Есть ли конкретный вопрос? Верны ли дата, имя и вложение? Короткое письмо часто легче прочитать и выполнить.', examples: ['Hi Alex, could we move our meeting to Thursday at 2 pm Moscow time? Please let me know if that works for you. Thanks!'] },
  ], exercise: { prompt: 'Напишите коллеге два предложения: попросите прислать презентацию до четверга и поблагодарите.', answer: 'Could you send me the presentation by Thursday, please? Thanks for your help! Здесь by Thursday означает «не позднее четверга».' } },
  { id: 'learning-routine', category: 'Привычки', title: '15 минут, которые найдутся.', description: 'Небольшой план на неделю без обещаний выучить всё за месяц.', time: '4 минуты', mark: 'Little by little.', color: 'mint', sections: [
    { title: 'Привяжите английский к привычке', text: 'Выберите конкретный момент: после утреннего кофе или перед вечерней прогулкой. Одна понятная точка проще, чем обещание «позаниматься когда-нибудь».' },
    { title: 'Чередуйте действия', text: 'В понедельник прочитайте небольшой текст, во вторник выпишите пять фраз, в среду произнесите их в своём контексте. В четверг вернитесь к тексту, в пятницу перескажите его. Выходные оставьте для лёгкого повторения.' },
    { title: 'Замечайте конкретные изменения', text: 'Сохраняйте короткую запись речи раз в неделю. Сравнивайте не себя с другими, а свои прошлые и текущие попытки. Пропущенный день не отменяет сделанную работу.' },
  ], exercise: { prompt: 'Завершите фразу: «После ___ я уделю английскому ___ минут и сделаю ___».', answer: 'Например: «После завтрака я уделю английскому 10 минут и составлю три предложения с новыми словами». Чем конкретнее действие, тем легче начать.' } },
  { id: 'learn-words', category: 'Лексика', title: 'Слова, которые остаются.', description: 'От перевода в списке — к выражению, которое вы используете.', time: '5 минут', mark: 'Make it yours.', color: 'lavender', sections: [
    { title: 'Учите сочетания', text: 'Отдельное слово не всегда подсказывает, как его использовать. Сохраняйте короткую фразу и собственный пример.', examples: ['make a decision — принять решение', 'take a break — сделать перерыв', 'keep in touch — оставаться на связи'] },
    { title: 'Вспоминайте до подсказки', text: 'Посмотрите на русскую сторону карточки и попробуйте назвать выражение. После этого проверьте себя. Ошибка показывает, к какой карточке стоит вернуться.' },
    { title: 'Верните слова в жизнь', text: 'Повторите фразы позже и придумайте новую ситуацию. Вместо десяти одинаковых прочтений используйте несколько разных предложений о себе.', examples: ['I need to make a decision today.', 'Let’s take a break and get some coffee.', 'Let’s keep in touch after the course.'] },
  ], exercise: { prompt: 'Дополните фразы: ___ a decision, ___ a break, ___ in touch.', answer: 'Make a decision, take a break, keep in touch. Попробуйте теперь использовать все три выражения в короткой истории.' } },
];

export const vocabulary = [
  ['take a break', 'сделать перерыв', 'Let’s take a break.'],
  ['keep in touch', 'оставаться на связи', 'Let’s keep in touch.'],
  ['make a decision', 'принять решение', 'I need to make a decision.'],
  ['look forward to', 'ждать с нетерпением', 'I look forward to meeting you.'],
  ['figure out', 'разобраться, выяснить', 'Let’s figure it out together.'],
  ['give it a try', 'попробовать', 'Why not give it a try?'],
  ['on my way', 'в пути', 'I’m on my way.'],
  ['get used to', 'привыкнуть к', 'I’m getting used to my new job.'],
  ['sounds good', 'звучит хорошо', 'Friday? Sounds good!'],
  ['it depends', 'это зависит от обстоятельств', 'It depends on the weather.'],
  ['by the way', 'кстати', 'By the way, I love your idea.'],
  ['no worries', 'ничего страшного', 'You’re a little late? No worries.'],
] as const;

export const clubTopics = [
  { title: 'Small talk', label: 'Знакомства', level: 'A1–A2', question: 'What makes a good weekend?', description: 'Знакомимся, рассказываем о маленьких радостях и находим общие интересы.', prompts: ['What do you usually do on Sundays?', 'Do you prefer going out or staying in?', 'What would your perfect weekend look like?'], phrases: ['I’m really into…', 'What about you?', 'That sounds lovely!'] },
  { title: 'Travel stories', label: 'Путешествия', level: 'A2–B1', question: 'Where would you go next?', description: 'Обсуждаем любимые места, смешные случаи и поездку мечты.', prompts: ['What place would you love to visit?', 'What do you always pack?', 'Tell us about a memorable trip.'], phrases: ['I’ve always wanted to…', 'The best part was…', 'I’d recommend…'] },
  { title: 'Work & life', label: 'Работа и жизнь', level: 'B1–B2', question: 'What does balance mean to you?', description: 'Говорим о привычках, работе из дома и времени для себя.', prompts: ['What helps you switch off after work?', 'How has your routine changed?', 'What would you change about your working day?'], phrases: ['From my point of view…', 'I see what you mean, but…', 'It really depends on…'] },
] as const;
