import { TouristSpot, Prefecture } from '../types/touristSpots';

export const TOURIST_SPOTS: Record<string, TouristSpot> = {
  // 東京の観光スポット
  tokyo_tower: {
    id: 'tokyo_tower',
    name: '東京タワー',
    nameEn: 'Tokyo Tower',
    description: '東京のシンボルとして愛される333mの電波塔。展望台からは東京の街並みが一望できます。',
    category: 'landmark',
    prefecture: 'tokyo',
    image: 'https://picsum.photos/800/600?random=1',
    location: {
      address: '東京都港区芝公園4-2-8',
      station: '神谷町駅',
      coordinates: { lat: 35.6586, lng: 139.7454 }
    },
    highlights: ['333mの高さ', '東京の夜景', '展望台', 'フットタウン'],
    hashtags: ['#東京タワー', '#TokyoTower', '#夜景', '#展望台', '#東京観光'],
    keywords: ['東京タワー', 'Tokyo Tower', '夜景', '展望台', '芝公園'],
    rating: 4.3,
    visitTime: '1-2時間',
    bestSeason: ['春', '秋', '冬'],
    entrance: { fee: '大人1,200円', hours: '9:00-23:00' },
    access: { train: '神谷町駅から徒歩7分', walking: '赤羽橋駅から徒歩5分' },
    tips: ['夜景は18:00以降がおすすめ', '土日は混雑するため平日がベター', 'フットタウンでお土産購入可能']
  },
  
  skytree: {
    id: 'skytree',
    name: '東京スカイツリー',
    nameEn: 'Tokyo Skytree',
    description: '高さ634mの世界一高い自立式電波塔。東京ソラマチも併設され、一日中楽しめます。',
    category: 'landmark',
    prefecture: 'tokyo',
    image: 'https://picsum.photos/800/600?random=2',
    location: {
      address: '東京都墨田区押上1-1-2',
      station: 'とうきょうスカイツリー駅',
      coordinates: { lat: 35.7101, lng: 139.8107 }
    },
    highlights: ['634mの高さ', '天望デッキ', '天望回廊', '東京ソラマチ'],
    hashtags: ['#東京スカイツリー', '#TokyoSkytree', '#634m', '#ソラマチ', '#押上'],
    keywords: ['東京スカイツリー', 'Tokyo Skytree', 'ソラマチ', '634m', '押上'],
    rating: 4.4,
    visitTime: '2-3時間',
    bestSeason: ['春', '秋', '冬'],
    entrance: { fee: '大人2,100円', hours: '8:00-22:00' },
    access: { train: 'とうきょうスカイツリー駅直結', walking: '押上駅から徒歩3分' },
    tips: ['事前予約推奨', 'ソラマチでショッピングも楽しめる', '天気の良い日は富士山も見える']
  },

  asakusa: {
    id: 'asakusa',
    name: '浅草寺',
    nameEn: 'Sensoji Temple',
    description: '東京最古の寺院。雷門から仲見世通りを抜けて本堂へ。江戸情緒あふれる下町の代表格。',
    category: 'temple',
    prefecture: 'tokyo',
    image: 'https://picsum.photos/800/600?random=3',
    location: {
      address: '東京都台東区浅草2-3-1',
      station: '浅草駅',
      coordinates: { lat: 35.7148, lng: 139.7967 }
    },
    highlights: ['雷門', '仲見世通り', '本堂', '五重塔'],
    hashtags: ['#浅草寺', '#雷門', '#仲見世通り', '#下町', '#江戸情緒'],
    keywords: ['浅草寺', 'Sensoji', '雷門', '仲見世通り', '浅草'],
    rating: 4.5,
    visitTime: '1-2時間',
    bestSeason: ['春', '秋'],
    entrance: { fee: '無料', hours: '6:00-17:00' },
    access: { train: '浅草駅から徒歩5分', walking: '各線浅草駅からアクセス良好' },
    tips: ['朝早い時間は人が少ない', '仲見世通りでお土産購入', '人形焼きが有名']
  },

  shibuya: {
    id: 'shibuya',
    name: '渋谷スクランブル交差点',
    nameEn: 'Shibuya Crossing',
    description: '世界一の交差点として有名。一度に3000人が行き交う圧巻の光景は東京の象徴。',
    category: 'modern',
    prefecture: 'tokyo',
    image: 'https://picsum.photos/800/600?random=4',
    location: {
      address: '東京都渋谷区道玄坂2-1',
      station: '渋谷駅',
      coordinates: { lat: 35.6598, lng: 139.7006 }
    },
    highlights: ['スクランブル交差点', 'ハチ公像', '渋谷スカイ', '109'],
    hashtags: ['#渋谷', '#スクランブル交差点', '#ハチ公', '#渋谷スカイ', '#109'],
    keywords: ['渋谷', 'Shibuya', 'スクランブル交差点', 'ハチ公', '109'],
    rating: 4.2,
    visitTime: '30分-1時間',
    bestSeason: ['通年'],
    entrance: { fee: '無料', hours: '24時間' },
    access: { train: '渋谷駅直結', walking: 'JR・私鉄各線渋谷駅すぐ' },
    tips: ['夕方から夜がおすすめ', 'スターバックスから見下ろせる', '写真撮影は歩道橋から']
  },

  // 神奈川の観光スポット
  kamakura_daibutsu: {
    id: 'kamakura_daibutsu',
    name: '鎌倉大仏殿高徳院',
    nameEn: 'Kamakura Daibutsu',
    description: '高さ13.35mの鎌倉大仏で有名な高徳院。800年近い歴史を持つ古都鎌倉のシンボル。',
    category: 'temple',
    prefecture: 'kanagawa',
    image: 'https://picsum.photos/800/600?random=5',
    location: {
      address: '神奈川県鎌倉市長谷4-2-28',
      station: '長谷駅',
      coordinates: { lat: 35.3167, lng: 139.5358 }
    },
    highlights: ['高さ13.35mの大仏', '胎内拝観', '古都鎌倉', '青銅製'],
    hashtags: ['#鎌倉大仏', '#高徳院', '#古都鎌倉', '#長谷', '#大仏'],
    keywords: ['鎌倉大仏', 'Kamakura Daibutsu', '高徳院', '長谷', '鎌倉'],
    rating: 4.6,
    visitTime: '30分-1時間',
    bestSeason: ['春', '秋'],
    entrance: { fee: '大人300円', hours: '8:00-17:30' },
    access: { train: '長谷駅から徒歩7分', walking: '江ノ電長谷駅から徒歩圏内' },
    tips: ['胎内拝観は別途20円', '早朝は観光客が少ない', '近くに長谷寺もある']
  },

  enoshima: {
    id: 'enoshima',
    name: '江島神社',
    nameEn: 'Enoshima Shrine',
    description: '湘南を代表する観光地。恋人の聖地としても有名で、江の島シーキャンドルとセットで楽しめます。',
    category: 'temple',
    prefecture: 'kanagawa',
    image: 'https://picsum.photos/800/600?random=6',
    location: {
      address: '神奈川県藤沢市江の島2-3-8',
      station: '片瀬江ノ島駅',
      coordinates: { lat: 35.2981, lng: 139.4804 }
    },
    highlights: ['江島神社', 'シーキャンドル', '恋人の聖地', '湘南の海'],
    hashtags: ['#江島神社', '#江の島', '#シーキャンドル', '#恋人の聖地', '#湘南'],
    keywords: ['江島神社', 'Enoshima', '江の島', 'シーキャンドル', '湘南'],
    rating: 4.3,
    visitTime: '2-3時間',
    bestSeason: ['春', '夏', '秋'],
    entrance: { fee: '無料', hours: '8:30-17:00' },
    access: { train: '片瀬江ノ島駅から徒歩15分', walking: '江ノ電江ノ島駅から徒歩20分' },
    tips: ['夕日の時間がロマンチック', 'エスカー利用で楽に移動', '新江ノ島水族館も近い']
  },

  minatomirai: {
    id: 'minatomirai',
    name: 'みなとみらい21',
    nameEn: 'Minato Mirai 21',
    description: '横浜の現代的なウォーターフロント。コスモワールドやランドマークタワーなど見どころ満載。',
    category: 'modern',
    prefecture: 'kanagawa',
    image: 'https://picsum.photos/800/600?random=7',
    location: {
      address: '神奈川県横浜市西区みなとみらい',
      station: 'みなとみらい駅',
      coordinates: { lat: 35.4657, lng: 139.6201 }
    },
    highlights: ['ランドマークタワー', 'コスモワールド', '赤レンガ倉庫', '夜景'],
    hashtags: ['#みなとみらい', '#横浜', '#ランドマークタワー', '#コスモワールド', '#夜景'],
    keywords: ['みなとみらい', 'Minato Mirai', '横浜', 'ランドマークタワー', 'コスモワールド'],
    rating: 4.4,
    visitTime: '半日-1日',
    bestSeason: ['通年'],
    entrance: { fee: '施設により異なる', hours: '施設により異なる' },
    access: { train: 'みなとみらい駅直結', walking: '桜木町駅から徒歩10分' },
    tips: ['夜景は18:00以降がベスト', '赤レンガ倉庫でイベント開催', 'コスモクロック21は必見']
  },

  // 埼玉の観光スポット
  kawagoe: {
    id: 'kawagoe',
    name: '川越蔵造りの町並み',
    nameEn: 'Kawagoe Historic District',
    description: '小江戸と呼ばれる川越の象徴的な蔵造りの町並み。時の鐘とともに江戸情緒を楽しめます。',
    category: 'cultural',
    prefecture: 'saitama',
    image: 'https://picsum.photos/800/600?random=8',
    location: {
      address: '埼玉県川越市幸町2',
      station: '川越市駅',
      coordinates: { lat: 35.9250, lng: 139.4855 }
    },
    highlights: ['蔵造りの町並み', '時の鐘', '菓子屋横丁', '川越氷川神社'],
    hashtags: ['#川越', '#小江戸', '#蔵造り', '#時の鐘', '#菓子屋横丁'],
    keywords: ['川越', 'Kawagoe', '小江戸', '蔵造り', '時の鐘'],
    rating: 4.2,
    visitTime: '2-3時間',
    bestSeason: ['春', '秋'],
    entrance: { fee: '無料', hours: '散策自由' },
    access: { train: '川越市駅から徒歩10分', walking: '本川越駅から徒歩15分' },
    tips: ['菓子屋横丁で芋菓子を堪能', '時の鐘は1日4回鳴る', 'レンタル着物で散策がおすすめ']
  },

  chichibu: {
    id: 'chichibu',
    name: '秩父神社',
    nameEn: 'Chichibu Shrine',
    description: '秩父地方の総鎮守として2000年以上の歴史を持つ古社。12月の秩父夜祭で全国的に有名。',
    category: 'temple',
    prefecture: 'saitama',
    image: 'https://picsum.photos/800/600?random=9',
    location: {
      address: '埼玉県秩父市番場町1-3',
      station: '秩父駅',
      coordinates: { lat: 35.9932, lng: 139.0806 }
    },
    highlights: ['秩父夜祭', '左甚五郎の彫刻', 'つなぎの龍', '秩父札所'],
    hashtags: ['#秩父神社', '#秩父夜祭', '#左甚五郎', '#つなぎの龍', '#秩父'],
    keywords: ['秩父神社', 'Chichibu Shrine', '秩父夜祭', '秩父', '左甚五郎'],
    rating: 4.1,
    visitTime: '1時間',
    bestSeason: ['12月（夜祭）', '春', '秋'],
    entrance: { fee: '無料', hours: '5:00-20:00' },
    access: { train: '秩父駅から徒歩3分', walking: '西武秩父駅から徒歩15分' },
    tips: ['12月の夜祭は日本三大曳山祭', '左甚五郎の彫刻は必見', '秩父札所巡りの起点']
  },

  // 千葉の観光スポット
  naritasan: {
    id: 'naritasan',
    name: '成田山新勝寺',
    nameEn: 'Naritasan Shinshoji Temple',
    description: '千年以上の歴史を持つ真言宗の大本山。初詣客数は全国屈指で、成田のお不動さんとして親しまれています。',
    category: 'temple',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=10',
    location: {
      address: '千葉県成田市成田1',
      station: '成田駅',
      coordinates: { lat: 35.7749, lng: 140.3180 }
    },
    highlights: ['大本堂', '三重塔', '成田山公園', '不動明王'],
    hashtags: ['#成田山新勝寺', '#成田のお不動さん', '#初詣', '#三重塔', '#成田'],
    keywords: ['成田山新勝寺', 'Naritasan', '成田', 'お不動さん', '初詣'],
    rating: 4.3,
    visitTime: '1-2時間',
    bestSeason: ['春（梅・桜）', '秋（紅葉）'],
    entrance: { fee: '無料', hours: '6:00-16:00' },
    access: { train: '成田駅から徒歩10分', walking: 'JR・京成成田駅からアクセス良好' },
    tips: ['参道の鰻が有名', '成田山公園で四季を楽しめる', '護摩祈祷の見学可能']
  },

  makuhari: {
    id: 'makuhari',
    name: '幕張メッセ',
    nameEn: 'Makuhari Messe',
    description: '日本最大級の国際展示場。コンサートやイベントの聖地として多くの人に愛される現代的な建築物。',
    category: 'modern',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=11',
    location: {
      address: '千葉県千葉市美浜区中瀬2-1',
      station: '海浜幕張駅',
      coordinates: { lat: 35.6474, lng: 140.0346 }
    },
    highlights: ['国際展示場', 'イベントホール', '幕張新都心', 'イオンモール'],
    hashtags: ['#幕張メッセ', '#海浜幕張', '#イベント', '#コンサート', '#展示会'],
    keywords: ['幕張メッセ', 'Makuhari Messe', '海浜幕張', 'イベント', 'コンサート'],
    rating: 4.0,
    visitTime: 'イベントにより異なる',
    bestSeason: ['通年'],
    entrance: { fee: 'イベントにより異なる', hours: 'イベントにより異なる' },
    access: { train: '海浜幕張駅から徒歩5分', walking: 'JR京葉線海浜幕張駅直結' },
    tips: ['大型イベント時は混雑', '周辺にショッピングモール', '東京湾も近い']
  },

  disney_land: {
    id: 'disney_land',
    name: '東京ディズニーランド',
    nameEn: 'Tokyo Disneyland',
    description: '夢と魔法の王国。世界中の人々に愛される東京ディズニーリゾートの第一号パーク。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=12',
    location: {
      address: '千葉県浦安市舞浜1-1',
      station: '舞浜駅',
      coordinates: { lat: 35.6329, lng: 139.8804 }
    },
    highlights: ['シンデレラ城', 'スプラッシュマウンテン', 'パレード', 'キャラクターグリーティング'],
    hashtags: ['#東京ディズニーランド', '#TDL', '#ディズニー', '#舞浜', '#シンデレラ城'],
    keywords: ['東京ディズニーランド', 'Tokyo Disneyland', 'TDL', 'ディズニー', '舞浜'],
    rating: 4.8,
    visitTime: '1日',
    bestSeason: ['通年'],
    entrance: { fee: '大人8,700円〜', hours: '8:00-22:00（日により異なる）' },
    access: { train: '舞浜駅から徒歩5分', walking: 'JR京葉線舞浜駅すぐ' },
    tips: ['アプリでファストパス取得', '平日がおすすめ', 'レストラン予約推奨']
  },

  // 千葉県の観光スポット追加分
  disney_sea: {
    id: 'disney_sea',
    name: '東京ディズニーシー',
    nameEn: 'Tokyo DisneySea',
    description: '海をテーマにした世界唯一のディズニーパーク。大人も楽しめる本格的なアトラクションとロマンチックな雰囲気が魅力。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=13',
    location: {
      address: '千葉県浦安市舞浜1-13',
      station: '舞浜駅',
      coordinates: { lat: 35.6267, lng: 139.8890 }
    },
    highlights: ['プロメテウス火山', 'タワー・オブ・テラー', 'ヴェネツィアン・ゴンドラ', 'アクアスフィア'],
    hashtags: ['#東京ディズニーシー', '#TDS', '#ディズニーシー', '#舞浜', '#海のディズニー'],
    keywords: ['東京ディズニーシー', 'Tokyo DisneySea', 'TDS', 'ディズニーシー', '舞浜'],
    rating: 4.7,
    visitTime: '1日',
    bestSeason: ['通年'],
    entrance: { fee: '大人8,700円〜', hours: '8:00-22:00（日により異なる）' },
    access: { train: '舞浜駅からモノレール', walking: 'JR京葉線舞浜駅からディズニーリゾートライン' },
    tips: ['大人向けアトラクション多数', 'アルコール提供あり', '夜のショーが特に美しい']
  },

  kamogawa_seaworld: {
    id: 'kamogawa_seaworld',
    name: '鴨川シーワールド',
    nameEn: 'Kamogawa SeaWorld',
    description: '日本でシャチのパフォーマンスが見られる貴重な水族館。ベルーガやイルカのショーも必見の海のテーマパーク。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=14',
    location: {
      address: '千葉県鴨川市東町1464-18',
      station: '安房鴨川駅',
      coordinates: { lat: 35.1140, lng: 140.1025 }
    },
    highlights: ['シャチのパフォーマンス', 'ベルーガショー', 'イルカショー', '海の王者シャチ'],
    hashtags: ['#鴨川シーワールド', '#シャチ', '#イルカショー', '#水族館', '#鴨川'],
    keywords: ['鴨川シーワールド', 'Kamogawa SeaWorld', 'シャチ', 'イルカ', '水族館'],
    rating: 4.4,
    visitTime: '3-4時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人3,300円', hours: '9:00-17:00（日により異なる）' },
    access: { train: '安房鴨川駅から無料送迎バス10分', walking: 'JR外房線安房鴨川駅からバス' },
    tips: ['シャチのパフォーマンスは必見', '濡れることもあるので前の席は注意', '海ほたる経由でアクセス便利']
  },

  mother_farm: {
    id: 'mother_farm',
    name: 'マザー牧場',
    nameEn: 'Mother Farm',
    description: '房総半島の豊かな自然の中で動物とのふれあいや季節の花々を楽しめる観光牧場。東京湾を一望できる絶景スポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=15',
    location: {
      address: '千葉県富津市田倉940-3',
      station: '君津駅',
      coordinates: { lat: 35.3333, lng: 139.8500 }
    },
    highlights: ['動物とのふれあい', '季節の花畑', '東京湾の絶景', 'ジンギスカン'],
    hashtags: ['#マザー牧場', '#動物ふれあい', '#花畑', '#東京湾絶景', '#房総半島'],
    keywords: ['マザー牧場', 'Mother Farm', '動物', 'ふれあい', '牧場'],
    rating: 4.2,
    visitTime: '半日',
    bestSeason: ['春（菜の花）', '夏', '秋'],
    entrance: { fee: '大人1,500円', hours: '9:00-17:00（季節により異なる）' },
    access: { train: '君津駅からバス35分', walking: 'JR内房線君津駅からマザー牧場まきば線' },
    tips: ['春の菜の花畑が絶景', 'ジンギスカンが人気', '東京湾を一望できる']
  },

  nokogiriyama: {
    id: 'nokogiriyama',
    name: '鋸山',
    nameEn: 'Mount Nokogiri',
    description: '房総半島の象徴的な山。地獄のぞきと呼ばれる絶壁からの絶景と、日本一大きな大仏様で有名な歴史ある霊場。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=16',
    location: {
      address: '千葉県安房郡鋸南町元名184',
      station: '浜金谷駅',
      coordinates: { lat: 35.1611, lng: 139.8194 }
    },
    highlights: ['地獄のぞき', '日本一の大仏', '鋸山ロープウェー', '東京湾絶景'],
    hashtags: ['#鋸山', '#地獄のぞき', '#大仏', '#ロープウェー', '#絶景'],
    keywords: ['鋸山', 'Nokogiriyama', '地獄のぞき', '大仏', 'ロープウェー'],
    rating: 4.3,
    visitTime: '2-3時間',
    bestSeason: ['春', '秋', '冬'],
    entrance: { fee: 'ロープウェー往復1,200円、日本寺拝観料700円', hours: 'ロープウェー9:00-17:00' },
    access: { train: '浜金谷駅から徒歩10分', walking: 'JR内房線浜金谷駅から鋸山ロープウェー' },
    tips: ['地獄のぞきは高所恐怖症注意', '大仏様は圧巻のスケール', 'ロープウェーで楽々アクセス']
  },

  inubosaki_lighthouse: {
    id: 'inubosaki_lighthouse',
    name: '犬吠埼灯台',
    nameEn: 'Inubosaki Lighthouse',
    description: '関東最東端に位置する白亜の美しい灯台。日本で一番早い初日の出スポットとして全国的に有名。',
    category: 'landmark',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=17',
    location: {
      address: '千葉県銚子市犬吠埼9576',
      station: '犬吠駅',
      coordinates: { lat: 35.7066, lng: 140.8697 }
    },
    highlights: ['日本最東端の絶景', '初日の出スポット', '白亜の灯台', '太平洋の大パノラマ'],
    hashtags: ['#犬吠埼灯台', '#初日の出', '#関東最東端', '#銚子', '#太平洋'],
    keywords: ['犬吠埼灯台', 'Inubosaki Lighthouse', '初日の出', '銚子', '太平洋'],
    rating: 4.1,
    visitTime: '1時間',
    bestSeason: ['通年', '元旦（初日の出）'],
    entrance: { fee: '大人300円', hours: '8:30-16:00' },
    access: { train: '犬吠駅から徒歩7分', walking: '銚子電鉄犬吠駅から徒歩圏内' },
    tips: ['初日の出は大混雑', '灯台に登って絶景を', '銚子電鉄も観光の魅力']
  },

  yoro_valley: {
    id: 'yoro_valley',
    name: '養老渓谷',
    nameEn: 'Yoro Valley',
    description: '房総随一の温泉郷として知られる美しい渓谷。特に紅葉の季節は関東屈指の絶景スポットとして多くの観光客が訪れます。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=18',
    location: {
      address: '千葉県夷隅郡大多喜町養老渓谷',
      station: '養老渓谷駅',
      coordinates: { lat: 35.2833, lng: 140.1667 }
    },
    highlights: ['粟又の滝', '紅葉の名所', '温泉郷', 'ハイキングコース'],
    hashtags: ['#養老渓谷', '#紅葉', '#温泉', '#粟又の滝', '#ハイキング'],
    keywords: ['養老渓谷', 'Yoro Valley', '紅葉', '温泉', '粟又の滝'],
    rating: 4.2,
    visitTime: '2-3時間',
    bestSeason: ['秋（紅葉）', '春', '夏'],
    entrance: { fee: '散策無料（粟又の滝200円）', hours: '散策自由' },
    access: { train: '養老渓谷駅下車', walking: '小湊鉄道養老渓谷駅からバス・徒歩' },
    tips: ['11月下旬の紅葉が最高', 'レンタサイクルで効率的に回れる', '温泉で疲れを癒す']
  },

  katori_shrine: {
    id: 'katori_shrine',
    name: '香取神宮',
    nameEn: 'Katori Shrine',
    description: '全国約400社の香取神社の総本社。経津主大神を祀る格式高い神社で、勝運・交通安全・縁結びのご利益で知られています。',
    category: 'temple',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=19',
    location: {
      address: '千葉県香取市香取1697-1',
      station: '佐原駅',
      coordinates: { lat: 35.8847, lng: 140.5281 }
    },
    highlights: ['国宝の海獣葡萄鏡', '樹齢1000年の御神木', '楼門', '本殿'],
    hashtags: ['#香取神宮', '#国宝', '#パワースポット', '#御神木', '#総本社'],
    keywords: ['香取神宮', 'Katori Shrine', '国宝', 'パワースポット', '神社'],
    rating: 4.3,
    visitTime: '1-2時間',
    bestSeason: ['通年'],
    entrance: { fee: '無料（宝物館は有料）', hours: '8:30-17:00' },
    access: { train: '佐原駅からバス15分', walking: 'JR成田線佐原駅からバス' },
    tips: ['国宝の海獣葡萄鏡は必見', '御神木のパワーを感じる', '佐原の町並みとセットで観光']
  },

  sawara: {
    id: 'sawara',
    name: '佐原（重要伝統的建造物群保存地区）',
    nameEn: 'Sawara Historic District',
    description: '江戸時代の面影を残す水郷の町。小野川沿いの歴史的建造物群は「北総の小江戸」と呼ばれ、情緒あふれる町並みが魅力。',
    category: 'cultural',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=20',
    location: {
      address: '千葉県香取市佐原',
      station: '佐原駅',
      coordinates: { lat: 35.8947, lng: 140.4986 }
    },
    highlights: ['小野川の町並み', '佐原の大祭', '舟めぐり', '伊能忠敬記念館'],
    hashtags: ['#佐原', '#小江戸', '#舟めぐり', '#伊能忠敬', '#歴史的町並み'],
    keywords: ['佐原', 'Sawara', '小江戸', '舟めぐり', '伊能忠敬'],
    rating: 4.1,
    visitTime: '2-3時間',
    bestSeason: ['春', '秋'],
    entrance: { fee: '散策無料（施設により有料）', hours: '散策自由' },
    access: { train: '佐原駅から徒歩10分', walking: 'JR成田線佐原駅から歴史的地区へ' },
    tips: ['舟めぐりで風情を楽しむ', '7月と10月の大祭が見どころ', '伊能忠敬ゆかりの地']
  },

  tokyo_german_village: {
    id: 'tokyo_german_village',
    name: '東京ドイツ村',
    nameEn: 'Tokyo German Village',
    description: 'ドイツの田園風景を再現したテーマパーク。冬季のイルミネーションは関東三大イルミネーションの一つとして有名。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=21',
    location: {
      address: '千葉県袖ヶ浦市永吉419',
      station: '袖ヶ浦駅',
      coordinates: { lat: 35.4167, lng: 140.0833 }
    },
    highlights: ['関東三大イルミネーション', 'ドイツ風建築', '観覧車', 'パターゴルフ'],
    hashtags: ['#東京ドイツ村', '#イルミネーション', '#ドイツ風', '#観覧車', '#袖ヶ浦'],
    keywords: ['東京ドイツ村', 'Tokyo German Village', 'イルミネーション', 'ドイツ', 'テーマパーク'],
    rating: 4.0,
    visitTime: '3-4時間',
    bestSeason: ['冬（イルミネーション）', '春', '秋'],
    entrance: { fee: '大人800円', hours: '9:30-20:00（季節により異なる）' },
    access: { train: '袖ヶ浦駅からバス35分', walking: 'JR内房線袖ヶ浦駅からバス' },
    tips: ['冬のイルミネーションが圧巻', '車でのアクセスが便利', 'ジンギスカンが名物']
  },

  funabashi_andersen_park: {
    id: 'funabashi_andersen_park',
    name: 'ふなばしアンデルセン公園',
    nameEn: 'Funabashi Andersen Park',
    description: 'デンマークをテーマにした総合公園。四季折々の花々とアンデルsen童話の世界を楽しめる、家族連れに人気のスポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=22',
    location: {
      address: '千葉県船橋市金堀町525',
      station: '三咲駅',
      coordinates: { lat: 35.7500, lng: 140.0333 }
    },
    highlights: ['四季の花畑', 'アンデルセン童話', 'アスレチック', 'デンマーク風建築'],
    hashtags: ['#ふなばしアンデルセン公園', '#アンデルセン', '#花畑', '#アスレチック', '#船橋'],
    keywords: ['ふなばしアンデルセン公園', 'Andersen Park', 'アンデルセン', '花畑', '公園'],
    rating: 4.2,
    visitTime: '半日',
    bestSeason: ['春（チューリップ）', '夏', '秋'],
    entrance: { fee: '大人900円', hours: '9:30-16:00（季節により異なる）' },
    access: { train: '三咲駅からバス15分', walking: '新京成線三咲駅・小室駅からバス' },
    tips: ['春のチューリップが見事', 'アスレチックで子供も大満足', 'デンマーク風景を楽しめる']
  },

  ichihara_elephant_kingdom: {
    id: 'ichihara_elephant_kingdom',
    name: '市原ぞうの国',
    nameEn: 'Ichihara Elephant Kingdom',
    description: '国内最多のぞう飼育数を誇る動物園。ぞうさんショーやぞうさんライドなど、ぞうとの触れ合いが楽しめる貴重なスポット。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=23',
    location: {
      address: '千葉県市原市山小川937',
      station: '高滝駅',
      coordinates: { lat: 35.4000, lng: 140.1833 }
    },
    highlights: ['ぞうさんショー', 'ぞうさんライド', '日本最多のぞう', '動物とのふれあい'],
    hashtags: ['#市原ぞうの国', '#ぞう', '#動物園', '#ふれあい', '#市原'],
    keywords: ['市原ぞうの国', 'Elephant Kingdom', 'ぞう', '動物園', 'ふれあい'],
    rating: 4.1,
    visitTime: '2-3時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人2,200円', hours: '10:00-17:00（季節により異なる）' },
    access: { train: '高滝駅から無料送迎バス10分', walking: '小湊鉄道高滝駅から送迎バス' },
    tips: ['ぞうさんショーは1日数回開催', 'ぞうさんライドは貴重な体験', '餌やり体験も人気']
  },

  kujukurihama: {
    id: 'kujukurihama',
    name: '九十九里浜',
    nameEn: 'Kujukurihama Beach',
    description: '太平洋に面した全長約66kmの日本最長の砂浜海岸。サーフィンのメッカとしても有名で、夏は海水浴客で賑わいます。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=24',
    location: {
      address: '千葉県山武郡九十九里町',
      station: '東金駅',
      coordinates: { lat: 35.5500, lng: 140.4333 }
    },
    highlights: ['日本最長の砂浜', 'サーフィン', '海水浴', '夕日の絶景'],
    hashtags: ['#九十九里浜', '#サーフィン', '#海水浴', '#夕日', '#太平洋'],
    keywords: ['九十九里浜', 'Kujukurihama', 'サーフィン', '海水浴', '砂浜'],
    rating: 4.0,
    visitTime: '半日',
    bestSeason: ['夏（海水浴）', '通年（サーフィン）'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '東金駅からバス30分', walking: 'JR東金線東金駅からバス' },
    tips: ['サーフィンのメッカ', '夕日の時間帯が美しい', '海の幸グルメも豊富']
  },

  byobugaura: {
    id: 'byobugaura',
    name: '屏風ヶ浦',
    nameEn: 'Byobugaura Cliffs',
    description: '高さ40-50mの断崖絶壁が約10kmにわたって続く景勝地。東洋のドーバーと呼ばれる雄大な海岸美は圧巻の絶景。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=25',
    location: {
      address: '千葉県銚子市名洗町〜旭市飯岡町',
      station: '銚子駅',
      coordinates: { lat: 35.7167, lng: 140.7833 }
    },
    highlights: ['東洋のドーバー', '断崖絶壁', '地球の丸く見える丘', '太平洋の大パノラマ'],
    hashtags: ['#屏風ヶ浦', '#東洋のドーバー', '#断崖絶壁', '#絶景', '#銚子'],
    keywords: ['屏風ヶ浦', 'Byobugaura', '東洋のドーバー', '断崖絶壁', '絶景'],
    rating: 4.2,
    visitTime: '1-2時間',
    bestSeason: ['通年'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '銚子駅からバス20分', walking: 'JR総武本線銚子駅からバス' },
    tips: ['地球の丸く見える丘展望館もセット', '夕日の時間が特に美しい', '遊歩道から間近で見学可能']
  },

  kominato_railway: {
    id: 'kominato_railway',
    name: '小湊鉄道',
    nameEn: 'Kominato Railway',
    description: '房総半島を走るローカル線。菜の花と桜が同時に咲く春の風景は絶景で、レトロな車両と自然の調和が美しい観光路線。',
    category: 'transport',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=26',
    location: {
      address: '千葉県市原市五井1-1-2（五井駅）',
      station: '五井駅',
      coordinates: { lat: 35.5167, lng: 140.1000 }
    },
    highlights: ['菜の花と桜の絶景', 'レトロな車両', '房総の自然', 'ローカル線の旅'],
    hashtags: ['#小湊鉄道', '#菜の花', '#桜', '#ローカル線', '#房総'],
    keywords: ['小湊鉄道', 'Kominato Railway', '菜の花', '桜', 'ローカル線'],
    rating: 4.3,
    visitTime: '2-3時間',
    bestSeason: ['春（菜の花・桜）', '秋'],
    entrance: { fee: '乗車券による', hours: '運行時刻による' },
    access: { train: '五井駅から小湊鉄道', walking: 'JR内房線五井駅から小湊鉄道' },
    tips: ['春の菜の花・桜の時期が絶景', '途中下車して撮影スポット巡り', '終点上総中野まで約1時間']
  },

  mitsui_outlet_kisarazu: {
    id: 'mitsui_outlet_kisarazu',
    name: '三井アウトレットパーク木更津',
    nameEn: 'Mitsui Outlet Park Kisarazu',
    description: '東京湾アクアライン直結の大型アウトレットモール。国内外の人気ブランドが揃い、東京湾を眺めながらショッピングが楽しめます。',
    category: 'shopping',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=27',
    location: {
      address: '千葉県木更津市金田東3-1-1',
      station: '袖ヶ浦駅',
      coordinates: { lat: 35.4167, lng: 139.9167 }
    },
    highlights: ['大型アウトレット', 'アクアライン直結', '東京湾の眺望', '人気ブランド店'],
    hashtags: ['#三井アウトレット木更津', '#アウトレット', '#ショッピング', '#アクアライン', '#木更津'],
    keywords: ['三井アウトレット木更津', 'Mitsui Outlet', 'アウトレット', 'ショッピング', '木更津'],
    rating: 4.1,
    visitTime: '2-4時間',
    bestSeason: ['通年'],
    entrance: { fee: '無料', hours: '10:00-20:00' },
    access: { train: '袖ヶ浦駅からバス10分', walking: 'JR内房線袖ヶ浦駅・木更津駅からバス' },
    tips: ['アクアライン利用で都心から便利', '東京湾を眺めながらショッピング', '平日が比較的空いている']
  },

  lalaport_tokyo_bay: {
    id: 'lalaport_tokyo_bay',
    name: 'ららぽーとTOKYO-BAY',
    nameEn: 'LaLaport TOKYO-BAY',
    description: '日本初の大型ショッピングセンター。ディズニーリゾートからも近く、ファッションからグルメまで幅広く楽しめる商業施設。',
    category: 'shopping',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=28',
    location: {
      address: '千葉県船橋市浜町2-1-1',
      station: '南船橋駅',
      coordinates: { lat: 35.6833, lng: 140.0167 }
    },
    highlights: ['日本初の大型SC', 'ディズニー近く', '豊富な店舗', 'グルメゾーン'],
    hashtags: ['#ららぽーとTOKYO-BAY', '#ショッピング', '#南船橋', '#グルメ', '#ファッション'],
    keywords: ['ららぽーと', 'LaLaport', 'ショッピング', '南船橋', 'グルメ'],
    rating: 4.0,
    visitTime: '2-4時間',
    bestSeason: ['通年'],
    entrance: { fee: '無料', hours: '10:00-21:00' },
    access: { train: '南船橋駅から徒歩5分', walking: 'JR京葉線南船橋駅から徒歩圏内' },
    tips: ['ディズニー帰りにも便利', '豊富なレストラン', '駐車場も広い']
  },

  tateyama_castle: {
    id: 'tateyama_castle',
    name: '館山城（八犬伝博物館）',
    nameEn: 'Tateyama Castle',
    description: '房総半島南端の丘陵に建つ復元城郭。南総里見八犬伝で有名な里見氏の居城跡で、館山湾を一望できる絶景スポット。',
    category: 'cultural',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=29',
    location: {
      address: '千葉県館山市館山362',
      station: '館山駅',
      coordinates: { lat: 35.0000, lng: 139.8667 }
    },
    highlights: ['里見八犬伝', '館山湾の絶景', '復元天守閣', '城山公園'],
    hashtags: ['#館山城', '#八犬伝', '#里見氏', '#館山湾', '#城'],
    keywords: ['館山城', 'Tateyama Castle', '八犬伝', '里見氏', '館山'],
    rating: 3.9,
    visitTime: '1-2時間',
    bestSeason: ['春', '秋'],
    entrance: { fee: '大人400円', hours: '9:00-16:45' },
    access: { train: '館山駅からバス15分', walking: 'JR内房線館山駅からバス' },
    tips: ['八犬伝の歴史を学べる', '天守閣から館山湾絶景', '城山公園の桜も美しい']
  },

  chiba_port_tower: {
    id: 'chiba_port_tower',
    name: '千葉ポートタワー',
    nameEn: 'Chiba Port Tower',
    description: '千葉港のシンボルタワー。高さ125mの展望台からは千葉市街地や東京湾、富士山まで360度のパノラマビューが楽しめます。',
    category: 'landmark',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=30',
    location: {
      address: '千葉県千葉市中央区中央港1',
      station: '千葉みなと駅',
      coordinates: { lat: 35.5833, lng: 140.1000 }
    },
    highlights: ['360度パノラマビュー', '東京湾の絶景', '富士山も見える', '夜景スポット'],
    hashtags: ['#千葉ポートタワー', '#夜景', '#東京湾', '#展望台', '#千葉'],
    keywords: ['千葉ポートタワー', 'Chiba Port Tower', '夜景', '展望台', '千葉'],
    rating: 4.0,
    visitTime: '1時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人420円', hours: '9:00-21:00（季節により異なる）' },
    access: { train: '千葉みなと駅から徒歩12分', walking: 'JR京葉線千葉みなと駅から徒歩' },
    tips: ['夕日から夜景への変化が美しい', '富士山が見える日もある', '千葉の街並みを一望']
  },

  kameyama_lake: {
    id: 'kameyama_lake',
    name: '亀山湖',
    nameEn: 'Kameyama Lake',
    description: '房総半島最大の人造湖。四季折々の美しい自然に囲まれ、特に紅葉の季節は湖面に映る紅葉が絶景の観光スポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=31',
    location: {
      address: '千葉県君津市笹',
      station: '上総亀山駅',
      coordinates: { lat: 35.2833, lng: 140.0833 }
    },
    highlights: ['房総最大の人造湖', '紅葉の名所', '遊覧船', 'ボート遊び'],
    hashtags: ['#亀山湖', '#紅葉', '#人造湖', '#遊覧船', '#君津'],
    keywords: ['亀山湖', 'Kameyama Lake', '紅葉', '人造湖', '遊覧船'],
    rating: 4.1,
    visitTime: '2時間',
    bestSeason: ['秋（紅葉）', '春', '夏'],
    entrance: { fee: '無料（遊覧船等は有料）', hours: '終日' },
    access: { train: '上総亀山駅から徒歩10分', walking: '小湊鉄道上総亀山駅から徒歩' },
    tips: ['11月の紅葉が絶景', '遊覧船で湖上から紅葉鑑賞', 'ボート釣りも人気']
  },

  choshi_densha: {
    id: 'choshi_densha',
    name: '銚子電気鉄道',
    nameEn: 'Choshi Electric Railway',
    description: '銚子市内を走る全長6.4kmのローカル電車。昭和レトロな車両と沿線の風景、名物ぬれ煎餅で有名な愛される鉄道。',
    category: 'transport',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=32',
    location: {
      address: '千葉県銚子市西芝町1-1（銚子駅）',
      station: '銚子駅',
      coordinates: { lat: 35.7333, lng: 140.8167 }
    },
    highlights: ['昭和レトロな車両', 'ぬれ煎餅', 'ローカル線の旅', '銚子の風景'],
    hashtags: ['#銚子電鉄', '#ローカル線', '#ぬれ煎餅', '#昭和レトロ', '#銚子'],
    keywords: ['銚子電鉄', 'Choshi Electric Railway', 'ローカル線', 'ぬれ煎餅', '銚子'],
    rating: 4.0,
    visitTime: '1-2時間',
    bestSeason: ['通年'],
    entrance: { fee: '乗車券による', hours: '運行時刻による' },
    access: { train: '銚子駅から銚子電鉄', walking: 'JR総武本線銚子駅から銚子電鉄' },
    tips: ['ぬれ煎餅が名物', '昭和レトロな車両が魅力', '外川駅まで約20分の旅']
  },

  onjuku_beach: {
    id: 'onjuku_beach',
    name: '御宿海岸',
    nameEn: 'Onjuku Beach',
    description: '童謡「月の沙漠」の舞台として有名な美しい砂浜。白い砂浜と青い海のコントラストが美しく、夏は海水浴で賑わいます。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=33',
    location: {
      address: '千葉県夷隅郡御宿町須賀',
      station: '御宿駅',
      coordinates: { lat: 35.1833, lng: 140.3500 }
    },
    highlights: ['月の沙漠の舞台', '白い砂浜', '海水浴', 'らくだの像'],
    hashtags: ['#御宿海岸', '#月の沙漠', '#海水浴', '#白い砂浜', '#御宿'],
    keywords: ['御宿海岸', 'Onjuku Beach', '月の沙漠', '海水浴', '御宿'],
    rating: 4.0,
    visitTime: '2-3時間',
    bestSeason: ['夏（海水浴）', '通年'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '御宿駅から徒歩7分', walking: 'JR外房線御宿駅から徒歩' },
    tips: ['童謡月の沙漠のモデル地', 'らくだの像と記念撮影', '波が穏やかで家族連れに人気']
  },

  bosofusanosato: {
    id: 'bosofusanosato',
    name: '千葉県立房総のむら',
    nameEn: 'Boso-no-Mura',
    description: '江戸時代後期から明治初期の房総の農村生活を再現した体験博物館。昔の暮らしを体験でき、歴史を身近に感じられます。',
    category: 'cultural',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=34',
    location: {
      address: '千葉県印旛郡栄町龍角寺1028',
      station: '安食駅',
      coordinates: { lat: 35.8167, lng: 140.2333 }
    },
    highlights: ['江戸時代の農村再現', '体験プログラム', '昔の暮らし', '歴史学習'],
    hashtags: ['#房総のむら', '#江戸時代', '#体験', '#歴史', '#伝統文化'],
    keywords: ['房総のむら', 'Boso-no-Mura', '江戸時代', '体験', '歴史'],
    rating: 4.0,
    visitTime: '2-3時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人300円', hours: '9:00-16:30' },
    access: { train: '安食駅からバス15分', walking: 'JR成田線安食駅からバス' },
    tips: ['昔の生活を体験できる', '子供の歴史学習に最適', '季節行事も開催']
  },

  chiba_zoological_park: {
    id: 'chiba_zoological_park',
    name: '千葉市動物公園',
    nameEn: 'Chiba Zoological Park',
    description: '立つレッサーパンダ「風太」で一躍有名になった動物園。広大な敷地に多種多様な動物が暮らし、家族連れに人気のスポット。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=35',
    location: {
      address: '千葉県千葉市若葉区源町280',
      station: '都賀駅',
      coordinates: { lat: 35.6500, lng: 140.1500 }
    },
    highlights: ['立つレッサーパンダ風太', '多種多様な動物', 'こども動物園', '動物とのふれあい'],
    hashtags: ['#千葉市動物公園', '#風太', '#レッサーパンダ', '#動物園', '#千葉'],
    keywords: ['千葉市動物公園', 'Chiba Zoo', '風太', 'レッサーパンダ', '動物園'],
    rating: 4.1,
    visitTime: '3時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人700円', hours: '9:30-16:30' },
    access: { train: '都賀駅からバス', walking: 'JR総武本線都賀駅からバス' },
    tips: ['風太君の子孫に会える', 'こども動物園でふれあい体験', '広い園内でゆっくり楽しめる']
  },

  katsuura_underwater_park: {
    id: 'katsuura_underwater_park',
    name: '勝浦海中公園',
    nameEn: 'Katsuura Underwater Park',
    description: '日本初の海中展望塔がある海中公園。水深8mの海底から自然の海中世界を観察でき、房総の海の美しさを体感できます。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=36',
    location: {
      address: '千葉県勝浦市吉尾174',
      station: '鵜原駅',
      coordinates: { lat: 35.1500, lng: 140.3167 }
    },
    highlights: ['日本初の海中展望塔', '海中世界観察', '自然の魚たち', '房総の海'],
    hashtags: ['#勝浦海中公園', '#海中展望塔', '#海中世界', '#勝浦', '#房総'],
    keywords: ['勝浦海中公園', 'Katsuura Underwater Park', '海中展望塔', '海中世界', '勝浦'],
    rating: 3.9,
    visitTime: '1-2時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人980円', hours: '9:00-17:00（季節により異なる）' },
    access: { train: '鵜原駅から徒歩15分', walking: 'JR外房線鵜原駅から徒歩' },
    tips: ['海中展望塔から魚の群れを観察', '透明度の高い日がおすすめ', 'リアス式海岸の美しい景色']
  },

  shirahama_flower_park: {
    id: 'shirahama_flower_park',
    name: '白浜フラワーパーク',
    nameEn: 'Shirahama Flower Park',
    description: '房総半島南端の花のテーマパーク。一年中色とりどりの花が咲き誇り、特に冬から春にかけてのポピーの花畑が絶景。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=37',
    location: {
      address: '千葉県南房総市白浜町根本1454-37',
      station: '千倉駅',
      coordinates: { lat: 34.9167, lng: 139.8333 }
    },
    highlights: ['一年中の花畑', 'ポピーの絶景', '花摘み体験', '太平洋の眺望'],
    hashtags: ['#白浜フラワーパーク', '#花畑', '#ポピー', '#花摘み', '#南房総'],
    keywords: ['白浜フラワーパーク', 'Shirahama Flower Park', '花畑', 'ポピー', '南房総'],
    rating: 4.0,
    visitTime: '1-2時間',
    bestSeason: ['冬〜春（ポピー）', '通年'],
    entrance: { fee: '大人550円', hours: '9:00-17:00' },
    access: { train: '千倉駅からバス10分', walking: 'JR内房線千倉駅からバス' },
    tips: ['冬春のポピーが圧巻', '花摘み体験ができる', '太平洋を見渡す絶景ロケーション']
  },

  inage_kaihin_park: {
    id: 'inage_kaihin_park',
    name: '稲毛海浜公園',
    nameEn: 'Inage Kaihin Park',
    description: '東京湾に面した総合公園。人工海浜「いなげの浜」や花の美術館など多彩な施設があり、都市部で海を感じられるスポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=38',
    location: {
      address: '千葉県千葉市美浜区高浜7-1-1',
      station: '稲毛海岸駅',
      coordinates: { lat: 35.6167, lng: 140.0667 }
    },
    highlights: ['人工海浜いなげの浜', '花の美術館', '東京湾の夕日', '都市型ビーチ'],
    hashtags: ['#稲毛海浜公園', '#いなげの浜', '#花の美術館', '#東京湾', '#稲毛'],
    keywords: ['稲毛海浜公園', 'Inage Kaihin Park', 'いなげの浜', '東京湾', '稲毛'],
    rating: 3.8,
    visitTime: '2時間',
    bestSeason: ['通年'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '稲毛海岸駅からバス10分', walking: 'JR京葉線稲毛海岸駅からバス' },
    tips: ['都市部で海を楽しめる', '花の美術館も併設', '夕日の時間帯が美しい']
  },

  noda_city_park: {
    id: 'noda_city_park',
    name: '清水公園',
    nameEn: 'Shimizu Park',
    description: '桜の名所として知られる総合公園。春には約2000本の桜が咲き誇り、フィールドアスレチックやキャンプ場も併設された自然豊かなスポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=39',
    location: {
      address: '千葉県野田市清水906',
      station: '清水公園駅',
      coordinates: { lat: 35.9500, lng: 139.8167 }
    },
    highlights: ['桜の名所', 'フィールドアスレチック', 'キャンプ場', '自然散策'],
    hashtags: ['#清水公園', '#桜', '#アスレチック', '#キャンプ', '#野田'],
    keywords: ['清水公園', 'Shimizu Park', '桜', 'アスレチック', '野田'],
    rating: 4.1,
    visitTime: '半日',
    bestSeason: ['春（桜）', '夏', '秋'],
    entrance: { fee: '無料（施設利用は有料）', hours: '終日' },
    access: { train: '清水公園駅から徒歩10分', walking: '東武野田線清水公園駅から徒歩' },
    tips: ['春の桜が圧巻の美しさ', 'アスレチックで子供も大満足', 'BBQやキャンプも楽しめる']
  },

  mobara_park: {
    id: 'mobara_park',
    name: '茂原公園',
    nameEn: 'Mobara Park',
    description: '弁天湖を中心とした風光明媚な公園。桜とツツジの名所として有名で、「日本さくら名所100選」にも選ばれた美しいスポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=40',
    location: {
      address: '千葉県茂原市高師1325-1',
      station: '茂原駅',
      coordinates: { lat: 35.4167, lng: 140.2833 }
    },
    highlights: ['日本さくら名所100選', '弁天湖', 'ツツジの名所', '風光明媚'],
    hashtags: ['#茂原公園', '#桜名所', '#弁天湖', '#ツツジ', '#茂原'],
    keywords: ['茂原公園', 'Mobara Park', '桜', 'ツツジ', '茂原'],
    rating: 4.0,
    visitTime: '1-2時間',
    bestSeason: ['春（桜・ツツジ）', '秋'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '茂原駅から徒歩15分', walking: 'JR外房線茂原駅から徒歩' },
    tips: ['桜の時期は特に美しい', '弁天湖周辺の散策がおすすめ', 'ツツジとのコラボも見事']
  },

  ichikawa_city_museum: {
    id: 'ichikawa_city_museum',
    name: '市川市動植物園',
    nameEn: 'Ichikawa City Zoo and Botanical Garden',
    description: '動物園と植物園が一体となった施設。レッサーパンダやオランウータンなど人気の動物たちと、四季の花々を同時に楽しめます。',
    category: 'entertainment',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=41',
    location: {
      address: '千葉県市川市大町284',
      station: '本八幡駅',
      coordinates: { lat: 35.7167, lng: 139.9333 }
    },
    highlights: ['動物園と植物園', 'レッサーパンダ', 'オランウータン', '四季の花々'],
    hashtags: ['#市川市動植物園', '#レッサーパンダ', '#オランウータン', '#動物園', '#市川'],
    keywords: ['市川市動植物園', 'Ichikawa Zoo', 'レッサーパンダ', 'オランウータン', '市川'],
    rating: 3.9,
    visitTime: '2-3時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人520円', hours: '9:30-16:30' },
    access: { train: '本八幡駅からバス15分', walking: 'JR総武線本八幡駅からバス' },
    tips: ['レッサーパンダが人気', '植物園エリアも見どころ', 'コンパクトで回りやすい']
  },

  kasamori_temple: {
    id: 'kasamori_temple',
    name: '笠森寺',
    nameEn: 'Kasamori Temple',
    description: '日本で唯一の四方懸造りの観音堂で国重要文化財。高さ約30mの巨岩の上に建つ観音堂は圧巻で、坂東三十三観音の第31番札所。',
    category: 'temple',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=42',
    location: {
      address: '千葉県長生郡長南町笠森302',
      station: '茂原駅',
      coordinates: { lat: 35.3833, lng: 140.2500 }
    },
    highlights: ['四方懸造りの観音堂', '国重要文化財', '巨岩の上の建築', '坂東三十三観音'],
    hashtags: ['#笠森寺', '#四方懸造り', '#国重要文化財', '#観音堂', '#坂東三十三観音'],
    keywords: ['笠森寺', 'Kasamori Temple', '四方懸造り', '観音堂', '重要文化財'],
    rating: 4.2,
    visitTime: '1時間',
    bestSeason: ['通年'],
    entrance: { fee: '大人300円', hours: '8:00-16:30' },
    access: { train: '茂原駅からバス25分', walking: 'JR外房線茂原駅からバス' },
    tips: ['四方懸造りは日本唯一', '巨岩の上の建築は必見', '歴史ある観音霊場']
  },

  tomisato_suika_road: {
    id: 'tomisato_suika_road',
    name: '富里スイカロード',
    nameEn: 'Tomisato Watermelon Road',
    description: '日本有数のスイカ産地富里市を代表する観光ルート。夏にはスイカ狩りが楽しめ、新鮮で甘いスイカを味わえる農業観光スポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=43',
    location: {
      address: '千葉県富里市七栄',
      station: '成田駅',
      coordinates: { lat: 35.7333, lng: 140.3833 }
    },
    highlights: ['スイカ狩り体験', '日本有数のスイカ産地', '農業観光', '新鮮スイカ'],
    hashtags: ['#富里スイカロード', '#スイカ狩り', '#農業観光', '#富里', '#スイカ'],
    keywords: ['富里スイカロード', 'Tomisato Watermelon', 'スイカ狩り', '農業観光', '富里'],
    rating: 3.8,
    visitTime: '1-2時間',
    bestSeason: ['夏（スイカ狩り）'],
    entrance: { fee: '農園により異なる', hours: '農園により異なる' },
    access: { train: '成田駅からバス20分', walking: 'JR成田線成田駅からバス' },
    tips: ['夏のスイカ狩りが名物', '新鮮で甘いスイカを堪能', '富里は日本有数の産地']
  },

  abiko_teganuma: {
    id: 'abiko_teganuma',
    name: '手賀沼',
    nameEn: 'Teganuma Lake',
    description: '利根川水系の湖沼で、野鳥観察の名所として有名。白鳥をはじめ多くの水鳥が生息し、サイクリングロードも整備された自然豊かなスポット。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=44',
    location: {
      address: '千葉県我孫子市高野山',
      station: '我孫子駅',
      coordinates: { lat: 35.8667, lng: 140.0333 }
    },
    highlights: ['野鳥観察', '白鳥の飛来地', 'サイクリングロード', '自然保護区'],
    hashtags: ['#手賀沼', '#野鳥観察', '#白鳥', '#サイクリング', '#我孫子'],
    keywords: ['手賀沼', 'Teganuma', '野鳥', '白鳥', 'サイクリング'],
    rating: 3.9,
    visitTime: '1-2時間',
    bestSeason: ['冬（白鳥飛来）', '通年'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '我孫子駅から徒歩10分', walking: 'JR常磐線我孫子駅から徒歩' },
    tips: ['冬に白鳥が飛来', 'サイクリングで湖畔一周', '野鳥観察に最適']
  },

  shirako_beach: {
    id: 'shirako_beach',
    name: '白子海岸',
    nameEn: 'Shirako Beach',
    description: '九十九里浜の南部に位置する美しい砂浜。テニスのメッカとしても有名で、マリンスポーツや海水浴が楽しめるリゾート地。',
    category: 'nature',
    prefecture: 'chiba',
    image: 'https://picsum.photos/800/600?random=45',
    location: {
      address: '千葉県長生郡白子町',
      station: '茂原駅',
      coordinates: { lat: 35.4333, lng: 140.3667 }
    },
    highlights: ['美しい砂浜', 'テニスのメッカ', 'マリンスポーツ', '海水浴'],
    hashtags: ['#白子海岸', '#テニス', '#マリンスポーツ', '#海水浴', '#九十九里'],
    keywords: ['白子海岸', 'Shirako Beach', 'テニス', 'マリンスポーツ', '海水浴'],
    rating: 3.8,
    visitTime: '半日',
    bestSeason: ['夏（海水浴）', '通年（テニス）'],
    entrance: { fee: '無料', hours: '終日' },
    access: { train: '茂原駅からバス30分', walking: 'JR外房線茂原駅からバス' },
    tips: ['テニス合宿で有名', 'マリンスポーツも盛ん', '九十九里浜の一部']
  }
};

export const PREFECTURES: Record<string, Prefecture> = {
  tokyo: {
    id: 'tokyo',
    name: '東京都',
    nameEn: 'Tokyo',
    description: '日本の首都として政治・経済・文化の中心地。伝統と現代が調和する魅力的な都市。',
    image: 'https://picsum.photos/1200/800?random=13',
    color: 'from-red-500 to-pink-500',
    icon: '🗼',
    stats: {
      population: '約1,400万人',
      area: '2,194km²',
      spots: '4箇所'
    },
    topSpots: ['tokyo_tower', 'skytree', 'asakusa', 'shibuya']
  },
  kanagawa: {
    id: 'kanagawa',
    name: '神奈川県',
    nameEn: 'Kanagawa',
    description: '湘南の海と古都鎌倉、現代都市横浜が魅力。多様な観光資源を持つ県。',
    image: 'https://picsum.photos/1200/800?random=14',
    color: 'from-blue-500 to-cyan-500',
    icon: '🌊',
    stats: {
      population: '約920万人',
      area: '2,416km²',
      spots: '3箇所'
    },
    topSpots: ['kamakura_daibutsu', 'enoshima', 'minatomirai']
  },
  saitama: {
    id: 'saitama',
    name: '埼玉県',
    nameEn: 'Saitama',
    description: '小江戸川越や秩父の自然など、歴史と自然が豊かな内陸県。',
    image: 'https://picsum.photos/1200/800?random=15',
    color: 'from-green-500 to-emerald-500',
    icon: '🏯',
    stats: {
      population: '約730万人',
      area: '3,798km²',
      spots: '2箇所'
    },
    topSpots: ['kawagoe', 'chichibu']
  },
  chiba: {
    id: 'chiba',
    name: '千葉県',
    nameEn: 'Chiba',
    description: '東京湾と太平洋に面し、成田空港の玄関口。ディズニーリゾートでも有名。',
    image: 'https://picsum.photos/1200/800?random=16',
    color: 'from-yellow-500 to-orange-500',
    icon: '🏰',
    stats: {
      population: '約630万人',
      area: '5,158km²',
      spots: '45箇所'
    },
    topSpots: ['disney_land', 'disney_sea', 'kamogawa_seaworld', 'nokogiriyama', 'tokyo_german_village', 'mother_farm', 'naritasan', 'katori_shrine']
  }
};