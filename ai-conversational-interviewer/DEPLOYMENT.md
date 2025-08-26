# 🚀 Production Deployment Guide

This guide covers deploying the AI-Based Conversational Interviewer (ACS) system to production with real-time WebSocket capabilities.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Custom Server │    │   PostgreSQL    │
│   (Nginx/ALB)   │────│   (Next.js +    │────│   Database      │
│                 │    │   Socket.io)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐             │
         │              │   Redis Cache   │             │
         └──────────────│   (Optional)    │─────────────┘
                        └─────────────────┘
```

## 🛠️ Prerequisites

### System Requirements
- **Node.js**: 18+ (LTS recommended)
- **PostgreSQL**: 13+ 
- **Redis**: 6+ (optional, for scaling)
- **Memory**: 2GB+ RAM
- **Storage**: 10GB+ available space
- **Network**: Stable internet connection

### Environment Setup
- Production server (VPS, EC2, etc.)
- Domain name with SSL certificate
- Database hosting (managed PostgreSQL recommended)
- OpenAI API key
- Google OAuth credentials (if using)

## 📦 Deployment Options

### Option 1: Traditional VPS/EC2 Deployment

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL (if not using managed service)
sudo apt install postgresql postgresql-contrib

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx (reverse proxy)
sudo apt install nginx

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx
```

#### 2. Application Deployment
```bash
# Clone repository
git clone <your-repo-url>
cd ai-conversational-interviewer

# Install dependencies
npm ci --production=false

# Set up environment variables
cp .env.example .env.production
nano .env.production
```

#### 3. Environment Configuration
```env
# .env.production
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Database
DATABASE_URL="postgresql://user:password@host:5432/acs_production"

# NextAuth.js
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-super-secure-secret-key"

# OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Socket.io
NEXT_PUBLIC_SOCKET_URL="https://yourdomain.com"

# App
APP_URL="https://yourdomain.com"
```

#### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed initial data (optional)
npm run db:seed
```

#### 5. Build and Start
```bash
# Build for production
npm run build

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup
```

#### 6. Nginx Configuration
```nginx
# /etc/nginx/sites-available/acs-interviewer
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # WebSocket support
        proxy_set_header Sec-WebSocket-Extensions $http_sec_websocket_extensions;
        proxy_set_header Sec-WebSocket-Key $http_sec_websocket_key;
        proxy_set_header Sec-WebSocket-Version $http_sec_websocket_version;
    }

    # Socket.io specific
    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 7. SSL Certificate Setup
```bash
# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Enable Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Option 2: Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/dist ./dist

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "dist/server.js"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=acs_db
      - POSTGRES_USER=acs_user
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

### Option 3: Vercel Deployment (Limited WebSocket Support)

**Note**: Vercel has limitations with WebSocket connections. Consider using Vercel for the frontend with a separate server for WebSocket functionality.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel dashboard
```

## 🔧 PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'acs-interviewer',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Error handling
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G',
    
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true,
    
    // Monitoring
    monitoring: false
  }]
}
```

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs acs-interviewer

# Application status
pm2 status
```

### Database Monitoring
```sql
-- Monitor active connections
SELECT COUNT(*) FROM pg_stat_activity;

-- Monitor long-running queries
SELECT query, query_start, state 
FROM pg_stat_activity 
WHERE state != 'idle' 
AND query_start < NOW() - INTERVAL '1 minute';
```

### System Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop

# Monitor system resources
htop

# Monitor disk I/O
iotop

# Monitor network connections
netstat -tulpn | grep :3000
```

## 🚨 Security Checklist

### Application Security
- [ ] Strong `NEXTAUTH_SECRET` (32+ random characters)
- [ ] Secure database credentials
- [ ] API keys stored in environment variables
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles this)

### Server Security
- [ ] Firewall configured (allow only 22, 80, 443)
- [ ] SSH key-based authentication
- [ ] Regular security updates
- [ ] Non-root user for application
- [ ] SSL/TLS certificates properly configured
- [ ] Security headers implemented

### Database Security
- [ ] Database user with minimal privileges
- [ ] Connection encryption enabled
- [ ] Regular backups configured
- [ ] Access restricted to application server

## 📈 Performance Optimization

### Application Level
```javascript
// next.config.js optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
}

module.exports = nextConfig
```

### Database Optimization
```sql
-- Add indexes for frequent queries
CREATE INDEX idx_interview_status ON interviews(status);
CREATE INDEX idx_messages_interview_timestamp ON messages(interview_id, timestamp);
CREATE INDEX idx_candidate_email ON candidates(email);
```

### Nginx Optimization
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# Enable caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔄 Scaling Considerations

### Horizontal Scaling
- Load balancer (Nginx, HAProxy, or cloud ALB)
- Multiple application instances
- Redis for session sharing
- Database read replicas

### WebSocket Scaling
```javascript
// Redis adapter for Socket.io clustering
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

## 🔙 Backup Strategy

### Database Backups
```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
FILENAME="acs_backup_$DATE.sql"

pg_dump $DATABASE_URL > "$BACKUP_DIR/$FILENAME"
gzip "$BACKUP_DIR/$FILENAME"

# Keep only last 7 days
find $BACKUP_DIR -name "acs_backup_*.sql.gz" -mtime +7 -delete
```

### Application Backups
```bash
# Create backup of application files
tar -czf app_backup_$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=dist \
  /path/to/acs-interviewer
```

## 🚨 Disaster Recovery

### Automated Health Checks
```bash
#!/bin/bash
# health-check.sh
HEALTH_URL="https://yourdomain.com/api/health"

if ! curl -f $HEALTH_URL > /dev/null 2>&1; then
    echo "Health check failed, restarting application"
    pm2 restart acs-interviewer
fi
```

### Monitoring Alerts
- Set up monitoring with tools like DataDog, New Relic, or Prometheus
- Configure alerts for high CPU, memory usage, or error rates
- Monitor database performance and connection counts

## 📞 Troubleshooting

### Common Issues

1. **WebSocket Connection Failures**
   ```bash
   # Check if port is accessible
   telnet yourdomain.com 3000
   
   # Verify Nginx WebSocket configuration
   sudo nginx -t
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   npx prisma studio
   
   # Check connection string
   echo $DATABASE_URL
   ```

3. **High Memory Usage**
   ```bash
   # Monitor Node.js memory
   pm2 monit
   
   # Enable heap dumps for analysis
   pm2 start app.js --node-args="--max-old-space-size=4096"
   ```

### Log Analysis
```bash
# Application logs
tail -f logs/combined.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
journalctl -u nginx -f
```

---

**🎉 Congratulations!** Your ACS system is now production-ready with enterprise-grade WebSocket functionality, real-time communication, and scalable architecture.