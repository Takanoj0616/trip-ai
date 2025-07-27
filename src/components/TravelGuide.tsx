import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Area } from '../App';
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  Globe, 
  Train, 
  Car, 
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Notebook,
  CheckCircle
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import { useItinerary, ItineraryItem } from '../contexts/ItineraryContext';

interface Recommendation {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  price: string;
  hours: string;
  phone?: string;
  website?: string;
  image: string;
  tips: string[];
  transport: {
    train?: string;
    bus?: string;
    car?: string;
    walking?: string;
  };
}

interface CategoryData {
  title: string;
  description: string;
  recommendations: Recommendation[];
}

const guideData: Record<Area, Record<string, CategoryData>> = {
  tokyo: {
    sightseeing: {
      title: '東京観光ガイド',
      description: '東京の象徴的なランドマークと魅力的な観光スポットを発見しよう',
      recommendations: [
        {
          id: 'tokyo-tower',
          name: '東京タワー',
          description: '東京の象徴的なランドマーク。展望台からの景色は素晴らしく、特に夜景がおすすめです。',
          address: '東京都港区芝公園4-2-8',
          rating: 4.2,
          price: '¥1200',
          hours: '9:00-23:00',
          phone: '03-3433-5111',
          website: 'https://www.tokyotower.co.jp/',
          image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '展望台からの景色は素晴らしく、特に夜景がおすすめ',
            '料金は少し高めですが、東京の景色を一望できて満足',
            '混雑を避けるため平日の来訪をお勧めします'
          ],
          transport: {
            train: 'JR山手線神谷町駅から徒歩5分',
            walking: '都営三田線御成門駅から徒歩3分'
          }
        },
        {
          id: 'tokyo-skytree',
          name: '東京スカイツリー',
          description: '世界一高い電波塔。展望台からの景色は圧巻で、晴れた日には富士山も見えます。',
          address: '東京都墨田区押上1-1-2',
          rating: 4.4,
          price: '¥2100',
          hours: '8:00-22:00',
          phone: '0570-55-0634',
          website: 'https://www.tokyo-skytree.jp/',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '世界一高い電波塔からの景色は圧巻',
            '晴れた日には富士山も見える',
            '展望台の料金は高めですが一見の価値あり'
          ],
          transport: {
            train: '東武スカイツリーライン押上駅直結',
            walking: '東京メトロ半蔵門線押上駅から直結'
          }
        },
        {
          id: 'sensoji-temple',
          name: '浅草寺',
          description: '東京最古のお寺で、歴史と伝統を感じることができます。雷門も有名で観光客が多いです。',
          address: '東京都台東区浅草2-3-1',
          rating: 4.5,
          price: '無料',
          hours: '6:00-17:00',
          phone: '03-3842-0181',
          website: 'https://www.senso-ji.jp/',
          image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            '東京最古のお寺で、歴史と伝統を感じることができる',
            '仲見世通りでのお買い物も楽しい',
            '雷門での写真撮影は必須'
          ],
          transport: {
            train: '東京メトロ銀座線浅草駅から徒歩5分',
            walking: '都営浅草線浅草駅から徒歩7分'
          }
        },
        {
          id: 'shibuya-crossing',
          name: '渋谷スクランブル交差点',
          description: '世界で最も有名な交差点の一つ。人の流れを見ているだけで興味深いです。',
          address: '東京都渋谷区道玄坂2-1',
          rating: 4.2,
          price: '無料',
          hours: '24時間',
          phone: '',
          website: '',
          image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '世界で最も有名な交差点の一つ',
            '人の流れを見ているだけで興味深い',
            'スターバックスの2階から見下ろすのもおすすめ'
          ],
          transport: {
            train: 'JR山手線渋谷駅ハチ公口から徒歩1分',
            walking: '東京メトロ各線渋谷駅から直結'
          }
        },
        {
          id: 'ueno-zoo',
          name: '上野動物園',
          description: 'パンダが特に人気で子供たちに大人気の動物園。園内は広いので一日楽しめます。',
          address: '東京都台東区上野公園9-83',
          rating: 4.1,
          price: '¥600',
          hours: '9:30-17:00',
          phone: '03-3828-5171',
          website: 'https://www.tokyo-zoo.net/zoo/ueno/',
          image: 'https://images.unsplash.com/photo-1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            'パンダが特に人気で子供たちに大人気',
            '園内は広いので一日楽しめる',
            '平日でも混雑することがある',
            '車椅子利用可、多目的トイレあり'
          ],
          transport: {
            train: 'JR上野駅公園口から徒歩5分',
            walking: '東京メトロ銀座線・日比谷線上野駅から徒歩12分'
          }
        },
        {
          id: 'meiji-jinja',
          name: '明治神宮',
          description: '都心にいることを忘れるほど静寂で神聖な空間。外国人観光客も多く、日本の文化を感じられます。',
          address: '東京都渋谷区代々木神園町1-1',
          rating: 4.6,
          price: '無料',
          hours: '日の出から日の入り',
          phone: '03-3379-5511',
          website: 'https://www.meijijingu.or.jp/',
          image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '都心にいることを忘れるほど静寂で神聖な空間',
            '外国人観光客も多く、日本の文化を感じられる',
            '結婚式に遭遇することもあり美しい光景',
            '初詣では非常に混雑する'
          ],
          transport: {
            train: 'JR原宿駅から徒歩3分',
            walking: '東京メトロ表参道駅から徒歩5分'
          }
        },
        {
          id: 'shinjuku-gyoen',
          name: '新宿御苑',
          description: '都心のオアシスで特に桜の季節は圧巻。広大な敷地で四季を感じられる美しい公園です。',
          address: '東京都新宿区内藤町11',
          rating: 4.3,
          price: '¥500',
          hours: '9:00-16:30',
          phone: '03-3350-3381',
          website: 'https://www.env.go.jp/garden/shinjukugyoen/',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '都心のオアシスで特に桜の季節は圧巻',
            '広大な敷地で四季を感じられる',
            '写真撮影にも最適',
            '車椅子利用可、車椅子貸出あり'
          ],
          transport: {
            train: 'JR新宿駅南口から徒歩10分',
            walking: '東京メトロ新宿御苑前駅から徒歩5分'
          }
        },
        {
          id: 'tsukiji-market',
          name: '築地場外市場',
          description: '新鮮な海鮮丼が絶品で早朝から営業。活気があって楽しい市場の雰囲気を体験できます。',
          address: '東京都中央区築地4-16-2',
          rating: 4.4,
          price: '¥1000-3000',
          hours: '5:00-14:00',
          phone: '03-3542-1111',
          website: 'https://www.tsukiji.or.jp/',
          image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            '新鮮な海鮮丼が絶品で早朝から営業',
            '活気があって楽しい市場の雰囲気',
            '観光地化しているが美味しい食べ物がたくさん',
            '早朝の来訪がおすすめ'
          ],
          transport: {
            train: '東京メトロ日比谷線築地駅から徒歩1分',
            walking: '都営大江戸線築地市場駅から徒歩5分'
          }
        },
        {
          id: 'roppongi-hills',
          name: '六本木ヒルズ',
          description: '高級ショッピングモールで、展望台からの夜景は素晴らしいです。洗練された空間で買い物を楽しめます。',
          address: '東京都港区六本木6-10-1',
          rating: 4.0,
          price: '無料（展望台は別途￥1,800）',
          hours: '11:00～21:00（金土は～23:00）',
          phone: '03-6406-6000',
          website: 'https://www.roppongihills.com/',
          image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '高級ショッピングモールで展望台からの夜景が素晴らしい',
            'レストランも充実している',
            '値段は高めだが洗練された空間',
            '完全バリアフリー対応'
          ],
          transport: {
            train: '東京メトロ日比谷線六本木駅1C出口から徒歩3分',
            walking: '都営大江戸線六本木駅3番出口から徒歩4分'
          }
        },
        {
          id: 'tokyo-national-museum',
          name: '東京国立博物館',
          description: '日本最古の博物館で、国宝や重要文化財が数多く展示されています。日本の歴史を深く学べます。',
          address: '東京都台東区上野公園13-9',
          rating: 4.3,
          price: '一般￥1,000、大学生￥500、高校生以下無料',
          hours: '9:30～17:00（金曜は～21:00、月曜定休）',
          phone: '050-5541-8600',
          website: 'https://www.tnm.jp/',
          image: 'https://images.unsplash.com/photo-1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            '日本最古の博物館で国宝や重要文化財を多数展示',
            '刀剣や仏像のコレクションは見応えがある',
            '本館の建物自体も歴史的価値があり美しい',
            '音声ガイドを借りると理解が深まる'
          ],
          transport: {
            train: 'JR上野駅公園口から徒歩10分',
            walking: '東京メトロ銀座線・日比谷線上野駅から徒歩15分'
          }
        }
      ]
    },
    food: {
      title: '東京グルメガイド - 全100店舗',
      description: '東京の最高の料理シーンを体験しよう。寿司、ラーメン、焼肉、フレンチ、カフェまで100店舗の厳選レストラン',
      recommendations: [
        {
          id: 'sushi-ki',
          name: 'Sushi Ki',
          description: 'Buffet-style sushi restaurant. Conveniently located near the station with good access, and the signature tempura set meal is particularly delicious.',
          address: '〒147-1601 東京都台東区3-6-9 真マンション 3F',
          rating: 4.6,
          price: '￥8,000-12,000',
          hours: '8:00 - 20:00',
          phone: '03-6737-2693',
          website: 'https://www.sushi-ki.com',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            'Popular restaurant with 3.61 Tabelog rating',
            'Romantic atmosphere',
            'Wheelchair accessible',
            'Credit cards accepted'
          ],
          transport: {
            train: 'Within walking distance from nearest station',
            walking: 'Close to station with excellent access'
          }
        },
        {
          id: 'yakiniku-hana',
          name: 'Yakiniku Hana',
          description: 'Award-winning yakiniku restaurant that received Regional Gourmet Award and Best Restaurant Award. Modern atmosphere perfect for families or solo dining.',
          address: '〒190-6489 東京都墨田区2-3-4 晴スクエア 18F',
          rating: 4.5,
          price: '￥8,000-12,000',
          hours: '11:30 - 14:30, 18:00 - 22:00 (Closed Sundays)',
          phone: '03-7289-6073',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
          tips: [
            'Regional Gourmet Award and Best Restaurant Award winner',
            'Takeout available',
            'Parking available',
            'Reservations recommended'
          ],
          transport: {
            train: 'Within walking distance from nearest station',
            walking: 'Enjoy the view from the 18th floor'
          }
        },
        {
          id: 'ramen-shi',
          name: 'Ramen Murasaki',
          description: 'Michelin Bib Gourmand award-winning ramen shop. Offers authentic ramen in the premium price range of 20,000 yen and above.',
          address: '東京都渋谷区',
          rating: 4.8,
          price: '￥20,000以上',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            'Michelin Bib Gourmand award winner',
            'Tabelog rating 3.07',
            'Authentic ramen',
            'Popular restaurant in Shibuya'
          ],
          transport: {
            train: 'Within walking distance from JR Shibuya Station',
            walking: 'Good access within Shibuya area'
          }
        },
        {
          id: 'bistro-raku',
          name: 'Bistro Raku',
          description: 'Fast-food style bistro. A lively restaurant where you can enjoy meals from breakfast to dinner.',
          address: '〒132-5768 東京都台東区3-5-6 雅ヒルズ 7F',
          rating: 3.6,
          price: '￥1,000-2,000',
          hours: '11:00 - 21:00',
          phone: '03-4846-8331',
          image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            'Excellent cost performance',
            'Seasonal kaiseki course also popular',
            'Suitable for business entertainment to solo dining',
            'Lively atmosphere'
          ],
          transport: {
            train: 'Within walking distance from nearest station',
            walking: 'Prime location on 7th floor'
          }
        },
        {
          id: 'french-brasserie-gin',
          name: 'Brasserie Gin',
          description: 'High-end French cuisine restaurant. Authentic French restaurant in Meguro with a rating of 4.8.',
          address: '東京都目黒区',
          rating: 4.8,
          price: '￥8,000-12,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
          tips: [
            'High Tabelog rating of 4.25',
            'Authentic French cuisine',
            'Popular restaurant in Meguro',
            'Luxurious atmosphere'
          ],
          transport: {
            train: 'Within walking distance from Meguro Station',
            walking: 'Good access within Meguro area'
          }
        },
        {
          id: 'cafe-ume',
          name: 'Coffee Ume',
          description: 'Popular cafe in Itabashi with a rating of 4.8. Enjoy authentic coffee at reasonable prices.',
          address: '東京都板橋区',
          rating: 4.8,
          price: '￥1,000-2,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
          tips: [
            'High Tabelog rating of 4.2',
            'Excellent cost performance',
            'Authentic coffee',
            'Hidden gem in Itabashi'
          ],
          transport: {
            train: 'Within walking distance from stations in Itabashi',
            walking: 'Good access'
          }
        },
        {
          id: 'michelin-yakitori-kuro',
          name: 'Yakitori Kuro',
          description: 'Michelin one-star yakitori restaurant. Authentic yakitori establishment in Itabashi known for excellence.',
          address: '東京都板橋区',
          rating: 4.5,
          price: '￥8,000-12,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
          tips: [
            'Michelin one-star award winner',
            'Authentic yakitori establishment',
            'Reservations required',
            'Pride of Itabashi district'
          ],
          transport: {
            train: 'Within walking distance from stations in Itabashi',
            walking: 'Good access'
          }
        },
        {
          id: 'michelin-asaya',
          name: 'Asaya',
          description: 'Michelin two-star luxury bar in Nerima. Offers first-class cuisine and service.',
          address: '東京都練馬区',
          rating: 4.7,
          price: '￥1,000-2,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
          tips: [
            'Michelin two-star award winner',
            'Tabelog rating 4.39',
            'Premier establishment in Nerima',
            'Reservations required'
          ],
          transport: {
            train: 'Within walking distance from stations in Nerima',
            walking: 'Good access'
          }
        },
        {
          id: 'pasta-daidai',
          name: 'Pasta Dai',
          description: 'Michelin one-star Italian restaurant. Authentic pasta establishment in Arakawa known for excellence.',
          address: '東京都荒川区',
          rating: 4.6,
          price: '￥1,000-2,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop',
          tips: [
            'Michelin one-star award winner',
            'Tabelog rating 3.04',
            'Authentic Italian cuisine',
            'Reasonable pricing'
          ],
          transport: {
            train: 'Within walking distance from stations in Arakawa',
            walking: 'Good access'
          }
        },
        {
          id: 'soba-sora',
          name: 'Sora Sushi',
          description: 'Michelin Bib Gourmand award-winning soba and udon specialty restaurant. Popular establishment in Setagaya.',
          address: '東京都世田谷区',
          rating: 3.8,
          price: '￥500-1,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            'Michelin Bib Gourmand award winner',
            'Tabelog rating 4.36',
            'Excellent cost performance',
            'Popular restaurant in Setagaya'
          ],
          transport: {
            train: 'Within walking distance from stations in Setagaya',
            walking: 'Good access'
          }
        },
        {
          id: 'teashop-sakura',
          name: 'Sabo Sakura',
          description: 'Michelin Bib Gourmand and Tokyo Gourmet Award-winning Indian cuisine cafe. Renowned establishment in Nakano.',
          address: '東京都中野区',
          rating: 4.3,
          price: '￥1,000-2,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
          tips: [
            'Michelin Bib Gourmand award winner',
            'Tokyo Gourmet Award winner',
            'Tabelog rating 4.3',
            'Authentic Indian cuisine'
          ],
          transport: {
            train: 'Within walking distance from stations in Nakano',
            walking: 'Good access'
          }
        },
        {
          id: 'yakitori-san',
          name: 'Yakitori San',
          description: 'Yakiniku restaurant in Chuo with a rating of 4.9. Renowned establishment where a chef trained in traditional Japanese cuisine showcases his skills.',
          address: '東京都中央区',
          rating: 4.9,
          price: '￥1,000-2,000',
          hours: 'Please check operating hours',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
          tips: [
            'Exceptional rating of 4.9',
            'Chef trained in traditional Japanese cuisine',
            'Tabelog rating 3.88',
            'Excellent cost performance'
          ],
          transport: {
            train: 'Within walking distance from stations in Chuo',
            walking: 'Good access'
          }
        }
      ]
    }
  },
  yokohama: {
    sightseeing: {
      title: 'Yokohama Sightseeing Guide',
      description: 'Explore the modern port city with beautiful waterfront views',
      recommendations: [
        {
          id: 'minato-mirai',
          name: 'Minato Mirai 21',
          description: 'Modern waterfront district with shopping and entertainment',
          address: 'Minato Mirai, Nishi Ward, Yokohama, Kanagawa 220-0012',
          rating: 4.4,
          price: 'Free (attractions vary)',
          hours: '10:00 AM - 10:00 PM',
          image: '/images/minato-mirai.jpg',
          tips: [
            'Visit at night for beautiful illuminations',
            'Take the Cosmo Clock 21 ferris wheel',
            'Great for shopping and dining'
          ],
          transport: {
            train: 'JR Negishi Line to Sakuragicho Station',
            walking: '5 minutes from station'
          }
        }
      ]
    }
  },
  saitama: {
    sightseeing: {
      title: 'Saitama Sightseeing Guide',
      description: 'Discover traditional culture and modern attractions',
      recommendations: [
        {
          id: 'kawagoe',
          name: 'Kawagoe (Little Edo)',
          description: 'Historic district preserving Edo-period architecture',
          address: 'Kawagoe, Saitama 350-0063',
          rating: 4.2,
          price: 'Free (museums vary)',
          hours: '9:00 AM - 6:00 PM',
          image: '/images/kawagoe.jpg',
          tips: [
            'Visit the famous Bell Tower',
            'Try traditional sweets and snacks',
            'Best in autumn for fall colors'
          ],
          transport: {
            train: 'JR Kawagoe Line to Kawagoe Station',
            walking: '15 minutes to historic district'
          }
        }
      ]
    }
  },
  chiba: {
    sightseeing: {
      title: '千葉観光ガイド',
      description: 'テーマパークから美しい海岸線、歴史ある寺社まで、多彩な魅力に満ちた千葉県を発見しよう',
      recommendations: [
        {
          id: 'chiba-spot-1',
          name: '東京ディズニーランド',
          description: '東京ディズニーランドは千葉県を代表する観光スポットです。非常に高い評価を受けており、訪れる価値のある名所です。',
          address: '日本、〒279-0031 千葉県浦安市舞浜１−１',
          rating: 4.6,
          price: '大人￥8,200-9,400',
          hours: '8時00分～22時00分',
          phone: '+81 45-330-5211',
          website: 'https://www.tokyodisneyresort.jp/tdl/',
          image: 'https://images.unsplash.com/1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-3',
          name: '東京ディズニーリゾート',
          description: '東京ディズニーリゾートは千葉県を代表する観光スポットです。非常に高い評価を受けており、訪れる価値のある名所です。',
          address: '日本、〒279-0031 千葉県浦安市舞浜１−１',
          rating: 4.6,
          price: '料金要確認',
          hours: '営業時間要確認',
          phone: '+81 45-330-5211',
          website: 'https://www.tokyodisneyresort.jp/',
          image: 'https://images.unsplash.com/1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-4',
          name: 'トゥーンタウン',
          description: 'トゥーンタウンは家族で楽しめるテーマパークです。非常に高い評価を受けており、訪れる価値のある名所です。',
          address: '日本、〒279-8511 千葉県浦安市舞浜１−１ 東京ディズニーランド',
          rating: 4.6,
          price: '料金要確認',
          hours: '9時00分～21時00分',
          phone: '+81 50-3090-2613',
          website: 'https://www.tokyodisneyresort.jp/tdr/facility/tdl_toontown.html',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-6',
          name: '東京ディズニーシー',
          description: '東京ディズニーシーは千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒279-0031 千葉県浦安市舞浜１−１',
          rating: 4.3,
          price: '大人￥8,200-9,400',
          hours: '9時00分～21時00分',
          website: 'https://www.tokyodisneyresort.jp/tds/',
          image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-8',
          name: '東京ディズニーシー',
          description: '東京ディズニーシーは千葉県を代表する観光スポットです。非常に高い評価を受けており、訪れる価値のある名所です。',
          address: '日本、〒279-8511 千葉県浦安市舞浜１−１３',
          rating: 4.6,
          price: '大人￥8,200-9,400',
          hours: '営業時間要確認',
          phone: '+81 45-330-5211',
          website: 'https://www.tokyodisneyresort.jp/tds/',
          image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-9',
          name: '成田山 新勝寺',
          description: '成田山 新勝寺は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒286-0023 千葉県成田市成田１',
          rating: 4.4,
          price: '無料（一部有料エリアあり）',
          hours: '8時00分～16時00分',
          phone: '+81 476-22-2111',
          website: 'https://www.naritasan.or.jp/',
          image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR成田線「成田駅」またはJR総武本線「成田駅」下車',
            walking: '駅から徒歩約10分'
          }
        },
        {
          id: 'chiba-spot-10',
          name: '成田山新勝寺 総門',
          description: '成田山新勝寺 総門は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒286-0023 千葉県成田市本町３４７',
          rating: 4.4,
          price: '料金要確認',
          hours: '8時00分～16時00分',
          phone: '+81 476-22-2111',
          website: 'http://www.nrtk.jp/mypage/00375.html',
          image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR成田線「成田駅」またはJR総武本線「成田駅」下車',
            walking: '駅から徒歩約10分'
          }
        },
        {
          id: 'chiba-spot-11',
          name: '幕張メッセ',
          description: '幕張メッセは千葉県の魅力的なスポットです。訪問者に愛される地域の魅力的なスポットです。',
          address: '日本、〒261-8550 千葉県千葉市美浜区中瀬２丁目１',
          rating: 3.9,
          price: '料金要確認',
          hours: '8時00分～20時00分',
          phone: '+81 43-296-0001',
          website: 'https://www.m-messe.co.jp/',
          image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-12',
          name: '鴨川シーワールド',
          description: '鴨川シーワールドは海の生き物たちの魅力的なパフォーマンスが楽しめる水族館です。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒296-0041 千葉県鴨川市東町１４６４−１８',
          rating: 4.4,
          price: '大人￥3,300、小人￥2,000',
          hours: '9時00分～16時00分',
          phone: '+81 4-7093-4803',
          website: 'http://www.kamogawa-seaworld.jp/?utm_source=google&utm_medium=maps',
          image: 'https://images.unsplash.com/1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            'ショーの時間を事前に確認しておきましょう',
            '餌やり体験などのイベントスケジュールをチェック',
            'カメラを忘れずに持参してください'
          ],
          transport: {
            train: 'JR内房線「安房鴨川駅」下車',
            walking: 'バスまたはタクシーで約10分'
          }
        },
        {
          id: 'chiba-spot-13',
          name: 'マザー牧場',
          description: 'マザー牧場は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1601 千葉県富津市田倉９４０−３',
          rating: 4.2,
          price: '大人￥1,500、小人￥800',
          hours: '9時30分～16時30分',
          phone: '+81 439-37-3211',
          website: 'https://www.motherfarm.co.jp/',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-14',
          name: 'ふれあい牧場',
          description: 'ふれあい牧場では様々な動物とふれあうことができる人気の動物園です。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉',
          rating: 4.2,
          price: '料金要確認',
          hours: '9時30分～16時30分',
          phone: '+81 439-37-3211',
          website: 'http://www.motherfarm.co.jp/animal/fureai/',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            'ショーの時間を事前に確認しておきましょう',
            '餌やり体験などのイベントスケジュールをチェック',
            'カメラを忘れずに持参してください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-15',
          name: 'うしの牧場（マザー牧場）',
          description: 'うしの牧場（マザー牧場）では様々な動物とふれあうことができる人気の動物園です。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1601 千葉県富津市桜井総稱鬼泪山',
          rating: 4.0,
          price: '料金要確認',
          hours: '10時00分～10時30分, 11時30分～12時00分, 13時30分～14時00分, 15時30分～16時00分',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            'ショーの時間を事前に確認しておきましょう',
            '餌やり体験などのイベントスケジュールをチェック',
            'カメラを忘れずに持参してください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-16',
          name: 'マザー牧場 乗馬',
          description: 'マザー牧場 乗馬は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉',
          rating: 4.2,
          price: '料金要確認',
          hours: '営業時間要確認',
          phone: '+81 439-37-3211',
          website: 'https://www.motherfarm.co.jp/animal/ride/',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-19',
          name: 'わくわくランド（マザー牧場）',
          description: 'わくわくランド（マザー牧場）は家族で楽しめるテーマパークです。訪問者に愛される地域の魅力的なスポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉',
          rating: 3.7,
          price: '料金要確認',
          hours: '営業時間要確認',
          website: 'https://www.motherfarm.co.jp/amusement/',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-20',
          name: '山の上ゲート',
          description: '山の上ゲートは千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉',
          rating: 4.3,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-21',
          name: 'ひつじのマザー',
          description: 'ひつじのマザーでは様々な動物とふれあうことができる人気の動物園です。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉',
          rating: 4.1,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            'ショーの時間を事前に確認しておきましょう',
            '餌やり体験などのイベントスケジュールをチェック',
            'カメラを忘れずに持参してください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-22',
          name: '食の体験工房（マザー牧場）',
          description: '食の体験工房（マザー牧場）は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉９３８−１',
          rating: 4.0,
          price: '料金要確認',
          hours: '営業時間要確認',
          website: 'https://www.motherfarm.co.jp/map/purpose/handmade.php',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-23',
          name: '犬吠埼灯台',
          description: '犬吠埼灯台は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒288-0012 千葉県銚子市犬吠埼９５７６',
          rating: 4.1,
          price: '大人￥300、小人￥150',
          hours: '8時30分～17時00分',
          phone: '+81 479-25-8239',
          website: 'https://www.tokokai.org/tourlight/tourlight03/',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: '銚子電鉄「犬吠駅」下車',
            walking: '徒歩約7分'
          }
        },
        {
          id: 'chiba-spot-24',
          name: 'ふなばしアンデルセン公園',
          description: 'ふなばしアンデルセン公園は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒274-0054 千葉県船橋市金堀町５２５',
          rating: 4.4,
          price: '大人￥900、高校生￥600、小中学生￥200',
          hours: '9時30分～16時00分',
          phone: '+81 47-457-6627',
          website: 'https://www.park-funabashi.or.jp/and/',
          image: 'https://images.unsplash.com/1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            '季節の花や紅葉の見頃を事前にチェック',
            '歩きやすい靴でお越しください',
            'ピクニック用品を持参すると一日楽しめます'
          ],
          transport: {
            train: '新京成線「三咲駅」下車',
            walking: 'バスで約15分'
          }
        },
        {
          id: 'chiba-spot-26',
          name: '九十九里浜',
          description: '九十九里浜は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒289-1804 千葉県九十九里町蓮沼平',
          rating: 4.4,
          price: '料金要確認',
          hours: '24 時間営業',
          website: 'https://99kankou.com/',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-27',
          name: '九十九里浜',
          description: '九十九里浜は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-4326 一松乙 九十九里浜',
          rating: 4.3,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-29',
          name: '片貝海水浴場',
          description: '片貝海水浴場は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0104 千葉県山武郡九十九里町片貝',
          rating: 4.2,
          price: '料金要確認',
          hours: '9時00分～16時00分',
          phone: '+81 475-70-3177',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-31',
          name: '九十九里浜',
          description: '九十九里浜は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒289-3184 栢田',
          rating: 4.1,
          price: '料金要確認',
          hours: '24 時間営業',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-32',
          name: '九十九里浜（白子町）',
          description: '九十九里浜（白子町）は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-4203 千葉県長生郡白子町剃金 九十九里浜（白子町）',
          rating: 4.0,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-34',
          name: '九十九里ビーチタワー(不動堂海水浴場)',
          description: '九十九里ビーチタワー(不動堂海水浴場)は千葉県の魅力的なスポットです。訪問者に愛される地域の魅力的なスポットです。',
          address: '日本、〒283-0113 千葉県山武郡九十九里町不動堂',
          rating: 3.9,
          price: '料金要確認',
          hours: '24 時間営業',
          phone: '+81 475-70-3177',
          website: 'https://www.town.kujukuri.chiba.jp/0000004140.html',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-35',
          name: '本須賀海水浴場',
          description: '本須賀海水浴場は千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒289-1305 千葉県山武市本須賀３８４１−１２４',
          rating: 4.2,
          price: '料金要確認',
          hours: '9時00分～16時00分',
          phone: '+81 475-80-1202',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-37',
          name: '不動堂海水浴場',
          description: '不動堂海水浴場は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0113 千葉県山武郡九十九里町不動堂 不動堂海水浴場',
          rating: 4.1,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-41',
          name: '海水浴場の監視棟（九十九里浜）',
          description: '海水浴場の監視棟（九十九里浜）は千葉県を代表する観光スポットです。訪問者に愛される地域の魅力的なスポットです。',
          address: '日本、〒283-0113 千葉県山武郡九十九里町不動堂２８３ 0113',
          rating: 3.7,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-42',
          name: '作田海水浴場',
          description: '作田海水浴場は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0101 千葉県山武郡九十九里町作田 作田海水浴場',
          rating: 4.1,
          price: '料金要確認',
          hours: '営業時間要確認',
          phone: '+81 475-70-3177',
          website: 'http://www.town.kujukuri.chiba.jp/',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-43',
          name: '白里海水浴場',
          description: '白里海水浴場は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-3202 千葉県大網白里市南今泉４８８１−１ 地先',
          rating: 4.1,
          price: '料金要確認',
          hours: '8時30分～16時00分',
          phone: '+81 475-70-0356',
          website: 'https://www.city.oamishirasato.lg.jp/0000001588.html',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '日焼け止めと水分補給をお忘れなく',
            '海水浴シーズンは駐車場が混雑するため早めの到着を',
            '地元の海の幸グルメもお楽しみください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-45',
          name: '九十九里浜自然公園',
          description: '九十九里浜自然公園は自然豊かな公園で、四季を通じて美しい景色が楽しめます。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒289-1726 千葉県山武郡横芝光町木戸',
          rating: 4.1,
          price: '無料',
          hours: '24 時間営業',
          website: 'https://www.pref.chiba.lg.jp/bousaik/tsunamityosa/shinsuiyosoku.html',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '季節の花や紅葉の見頃を事前にチェック',
            '歩きやすい靴でお越しください',
            'ピクニック用品を持参すると一日楽しめます'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        }
      ]
    },
    food: {
      title: '千葉グルメガイド',
      description: '新鮮な海の幸から地元の名物料理まで、千葉県の美味しい食文化を満喫しよう',
      recommendations: [
        {
          id: 'chiba-spot-17',
          name: 'ファームダイナー',
          description: 'ファームダイナーは地元の新鮮な食材を使った美味しい料理が自慢のレストランです。訪問者に愛される地域の魅力的なスポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉９４０−３',
          rating: 3.8,
          price: '￥1,000-2,000',
          hours: '11時00分～16時00分',
          phone: '+81 439-37-3211',
          website: 'http://www.motherfarm.co.jp/gourmet/restaurant/detail.php?CN=207959',
          image: 'https://images.unsplash.com/1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        },
        {
          id: 'chiba-spot-25',
          name: '千葉ポートタワー',
          description: '千葉ポートタワーは千葉県を代表する観光スポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒260-0024 千葉県千葉市中央区中央港１丁目１０ 千葉ポートパーク 内',
          rating: 4.0,
          price: '￥1,000-3,000',
          hours: '9時00分～21時00分',
          phone: '+81 43-241-0125',
          website: 'https://chiba-porttower.com/',
          image: 'https://images.unsplash.com/1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-28',
          name: '海の駅九十九里',
          description: '海の駅九十九里は千葉県の魅力的なスポットです。訪問者に愛される地域の魅力的なスポットです。',
          address: '日本、〒283-0102 千葉県山武郡九十九里町小関２３４７−９８ 2F',
          rating: 3.6,
          price: '料金要確認',
          hours: '9時00分～17時00分',
          phone: '+81 475-76-1734',
          website: 'https://uminoeki99.com/',
          image: 'https://images.unsplash.com/1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-30',
          name: '漁師料理の店ばんや',
          description: '漁師料理の店ばんやは地元の新鮮な食材を使った美味しい料理が自慢のレストランです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0113 千葉県山武郡九十九里町不動堂４５０',
          rating: 4.2,
          price: '￥1,000-2,000',
          hours: '10時00分～19時00分',
          phone: '+81 475-76-0071',
          website: 'https://99banya.com/',
          image: 'https://images.unsplash.com/1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-33',
          name: '海食堂九十九里倉庫',
          description: '海食堂九十九里倉庫は地元の新鮮な食材を使った美味しい料理が自慢のレストランです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0105 千葉県山武郡九十九里町粟生２３５９−１３８',
          rating: 4.0,
          price: '￥1,000-2,000',
          hours: '11時00分～15時00分, 17時00分～20時00分',
          phone: '+81 475-76-1988',
          website: 'http://www.h-t-company.com/',
          image: 'https://images.unsplash.com/1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-36',
          name: '浜茶屋 向島（お支払いは現金のみになります。）',
          description: '浜茶屋 向島（お支払いは現金のみになります。）は地元の新鮮な食材を使った美味しい料理が自慢のレストランです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0113 千葉県山武郡九十九里町不動堂４５０',
          rating: 4.1,
          price: '￥1,000-2,000',
          hours: '10時00分～19時00分',
          phone: '+81 475-76-6237',
          website: 'https://www.99beach.com/restrant/mukoujima/',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-38',
          name: '海の見えるレストランはまゆう',
          description: '海の見えるレストランはまゆうは地元の新鮮な食材を使った美味しい料理が自慢のレストランです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0114 千葉県山武郡九十九里町真亀４９０８−１６１',
          rating: 4.0,
          price: '￥1,000-2,000',
          hours: '7時00分～9時30分, 11時30分～14時00分, 17時30分～21時00分',
          phone: '+81 475-76-4151',
          image: 'https://images.unsplash.com/1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-39',
          name: '浜茶屋網元',
          description: '浜茶屋網元は地元の新鮮な食材を使った美味しい料理が自慢のレストランです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒283-0105 千葉県山武郡九十九里町粟生２３５９−１３',
          rating: 4.0,
          price: '￥1,000-2,000',
          hours: '10時30分～15時10分',
          phone: '+81 475-76-4959',
          website: 'https://hamachaya-amimoto99.com/',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        },
        {
          id: 'chiba-spot-44',
          name: '九十九里浜ものがたり',
          description: '九十九里浜ものがたりは地元の新鮮な食材を使った美味しい料理が自慢のレストランです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒116-0002 東京都荒川区荒川１丁目４４−１',
          rating: 4.4,
          price: '￥500-1,000',
          hours: '16時30分～22時00分',
          phone: '+81 3-3802-2922',
          website: 'http://99hamaten.com/',
          image: 'https://images.unsplash.com/1542051841857-5f90071e7989?w=800&h=600&fit=crop',
          tips: [
            '人気店のため予約がおすすめです',
            '地元の名物料理をぜひお試しください',
            'ランチタイムは混雑することがあります'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        }
      ]
    },
    shopping: {
      title: '千葉ショッピングガイド',
      description: 'モダンなショッピングモールから地元の特産品まで、千葉での買い物を楽しもう',
      recommendations: [
        {
          id: 'chiba-spot-40',
          name: '海の家 たかはし',
          description: '海の家 たかはしは千葉県の魅力的なスポットです。訪問者に愛される地域の魅力的なスポットです。',
          address: '6928, 片貝 九十九里町 山武郡 千葉県 283-0104 日本',
          rating: 3.7,
          price: '料金要確認',
          hours: '6時00分～18時00分',
          image: 'https://images.unsplash.com/1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: '最寄り駅要確認',
            walking: '詳細は公式サイトをご確認ください'
          }
        }
      ]
    },
    others: {
      title: '千葉その他スポット',
      description: '宿泊施設や交通ハブなど、千葉旅行に役立つその他の重要なスポット',
      recommendations: [
        {
          id: 'chiba-spot-2',
          name: 'ハンドウォッシングエリア',
          description: 'ハンドウォッシングエリアは家族で楽しめるテーマパークです。非常に高い評価を受けており、訪れる価値のある名所です。',
          address: '日本、〒279-0031 千葉県浦安市舞浜１−１',
          rating: 5.0,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          tips: [
            '事前にオンラインでチケットを購入することをおすすめします',
            '混雑を避けるため平日または開園直後の来園がおすすめ',
            '公式アプリをダウンロードして待ち時間をチェック'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-5',
          name: '東京ディズニーランド・ステーション駅',
          description: '東京ディズニーランド・ステーション駅は千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒279-0031 千葉県浦安市舞浜',
          rating: 4.4,
          price: '料金要確認',
          hours: '営業時間要確認',
          image: 'https://images.unsplash.com/1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR京葉線「舞浜駅」下車',
            walking: '駅から徒歩約5分'
          }
        },
        {
          id: 'chiba-spot-18',
          name: 'マザー牧場GLAMPING THE FARM',
          description: 'マザー牧場GLAMPING THE FARMは千葉県の魅力的なスポットです。多くの訪問者から高い評価を得ている人気スポットです。',
          address: '日本、〒299-1731 千葉県富津市田倉９４０',
          rating: 4.1,
          price: '料金要確認',
          hours: '営業時間要確認',
          website: 'http://www.motherfarm.co.jp/glamping/',
          image: 'https://images.unsplash.com/1533651819408-626a1d7bec4b?w=800&h=600&fit=crop',
          tips: [
            '営業時間や定休日を事前に確認してください',
            '公共交通機関の利用がおすすめです',
            '詳細情報は公式サイトでご確認ください'
          ],
          transport: {
            train: 'JR内房線「佐貫町駅」下車',
            walking: 'バスで約25分（無料送迎バスあり）'
          }
        }
      ]
    }
  }
};

const categoryNames: Record<string, string> = {
  sightseeing: '観光スポット',
  food: 'グルメ・食事',
  shopping: 'ショッピング',
  transport: '交通手段',
  accommodation: '宿泊施設',
  nature: '自然・アウトドア',
  cafe: 'カフェ・バー',
  culture: '文化・エンターテイメント'
};

const areaNames: Record<Area, string> = {
  tokyo: '東京',
  yokohama: '横浜',
  saitama: '埼玉',
  chiba: '千葉'
};

export const TravelGuide: React.FC = () => {
  const { area, category } = useParams<{ area: Area; category: string }>();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addItem, items } = useItinerary();

  const handleBackClick = () => {
    navigate(`/category-selection/${area}`);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // 旅しおりに追加する関数
  const addToItinerary = (recommendation: Recommendation) => {
    // 座標データを追加（実際の実装では、Google Places APIなどから取得）
    const coordinates = getCoordinatesForSpot(recommendation.id);
    
    const itineraryItem: ItineraryItem = {
      id: recommendation.id,
      name: recommendation.name,
      address: recommendation.address,
      description: recommendation.description,
      rating: recommendation.rating,
      price: recommendation.price,
      hours: recommendation.hours,
      phone: recommendation.phone,
      website: recommendation.website,
      image: recommendation.image,
      coordinates,
      estimatedVisitTime: getEstimatedVisitTime(recommendation.id),
      category: category as 'sightseeing' | 'food' | 'shopping' | 'entertainment',
      addedAt: new Date(),
      transport: recommendation.transport
    };
    
    addItem(itineraryItem);
  };

  // 旅しおりに既に追加済みかチェック
  const isInItinerary = (id: string) => {
    return items.some(item => item.id === id);
  };

  // スポット別の座標データ（実際の実装では外部APIから取得）
  const getCoordinatesForSpot = (spotId: string) => {
    const coordinates = {
      'tokyo-tower': { lat: 35.6585769, lng: 139.7454506 },
      'tokyo-skytree': { lat: 35.7100627, lng: 139.8107004 },
      'sensoji-temple': { lat: 35.7147651, lng: 139.7965594 },
      'shibuya-crossing': { lat: 35.6591479, lng: 139.7005657 },
      'ueno-zoo': { lat: 35.7169281, lng: 139.7706166 },
      'meiji-jingu': { lat: 35.6763976, lng: 139.6993259 },
      'shinjuku-gyoen': { lat: 35.6851471, lng: 139.7100991 },
      'tsukiji-market': { lat: 35.6654861, lng: 139.7706363 },
      'roppongi-hills': { lat: 35.6605468, lng: 139.7295669 },
      'tokyo-national-museum': { lat: 35.7187283, lng: 139.7758054 }
    };
    
    return coordinates[spotId as keyof typeof coordinates] || { lat: 35.6762, lng: 139.6503 };
  };

  // スポット別の推定滞在時間（分）
  const getEstimatedVisitTime = (spotId: string) => {
    const visitTimes = {
      'tokyo-tower': 90,
      'tokyo-skytree': 120,
      'sensoji-temple': 60,
      'shibuya-crossing': 30,
      'ueno-zoo': 180,
      'meiji-jingu': 90,
      'shinjuku-gyoen': 120,
      'tsukiji-market': 120,
      'roppongi-hills': 120,
      'tokyo-national-museum': 150
    };
    
    return visitTimes[spotId as keyof typeof visitTimes] || 90;
  };

  if (!area || !category || !guideData[area]?.[category]) {
    return (
      <div className="min-h-screen font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ガイドが見つかりません</h1>
          <button
            onClick={() => navigate('/area-selection')}
            className="px-6 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg hover:shadow-lg transition-all duration-300"
          >
            エリア選択に戻る
          </button>
        </div>
      </div>
    );
  }

  const guide = guideData[area][category];

  return (
    <div className="font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white overflow-x-hidden min-h-screen">
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-shape w-64 h-64 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 rounded-full absolute top-20 left-10 animate-float blur-xl"></div>
        <div className="floating-shape w-48 h-48 bg-gradient-to-r from-neon-blue/20 to-neon-green/20 rounded-full absolute top-40 right-20 animate-float delay-1000 blur-xl"></div>
        <div className="floating-shape w-32 h-32 bg-gradient-to-r from-electric-yellow/20 to-neon-pink/20 rounded-full absolute bottom-32 left-1/4 animate-float delay-2000 blur-xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center text-neon-blue hover:text-neon-pink mb-6 transition-colors duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              カテゴリ選択に戻る
            </button>
            
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 rounded-full text-sm font-semibold border border-neon-pink/50 animate-pulse-glow">
                  📖 トラベルガイド
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                  {areaNames[area]}
                </span><br />
                <span className="bg-gradient-to-r from-neon-blue via-neon-green to-electric-yellow bg-clip-text text-transparent">
                  {categoryNames[category] || category}
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                {guide.description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center bg-gradient-to-r from-neon-blue to-neon-green px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all duration-300 transform hover:scale-105">
                  <Download className="w-5 h-5 mr-2" />
                  ガイドをダウンロード
                </button>
                <button className="inline-flex items-center bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-neon-pink/30 transition-all duration-300 transform hover:scale-105">
                  <Share2 className="w-5 h-5 mr-2" />
                  シェア
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-8">
            {guide.recommendations.map((rec) => (
              <div key={rec.id} className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-neon-pink/50 transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-2/5 relative">
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="md:w-3/5 p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">{rec.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleFavorite(rec.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(rec.id) 
                              ? 'text-neon-pink bg-neon-pink/20' 
                              : 'text-white/60 hover:text-neon-pink hover:bg-white/10'
                          }`}
                        >
                          <Heart className="w-6 h-6" fill={favorites.includes(rec.id) ? 'currentColor' : 'none'} />
                        </button>
                        
                        <button
                          onClick={() => addToItinerary(rec)}
                          disabled={isInItinerary(rec.id)}
                          className={`p-2 rounded-full transition-colors ${
                            isInItinerary(rec.id)
                              ? 'text-neon-blue bg-neon-blue/20 cursor-not-allowed'
                              : 'text-white/60 hover:text-neon-blue hover:bg-white/10'
                          }`}
                          title={isInItinerary(rec.id) ? '旅しおりに追加済み' : '旅しおりに追加'}
                        >
                          {isInItinerary(rec.id) ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Notebook className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-6 leading-relaxed">{rec.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-white/70">
                        <MapPin className="w-5 h-5 mr-3 text-neon-blue" />
                        <span className="text-sm">{rec.address}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Clock className="w-5 h-5 mr-3 text-neon-green" />
                        <span className="text-sm">{rec.hours}</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <Star className="w-5 h-5 mr-3 text-yellow-400" />
                        <span className="text-sm font-semibold">{rec.rating}/5.0</span>
                      </div>
                      <div className="flex items-center text-white/70">
                        <span className="text-neon-pink font-bold text-lg">{rec.price}</span>
                      </div>
                    </div>

                    {/* Transport Info */}
                    <div className="mb-6">
                      <h4 className="font-bold text-white mb-3 text-lg">アクセス方法：</h4>
                      <div className="space-y-2">
                        {rec.transport.train && (
                          <div className="flex items-center text-white/80">
                            <Train className="w-5 h-5 mr-3 text-neon-purple" />
                            <span>{rec.transport.train}</span>
                          </div>
                        )}
                        {rec.transport.walking && (
                          <div className="flex items-center text-white/80">
                            <span className="w-5 h-5 mr-3 text-neon-blue">🚶</span>
                            <span>{rec.transport.walking}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="mb-6">
                      <h4 className="font-bold text-white mb-3 text-lg">おすすめポイント：</h4>
                      <div className="space-y-2">
                        {rec.tips.map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-white/80">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    {(rec.phone || rec.website) && (
                      <div className="flex gap-6">
                        {rec.phone && (
                          <a href={`tel:${rec.phone}`} className="flex items-center text-neon-blue hover:text-neon-pink transition-colors">
                            <Phone className="w-5 h-5 mr-2" />
                            <span className="font-semibold">{rec.phone}</span>
                          </a>
                        )}
                        {rec.website && (
                          <a href={rec.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-neon-green hover:text-neon-pink transition-colors">
                            <Globe className="w-5 h-5 mr-2" />
                            <span className="font-semibold">ウェブサイト</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}; 