'use client'
import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { type Auth, type User } from '@/interfaces'
import { postRequest, getRequest } from '@/services/apiRequest.service'

interface State {
  auth: Auth | any
  session: {
    current: User | any
  }
}

const initialState: State = {
  auth: {},
  session: {
    current: {}
  }
}

export const verifySession = createAsyncThunk('auth/verifySession', async (SessionID: string) => {
  try {
    const { data } = await postRequest('/auth/verify', { SessionID })
    return data
  } catch (err) {
    console.error('🚀 ~ verifySession ~ err:', err)
    throw new Error('Error al verificar la sesión')
  }
})

export const setSession = createAsyncThunk('auth/setSession', async (userId: string) => {
  try {
    const { data } = await getRequest(`/users/${userId}`)
    return data
  } catch (err) {
    console.error('🚀 ~ setSession ~ err:', err)
    throw new Error('Error al loguear el usuario')
  }
})

export const login = createAsyncThunk('auth/login', async (credentials: any, { dispatch }) => {
  try {
    credentials.username = credentials.email
    const { data } = await postRequest('/auth/login', credentials)
    await dispatch(setSession(data.User.userId))
    return data
  } catch (err) {
    console.error('🚀 ~ login ~ err:', err)
    throw new Error('Error al loguear el usuario')
  }
})

export const register = createAsyncThunk('auth/register', async (userData: any, { dispatch }) => {
  try {
    const { data } = await postRequest('/users', userData)
    return data
  } catch (err) {
    console.error('🚀 ~ register ~ err:', err)
    throw new Error('Error al crear el usuario')
  }
})

const authSessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload
    },
    logout: (state) => {
      state.session.current = {}
      state.auth = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload
    })
    builder.addCase(login.rejected, (state) => {
      console.error('login.rejected', state)
      toast.error('Error al loguear el usuario')
    })
    builder.addCase(register.fulfilled, (state, action) => {
      toast.success('Usuario creado con éxito')
    })
    builder.addCase(register.rejected, (state) => {
      toast.error('Error al crear el usuario')
    })
    builder.addCase(setSession.fulfilled, (state, action) => {
      state.session.current = action.payload
    })
    builder.addCase(setSession.rejected, (state) => {
      toast.error('Error al verificar el usuario')
      state.session = initialState.session
      state.auth = {}
      console.error('setSession.rejected', state)
    })
    builder.addCase(verifySession.rejected, (state) => {
      toast.error('Error al verificar el usuario')
      console.error('verifySession.rejected', state)
    })
  }
})

export const { logout, setAuth } = authSessionSlice.actions

export default authSessionSlice.reducer
