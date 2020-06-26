import React, { Component } from 'react';
import { View, ViewToken, Platform } from 'react-native';
import { Theme, Surface, Text } from '../components';
import { CalendarList } from 'react-native-calendars';
import Footer from '../navigation/BottomTabBar';
import Drawer from '../navigation/Drawer';
import dayjs from 'dayjs';
import { client } from '../clients/contentful/client';
import { FlatList } from 'react-native-gesture-handler';
import { WithStyleCreator } from 'react-context-theming/lib/native';

/**
 * TODO: try removing class component by using
 * ref to  store onViewableItemsChanged handler
 */

interface Event {
  fields: {
    title: string,
    start: string,
    end: string,
    streetAddress: string
  },
  sys: {
    id: string
  },
  isDivider: false,
  setSelectedDay: any
}

interface DividerProps {
  isDivider: true,
  date: string
}


function DayDivider({date}: DividerProps) {
  const dateString = dayjs(date).format('dddd, D/M/YY');
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <View style={styles.dayDivider}>
      <Text style={styles.dayDividerText}>{dateString}</Text>
    </View>
  );
}


function EventRow({
  item
}: {
  item: Event
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  const {fields, sys} = item;
  return (
    <View key={sys.id} style={styles.eventRow}>
      <View style={styles.eventRowDot}/>
      <View style={styles.eventRowContent}>
        <Text style={styles.eventRowMutedText}>{dayjs(fields.start).format('h:mm')} - {dayjs(fields.end).format('h:mm A')}</Text>
        <Text style={styles.eventRowTitle}>{fields.title}</Text>
        <Text style={styles.eventRowMutedText} numberOfLines={1} ellipsizeMode='tail'>{fields.streetAddress}</Text>
      </View>
    </View>
  );
}



class CalendarScreen extends Component<WithStyleCreator, any> {

  state = {
    events: [],
    stickyHeaderIndices: [],
    selectedDay: dayjs().format('YYYY-MM-DD'),
    programmatic: false,
    month: {
      dateString: dayjs().format('YYYY-MM-DD')
    }
  } as {
    events: Event[],
    stickyHeaderIndices: number[],
    selectedDay: string,
    programmatic: boolean,
    month: {
      dateString: string
    }
  }

  viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  }
  ref: any = null;
  timeout: any = null;

  constructor(props: any) {
    super(props);
    this.handleDayPress = this.handleDayPress.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this);
  }

  componentDidMount() {
    client.getEntries({
      'content_type': 'event',
      'order': 'fields.start'
    })
    .then(res => {
      const {items}: {items: Event[]} = res as any;
      const computedItems: (Event | DividerProps)[] = [];
      const dividerIndices: number[] = [];
      const prevDay = null;

      items.forEach(item => {
        if(dayjs().isAfter(item.fields.end)) return;
        const dateString = dayjs(item.fields.start).format('YYYY-MM-DD');
        if(dateString !== prevDay) {
          computedItems.push({
            isDivider: true,
            date: item.fields.start
          });
        }
        dividerIndices.push(computedItems.length - 1);
        computedItems.push({
          ...item
        });
      });

      this.setState({
        events: computedItems,
        stickyHeaderIndices: dividerIndices
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  scrollToDay(dateString: string) {
    if(this.state.events.length === 0) return;
    const {events} = this.state;
    const date = dayjs(dateString);
    let index = -1;
    for(let i = events.length-1; i >= 0; i--) {
      const event = events[i];
      if(!event.isDivider && date.isAfter(event.fields.start)) {
        index = i + 1;
        break;
      }
    }
    if(index < 0) {
      this.ref.scrollToIndex({
        index: 0,
        animated: false
      });
    } else if(index >= events.length - 1) {
      this.ref.scrollToIndex({
        index: events.length-1,
        animated: false
      });
    } else {
      this.ref.scrollToIndex({
        index,
        animated: false
      });
    }
  }

  handleDayPress({dateString}: {dateString: string}) {
    this.setState({
      selectedDay: dateString,
      programmatic: true
    }, () => {
      this.timeout = setTimeout(() => {
        this.setState({programmatic: false});
      }, 50);
    });
    this.scrollToDay(dateString);
  }

  handleMonthChange(months: any[]) {
    this.setState({
      month: months[0]
    });
  }

  handleViewableItemsChanged({viewableItems}: {viewableItems: ViewToken[]}) {
    const {programmatic} = this.state;
    const viewableItem = viewableItems[0];
    let dateString: string;
    if (!viewableItem || programmatic) {
      return;
    } else if (viewableItem.item.isDivider) {
      dateString = dayjs(viewableItem.item.date).format('YYYY-MM-DD');
    } else {
      dateString = dayjs(viewableItem.item.fields.start).format('YYYY-MM-DD');
    }
    this.setState({
      selectedDay: dateString
    });
  }

  render() {
    const {events, stickyHeaderIndices, month, selectedDay} = this.state;
    const {colors, dark} = this.props.theme;
    const {styles} = this.props;
    const contentInsets = {
      bottom: Footer.getUnsafeHeight()
    };
    const eventMarks: any = {};
    events.forEach(({ fields, isDivider }: any) => {
      if(isDivider) return;
      const date = dayjs(fields.start).format('YYYY-MM-DD');
      eventMarks[date] = {marked: true};
    });
    return (
      <View style={styles.container}>
        <Surface
          backgroundTint={colors.primary}
          innerStyle={styles.calendarContainerInner}
          tint='dark'
        >
          <View style={styles.pageHeader}>
            <View style={styles.row}>
              <Text style={styles.title}>{dayjs(month.dateString).format('MMMM YYYY')}</Text>
              <Drawer.Button/>
            </View>
            <Text style={styles.subtitle}>Events</Text>
          </View>

          {Platform.OS === 'web' ? null : (
            <CalendarList
              markedDates={{
                ...eventMarks,
                [selectedDay]: {
                  ...eventMarks[selectedDay],
                  selected: true
                }
              }}
              current={selectedDay}
              onDayPress={this.handleDayPress}
              pastScrollRange={0}
              futureScrollRange={1}
              onVisibleMonthsChange={this.handleMonthChange}
              scrollEnabled={true}
              horizontal={true}
              pagingEnabled={true}
              hideExtraDays={false}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                selectedDotColor: '#fff',
                dotColor: colors.accent,
                selectedDayTextColor: '#ffffff',
                selectedDayBackgroundColor: colors.accent,
                textMonthFontSize: 0,
                todayTextColor: colors.accent,
                dayTextColor: '#fff',
                textDisabledColor: '#444',
                "stylesheet.calendar-list.main": {
                  calendar: {
                    paddingLeft: 12,
                    paddingRight: 12
                  }
                },
                "stylesheet.calendar.header": {
                  header: {
                    height: 0,
                    display: 'none'
                  }
                },
                "stylesheet.calendar.main": {
                  week: {
                    marginTop: 7,
                    marginBottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }
                }
              }}
              showScrollIndicator={false}
              style={styles.calendarList}
            />
          )}
        </Surface>

        <FlatList
          ref={elm => this.ref = elm}
          bounces={false}
          data={events}
          contentInset={contentInsets}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior='always'
          indicatorStyle={dark ? 'white' : 'black'}
          renderItem={({item}: {item: any}) =>  (
            item.isDivider ? <DayDivider {...item}/> : <EventRow item={item}/>
          )}
          keyExtractor={(item: any) => item.isDivider ? item.date : item.sys.id}
          stickyHeaderIndices={Platform.OS !== 'android' ? stickyHeaderIndices : undefined}
          onViewableItemsChanged={this.handleViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
        />
        <Footer.ScrollSpacer/>
      </View>
    );
  }
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  calendarContainerInner: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.divider
  },
  calendarList: {
    height: 280
  },
  pageHeader: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2) + theme.statusBarHeight,
    paddingRight: 0
  },
  title: {
    fontSize: 32, 
    fontWeight: '800',
    color: '#fff'
  },
  subtitle: {
    textTransform: 'uppercase',
    color: theme.colors.accent,
    fontWeight: '500',
    fontSize: 15
  },
  // DayDivider
  dayDivider: {
    backgroundColor: theme.colors.background
  },
  dayDividerText: {
    fontWeight: '700',
    padding: 7,
    paddingLeft: 15,
    textTransform: 'uppercase'
  },
  // FlatList
  eventRow: {
    padding: 12,
    paddingLeft: 15,
    paddingTop: 4,
    paddingBottom: 9,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.divider
  },
  eventRowDot: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.accent
  },
  eventRowContent: {
    paddingLeft: 10,
    paddingRight: 10
  },
  eventRowTitle: {
    fontSize: 16,
    paddingBottom: 5
  },
  eventRowMutedText: {
    color: theme.colors.textMuted,
    paddingBottom: 3
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

export default Theme.withStyleCreator(CalendarScreen, styleCreator);