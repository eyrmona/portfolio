import { useId, useState } from 'react'
import './TokenButtonDemo.css'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type Theme = 'dark' | 'light'

interface ColorToken { name: string; value: string }

interface VariantTokens {
  background: string
  backgroundHover: string
  color: string
  colorHover: string
  colorTokens: ColorToken[]
}

// Color token values from uniform-light.scss + uniform-dark.scss in IntappWork/IDS
const variantsByTheme: Record<Theme, Record<Variant, VariantTokens>> = {
  light: {
    primary: {
      background: '#082f5e', backgroundHover: '#0b4184',
      color: '#ffffff',      colorHover: '#ffffff',
      colorTokens: [
        { name: 'color-button-primary-surface-default',  value: '#082f5e' },
        { name: 'color-button-primary-surface-hover',    value: '#0b4184' },
        { name: 'color-button-primary-surface-active',   value: '#0e54a9' },
        { name: 'color-button-primary-surface-disabled', value: '#d8d8df52' },
        { name: 'color-button-primary-text-default',     value: '#ffffff' },
        { name: 'color-button-primary-text-disabled',    value: '#22212629' },
      ],
    },
    secondary: {
      background: '#c2b8af59', backgroundHover: '#f7f6f5',
      color: '#082f5e',        colorHover: '#082f5e',
      colorTokens: [
        { name: 'color-button-secondary-surface-default',  value: '#c2b8af59' },
        { name: 'color-button-secondary-surface-hover',    value: '#f7f6f5' },
        { name: 'color-button-secondary-surface-active',   value: '#0353c7' },
        { name: 'color-button-secondary-surface-disabled', value: '#d8d8df52' },
        { name: 'color-button-secondary-text-default',     value: '#082f5e' },
        { name: 'color-button-secondary-text-active',      value: '#ffffff' },
        { name: 'color-button-secondary-text-disabled',    value: '#22212629' },
      ],
    },
    tertiary: {
      background: '#ffffff00', backgroundHover: '#f7f6f5',
      color: '#0353c7',        colorHover: '#0353c7',
      colorTokens: [
        { name: 'color-button-tertiary-surface-default',  value: '#ffffff00' },
        { name: 'color-button-tertiary-surface-hover',    value: '#f7f6f5' },
        { name: 'color-button-tertiary-surface-active',   value: '#0353c7' },
        { name: 'color-button-tertiary-surface-disabled', value: '#d8d8df52' },
        { name: 'color-button-tertiary-text-default',     value: '#0353c7' },
        { name: 'color-button-tertiary-text-active',      value: '#ffffff' },
        { name: 'color-button-tertiary-text-disabled',    value: '#22212629' },
      ],
    },
    destructive: {
      background: '#bf2832', backgroundHover: '#922229',
      color: '#ffffff',      colorHover: '#ffffff',
      colorTokens: [
        { name: 'color-button-primary-destructive-surface-default',  value: '#bf2832' },
        { name: 'color-button-primary-destructive-surface-hover',    value: '#922229' },
        { name: 'color-button-primary-destructive-surface-active',   value: '#792329' },
        { name: 'color-button-primary-destructive-surface-disabled', value: '#d8d8df52' },
        { name: 'color-button-primary-destructive-text-default',     value: '#ffffff' },
        { name: 'color-button-primary-destructive-text-disabled',    value: '#22212629' },
      ],
    },
  },
  dark: {
    primary: {
      background: '#4c96f0', backgroundHover: '#7bb2f4',
      color: '#222126',      colorHover: '#222126',
      colorTokens: [
        { name: 'color-button-primary-surface-default',  value: '#4c96f0' },
        { name: 'color-button-primary-surface-hover',    value: '#7bb2f4' },
        { name: 'color-button-primary-surface-active',   value: '#a6caf7' },
        { name: 'color-button-primary-surface-disabled', value: '#3a384252' },
        { name: 'color-button-primary-text-default',     value: '#222126' },
        { name: 'color-button-primary-text-disabled',    value: '#ffffff29' },
      ],
    },
    secondary: {
      background: '#41404c52', backgroundHover: '#3a3842',
      color: '#7bb2f4',        colorHover: '#7bb2f4',
      colorTokens: [
        { name: 'color-button-secondary-surface-default',  value: '#41404c52' },
        { name: 'color-button-secondary-surface-hover',    value: '#3a3842' },
        { name: 'color-button-secondary-surface-active',   value: '#a6caf7' },
        { name: 'color-button-secondary-surface-disabled', value: '#3a384252' },
        { name: 'color-button-secondary-text-default',     value: '#7bb2f4' },
        { name: 'color-button-secondary-text-active',      value: '#222126' },
        { name: 'color-button-secondary-text-disabled',    value: '#ffffff29' },
      ],
    },
    tertiary: {
      background: '#ffffff00', backgroundHover: '#3a3842',
      color: '#7bb2f4',        colorHover: '#7bb2f4',
      colorTokens: [
        { name: 'color-button-tertiary-surface-default',  value: '#ffffff00' },
        { name: 'color-button-tertiary-surface-hover',    value: '#3a3842' },
        { name: 'color-button-tertiary-surface-active',   value: '#0353c7' },
        { name: 'color-button-tertiary-surface-disabled', value: '#3a384252' },
        { name: 'color-button-tertiary-text-default',     value: '#7bb2f4' },
        { name: 'color-button-tertiary-text-active',      value: '#ffffff' },
        { name: 'color-button-tertiary-text-disabled',    value: '#ffffff29' },
      ],
    },
    destructive: {
      background: '#bf2832', backgroundHover: '#922229',
      color: '#ffffff',      colorHover: '#ffffff',
      colorTokens: [
        { name: 'color-button-primary-destructive-surface-default',  value: '#bf2832' },
        { name: 'color-button-primary-destructive-surface-hover',    value: '#922229' },
        { name: 'color-button-primary-destructive-surface-active',   value: '#792329' },
        { name: 'color-button-primary-destructive-surface-disabled', value: '#3a384252' },
        { name: 'color-button-primary-destructive-text-default',     value: '#ffffff' },
        { name: 'color-button-primary-destructive-text-disabled',    value: '#ffffff29' },
      ],
    },
  },
}

export default function TokenButtonDemo({ theme = 'dark' }: { theme?: Theme }) {
  const [variant, setVariant] = useState<Variant>('primary')
  const selectId = useId()
  const current = variantsByTheme[theme][variant]

  return (
    <div className="token-demo-card">
      <div className="token-demo">

        <p className="token-demo-group-label">Color tokens</p>
        <div className="token-demo-cards" key={`${theme}-${variant}`}>
          {current.colorTokens.map((t, i) => (
            <div key={t.name} className="token-card" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="token-swatch">
                <div className="token-swatch-fill" style={{ background: t.value }} />
              </div>
              <div className="token-name">{t.name}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="uds-demo-button"
          style={{
            '--btn-bg':       current.background,
            '--btn-bg-hover': current.backgroundHover,
            '--btn-color':    current.color,
            '--btn-color-hover': current.colorHover,
          } as React.CSSProperties}
        >
          {variant === 'destructive' ? 'Remove' : 'Continue'}
          {variant === 'destructive' ? (
            <svg className="uds-demo-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9.75 18C9.336 18 9 17.664 9 17.25V9.75C9 9.336 9.336 9 9.75 9C10.164 9 10.5 9.336 10.5 9.75V17.25C10.5 17.664 10.164 18 9.75 18Z" fill="currentColor"/>
              <path d="M13.5 17.25C13.5 17.664 13.836 18 14.25 18C14.664 18 15 17.664 15 17.25V9.75C15 9.336 14.664 9 14.25 9C13.836 9 13.5 9.336 13.5 9.75V17.25Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M6.631 23.25C5.47 23.25 4.485 22.344 4.389 21.186L3.06 5.25H1.5C1.086 5.25 0.75 4.914 0.75 4.5C0.75 4.086 1.086 3.75 1.5 3.75H7.5V3C7.5 1.759 8.509 0.75 9.75 0.75H14.25C15.491 0.75 16.5 1.759 16.5 3V3.75H22.5C22.914 3.75 23.25 4.086 23.25 4.5C23.25 4.914 22.914 5.25 22.5 5.25H20.94L19.612 21.187C19.516 22.344 18.531 23.25 17.37 23.25H6.631ZM5.883 21.062C5.915 21.448 6.243 21.75 6.631 21.75H17.37C17.757 21.75 18.086 21.448 18.117 21.062L19.435 5.25H4.565L5.883 21.062ZM15 3V3.75H9V3C9 2.586 9.336 2.25 9.75 2.25H14.25C14.664 2.25 15 2.586 15 3Z" fill="currentColor"/>
            </svg>
          ) : (
            <svg className="uds-demo-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.75 23.25C12.55 23.25 12.361 23.172 12.22 23.03C11.928 22.738 11.928 22.262 12.22 21.969L21.44 12.749H0.75C0.336 12.75 0 12.414 0 12C0 11.586 0.336 11.25 0.75 11.25H21.439L12.219 2.03C12.078 1.889 12 1.7 12 1.5C12 1.3 12.078 1.111 12.22 0.97C12.361 0.828 12.55 0.75 12.75 0.75C12.95 0.75 13.139 0.828 13.28 0.97L23.78 11.47C23.85 11.54 23.905 11.622 23.943 11.715C23.946 11.723 23.95 11.732 23.953 11.741C23.984 11.822 24 11.911 24 12C24 12.087 23.984 12.174 23.953 12.258C23.951 12.264 23.949 12.269 23.947 12.274C23.905 12.378 23.849 12.461 23.779 12.531L13.28 23.03C13.139 23.172 12.95 23.25 12.75 23.25Z" fill="currentColor"/>
            </svg>
          )}
        </button>

        <div className="token-demo-select-wrap">
          <label htmlFor={selectId} className="token-demo-select-label">Button variant</label>
          <select
            id={selectId}
            className="token-demo-select"
            value={variant}
            onChange={e => setVariant(e.target.value as Variant)}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="destructive">Destructive</option>
          </select>
        </div>

      </div>
    </div>
  )
}
