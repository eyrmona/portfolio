// Usage: node scripts/gen-hash.mjs yourpassword
import { createHash } from 'crypto'

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/gen-hash.mjs <password>')
  process.exit(1)
}

const hash = createHash('sha256').update(password).digest('hex')
console.log('\nAdd this to your .env file:\n')
console.log(`VITE_DEEP_DIVE_HASH=${hash}`)
