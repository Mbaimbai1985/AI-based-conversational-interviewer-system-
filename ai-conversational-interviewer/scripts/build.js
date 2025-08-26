const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🏗️  Building ACS Interviewer for production...')

try {
  // Step 1: Build Next.js application
  console.log('📦 Building Next.js application...')
  execSync('next build', { stdio: 'inherit' })

  // Step 2: Generate Prisma client
  console.log('🗄️  Generating Prisma client...')
  execSync('prisma generate', { stdio: 'inherit' })

  // Step 3: Compile TypeScript server
  console.log('⚙️  Compiling Socket.io server...')
  
  // Create dist directory if it doesn't exist
  const distDir = path.join(__dirname, '..', 'dist')
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }

  // Compile server.js to JavaScript
  execSync('tsc server.js --outDir dist --target es2017 --module commonjs --esModuleInterop --allowSyntheticDefaultImports --skipLibCheck', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })

  // Step 4: Copy package.json for production dependencies
  const packageJson = require('../package.json')
  const productionPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    scripts: {
      start: 'node server.js'
    },
    dependencies: packageJson.dependencies
  }

  fs.writeFileSync(
    path.join(distDir, 'package.json'),
    JSON.stringify(productionPackageJson, null, 2)
  )

  console.log('✅ Build completed successfully!')
  console.log('')
  console.log('📋 Production files:')
  console.log('   📁 .next/          - Next.js build output')
  console.log('   📁 dist/           - Compiled server')
  console.log('   📄 dist/server.js  - Production server')
  console.log('')
  console.log('🚀 To start production server:')
  console.log('   cd dist && npm install --production && npm start')

} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}