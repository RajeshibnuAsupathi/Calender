import { createSlice} from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';
import { getRandomHexColor } from "../common/utils";

const eventsSlice = createSlice({
    name: "events",
    initialState: [
        {
          id: '1',
          title: 'Event 1 jhdbfv kjnfkjrw kjwnk',
          description: 'Event Description',
          start: '2023-11-27T09:00:05.313Z',
          end: '2023-11-27T12:00:05.313Z',
          color: getRandomHexColor(),
        },
        {
          id: '2',
          title: 'Event 2',
          description: 'Event Description',
          start: '2023-11-28T11:00:05.313Z',
          end: '2023-11-28T14:00:05.313Z',
          color: getRandomHexColor(),
          imageUrl: 'https://picsum.photos/200/300'
        },
        {
            id: '3',
            title: 'Event 3 jhdbfv kjnfkjrw kjwnk',
            description: 'Event Description',
            start: '2023-11-27T09:00:05.313Z',
            end: '2023-11-27T11:00:05.313Z',  
            color: getRandomHexColor(),
          },
          {
            id: '4',
            title: 'Event 4 jhdbfv kjnfkjrw kjwnk',
            description: 'Event Description',
            start: '2023-11-27T09:00:05.313Z',
            end: '2023-11-27T10:00:05.313Z',
            color: getRandomHexColor()
          }
      ],
    reducers: {
        createEvent(state, action) {
           state.push({
            id: uuid.v4(),
            ...action.payload
           }) 
        },
        updateEvent(state, action) {
            let event = state.find(({ id }) => id === action.payload.id )
            event = { ...event, ...action.payload }
        },
        deleteEvent(state, action) {
            const index = state.findIndex(({ id }) => id === action.payload.id )
            state.splice(index, 1)
        }
    }
})

export const { createEvent, updateEvent, deleteEvent } = eventsSlice.actions

export default eventsSlice