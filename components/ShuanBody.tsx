import { ClassCell } from "./ClassCell";
import { Text, View } from "react-native";

type Period = "Morning" | "First" | "Second" | "Break" | "Third" | "Fourth" | "Lunch" | "Fifth" | "Sixth" | "Memo";

const PERIODS: { period: Period; name: string; isClass: boolean }[] = [
  {
    period: "Morning",
    name: "朝学",
    isClass: false
  },
  {
    period: "First",
    name: "1",
    isClass: true
  },
  {
    period: "Second",
    name: "2",
    isClass: true
  },
  {
    period: "Break",
    name: "休み",
    isClass: false
  },
  {
    period: "Third",
    name: "3",
    isClass: true
  },
  {
    period: "Fourth",
    name: "4",
    isClass: true
  },
  {
    period: "Lunch",
    name: "昼休",
    isClass: false
  },
  {
    period: "Fifth",
    name: "5",
    isClass: true
  },
  {
    period: "Sixth",
    name: "6",
    isClass: true
  },
  {
    period: "Memo",
    name: "メモ",
    isClass: false
  }
] as const;

type ClassData = {
  id: string;
  date: string; // YYYY-MM-DD
  period: Period;
  subjectName: string;
  unitName: string;
};

const Data: ClassData[] = [
  {
    id: "6cc5d8f5-0a7e-4ea9-a011-1554eee447b8",
    date: "2025-05-26",
    period: "Morning",
    subjectName: "読書",
    unitName: "読書"
  },
  {
    id: "242a3a8f-88d7-4d44-9a1a-f617d88095d1",
    date: "2025-05-26",
    period: "First",
    subjectName: "英語",
    unitName: "リスニング"
  },
  {
    id: "300dd806-60d2-4414-8a12-ce8bbeb5dabd",
    date: "2025-05-26",
    period: "Second",
    subjectName: "国語",
    unitName: "現代文"
  },
  {
    id: "4168fbae-28fa-48dd-a408-1c32ba7ff40c",
    date: "2025-05-26",
    period: "Break",
    subjectName: "Break",
    unitName: "休憩"
  },
  {
    id: "60d3ce9d-f698-4489-8ca1-16a85644fdd3",
    date: "2025-05-26",
    period: "Third",
    subjectName: "歴史",
    unitName: "日本史"
  },
  {
    id: "631b8b00-52c1-49e3-a343-3c5b45166551",
    date: "2025-05-26",
    period: "Fourth",
    subjectName: "情報",
    unitName: "プログラミング"
  },
  {
    id: "ce31c534-90c6-4305-a346-763c064ae852",
    date: "2025-05-26",
    period: "Lunch",
    subjectName: "昼休憩",
    unitName: "昼休憩"
  },
  {
    id: "33890c5a-ad8c-429c-8aea-e034cb818b47",
    date: "2025-05-26",
    period: "Fifth",
    subjectName: "美術",
    unitName: "デザイン"
  },
  {
    id: "22072b7c-1dcb-4005-9c71-d0039e94795c",
    date: "2025-05-26",
    period: "Sixth",
    subjectName: "自習",
    unitName: "課題研究"
  }
];

export function ShuanBody() {
  const [currentWeekStartDay, currentWeekEndDay] = calcWeekStartAndEdnDates(new Date());
  const classes = filterClassesBetweenDays(Data, currentWeekStartDay, currentWeekEndDay);
  const dates = getDateRange(currentWeekStartDay, currentWeekEndDay);

  return (
    <View style={{ flex: 1 }}>
      {PERIODS.map((period, periodIndex) => {
        return (
          <View
            key={period.period}
            style={[{ flexDirection: "row", flexBasis: 0, flexGrow: period.isClass ? 1 : 0.5 }]}
          >
            <Text style={{ width: 18, padding: 4, fontSize: 12, marginRight: 4 }}>{period.name}</Text>
            {dates.map((date, dateIndex) => {
              const targetClassData = classes.find((classData) => {
                return classData.period === period.period && isSameDay(new Date(classData.date), date);
              });

              return (
                <View
                  key={`${date.toISOString()}-${period.period}`}
                  style={[
                    { flex: 1, borderRightWidth: 0.5, borderBottomWidth: 0.5 },
                    dateIndex === 0 && { borderLeftWidth: 0.5 },
                    periodIndex === 0 && {
                      borderTopWidth: 0.5
                    }
                  ]}
                >
                  <ClassCell subjectName={targetClassData?.subjectName} unitName={targetClassData?.unitName} />
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function calcWeekStartAndEdnDates(date: Date): [Date, Date] {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const currentWeekStartDay = new Date(date);
  currentWeekStartDay.setDate(diff);
  currentWeekStartDay.setHours(0, 0, 0, 0);
  const currentWeekEndDay = new Date(currentWeekStartDay);
  currentWeekEndDay.setDate(currentWeekStartDay.getDate() + 5);
  return [currentWeekStartDay, currentWeekEndDay];
}

function filterClassesBetweenDays(classes: ClassData[], startDate: Date, endDate: Date): ClassData[] {
  if (startDate > endDate) {
    return [];
  }

  return classes.filter((classData) => {
    const date = new Date(classData.date);
    return date >= startDate && date <= endDate;
  });
}

function getDateRange(from: Date, to: Date): Date[] {
  const dates: Date[] = [];
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
