import { useState, FormEvent, useRef, useEffect } from 'react'
import './DeepDiveGate.css'

const HASH = import.meta.env.VITE_DEEP_DIVE_HASH as string | undefined

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

interface Props {
  onUnlock: () => void
}

export default function DeepDiveGate({ onUnlock }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim() || checking || !HASH) return
    setChecking(true)
    setError(false)
    const hash = await sha256Hex(value.trim())
    if (hash === HASH) {
      sessionStorage.setItem('ddAuth', '1')
      onUnlock()
    } else {
      setError(true)
      setChecking(false)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="dd-gate">
      <div className="dd-gate-inner">
        <p className="dd-gate-eyebrow">Uniform — Intapp Design System</p>
        <h1 className="dd-gate-title">Deeper Dive</h1>
        <p className="dd-gate-sub">
          This section is shared selectively. Enter the password to explore the discovery, design explorations, and component build in detail.
        </p>
        <form className="dd-gate-form" onSubmit={handleSubmit} noValidate>
          <div className="dd-gate-field">
            <input
              ref={inputRef}
              type="password"
              className={`dd-gate-input${error ? ' dd-gate-input--error' : ''}`}
              placeholder="Password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false) }}
              autoComplete="current-password"
              aria-label="Password"
              aria-invalid={error}
              aria-describedby={error ? 'dd-gate-error-msg' : undefined}
            />
            <button
              type="submit"
              className="dd-gate-btn"
              disabled={!value.trim() || checking}
            >
              {checking ? 'Checking…' : 'Unlock →'}
            </button>
          </div>
          {error && (
            <p id="dd-gate-error-msg" className="dd-gate-error" role="alert">
              Incorrect password — try again.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
