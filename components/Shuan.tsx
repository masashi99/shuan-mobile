import { ShuanBody } from "./ShuanBody";
import { WeeklyHeader } from "./WeeklyHeader";
import { addWeeks, subWeeks } from "date-fns";
import { useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";

export function Shuan() {
  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(calcWeekStartAndEdnDates(new Date()));
  const [containerWidth, setContainerWidth] = useState(0);
  const listRef = useRef<FlatList>(null);

  const listData = getWeekDates(currentWeekStartDay);

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
      <FlatList<Date>
        ref={listRef}
        data={listData}
        keyExtractor={(item) => item.toISOString()}
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
          <View style={{ flex: 1, gap: 8, width: containerWidth }}>
            <WeeklyHeader />
            <ShuanBody weekStartDate={item} />
          </View>
        )}
        onMomentumScrollEnd={handleSnap}
      />
    </View>
  );
}

function calcWeekStartAndEdnDates(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const currentWeekStartDay = new Date(date);
  currentWeekStartDay.setDate(diff);
  currentWeekStartDay.setHours(0, 0, 0, 0);
  return currentWeekStartDay;
}

function getWeekDates(baseDate: Date) {
  return [subWeeks(baseDate, 1), baseDate, addWeeks(baseDate, 1)];
}
