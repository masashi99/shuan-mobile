import { ShuanBody } from "./ShuanBody";
import { WeeklyHeader } from "./WeeklyHeader";
import { View } from "react-native";

type Class = { id: string; subjectName: string; unitName: string };

type DayClass = Class[];

// 7日分（月〜日）の時間割データ
// 各日に10個の授業が入るようにする
const Data: DayClass[] = [
  // 月曜日
  [
    { id: "mon-1", subjectName: "数学", unitName: "代数学" },
    { id: "mon-2", subjectName: "英語", unitName: "リスニング" },
    { id: "mon-3", subjectName: "物理", unitName: "力学" },
    { id: "mon-4", subjectName: "国語", unitName: "現代文" },
    { id: "mon-5", subjectName: "体育", unitName: "球技" },
    { id: "mon-6", subjectName: "歴史", unitName: "日本史" },
    { id: "mon-7", subjectName: "情報", unitName: "プログラミング" },
    { id: "mon-8", subjectName: "音楽", unitName: "鑑賞" },
    { id: "mon-9", subjectName: "美術", unitName: "デザイン" },
    { id: "mon-10", subjectName: "自習", unitName: "課題研究" }
  ],
  // 火曜日
  [
    { id: "tue-1", subjectName: "物理", unitName: "電磁気学" },
    { id: "tue-2", subjectName: "数学", unitName: "幾何学" },
    { id: "tue-3", subjectName: "英語", unitName: "文法" },
    { id: "tue-4", subjectName: "化学", unitName: "有機化学" },
    { id: "tue-5", subjectName: "国語", unitName: "古文" },
    { id: "tue-6", subjectName: "地理", unitName: "世界地理" },
    { id: "tue-7", subjectName: "保健", unitName: "健康管理" },
    { id: "tue-8", subjectName: "美術", unitName: "絵画" },
    { id: "tue-9", subjectName: "総合", unitName: "キャリア教育" },
    { id: "tue-10", subjectName: "情報", unitName: "データベース" }
  ],
  // 水曜日
  [
    { id: "wed-1", subjectName: "化学", unitName: "無機化学" },
    { id: "wed-2", subjectName: "数学", unitName: "微分積分" },
    { id: "wed-3", subjectName: "英語", unitName: "スピーキング" },
    { id: "wed-4", subjectName: "国語", unitName: "漢文" },
    { id: "wed-5", subjectName: "体育", unitName: "陸上" },
    { id: "wed-6", subjectName: "生物", unitName: "遺伝学" },
    { id: "wed-7", subjectName: "家庭科", unitName: "調理実習" },
    { id: "wed-8", subjectName: "音楽", unitName: "合唱" },
    { id: "wed-9", subjectName: "技術", unitName: "木工" },
    { id: "wed-10", subjectName: "特別活動", unitName: "クラブ活動" }
  ],
  // 木曜日
  [
    { id: "thu-1", subjectName: "英語", unitName: "ライティング" },
    { id: "thu-2", subjectName: "国語", unitName: "小論文" },
    { id: "thu-3", subjectName: "数学", unitName: "確率統計" },
    { id: "thu-4", subjectName: "理科", unitName: "実験" },
    { id: "thu-5", subjectName: "社会", unitName: "政治経済" },
    { id: "thu-6", subjectName: "外国語", unitName: "フランス語" },
    { id: "thu-7", subjectName: "情報", unitName: "ネットワーク" },
    { id: "thu-8", subjectName: "体育", unitName: "水泳" },
    { id: "thu-9", subjectName: "選択科目", unitName: "プログラミング" },
    { id: "thu-10", subjectName: "自習", unitName: "補習" }
  ],
  // 金曜日
  [
    { id: "fri-1", subjectName: "国語", unitName: "表現" },
    { id: "fri-2", subjectName: "英語", unitName: "英会話" },
    { id: "fri-3", subjectName: "数学", unitName: "数列" },
    { id: "fri-4", subjectName: "地学", unitName: "天文学" },
    { id: "fri-5", subjectName: "歴史", unitName: "世界史" },
    { id: "fri-6", subjectName: "外国語", unitName: "中国語" },
    { id: "fri-7", subjectName: "技術", unitName: "電子工作" },
    { id: "fri-8", subjectName: "保健", unitName: "応急処置" },
    { id: "fri-9", subjectName: "総合", unitName: "SDGs学習" },
    { id: "fri-10", subjectName: "特別活動", unitName: "委員会活動" }
  ],
  // 土曜日
  [
    { id: "sat-1", subjectName: "選択科目", unitName: "上級数学" },
    { id: "sat-2", subjectName: "選択科目", unitName: "英語表現" },
    { id: "sat-3", subjectName: "選択科目", unitName: "物理実験" },
    { id: "sat-4", subjectName: "選択科目", unitName: "社会研究" },
    { id: "sat-5", subjectName: "選択科目", unitName: "生物実験" },
    { id: "sat-6", subjectName: "課外活動", unitName: "プロジェクト学習" },
    { id: "sat-7", subjectName: "課外活動", unitName: "ボランティア" },
    { id: "sat-8", subjectName: "課外活動", unitName: "発表準備" },
    { id: "sat-9", subjectName: "課外活動", unitName: "研究活動" },
    { id: "sat-10", subjectName: "部活動", unitName: "自主練習" }
  ]
];

export function Shuan() {
  return (
    <View style={{ flex: 1, gap: 8 }}>
      <WeeklyHeader />
      <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
        <ShuanBody />
      </View>
    </View>
  );
}
