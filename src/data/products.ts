export type CategoryId =
  | 'candles'
  | 'soaps'
  | 'pharaonic-magnets'
  | 'concrete-art'
  | 'fire-extinguishers';

export interface ProductReview {
  id: string;
  author: string;
  authorAr: string;
  rating: number;
  date: string;
  comment: {
    en: string;
    ar: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  category: CategoryId;
  name: {
    en: string;
    ar: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  image: string;
  gallery?: string[];
  specs: {
    weight: string;
    dimensions: string;
    material: {
      en: string;
      ar: string;
    };
    scentOrFinish: {
      en: string;
      ar: string;
    };
  };
  variants?: {
    en: string[];
    ar: string[];
  };
  reviews: ProductReview[];
}

export interface CategoryInfo {
  id: CategoryId;
  slug: string;
  name: {
    en: string;
    ar: string;
  };
  shortName: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
  badge: {
    en: string;
    ar: string;
  };
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'candles',
    slug: 'candles',
    name: { en: 'Handcrafted Candles', ar: 'شموع يدوية فاخرة' },
    shortName: { en: 'Candles', ar: 'الشموع' },
    description: {
      en: '100% natural soy wax sculpted with Pharaonic reliefs & essential oils',
      ar: 'شمع صويا طبيعي ١٠٠٪ منحوت بنقوش فرعونية وزيوت عطرية طبيعية',
    },
    image: '/assets/products/candle-king-tut-blue.png',
    badge: { en: '9 Designs', ar: '٩ تصميمات' },
  },
  {
    id: 'soaps',
    slug: 'soaps',
    name: { en: 'Artisan Natural Soaps', ar: 'صابون طبيعي حرفي' },
    shortName: { en: 'Soaps', ar: 'الصابون' },
    description: {
      en: 'Cold-pressed botanical soaps enriched with shea butter, glycerin & essential oils',
      ar: 'صابون نباتي طبيعي غني بزبدة الشيا والجلسرين والزيوت العطرية اللطيفة على البشرة',
    },
    image: '/assets/products/soap-grape-cluster.png',
    badge: { en: '5 Blends', ar: '٥ تركيبات' },
  },
  {
    id: 'pharaonic-magnets',
    slug: 'pharaonic-magnets',
    name: { en: 'Pharaonic Magnet Sets', ar: 'مجموعات مغناطيس فرعوني' },
    shortName: { en: 'Pharaonic Magnets', ar: 'مغناطيس فرعوني' },
    description: {
      en: 'Hand-cast polyester & stone collector magnets with antique gold, bronze & silver patina',
      ar: 'مغناطيسات تذكارية مصبوبة يدوياً بتشطيبات الذهب العتيق والبرونز والفضة الملكية',
    },
    image: '/assets/products/magnet-pharaonic-bronze.png',
    badge: { en: '4 Collector Sets', ar: '٤ مجموعات' },
  },
  {
    id: 'concrete-art',
    slug: 'concrete-art',
    name: { en: 'Concrete & Polyester Art', ar: 'تحف الكونكريت والبوليستر' },
    shortName: { en: 'Concrete & Art', ar: 'تحف ومنحوتات' },
    description: {
      en: 'Architectural concrete vessels and sculpted Egyptian reliefs finished by Luxor artisans',
      ar: 'أواني كونكريت معمارية ومنحوتات مصرية متقنة بأيدي حرفيي الأقصر',
    },
    image: '/assets/products/art-tutankhamun-mask-bronze.png',
    badge: { en: '4 Sculptures', ar: '٤ قطع فنية' },
  },
  {
    id: 'fire-extinguishers',
    slug: 'fire-extinguishers',
    name: { en: 'Designer Fire Extinguishers', ar: 'طفايات حريق ديكورية' },
    shortName: { en: 'Fire Extinguishers', ar: 'طفايات ديكورية' },
    description: {
      en: 'Certified home & car safety extinguishers custom-finished with Pharaonic gold motifs',
      ar: 'طفايات أمان معتمدة للمنزل والسيارة بتشطيبات فنية وزخارف فرعونية ذهبية',
    },
    image: '/assets/products/extinguisher-royal-gold.svg',
    badge: { en: '2 Editions', ar: 'إصداران' },
  },
];

export const PRODUCTS: Product[] = [
  // ================= SOAPS =================
  {
    id: 'p-soap-rainbow',
    slug: 'rainbow-bubble-glycerin-soap',
    category: 'soaps',
    name: {
      en: 'Rainbow Bubble Artisan Rope Soap',
      ar: 'صابونة الفقاعات الملونة بالحبل الطبيعي',
    },
    subtitle: {
      en: 'Triple-layer moisturizing glycerin & sweet citrus blend',
      ar: 'جلسرين مرطب ثلاثي الطبقات بخلاصة الحمضيات المنعشة',
    },
    description: {
      en: 'Hand-poured in our Luxor studio, this playful pearl-bubble bar features a braided natural jute hanging rope for effortless drying. Formulated with pure vegetable glycerin, sweet orange oil, and vitamin E to leave skin silky and radiant.',
      ar: 'صُنعت يدوياً في مرسمنا بالأقصر بتصميم فقاعات اللؤلؤ المبهجة مع حبل جوت طبيعي للتعليق والتجفيف السريع. غنية بالجلسرين النباتي النقي وزيت البرتقال الحلو وفيتامين E لترطيب فائق ونعومة تدوم.',
    },
    price: 100,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    featured: true,
    image: '/assets/products/soap-rainbow-bubbles.png',
    specs: {
      weight: '185 g',
      dimensions: '10 × 8 × 4.5 cm',
      material: {
        en: 'Pure Vegetable Glycerin, Shea Butter, Jute Rope',
        ar: 'جلسرين نباتي نقي، زبدة الشيا، حبل جوت طبيعي',
      },
      scentOrFinish: {
        en: 'Bergamot, Sweet Mandarin & Ocean Breeze',
        ar: 'البرغموت، اليوسفي الحلو ونسيم البحر',
      },
    },
    variants: {
      en: ['Citrus & Ocean', 'Tropical Mango', 'Lavender Mist'],
      ar: ['حمضيات ونسيم البحر', 'مانجو استوائي', 'ندى اللافندر'],
    },
    reviews: [
      {
        id: 'r1',
        author: 'Nourhan El-Sayed',
        authorAr: 'نورهان السيد',
        rating: 5,
        date: '2026-09-14',
        comment: {
          en: 'Smells heavenly and doesn’t melt quickly because of the hanging rope. My kids love washing their hands with it!',
          ar: 'رائحتها رائعة جداً ولا تذوب بسرعة بفضل حبل التعليق. أطفالي أحبوها للغاية!',
        },
      },
    ],
  },
  {
    id: 'p-soap-grape',
    slug: 'royal-grape-cluster-soap-on-rope',
    category: 'soaps',
    name: {
      en: 'Nile Vineyard Grape Cluster Soap',
      ar: 'صابونة عنقود العنب الملكي بالحبل',
    },
    subtitle: {
      en: 'Antioxidant grape seed extract & French lavender oil',
      ar: 'بخلاصة بذور العنب المضادة للأكسدة وزيت اللافندر الفرنسي',
    },
    description: {
      en: 'Sculpted as a lush cluster of individual grape spheres hand-knotted onto a heavy artisan jute cord. Enriched with cold-pressed grape seed oil and calming lavender essential oil for a spa-grade bath ritual.',
      ar: 'منحوتة على هيئة عنقود عنب فاخر مربوط يدوياً بحبل جوت متين. غنية بزيت بذور العنب المعصور على البارد وزيت اللافندر المهدئ لتجربة استحمام ملكية.',
    },
    price: 150,
    originalPrice: 200,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 27,
    inStock: true,
    featured: true,
    image: '/assets/products/soap-grape-cluster.png',
    specs: {
      weight: '240 g',
      dimensions: '16 × 8.5 × 8.5 cm',
      material: {
        en: 'Grape Seed Oil, Olive Oil Soap Base, Hand-Braided Jute',
        ar: 'زيت بذور العنب، قاعدة صابون زيت الزيتون، جوت مجدول يدوياً',
      },
      scentOrFinish: {
        en: 'Blackberry, Concord Grape & Lavender',
        ar: 'التوت الأسود، العنب الفاخر واللافندر',
      },
    },
    variants: {
      en: ['Royal Purple Grape', 'Amber Honey Muscat', 'Green Fig & Olive'],
      ar: ['عنب أرجواني ملكي', 'عسل المسكات العنبر', 'التين الأخضر والزيتون'],
    },
    reviews: [
      {
        id: 'r2',
        author: 'Mariam Hassan',
        authorAr: 'مريم حسن',
        rating: 5,
        date: '2026-10-02',
        comment: {
          en: 'Looks like a piece of bathroom decor and lathers into the richest creamy foam. Bought 3 more as gifts!',
          ar: 'كأنها قطعة ديكور فاخرة في الحمام ورغوتها كريمية غنية جداً. اشتريت ٣ قطع إضافية كـ هدايا!',
        },
      },
    ],
  },
  {
    id: 'p-soap-rose',
    slug: 'damask-rose-peony-artisan-soap-box',
    category: 'soaps',
    name: {
      en: 'Damask Rose & Peony Petal Soap Set',
      ar: 'مجموعة صابون بتلات الورد الدمشقي والفاوانيا',
    },
    subtitle: {
      en: 'Box of 4 sculpted botanical rose blooms with goat milk',
      ar: 'صندوق يضم ٤ ورود منحوتة بدقة بالحليب الطبيعي وماء الورد',
    },
    description: {
      en: 'Delicately molded petal-by-petal from creamy shea butter and rosewater soap base. Presented in a kraft gift box—ideal for bridal favors, guest powder rooms, or gentle facial cleansing.',
      ar: 'مصممة بدقة متناهية بتلة تلو الأخرى من زبدة الشيا الكريمية وماء الورد المقطر. تأتي في صندوق هدايا أنيق مثالي للمناسبات وغرف الضيوف والعناية اللطيفة بالبشرة.',
    },
    price: 180,
    originalPrice: 220,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 16,
    inStock: true,
    featured: false,
    isNew: true,
    image: '/assets/products/soap-rose-peony.png',
    specs: {
      weight: '220 g (4 × 55 g)',
      dimensions: '14 × 14 × 5 cm Box',
      material: {
        en: 'Shea Butter, Damask Rose Distillate, Vitamin E',
        ar: 'زبدة الشيا، مقطر الورد الدمشقي، فيتامين E',
      },
      scentOrFinish: {
        en: 'Fresh Damask Rose & White Peony',
        ar: 'الورد الدمشقي الطازج والفاوانيا البيضاء',
      },
    },
    reviews: [],
  },
  {
    id: 'p-soap-turmeric',
    slug: 'Cleopatra-honey-oatmeal-bubble-soap',
    category: 'soaps',
    name: {
      en: 'Cleopatra Milk, Honey & Sea Salt Massage Bar',
      ar: 'صابونة كليوباترا بالحليب والعسل وأملاح البحر',
    },
    subtitle: {
      en: 'Exfoliating massage pearls with raw Upper Egyptian clover honey',
      ar: 'كرات تدليك مقشرة بالعسل الصعيدي الخام وحليب جوز الهند',
    },
    description: {
      en: 'Inspired by ancient Egyptian bath rituals, this nodular massage bar stimulates circulation while raw clover honey and coconut milk deeply nourish dry skin.',
      ar: 'مستوحاة من طقوس الجمال المصرية القديمة، تعمل كرات التدليك البارزة على تنشيط الدورة الدموية بينما يغذي عسل البرسيم الخام وحليب جوز الهند البشرة بعمق.',
    },
    price: 120,
    rating: 4.7,
    reviewsCount: 11,
    inStock: true,
    featured: false,
    image: '/assets/products/soap-rainbow-bubbles.png',
    specs: {
      weight: '175 g',
      dimensions: '9.5 × 7.5 × 4 cm',
      material: {
        en: 'Raw Clover Honey, Coconut Milk, Red Sea Minerals',
        ar: 'عسل برسيم خام، حليب جوز الهند، معادن البحر الأحمر',
      },
      scentOrFinish: {
        en: 'Warm Wildflower Honey & Vanilla Bean',
        ar: 'عسل الزهور البرية الدافئ والفانيليا',
      },
    },
    reviews: [],
  },
  {
    id: 'p-soap-hibiscus',
    slug: 'aswan-karkadeh-berry-cluster-soap',
    category: 'soaps',
    name: {
      en: 'Aswan Hibiscus & Berry Cluster Rope Soap',
      ar: 'صابونة الكركديه الأسواني والتوت بالحبل',
    },
    subtitle: {
      en: 'Botanical AHA glow soap infused with sun-dried hibiscus',
      ar: 'صابونة نضارة طبيعية غنية بخلاصة الكركديه الأسواني المجفف',
    },
    description: {
      en: 'Infused with organic hibiscus petals from Upper Egypt to naturally brighten and tone skin. Hand-strung on natural hemp cord for long-lasting daily use.',
      ar: 'غنية بخلاصة زهور الكركديه العضوي من صعيد مصر لتوحيد لون البشرة ومنحها إشراقة طبيعية، مع حبل قنب متين للاستخدام اليومي الطويل.',
    },
    price: 145,
    rating: 4.8,
    reviewsCount: 14,
    inStock: true,
    featured: false,
    image: '/assets/products/soap-grape-cluster.png',
    specs: {
      weight: '230 g',
      dimensions: '15.5 × 8 × 8 cm',
      material: {
        en: 'Hibiscus Extract, Sweet Almond Oil, Hemp Cord',
        ar: 'خلاصة الكركديه، زيت اللوز الحلو، حبل قنب طبيعي',
      },
      scentOrFinish: {
        en: 'Ruby Hibiscus, Pomegranate & Red Berries',
        ar: 'الكركديه الياقوتي، الرمان والتوت الأحمر',
      },
    },
    reviews: [],
  },

  // ================= CANDLES =================
  {
    id: 'p-candle-nefertiti',
    slug: 'queen-nefertiti-sunset-medallion-candle',
    category: 'candles',
    name: {
      en: 'Queen Nefertiti Sunset Medallion Candle',
      ar: 'شمعة الملكة نفرتيتي بتصميم غروب الأقصر',
    },
    subtitle: {
      en: 'Sculpted round relief soy candle with amber & blood orange',
      ar: 'شمعة صويا دائرية منحوتة ببروز الملكة نفرتيتي وعطر العنبر والبرتقال',
    },
    description: {
      en: 'Featuring a finely detailed bas-relief portrait of Queen Nefertiti framed within a self-standing pedestal disc. Hand-poured using 100% natural soy and beeswax blend in warm sunset terracotta, scented with Egyptian amber, sandalwood, and sweet blood orange.',
      ar: 'تتميز بنحت بارز دقيق لوجه الملكة نفرتيتي داخل قرص دائري بقاعدة ذاتية التوازن. مصبوبة يدوياً من مزيج شمع الصويا وشمع العسل الطبيعي بلون غروب الشمس الدافئ، ومعطرة بالعنبر المصري وخشب الصندل والبرتقال.',
    },
    price: 200,
    rating: 4.9,
    reviewsCount: 34,
    inStock: true,
    featured: true,
    image: '/assets/products/candle-nefertiti-sunset.png',
    specs: {
      weight: '280 g (38 hrs burn time)',
      dimensions: '12 × 12 × 3.8 cm',
      material: {
        en: '100% Pure Soy & Beeswax Blend, Braided Cotton Wick',
        ar: 'مزيج شمع الصويا وشمع العسل الطبيعي ١٠٠٪، فتيل قطن خالص',
      },
      scentOrFinish: {
        en: 'Luxor Sunset Amber, Sandalwood & Blood Orange',
        ar: 'عنبر غروب الأقصر، خشب الصندل والبرتقال الدافئ',
      },
    },
    variants: {
      en: ['Sunset Amber (Terracotta)', 'Royal Ivory (Oud)', 'Rose Quartz (Lotus)'],
      ar: ['عنبر الغروب (تيراكوتا)', 'عاجي ملكي (عود)', 'وردي كوارتز (لوتس)'],
    },
    reviews: [
      {
        id: 'r3',
        author: 'Salma Abdelrahman',
        authorAr: 'سلمى عبد الرحمن',
        rating: 5,
        date: '2026-10-08',
        comment: {
          en: 'The relief carving is museum quality! Even unlit, it perfumes my entire living room.',
          ar: 'دقة النحت البارز تضاهي قطع المتاحف! حتى بدون إشعالها، تعطر غرفة المعيشة بالكامل.',
        },
      },
    ],
  },
  {
    id: 'p-candle-lotus',
    slug: 'sacred-blue-lotus-blossom-relief-candle',
    category: 'candles',
    name: {
      en: 'Sacred Nile Lotus Blossom Relief Candle',
      ar: 'شمعة زهرة اللوتس المقدسة المنحوتة',
    },
    subtitle: {
      en: 'Rose-pink botanical medallion candle with Egyptian lotus & musk',
      ar: 'شمعة ميدالية وردية بنقش زهرة اللوتس وعطر اللوتس والمسك الأبيض',
    },
    description: {
      en: 'Celebrating the sacred lotus flower of Upper Egypt—a timeless emblem of rebirth and serenity. Hand-cast in soft lotus pink soy wax and infused with Nile water lily, white musk, and jasmine sambac.',
      ar: 'تحتفي بزهرة اللوتس المقدسة في صعيد مصر رمز التجدد والسكينة. مصبوبة يدوياً من شمع الصويا الوردي الناعم ومعطرة بأريج زنبق النيل والمسك الأبيض والياسمين البلدي.',
    },
    price: 200,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
    featured: true,
    image: '/assets/products/candle-lotus-blossom.png',
    specs: {
      weight: '280 g (38 hrs burn time)',
      dimensions: '12 × 12 × 3.8 cm',
      material: {
        en: 'Natural Soy Wax, Botanical Mineral Pigment, Cotton Wick',
        ar: 'شمع صويا طبيعي، أصباغ معدنية نباتية، فتيل قطني',
      },
      scentOrFinish: {
        en: 'Nile Lotus, Jasmine Sambac & White Musk',
        ar: 'لوتس النيل، الفل البلدي والمسك الأبيض',
      },
    },
    reviews: [],
  },
  {
    id: 'p-candle-scarab',
    slug: 'royal-winged-scarab-crimson-candle',
    category: 'candles',
    name: {
      en: 'Winged Royal Scarab Talismans Candle',
      ar: 'شمعة الجعران الملكي المجنح الياقوتية',
    },
    subtitle: {
      en: 'Deep ruby medallion candle scented with pomegranate & spiced oud',
      ar: 'شمعة باللون الأحمر الياقوتي معطرة بالرمان والعود الشرقي الفاخر',
    },
    description: {
      en: 'Adorned with a crisp three-dimensional carving of the winged Khepri scarab holding the solar disc. Poured in rich crimson wax and scented with warm spiced oud, black pomegranate, and cedarwood.',
      ar: 'مزينة بنحت ثلاثي الأبعاد للجعران المجنح حاملاً قرص الشمس. مصبوبة بلون ياقوتي غني ومعطرة بالعود الشرقي الدافئ والرمان الأسود وخشب الأرز.',
    },
    price: 200,
    rating: 4.7,
    reviewsCount: 15,
    inStock: true,
    featured: false,
    image: '/assets/products/candle-royal-scarab.png',
    specs: {
      weight: '280 g (38 hrs burn time)',
      dimensions: '12 × 12 × 3.8 cm',
      material: {
        en: '100% Soy & Beeswax Blend, Essential Oil Fragrance',
        ar: 'مزيج شمع الصويا والعسل الطبيعي ١٠٠٪، زيوت عطرية مركزة',
      },
      scentOrFinish: {
        en: 'Spiced Royal Oud, Pomegranate & Cedar',
        ar: 'العود الملكي المتبل، الرمان وخشب الأرز',
      },
    },
    reviews: [],
  },
  {
    id: 'p-candle-pyramids',
    slug: 'eternal-pyramids-of-nile-ivory-candle',
    category: 'candles',
    name: {
      en: 'Eternal Pyramids & Nile Waves Ivory Candle',
      ar: 'شمعة الأهرامات الخالدة وأمواج النيل العاجية',
    },
    subtitle: {
      en: 'Raw creamy beeswax & soy medallion with vanilla & frankincense',
      ar: 'شمعة عاجية طبيعية بعطر الفانيليا الدافئة واللبان العربي',
    },
    description: {
      en: 'An architectural relief depicting the Great Pyramids rising above tranquil desert dunes and Nile ripples. Unbleached ivory wax offers a clean, soot-free burn with comforting notes of Madagascar vanilla, myrrh, and sacred frankincense.',
      ar: 'نحت معماري يجسد الأهرامات الشامخة فوق كثبان الصحراء وأمواج النيل الهادئة. شمع عاجي نقي يمنح احتراقاً نظيفاً مع نفحات الفانيليا والمر واللبان الحوجري.',
    },
    price: 200,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    featured: true,
    image: '/assets/products/candle-giza-pyramids.png',
    specs: {
      weight: '280 g (38 hrs burn time)',
      dimensions: '12 × 12 × 3.8 cm',
      material: {
        en: 'Unbleached Soy Wax & Pure Beeswax',
        ar: 'شمع صويا غير مبيض وشمع عسل نقي',
      },
      scentOrFinish: {
        en: 'Madagascar Vanilla, Sacred Frankincense & Myrrh',
        ar: 'فانيليا مدغشقر، اللبان المقدس والمر',
      },
    },
    reviews: [],
  },
  {
    id: 'p-candle-horus',
    slug: 'eye-of-horus-lavender-amethyst-candle',
    category: 'candles',
    name: {
      en: 'Eye of Horus Lavender Amethyst Candle',
      ar: 'شمعة عين حورس بلون الجمشت واللافندر',
    },
    subtitle: {
      en: 'Calming aromatherapy relief candle with French lavender & sage',
      ar: 'شمعة استرخاء علاجية بعطر اللافندر الفرنسي والمريمية',
    },
    description: {
      en: 'Emblazoned with the protective Wadjet (Eye of Horus) symbol in soothing dusty amethyst wax. Designed for evening meditation and bedroom serenity with pure lavender, clary sage, and chamomile.',
      ar: 'منقوشة برمز عين حورس الحامي بلون الجمشت البنفسجي الهادئ. صُممت خصيصاً لجلسات الاسترخاء المسائية وتهدئة الأعصاب بفضل زيت اللافندر النقي والمريمية والبابونج.',
    },
    price: 200,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    featured: false,
    image: '/assets/products/candle-eye-of-horus.png',
    specs: {
      weight: '280 g (38 hrs burn time)',
      dimensions: '12 × 12 × 3.8 cm',
      material: {
        en: '100% Soy Wax, Pure Lavender Essential Oil',
        ar: 'شمع صويا ١٠٠٪، زيت اللافندر العطري النقي',
      },
      scentOrFinish: {
        en: 'French Lavender, Clary Sage & Chamomile',
        ar: 'اللافندر الفرنسي، المريمية والبابونج',
      },
    },
    reviews: [],
  },
  {
    id: 'p-candle-tut',
    slug: 'king-tutankhamun-lapis-blue-candle',
    category: 'candles',
    name: {
      en: 'King Tutankhamun Lapis Lazuli Candle',
      ar: 'شمعة الملك توت عنخ آمون بلون اللازورد الملكي',
    },
    subtitle: {
      en: 'High-relief Pharaoh mask candle in vibrant Egyptian blue',
      ar: 'شمعة بارزة لقناع الفرعون الذهبي باللون الأزرق المصري الشهير',
    },
    description: {
      en: 'Our signature centerpiece candle showcasing the iconic funerary mask of Pharaoh Tutankhamun in striking Egyptian lapis blue. Infused with royal blue lotus, sea salt, and Atlas cedar.',
      ar: 'شمعتنا الأيقونية الأبرز التي تجسد قناع الملك توت عنخ آمون بتفاصيل ثلاثية الأبعاد باللون الأزرق اللازوردي الملكي، معطرة باللوتس الأزرق وملح البحر وخشب الأرز.',
    },
    price: 200,
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
    featured: true,
    image: '/assets/products/candle-king-tut-blue.png',
    specs: {
      weight: '295 g (40 hrs burn time)',
      dimensions: '12 × 12 × 4 cm',
      material: {
        en: 'Premium Soy & Beeswax Blend, Lapis Mineral Tint',
        ar: 'مزيج شمع الصويا والعسل الفاخر، صبغة اللازورد المعدنية',
      },
      scentOrFinish: {
        en: 'Blue Lotus, Mediterranean Sea Salt & Cedar',
        ar: 'اللوتس الأزرق، ملح البحر المتوسط وخشب الأرز',
      },
    },
    reviews: [
      {
        id: 'r4',
        author: 'Karim Mansour',
        authorAr: 'كريم منصور',
        rating: 5,
        date: '2026-10-12',
        comment: {
          en: 'Incredible detail on King Tut’s mask and the blue shade is vivid and rich. Fast delivery from Luxor to Cairo!',
          ar: 'تفاصيل مذهلة لقناع الملك توت واللون الأزرق غني وفخم جداً. توصيل سريع من الأقصر إلى القاهرة!',
        },
      },
    ],
  },
  {
    id: 'p-candle-cinnamon',
    slug: 'spiced-cinnamon-bark-pine-glass-candle',
    category: 'candles',
    name: {
      en: 'Winter Nile Spiced Cinnamon & Pine Jar Candle',
      ar: 'شمعة القرفة الصعيدية والصنوبر في كأس زجاجي',
    },
    subtitle: {
      en: 'Botanical glass jar candle inlaid with real cinnamon sticks & star anise',
      ar: 'شمعة صويا طبيعية مرصعة بأعواد القرفة الحقيقية والينسون النجمي',
    },
    description: {
      en: 'As featured in our hero collection: creamy soy wax hand-poured into a heavy crystal tumbler and crowned with whole Ceylon cinnamon bark and star anise pods. Fills your home with warm bakery spice and forest pine.',
      ar: 'الشمعة المميزة في واجهة متجرنا: شمع صويا كريمي مصبوب في كأس زجاجي فاخر ومرصع بأعواد القرفة السيلانية الكاملة والينسون النجمي ليملأ منزلك بالدفء والسكينة.',
    },
    price: 260,
    originalPrice: 310,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 33,
    inStock: true,
    featured: true,
    isNew: true,
    image: '/assets/products/candle-cinnamon-pine-jar.png',
    specs: {
      weight: '380 g (55 hrs burn time)',
      dimensions: '10.5 × 9 × 9 cm',
      material: {
        en: 'Soy Wax, Whole Cinnamon Sticks, Star Anise, Glass Vessel',
        ar: 'شمع صويا، أعواد قرفة طبيعية، ينسون نجمي، كأس زجاجي حراري',
      },
      scentOrFinish: {
        en: 'Ceylon Cinnamon, Clove Bud, Sweet Vanilla & Pine',
        ar: 'القرفة السيلانية، القرنفل، الفانيليا الحلوة والصنوبر',
      },
    },
    reviews: [],
  },
  {
    id: 'p-candle-citrus',
    slug: 'luxor-sun-sweet-orange-grove-candle',
    category: 'candles',
    name: {
      en: 'Luxor Sun Sweet Orange & Neroli Tumbler Candle',
      ar: 'شمعة إشراقة الأقصر بالبرتقال وزهر النارنج',
    },
    subtitle: {
      en: 'Golden citrus aromatherapy candle for energizing mornings',
      ar: 'شمعة عطرية ذهبية منعشة بزيوت الموالح وزهر البرتقال الطبيعي',
    },
    description: {
      en: 'Radiant golden soy wax infused with sun-ripened Upper Egyptian Valencia orange peel and fresh neroli blossom. Poured in a reusable minimalist glass vessel.',
      ar: 'شمع صويا ذهبي مشرق غني بزيوت قشر البرتقال الصعيدي وزهر النارنج المنعش، مصبوب في وعاء زجاجي أنيق قابل لإعادة الاستخدام.',
    },
    price: 220,
    rating: 4.8,
    reviewsCount: 18,
    inStock: true,
    featured: false,
    image: '/assets/products/candle-citrus-pillar.png',
    specs: {
      weight: '320 g (45 hrs burn time)',
      dimensions: '10 × 8.5 × 8.5 cm',
      material: {
        en: '100% Soy Wax, Cold-Pressed Orange Peel Oil',
        ar: 'شمع صويا ١٠٠٪، زيت قشر البرتقال المعصور على البارد',
      },
      scentOrFinish: {
        en: 'Valencia Orange, Neroli Blossom & Honeyed Amber',
        ar: 'برتقال فالنسيا، زهر النارنج والعنبر بالعسل',
      },
    },
    reviews: [],
  },
  {
    id: 'p-candle-concrete-lotus',
    slug: 'kintsugi-gold-concrete-lotus-double-wick-candle',
    category: 'candles',
    name: {
      en: 'Kintsugi Gold Vein Concrete Vessel Candle',
      ar: 'شمعة وعاء الكونكريت المطعم بعروق الذهب',
    },
    subtitle: {
      en: 'Dual wood-wick soy candle in a hand-cast travertine concrete bowl',
      ar: 'شمعة بفتيل خشبي مزدوج داخل وعاء كونكريت مطعم بورق الذهب',
    },
    description: {
      en: 'Poured into our artisan hand-cast concrete bowl accented with 24k gold-leaf Kintsugi veining. Features dual crackling wooden wicks and a rich fig, cashmere wood, and white tea fragrance.',
      ar: 'مصبوبة داخل وعاء كونكريت مصنوع يدوياً ومطعم بعروق ورق الذهب الفاخر، مع فتيل خشبي مزدوج يصدر صوتاً دافئاً وعطر التين وأخشاب الكشمير والشاي الأبيض.',
    },
    price: 340,
    originalPrice: 400,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 24,
    inStock: true,
    featured: true,
    isNew: true,
    image: '/assets/products/concrete-lotus-vessel.svg',
    specs: {
      weight: '480 g (60 hrs burn time)',
      dimensions: '13 × 13 × 8 cm',
      material: {
        en: 'Architectural Sealed Concrete, Gold Leaf, Soy Wax, Wood Wicks',
        ar: 'كونكريت معماري معزول، ورق ذهب، شمع صويا، فتيل خشبي مزدوج',
      },
      scentOrFinish: {
        en: 'Nile Fig, Cashmere Wood & White Tea',
        ar: 'تين النيل، أخشاب الكشمير والشاي الأبيض',
      },
    },
    reviews: [],
  },

  // ================= PHARAONIC MAGNETS =================
  {
    id: 'p-magnet-bronze',
    slug: 'antique-bronze-pharaonic-collector-magnets-6pc',
    category: 'pharaonic-magnets',
    name: {
      en: 'Antique Bronze Pharaonic Collector Magnet Set (6 Pcs)',
      ar: 'مجموعة مغناطيس فرعوني بالبرونز العتيق (٦ قطع)',
    },
    subtitle: {
      en: 'Tutankhamun, Nefertiti, Mummy Sarcophagus, Camel & Temple reliefs',
      ar: 'توت عنخ آمون، نفرتيتي، التابوت الملكي، الجمل ومعابد الأقصر',
    },
    description: {
      en: 'A curated 6-piece collector set hand-cast from high-density stone-polyester resin and hand-burnished with an authentic antique bronze patina. Fitted with strong neodymium flush magnets that hold notes and photos securely without scratching surfaces.',
      ar: 'مجموعة تذكارية مكونة من ٦ قطع مصبوبة يدوياً من البوليستر الحجري عالي الكثافة ومعتقة يدوياً بطبقة البرونز الأثري. مزودة بمغناطيس نيوديميوم قوي لتثبيت الأوراق والصور بأمان تام.',
    },
    price: 350,
    originalPrice: 500,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    featured: true,
    image: '/assets/products/magnet-pharaonic-bronze.png',
    specs: {
      weight: '320 g (Set of 6)',
      dimensions: '7–9 cm height per piece',
      material: {
        en: 'High-Density Stone Polyester Resin, Neodymium Magnets',
        ar: 'بوليستر حجري عالي الكثافة، مغناطيس نيوديميوم قوي',
      },
      scentOrFinish: {
        en: 'Hand-Rubbed Antique Bronze Patina',
        ar: 'تشطيب برونزي أثري معتق يدوياً',
      },
    },
    reviews: [
      {
        id: 'r5',
        author: 'Ahmed El-Masry',
        authorAr: 'أحمد المصري',
        rating: 5,
        date: '2026-09-29',
        comment: {
          en: 'Heavy, solid, and detailed—nothing like cheap tourist magnets. Took two sets with me as gifts for colleagues abroad.',
          ar: 'ثقيلة ومتينة وتفاصيلها دقيقة جداً تختلف تماماً عن المغناطيسات العادية. أخذت مجموعتين هدايا لزملائي في الخارج.',
        },
      },
    ],
  },
  {
    id: 'p-magnet-silver',
    slug: 'royal-pewter-silver-pharaonic-magnet-set-6pc',
    category: 'pharaonic-magnets',
    name: {
      en: 'Royal Silver Pewter Pharaonic Magnet Set (6 Pcs)',
      ar: 'مجموعة مغناطيس فرعوني بالفضة الملكية المعتقة (٦ قطع)',
    },
    subtitle: {
      en: 'Horus Falcon, Great Pyramid Medallion, Scarab, Cleopatra & Akhenaten',
      ar: 'صقر حورس، ميدالية الهرم الأكبر، الجعران، كليوباترا وإخناتون',
    },
    description: {
      en: 'Finished in brushed metallic pewter and oxidized silver to highlight every hieroglyphic carving. Includes the Winged Horus Falcon, Great Pyramid medallion, Sacred Scarab, Queen Cleopatra, Pharaoh Akhenaten, and Hathor stela.',
      ar: 'مطلي بالفضة المعدنية المعتقة لإبراز أدق النقوش الهيروغليفية. يضم صقر حورس المجنح، ميدالية الهرم الأكبر، الجعران المقدس، الملكة كليوباترا، إخناتون ولوحة حتحور.',
    },
    price: 350,
    originalPrice: 500,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    featured: true,
    image: '/assets/products/magnet-pharaonic-silver.png',
    specs: {
      weight: '330 g (Set of 6)',
      dimensions: '7–8.5 cm per piece',
      material: {
        en: 'Stone-Resin Composite, Oxidized Silver Leaf Finish',
        ar: 'مركب الحجر والراتنج، طلاء فضي مؤكسد يدوياً',
      },
      scentOrFinish: {
        en: 'Brushed Pewter & Oxidized Silver',
        ar: 'فضي ملكي معتق',
      },
    },
    reviews: [],
  },
  {
    id: 'p-magnet-gold-royal',
    slug: 'valley-of-kings-24k-gold-finish-magnets-6pc',
    category: 'pharaonic-magnets',
    name: {
      en: 'Valley of the Kings Gold Finish Magnet Set (6 Pcs)',
      ar: 'مجموعة مغناطيس وادي الملوك الذهبية (٦ قطع)',
    },
    subtitle: {
      en: 'Bastet Cat, Winged Isis, Royal Sarcophagus, Papyrus Stela & Caravan',
      ar: 'القطة باستت، إيزيس المجنحة، التابوت الذهبي، لوحة البردي والقافلة',
    },
    description: {
      en: 'Inspired by the gilded treasures of the Valley of the Kings in Luxor. Each piece is sealed with a tarnish-resistant metallic gold lacquer over finely carved stone-polyester reliefs.',
      ar: 'مستوحاة من الكنوز المذهبة في وادي الملوك بالأقصر. كل قطعة معالجة بطبقة ذهبية معدنية مقاومة للبهتان فوق نقوش بارزة متقنة.',
    },
    price: 350,
    originalPrice: 500,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    featured: true,
    image: '/assets/products/magnet-pharaonic-gold-royal.png',
    specs: {
      weight: '315 g (Set of 6)',
      dimensions: '7–9 cm per piece',
      material: {
        en: 'Sculpted Polyester Resin, Metallic Gold Patina',
        ar: 'بوليستر فني منحوت، طلاء ذهبي ملكي معتق',
      },
      scentOrFinish: {
        en: 'Lustrous Valley of the Kings Gold',
        ar: 'ذهبي لامع مستوحى من وادي الملوك',
      },
    },
    reviews: [],
  },
  {
    id: 'p-magnet-gold-dynasty',
    slug: 'golden-dynasty-karnak-pharaonic-magnets-6pc',
    category: 'pharaonic-magnets',
    name: {
      en: 'Golden Dynasty Karnak Collector Magnet Set (6 Pcs)',
      ar: 'مجموعة مغناطيس الأسرة الذهبية والكرنك (٦ قطع)',
    },
    subtitle: {
      en: 'Nefertiti Bust, Giza Pyramids, Bastet, Royal Chariot & Cartouche Scarab',
      ar: 'تمثال نفرتيتي، أهرامات الجيزة، باستت، العجلة الحربية والجعران',
    },
    description: {
      en: 'Our bestselling souvenir and home gallery magnet collection featuring Queen Nefertiti’s royal bust, the War Chariot medallion, Sacred Scarab, Bastet statue, Giza Pyramids, and Temple Pharaoh relief.',
      ar: 'المجموعة الأكثر مبيعاً للهدايا التذكارية وديكور المنزل، وتضم تمثال نفرتيتي النصفي، ميدالية العجلة الحربية، الجعران المقدس، القطة باستت، الأهرامات ونقش الفرعون.',
    },
    price: 350,
    originalPrice: 500,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 44,
    inStock: true,
    featured: false,
    image: '/assets/products/magnet-pharaonic-gold-dynasty.png',
    specs: {
      weight: '325 g (Set of 6)',
      dimensions: '7.5–9 cm per piece',
      material: {
        en: 'Cast Polyester Stone, Antique Gold Finish',
        ar: 'حجر بوليستر مصبوب، تشطيب ذهبي عتيق',
      },
      scentOrFinish: {
        en: 'Warm Antique Karnak Gold',
        ar: 'ذهبي الكرنك العتيق الدافئ',
      },
    },
    reviews: [],
  },

  // ================= CONCRETE & POLYESTER ART =================
  {
    id: 'p-art-tut-mask',
    slug: 'pharaoh-tutankhamun-bronze-wall-desk-relief',
    category: 'concrete-art',
    name: {
      en: 'Pharaoh Tutankhamun Hand-Cast Bronze Relief Plaque',
      ar: 'منحوتة قناع توت عنخ آمون البرونزية للمكتب والحائط',
    },
    subtitle: {
      en: 'Heavy stone-polyester architectural sculpture with display stand',
      ar: 'قطعة فنية ثقيلة من البوليستر الحجري مع حامل عرض للمكتب',
    },
    description: {
      en: 'Individually cast and hand-chiseled by Luxor sculptors, this substantial relief of King Tutankhamun’s royal nemes headdress includes both a concealed wall mount and a brass desk easel.',
      ar: 'مصبوبة ومنحوتة يدوياً بأيدي فناني الأقصر، وتأتي هذه المنحوتة الفاخرة لقناع الملك توت عنخ آمون مع تعليقة خلفية للحائط وحامل نحاسي أنيق للمكتب.',
    },
    price: 280,
    originalPrice: 340,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 17,
    inStock: true,
    featured: false,
    image: '/assets/products/art-tutankhamun-mask-bronze.png',
    specs: {
      weight: '460 g',
      dimensions: '18 × 14 × 4.5 cm',
      material: {
        en: 'Weighted Stone-Polyester & Natural Mineral Pigments',
        ar: 'بوليستر حجري مكثف وأصباغ معدنية طبيعية',
      },
      scentOrFinish: {
        en: 'Museum Aged Bronze & Ochre Patina',
        ar: 'برونز متحفي معتق',
      },
    },
    reviews: [],
  },
  {
    id: 'p-art-nefertiti',
    slug: 'queen-nefertiti-gilded-profile-sculpture',
    category: 'concrete-art',
    name: {
      en: 'Queen Nefertiti Gilded Profile Desk Sculpture',
      ar: 'منحوتة الملكة نفرتيتي المذهبة للديكور المكتبي',
    },
    subtitle: {
      en: 'Hand-burnished antique gold bust on a weighted base',
      ar: 'تمثال نصفي بارز مطلي بالذهب العتيق على قاعدة متزنة',
    },
    description: {
      en: 'A regal profile sculpture of Queen Nefertiti showcasing her iconic tall crown and collar necklace, hand-finished in antique Luxor gold.',
      ar: 'منحوتة جانبية ملكية للملكة نفرتيتي تبرز تاجها الشهير وقلادتها الفرعونية، مشطبة يدوياً بالذهب الأقصري العتيق.',
    },
    price: 260,
    rating: 4.8,
    reviewsCount: 14,
    inStock: true,
    featured: false,
    image: '/assets/products/art-nefertiti-bust-relief.png',
    specs: {
      weight: '410 g',
      dimensions: '19 × 11 × 4 cm',
      material: {
        en: 'Reinforced Polyester Stone & Gold Leaf Wax',
        ar: 'حجر بوليستر مقوى وشمع ورق الذهب',
      },
      scentOrFinish: {
        en: 'Hand-Burnished Antique Gold',
        ar: 'ذهب عتيق مصقول يدوياً',
      },
    },
    reviews: [],
  },
  {
    id: 'p-art-bastet',
    slug: 'goddess-bastet-sacred-cat-golden-statuette',
    category: 'concrete-art',
    name: {
      en: 'Sacred Bastet Guardian Cat Statuette',
      ar: 'تمثال القطة المقدسة باستت باللون الذهبي',
    },
    subtitle: {
      en: 'Symbol of home harmony, warmth & protection crafted in Luxor',
      ar: 'رمز التناغم المنزلي والدفء والحماية مصنوع يدوياً في الأقصر',
    },
    description: {
      en: 'In ancient Egyptian tradition, Bastet guards the home with grace and joy. Cast in solid polyester-stone composite with an engraved hieroglyphic pedestal and pectoral collar.',
      ar: 'في التراث المصري القديم، ترمز باستت إلى حماية المنزل والبهجة. مصبوبة من مركب البوليستر الحجري المصمت مع قاعدة منقوشة بالهيروغليفية وقلادة ملكية.',
    },
    price: 240,
    rating: 4.9,
    reviewsCount: 21,
    inStock: true,
    featured: false,
    image: '/assets/products/art-bastet-statue-gold.png',
    specs: {
      weight: '390 g',
      dimensions: '17 × 9 × 6 cm',
      material: {
        en: 'Solid Polyester-Stone Composite',
        ar: 'مركب البوليستر الحجري المصمت',
      },
      scentOrFinish: {
        en: 'Satin Gold Patina',
        ar: 'ذهبي ساتان معتق',
      },
    },
    reviews: [],
  },
  {
    id: 'p-art-pyramid-silver',
    slug: 'hieroglyphic-ring-great-pyramid-silver-medallion',
    category: 'concrete-art',
    name: {
      en: 'Hieroglyphic Ring & Great Pyramid Silver Medallion',
      ar: 'جدارية الهرم الأكبر والحلقة الهيروغليفية الفضية',
    },
    subtitle: {
      en: 'Architectural concrete & resin medallion for modern interiors',
      ar: 'ميدالية معمارية تجمع بين الكونكريت والراتنج للديكور العصري',
    },
    description: {
      en: 'A geometric statement piece uniting the Great Pyramid of Khufu with an outer ring of protective cartouches and hieroglyphs in cool architectural pewter.',
      ar: 'قطعة فنية هندسية تجمع بين الهرم الأكبر وحلقة خارجية من الخراطيش الملكية والنقوش الهيروغليفية بتشطيب فضي معماري أنيق.',
    },
    price: 250,
    rating: 4.7,
    reviewsCount: 12,
    inStock: true,
    featured: false,
    image: '/assets/products/art-pyramid-hieroglyph-silver.png',
    specs: {
      weight: '420 g',
      dimensions: '16 × 16 × 3.5 cm',
      material: {
        en: 'Architectural Concrete & Pewter Resin',
        ar: 'كونكريت معماري وراتنج مطلي بالفضة المعتقة',
      },
      scentOrFinish: {
        en: 'Architectural Silver & Stone',
        ar: 'فضي معماري وحجري',
      },
    },
    reviews: [],
  },

  // ================= DESIGNER FIRE EXTINGUISHERS =================
  {
    id: 'p-ext-gold',
    slug: 'royal-lotus-gold-artisan-fire-extinguisher',
    category: 'fire-extinguishers',
    name: {
      en: 'Viola Royal Lotus Gold Designer Fire Extinguisher (2 kg)',
      ar: 'طفاية حريق ديكورية بإصدار اللوتس الملكي الذهبي (٢ كجم)',
    },
    subtitle: {
      en: 'ABC dry powder safety extinguisher dressed in brushed gold & lotus art',
      ar: 'طفاية بودرة جافة معتمدة للأمان المنزلي والسيارات بتصميم ذهبي فاخر',
    },
    description: {
      en: 'Turn essential home and car safety into an object of art. Built on a certified 2 kg ABC dry-powder steel cylinder and finished in brushed Luxor gold with a matte charcoal belly band and sacred lotus insignia. Includes brass wall bracket.',
      ar: 'حوّل وسيلة الأمان الأساسية في منزلك أو سيارتك إلى قطعة ديكور راقية. أسطوانة فولاذية معتمدة سعة ٢ كجم بودرة جافة ABC مطلية بالذهب الأقصري المصقول مع حزام أسود مطفي وشعار زهرة اللوتس، شاملة حامل تثبيت حائطي.',
    },
    price: 480,
    originalPrice: 600,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 15,
    inStock: true,
    featured: true,
    isNew: true,
    image: '/assets/products/extinguisher-royal-gold.svg',
    specs: {
      weight: '3.4 kg Total (2 kg ABC Dry Powder)',
      dimensions: '38 × 11 × 11 cm',
      material: {
        en: 'CE-Standard Steel Cylinder, Brass Valve, Heat-Resistant Lacquer',
        ar: 'أسطوانة فولاذ قياسية، صمام نحاسي، طلاء حراري مقاوم للخدش',
      },
      scentOrFinish: {
        en: 'Brushed Royal Gold & Matte Onyx',
        ar: 'ذهبي ملكي مصقول وأسود أونيكس مطفي',
      },
    },
    reviews: [
      {
        id: 'r6',
        author: 'Tarek El-Gendy',
        authorAr: 'طارق الجندي',
        rating: 5,
        date: '2026-10-05',
        comment: {
          en: 'Finally a fire extinguisher you actually want to display in the kitchen or living room instead of hiding in a cabinet!',
          ar: 'أخيراً طفاية حريق تفتخر بوضعها في المطبخ أو غرفة المعيشة كقطعة ديكور بدلاً من إخفائها داخل الخزانة!',
        },
      },
    ],
  },
  {
    id: 'p-ext-obsidian',
    slug: 'horus-guard-matte-obsidian-fire-extinguisher',
    category: 'fire-extinguishers',
    name: {
      en: 'Horus Guard Matte Obsidian & Brass Fire Extinguisher (2 kg)',
      ar: 'طفاية حريق ديكورية إصدار حارس حورس الأسود والبرونز (٢ كجم)',
    },
    subtitle: {
      en: 'Sleek matte black cylinder with gold Eye of Horus emblem for home & car',
      ar: 'تصميم أسود مطفي فخم بشعار عين حورس الذهبي للمكاتب والسيارات',
    },
    description: {
      en: 'Designed for modern apartments, studios, and luxury vehicles. Features a velvet-matte obsidian finish, solid brass valve hardware, and the protective Eye of Horus emblem in metallic gold.',
      ar: 'مصممة للشقق العصرية والمكاتب والسيارات الفاخرة. تتميز بطلاء أسود مخملي مطفي وصمام نحاسي صلب مع شعار عين حورس باللون الذهبي المعدني.',
    },
    price: 450,
    originalPrice: 550,
    discountPercent: 18,
    rating: 4.8,
    reviewsCount: 11,
    inStock: true,
    featured: false,
    image: '/assets/products/extinguisher-matte-obsidian.svg',
    specs: {
      weight: '3.4 kg Total (2 kg ABC Dry Powder)',
      dimensions: '38 × 11 × 11 cm',
      material: {
        en: 'High-Strength Steel Cylinder, Solid Brass Gauge & Handle',
        ar: 'أسطوانة فولاذ عالية المتانة، مؤشر ومقبض من النحاس الصلب',
      },
      scentOrFinish: {
        en: 'Matte Obsidian Black & Antique Brass',
        ar: 'أسود أوبسيديان مطفي ونحاس عتيق',
      },
    },
    reviews: [],
  },
];
