import { configureStore} from "@reduxjs/toolkit";
import events from './eventSlice'

export const store = configureStore({
    reducer: {
        events: events.reducer
    }
})