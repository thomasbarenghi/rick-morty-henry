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
    console.log('verifySession SessionID', SessionID)
    const { data } = await postRequest('/auth/verify', { SessionID })
    console.log('res verifySession', data)
    return data
  } catch (err: any) {
    throw new Error('Error al verificar la sesión', err)
  }
})

export const setSession = createAsyncThunk('auth/setSession', async (userId: string) => {
  try {
    console.log('setSession userId', userId)
    const res = await getRequest(`/users/${userId}`)
    console.log('res setSession', res)
    return res
  } catch (err: any) {
    throw new Error('Error al loguear el usuario', err)
  }
})

export const login = createAsyncThunk('auth/login', async (credentials: any, { dispatch }) => {
  credentials.username = credentials.email
  console.log('credentials', credentials)
  try {
    const { data } = await postRequest('/auth/login', credentials)
    console.log('res login', data)
    await dispatch(setSession(data.User.userId))
    // Router.push(`/?id=${res.User.userId}&status=ok&session=${res.SessionID}&loginMethod=local`);
    return data
  } catch (err: any) {
    throw new Error('Error al loguear el usuario', err)
  }
})

export const register = createAsyncThunk('auth/register', async (userData: any, { dispatch }) => {
  try {
    const res = await postRequest('/users', userData)
    return res
  } catch (err: any) {
    console.error('Error al crear el usuario', err)
    throw new Error('Error al crear el usuario', err)
  }
})

const authSessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
      console.log('setAuth', action.payload)
      state.auth = action.payload
    },
    logout: (state) => {
      state.session = initialState.session
      state.auth = initialState.auth
    },
    setSessionRed: (state, action: PayloadAction<any>) => {
      state.session.current = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {})
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload
    })
    builder.addCase(login.rejected, (state) => {
      console.log('login.rejected', state)
      toast.error('Error al loguear el usuario')
    })
    builder.addCase(register.pending, (state) => {})
    builder.addCase(register.fulfilled, (state, action) => {
      toast.success('Usuario creado con éxito')
    })
    builder.addCase(register.rejected, (state) => {
      toast.error('Error al crear el usuario')
    })
    builder.addCase(setSession.pending, (state) => {})
    builder.addCase(setSession.fulfilled, (state, action) => {
      state.session.current = action.payload
    })
    builder.addCase(setSession.rejected, (state) => {
      toast.error('Error al verificar el usuario')
      state.session = initialState.session
      state.auth = {}
      console.log('setSession.rejected', state)
    })
    builder.addCase(verifySession.pending, (state) => {})
    builder.addCase(verifySession.fulfilled, (state, action) => {})
    builder.addCase(verifySession.rejected, (state) => {
      toast.error('Error al verificar el usuario')
      console.log('verifySession.rejected', state)
    })
  }
})

export const { logout, setAuth, setSessionRed } = authSessionSlice.actions

export default authSessionSlice.reducer
