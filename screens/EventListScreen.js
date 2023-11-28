import { CodeConstants } from '../constants';
import { useRef, useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, View} from 'react-native';
import { TimelineCalendar } from '@howljs/calendar-kit';
import { useNavigation } from '@react-navigation/native';
import TitleIconButton from '../components/TitleIconButton';
import DateTimePicker from '@react-native-community/datetimepicker'
import { toAppSpecificDateString } from '../common/utils';
import IconButton from '../components/IconButton';
import { useSelector } from 'react-redux';


function EventListScreen() {
    const calendarRef = useRef(null)
    const navigation = useNavigation()
    const events = useSelector(state => state.events)
    const [togglePicker, setTogglePicker] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [viewMode, setViewMode] = useState('week')
    const minDate = useRef((() => {
        const minDate = new Date()
        minDate.setFullYear(minDate.getFullYear() - 3)
        return minDate
    })())
    const maxDate = useRef((() => { 
        const maxDate = new Date()
        maxDate.setFullYear(maxDate.getFullYear() + 3)
        return maxDate
    })())
    const onNavPress = useCallback(() => { 
        setTogglePicker((prev) => !prev)
    }, [])
    useEffect(()=>{
        navigation.setOptions({
            headerTitle: (props) => (<TitleIconButton {...props} onPress={onNavPress}/>),
            headerRight: ({ tintColor }) => (
                <View style={styles.rightHeaders}>
                  <IconButton
                    icon="today-outline"
                    size={30}
                    color={tintColor}
                    onPress={() => {
                      let date = new Date(Date.now())
                      setViewMode((prev) => prev === 'week' ? 'day' : 'week')
                      setCurrentDate(date)
                      calendarRef.current?.goToDate({ date: toAppSpecificDateString(date)})
                    }}
                  />
                    <IconButton
                      icon="add"
                      size={30}
                      color={tintColor}
                      onPress={() => {
                        navigation.navigate('EventDetailScreen')
                      }}
                  />
                </View>
              )
        })
    }, [])
    useEffect(() => {
        const title = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        navigation.setOptions({
            title
        })
    }, [navigation, currentDate])
    useEffect(() => {
      const timeout = setTimeout(() => {
        calendarRef.current?.goToDate({ 
          date: toAppSpecificDateString(currentDate),
          animatedDate: true
         })
      }, 500)
      return () => {
        clearTimeout(timeout)
      }
    }, [viewMode])
    const onDateChanged = useCallback((date) => { 
         setCurrentDate(new Date(date))
     }, [])
     const onEventPressed = useCallback((date) => {

     }, [])
     const onPressDayNum = useCallback((dateString) => {
        if(viewMode === 'week') {
            const date = new Date(dateString)
            setCurrentDate(date)
            setViewMode('day')
        }
     }, [])
     const onChange = ({ type }, selectedDate) => {
        if(type === 'set') {
          setCurrentDate(selectedDate)
          if(Platform.OS === 'android') {
            setTogglePicker((prev) => !prev)
          }
          calendarRef.current?.goToDate({ date: toAppSpecificDateString(selectedDate) })
        } else  {
          setTogglePicker((prev) => !prev)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
        { togglePicker && 
          <DateTimePicker 
            value={currentDate} 
            mode='date' 
            format={"YYYY-MM-DD"} 
            display={'spinner'}
            onChange={onChange}
            minimumDate={minDate.current}
            maximumDate={maxDate.current}
         /> }
         <TimelineCalendar 
            viewMode={viewMode} 
            events={events}
            ref={calendarRef}
            onDateChanged={onDateChanged}
            onPressEvent={onEventPressed}
            minDate={toAppSpecificDateString(minDate.current)}
            maxDate={toAppSpecificDateString(maxDate.current)}
            onPressDayNum={onPressDayNum}
            theme={styles.calenderTheme}
        />
        </SafeAreaView>
    )
}

EventListScreen.propTypes = {
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    rightHeaders:{
        flexDirection: 'row'
    },
    calenderTheme:{
      eventTitle: {
        fontSize: 20
      }
    }
  });

export default EventListScreen