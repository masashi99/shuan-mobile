import { ShuanBody } from "./ShuanBody";
import { ShuanHeader } from "./ShuanHeader";
import { addWeeks, subWeeks } from "date-fns";
import { useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";

type WeekData = {
  startDate: Date;
  dates: Date[];
};

export function Progress() {
  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(calcStartOfWeek(new Date()));
  const [containerWidth, setContainerWidth] = useState(0);
  const listRef = useRef<FlatList>(null);

  const prevWeekStartDay = subWeeks(currentWeekStartDay, 1);
  const nextWeekStartDay = addWeeks(currentWeekStartDay, 1);

  const currentWeekDates = calcWeekDatesUntilSaturday(currentWeekStartDay);
  const prevWeekDates = calcWeekDatesUntilSaturday(prevWeekStartDay);
  const nextWeekDates = calcWeekDatesUntilSaturday(nextWeekStartDay);

  const listData: WeekData[] = [
    { startDate: prevWeekStartDay, dates: prevWeekDates },
    { startDate: currentWeekStartDay, dates: currentWeekDates },
    { startDate: nextWeekStartDay, dates: nextWeekDates }
  ];

  const handleSnap = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / containerWidth);

    if (index === 0) {
      setCurrentWeekStartDay((prev) => subWeeks(prev, 1));
    } else if (index === 2) {
      setCurrentWeekStartDay((prev) => addWeeks(prev, 1));
    }

    // 中央に戻す
    setTimeout(() => {
      listRef.current?.scrollToIndex({ index: 1, animated: false });
    }, 0);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={{ flex: 1 }} onLayout={handleLayout}>
      <FlatList<WeekData>
        ref={listRef}
        data={listData}
        keyExtractor={(item) => item.startDate.toISOString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: containerWidth,
          offset: containerWidth * index,
          index
        })}
        renderItem={({ item }) => (
          <View style={{ flex: 1, gap: 4, width: containerWidth }}>
            <ShuanHeader dates={item.dates} />
            <ShuanBody dates={item.dates} />
          </View>
        )}
        onMomentumScrollEnd={handleSnap}
      />
    </View>
  );
}

function calcStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 日曜なら月曜まで6日前、それ以外は (1 - day)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() + diff); // ← getDate() + diff にするのが正解
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

function calcWeekDatesUntilSaturday(startDate: Date): Date[] {
  const dates: Date[] = [];
  const start = new Date(startDate); // ミューテーション防止
  const dayOfWeek = start.getDay();
  const daysToSaturday = (6 - dayOfWeek + 7) % 7; // 土曜までの日数（今日が土曜なら0）

  for (let i = 0; i <= daysToSaturday; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }

  return dates;
}
