import 'styled-components'
import { ThemeState } from '../types'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeState {}
