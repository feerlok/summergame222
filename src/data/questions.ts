import type { Category, SurpriseCell } from '@/types/game';

export const initialCategories: Category[] = [
  {
    id: 'animals',
    name: 'Животные',
    color: '#43A047',
    icon: '🦁',
    questions: [
      {
        id: 'animals-100',
        categoryId: 'animals',
        points: 100,
        question: 'Какое животное самое большое на Земле?',
        answer: 'Синий кит',
        explanation: 'Длина синего кита может достигать 33 метров — это как 3 автобуса!',
        asked: false,
      },
      {
        id: 'animals-200',
        categoryId: 'animals',
        points: 200,
        question: 'Сколько ног у паука?',
        answer: '8 ног',
        explanation: 'Пауки относятся к классу паукообразных, у них 8 ног и 8 глаз.',
        asked: false,
      },
      {
        id: 'animals-300',
        categoryId: 'animals',
        points: 300,
        question: 'Какая птица не умеет летать, но отлично плавает?',
        answer: 'Пингвин',
        explanation: 'Пингвины — отличные ныряльщики, они могут задерживать дыхание на 20 минут!',
        asked: false,
      },
      {
        id: 'animals-400',
        categoryId: 'animals',
        points: 400,
        question: 'Какое животное самое быстрое на планете?',
        answer: 'Сапсан (птица) / Гепард (сухопутное)',
        explanation: 'Сапсан развивает скорость до 390 км/ч в пикировании! А гепард бегает со скоростью до 120 км/ч.',
        asked: false,
      },
      {
        id: 'animals-500',
        categoryId: 'animals',
        points: 500,
        question: 'Какое животное может менять цвет кожи?',
        answer: 'Хамелеон / Осьминог',
        explanation: 'Хамелеоны меняют цвет для маскировки и общения. Осьминоги тоже умеют менять цвет и текстуру кожи!',
        asked: false,
      },
    ],
  },
  {
    id: 'space',
    name: 'Космос',
    color: '#1E88E5',
    icon: '🚀',
    questions: [
      {
        id: 'space-100',
        categoryId: 'space',
        points: 100,
        question: 'Какая планета самая близкая к Солнцу?',
        answer: 'Меркурий',
        explanation: 'Меркурий — самая маленькая планета и самая близкая к Солнцу.',
        asked: false,
      },
      {
        id: 'space-200',
        categoryId: 'space',
        points: 200,
        question: 'Сколько планет в Солнечной системе?',
        answer: '8 планет',
        explanation: 'До 2006 года было 9, но Плутон "перевели" в карликовые планеты.',
        asked: false,
      },
      {
        id: 'space-300',
        categoryId: 'space',
        points: 300,
        question: 'Что такое Млечный Путь?',
        answer: 'Наша галактика',
        explanation: 'Млечный Путь — это галактика, в которой находятся Земля и Солнечная система. В ней около 200-400 миллиардов звёзд!',
        asked: false,
      },
      {
        id: 'space-400',
        categoryId: 'space',
        points: 400,
        question: 'Первый человек, побывавший в космосе?',
        answer: 'Юрий Гагарин',
        explanation: '12 апреля 1961 года Юрий Гагарин совершил полёт на корабле "Восток-1".',
        asked: false,
      },
      {
        id: 'space-500',
        categoryId: 'space',
        points: 500,
        question: 'Как называется самая большая звезда, которую мы знаем?',
        answer: 'UY Щита (UY Scuti)',
        explanation: 'Если поместить UY Щита в центр Солнечной системы, она достигнет орбиты Сатурна!',
        asked: false,
      },
    ],
  },
  {
    id: 'nature',
    name: 'Природа',
    color: '#FF8F00',
    icon: '🌿',
    questions: [
      {
        id: 'nature-100',
        categoryId: 'nature',
        points: 100,
        question: 'Из чего делают бумагу?',
        answer: 'Из дерева',
        explanation: 'Бумагу производят из целлюлозы, которую получают из древесины.',
        asked: false,
      },
      {
        id: 'nature-200',
        categoryId: 'nature',
        points: 200,
        question: 'Сколько цветов в радуге?',
        answer: '7 цветов',
        explanation: 'Каждый охотник желает знать, где сидит фазан — красный, оранжевый, жёлтый, зелёный, голубой, синий, фиолетовый.',
        asked: false,
      },
      {
        id: 'nature-300',
        categoryId: 'nature',
        points: 300,
        question: 'Какое дерево даёт кленовый сироп?',
        answer: 'Сахарный клён',
        explanation: 'Кленовый сироп делают из сока сахарного клёна, который растёт в Канаде и США.',
        asked: false,
      },
      {
        id: 'nature-400',
        categoryId: 'nature',
        points: 400,
        question: 'Почему небо голубое?',
        answer: 'Рассеивание света (эффект Рэлея)',
        explanation: 'Молекулы воздуха рассеивают синий свет сильнее других цветов, поэтому небо кажется голубым.',
        asked: false,
      },
      {
        id: 'nature-500',
        categoryId: 'nature',
        points: 500,
        question: 'Какое самое глубокое озеро в мире?',
        answer: 'Байкал',
        explanation: 'Озеро Байкал в России — глубиной 1642 метра. В нём 20% всей пресной воды на планете!',
        asked: false,
      },
    ],
  },
  {
    id: 'sports',
    name: 'Спорт',
    color: '#FFD600',
    icon: '⚽',
    questions: [
      {
        id: 'sports-100',
        categoryId: 'sports',
        points: 100,
        question: 'Сколько игроков в футбольной команде на поле?',
        answer: '11 игроков',
        explanation: 'В футболе играют 11 на 11 + запасные.',
        asked: false,
      },
      {
        id: 'sports-200',
        categoryId: 'sports',
        points: 200,
        question: 'В какой стране придумали олимпийские игры?',
        answer: 'Греция (Древняя Греция)',
        explanation: 'Первые Олимпийские игры прошли в 776 году до нашей эры в Олимпии.',
        asked: false,
      },
      {
        id: 'sports-300',
        categoryId: 'sports',
        points: 300,
        question: 'Какой вид спорта называют "спортом королей"?',
        answer: 'Конный спорт / Поло',
        explanation: 'Конный спорт считался привилегией знати, поэтому его так называют.',
        asked: false,
      },
      {
        id: 'sports-400',
        categoryId: 'sports',
        points: 400,
        question: 'Какой мяч используется в баскетболе?',
        answer: 'Оранжевый мяч с чёрными полосками',
        explanation: 'Стандартный баскетбольный мяч весит около 600 грамм.',
        asked: false,
      },
      {
        id: 'sports-500',
        categoryId: 'sports',
        points: 500,
        question: 'Сколько колец на олимпийском флаге?',
        answer: '5 колец',
        explanation: 'Они символизируют 5 континентов: синий — Европа, жёлтый — Азия, чёрный — Африка, зелёный — Океания, красный — Америка.',
        asked: false,
      },
    ],
  },
  {
    id: 'tech',
    name: 'Технологии',
    color: '#7E57C2',
    icon: '💻',
    questions: [
      {
        id: 'tech-100',
        categoryId: 'tech',
        points: 100,
        question: 'Что такое Wi-Fi?',
        answer: 'Беспроводной интернет',
        explanation: 'Wi-Fi позволяет подключаться к интернету без проводов!',
        asked: false,
      },
      {
        id: 'tech-200',
        categoryId: 'tech',
        points: 200,
        question: 'Кто изобрёл лампочку?',
        answer: 'Томас Эдисон',
        explanation: 'Хотя над лампочкой работали многие, Эдисон создал первую практичную лампу накаливания в 1879 году.',
        asked: false,
      },
      {
        id: 'tech-300',
        categoryId: 'tech',
        points: 300,
        question: 'Как называется робот-пылесос от компании iRobot?',
        answer: 'Roomba',
        explanation: 'Roomba — один из самых известных роботов-пылесосов в мире.',
        asked: false,
      },
      {
        id: 'tech-400',
        categoryId: 'tech',
        points: 400,
        question: 'Что такое 3D-принтер?',
        answer: 'Устройство для создания физических объектов',
        explanation: '3D-принтер создаёт реальные предметы слой за слоем из пластика, металла или других материалов.',
        asked: false,
      },
      {
        id: 'tech-500',
        categoryId: 'tech',
        points: 500,
        question: 'Какой язык программирования назван в честь комедийной группы?',
        answer: 'Python (в честь "Monty Python")',
        explanation: 'Создатель языка Гвидо ван Россум был фанатом группы "Monty Python\'s Flying Circus".',
        asked: false,
      },
    ],
  },
  {
    id: 'geography',
    name: 'География',
    color: '#FF5252',
    icon: '🌍',
    questions: [
      {
        id: 'geography-100',
        categoryId: 'geography',
        points: 100,
        question: 'Какая самая большая страна в мире?',
        answer: 'Россия',
        explanation: 'Россия занимает 1/8 всей суши Земли и расположена в Европе и Азии.',
        asked: false,
      },
      {
        id: 'geography-200',
        categoryId: 'geography',
        points: 200,
        question: 'Какая река самая длинная в мире?',
        answer: 'Нил (или Амазонка — спорно)',
        explanation: 'Нил — около 6650 км. Амазонка конкурирует, и в зависимости от подсчёта может быть длиннее!',
        asked: false,
      },
      {
        id: 'geography-300',
        categoryId: 'geography',
        points: 300,
        question: 'В какой стране находится Эйфелева башня?',
        answer: 'Франция (Париж)',
        explanation: 'Эйфелева башня была построена в 1889 году и высотой 330 метров.',
        asked: false,
      },
      {
        id: 'geography-400',
        categoryId: 'geography',
        points: 400,
        question: 'Какой материк самый холодный?',
        answer: 'Антарктида',
        explanation: 'Антарктида — самое холодное, самое ветреное и самое сухое место на Земле.',
        asked: false,
      },
      {
        id: 'geography-500',
        categoryId: 'geography',
        points: 500,
        question: 'Какая страна имеет форму сапога?',
        answer: 'Италия',
        explanation: 'Италию на карте легко узнать — она похожа на сапог, который "пинает" остров Сицилию!',
        asked: false,
      },
    ],
  },
];

export const generateSurpriseCells = (): SurpriseCell[] => {
  const types: SurpriseType[] = ['mystery-bag', 'audience', 'auction'];
  const cells: SurpriseCell[] = [];
  const usedPositions = new Set<string>();

  for (let i = 0; i < 3; i++) {
    let catIdx: number;
    let qIdx: number;
    let key: string;
    do {
      catIdx = Math.floor(Math.random() * 6);
      qIdx = Math.floor(Math.random() * 5);
      key = `${catIdx}-${qIdx}`;
    } while (usedPositions.has(key));
    usedPositions.add(key);
    cells.push({
      categoryIndex: catIdx,
      questionIndex: qIdx,
      type: types[i],
    });
  }

  return cells;
};

type SurpriseType = 'mystery-bag' | 'audience' | 'auction';
