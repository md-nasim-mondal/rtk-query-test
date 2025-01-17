import { configureStore } from '@reduxjs/toolkit'
import baseApi from './features/api/baseApi';

const store = configureStore({
    reducer: {
        // API related with RTK Query
        [baseApi.reducerPath]: baseApi.reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(baseApi.middleware),
        
    }
})

export default store;