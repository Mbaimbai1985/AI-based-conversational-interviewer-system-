# AI Conversational Interviewer - Configuration Guide

This document provides comprehensive guidance for configuring the AI Conversational Interviewer System across all environments.

## 📋 Table of Contents

1. [Quick Start Setup](#quick-start-setup)
2. [Environment Configuration](#environment-configuration)
3. [Required Services](#required-services)
4. [Optional Integrations](#optional-integrations)
5. [Security Configuration](#security-configuration)
6. [Performance Optimization](#performance-optimization)
7. [Deployment Configurations](#deployment-configurations)
8. [Troubleshooting](#troubleshooting)

## 🚀 Quick Start Setup

### Minimal Configuration for Development

For a basic development setup, you only need these essential configurations:

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

**Required minimum configuration:**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_interviewer"

# Redis Cache
REDIS_URL=redis://localhost:6379

# OpenAI API (Required for AI functionality)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Security Secrets (Generate strong random strings)
APP_SECRET=your-super-secret-app-key-change-this-in-production
JWT_SECRET=your-jwt-secret-key-256-bits-minimum-length-required
SESSION_SECRET=your-session-secret-key-for-express-sessions
ENCRYPTION_KEY=your-encryption-key-32-bytes-for-aes-256-encryption
```

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Database**
   ```bash
   # Create PostgreSQL database
   createdb ai_interviewer
   
   # Run migrations
   npx prisma migrate dev
   
   # Generate Prisma client
   npx prisma generate
   ```

3. **Set up Redis**
   ```bash
   # Install Redis (Ubuntu/Debian)
   sudo apt install redis-server
   
   # Start Redis
   sudo systemctl start redis
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Configuration

### Core Application Settings

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/staging/production) | Yes | development |
| `PORT` | Server port | No | 3000 |
| `APP_URL` | Application base URL | Yes | - |
| `APP_SECRET` | Application secret key | Yes | - |

### Database Configuration

**PostgreSQL (Primary Database)**
```env
DATABASE_URL="postgresql://username:password@host:port/database"
DB_POOL_MIN=5
DB_POOL_MAX=20
DB_TIMEOUT=30000
```

**Redis (Caching)**
```env
REDIS_URL=redis://host:port
REDIS_PASSWORD=your-redis-password
REDIS_DB=0
REDIS_TTL=3600
```

### AI/ML Services

**OpenAI Configuration (Required)**
```env
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_ORGANIZATION=org-your-organization-id
OPENAI_MODEL_GPT4=gpt-4-turbo-preview
OPENAI_MODEL_GPT35=gpt-3.5-turbo
OPENAI_MAX_TOKENS=4000
OPENAI_TEMPERATURE=0.3
```

**Alternative AI Providers**
```env
# Azure OpenAI
AZURE_OPENAI_API_KEY=your-azure-key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
ANTHROPIC_MODEL=claude-3-opus-20240229
```

## 🔗 Required Services

### 1. PostgreSQL Database

**Installation:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql

# Docker
docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

**Configuration:**
```sql
-- Create database and user
CREATE DATABASE ai_interviewer;
CREATE USER ai_interviewer_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE ai_interviewer TO ai_interviewer_user;
```

### 2. Redis Cache

**Installation:**
```bash
# Ubuntu/Debian
sudo apt install redis-server

# macOS
brew install redis

# Docker
docker run --name redis -p 6379:6379 -d redis:alpine
```

### 3. OpenAI API

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and organization
3. Generate API key in API Keys section
4. Add billing method for usage beyond free tier
5. Set usage limits to control costs

## 🔌 Optional Integrations

### Email Services

**SendGrid (Recommended)**
```env
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@your-domain.com
SENDGRID_FROM_NAME="AI Interviewer Platform"
```

**Setup Steps:**
1. Create SendGrid account
2. Verify sender identity
3. Generate API key with Mail Send permissions
4. Configure DNS records for domain authentication

**Alternative Email Providers:**
- **Mailgun**: Good for transactional emails
- **AWS SES**: Cost-effective for high volume
- **Postmark**: Excellent deliverability

### ATS Integrations

**Greenhouse**
```env
GREENHOUSE_API_KEY=your-greenhouse-api-key
GREENHOUSE_WEBHOOK_SECRET=your-webhook-secret
```

**Workday**
```env
WORKDAY_API_ENDPOINT=https://your-tenant.workday.com
WORKDAY_USERNAME=integration-user
WORKDAY_PASSWORD=secure-password
WORKDAY_TENANT=your-tenant-name
```

**BambooHR**
```env
BAMBOOHR_API_KEY=your-bamboohr-api-key
BAMBOOHR_SUBDOMAIN=your-company-subdomain
```

### Cloud Storage

**AWS S3**
```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

### Translation Services

**Google Translate**
```env
GOOGLE_TRANSLATE_API_KEY=your-google-translate-key
GOOGLE_TRANSLATE_PROJECT_ID=your-gcp-project
```

**Microsoft Translator**
```env
MICROSOFT_TRANSLATOR_KEY=your-translator-key
MICROSOFT_TRANSLATOR_REGION=your-region
```

## 🛡️ Security Configuration

### SSL/TLS Configuration

**For Production:**
```env
SSL_CERT_PATH=/path/to/ssl/certificate.crt
SSL_KEY_PATH=/path/to/ssl/private.key
SSL_CA_PATH=/path/to/ssl/ca-bundle.crt
FORCE_HTTPS=true
```

### Authentication & Authorization

**JWT Configuration:**
```env
JWT_SECRET=your-jwt-secret-256-bits-minimum
JWT_ALGORITHM=HS256
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
```

**OAuth Providers:**
```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://your-domain.com/auth/google/callback

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-secret
```

### Data Protection

**Encryption:**
```env
DATA_ENCRYPTION_ALGORITHM=aes-256-gcm
DATA_ENCRYPTION_KEY_ROTATION=true
DATA_ENCRYPTION_KEY_ROTATION_DAYS=90
```

**Compliance:**
```env
GDPR_ENABLED=true
CCPA_ENABLED=true
DATA_RETENTION_DAYS=2555
PII_ANONYMIZATION=true
```

### Rate Limiting

```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL=true
```

## ⚡ Performance Optimization

### Caching Configuration

```env
# Cache TTL Settings
CACHE_TTL_DEFAULT=3600        # 1 hour
CACHE_TTL_USER_SESSION=86400  # 24 hours
CACHE_TTL_INTERVIEW_DATA=7200 # 2 hours
CACHE_TTL_STATIC_CONTENT=604800 # 1 week
CACHE_MAX_SIZE=1gb
```

### Compression

```env
COMPRESSION_ENABLED=true
COMPRESSION_THRESHOLD=1024    # Compress responses > 1KB
COMPRESSION_LEVEL=6           # Good balance of speed/ratio
```

### Database Optimization

```env
DB_POOL_MIN=5                 # Minimum connections
DB_POOL_MAX=20                # Maximum connections
DB_TIMEOUT=30000              # Connection timeout (ms)
```

### API Optimization

```env
VIDEO_UPLOAD_MAX_SIZE=100mb
AUDIO_UPLOAD_MAX_SIZE=50mb
```

## 🚀 Deployment Configurations

### Development Environment

```env
NODE_ENV=development
DEBUG=true
VERBOSE_LOGGING=true
ENABLE_SWAGGER=true
API_DOCS_PATH=/api-docs
```

### Staging Environment

```env
NODE_ENV=staging
DEBUG=false
VERBOSE_LOGGING=false
ENABLE_SWAGGER=true
```

### Production Environment

```env
NODE_ENV=production
DEBUG=false
VERBOSE_LOGGING=false
ENABLE_SWAGGER=false
FORCE_HTTPS=true
```

### Docker Configuration

**Dockerfile environment:**
```env
CONTAINER_PORT=3000
HEALTH_CHECK_ENDPOINT=/health
READINESS_CHECK_ENDPOINT=/ready
```

### Kubernetes Configuration

```env
K8S_NAMESPACE=ai-interviewer
K8S_SERVICE_ACCOUNT=ai-interviewer-sa
K8S_CONFIG_MAP=ai-interviewer-config
K8S_SECRET=ai-interviewer-secrets
```

### Auto Scaling

```env
AUTO_SCALING_ENABLED=true
MIN_REPLICAS=3
MAX_REPLICAS=50
TARGET_CPU_UTILIZATION=70
TARGET_MEMORY_UTILIZATION=80
```

## 📊 Monitoring & Analytics

### Application Performance Monitoring

**New Relic:**
```env
NEW_RELIC_LICENSE_KEY=your-license-key
NEW_RELIC_APP_NAME=AI-Interviewer-Platform
```

**Sentry (Error Tracking):**
```env
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_ENVIRONMENT=production
SENTRY_RELEASE=1.0.0
```

### Logging Configuration

```env
LOG_LEVEL=info                # error, warn, info, debug, trace
LOG_FORMAT=json               # json, text, structured
LOG_FILE_PATH=/var/log/ai-interviewer/app.log
LOG_MAX_SIZE=100m
LOG_MAX_FILES=10
LOG_RETENTION_DAYS=30
```

### Business Analytics

```env
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX-X
MIXPANEL_TOKEN=your-mixpanel-token
AMPLITUDE_API_KEY=your-amplitude-key
```

## 🎯 Feature Configuration

### Feature Flags

```env
FEATURE_VIDEO_INTERVIEWS=true
FEATURE_AI_SCORING=true
FEATURE_MULTILINGUAL=true
FEATURE_REAL_TIME_ANALYTICS=true
FEATURE_ADVANCED_SECURITY=true
FEATURE_ATS_INTEGRATION=true
FEATURE_MOBILE_APP=true
```

### Business Rules

```env
# Interview Configuration
DEFAULT_INTERVIEW_DURATION=60     # minutes
MAX_INTERVIEW_DURATION=180        # minutes
MIN_INTERVIEW_DURATION=15         # minutes
INTERVIEW_BUFFER_TIME=5           # minutes
INTERVIEW_RECORDING_ENABLED=true

# Scoring Configuration
AI_SCORING_ENABLED=true
HUMAN_REVIEW_THRESHOLD=0.7        # 0.0 - 1.0
BIAS_CHECK_ENABLED=true
CULTURAL_SENSITIVITY_CHECK=true

# Business Limits
MAX_CONCURRENT_INTERVIEWS_PER_USER=3
MAX_CANDIDATES_PER_COMPANY=10000
TRIAL_PERIOD_DAYS=14
MAX_INTERVIEW_RETRIES=2
```

## 🛠️ Troubleshooting

### Common Issues

**1. Database Connection Issues**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql "postgresql://username:password@localhost:5432/ai_interviewer"

# Check logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

**2. Redis Connection Issues**
```bash
# Check if Redis is running
sudo systemctl status redis

# Test connection
redis-cli ping

# Check Redis logs
sudo tail -f /var/log/redis/redis-server.log
```

**3. OpenAI API Issues**
```bash
# Test API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Check usage
curl https://api.openai.com/v1/usage \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

**4. Environment Variable Issues**
```bash
# Check if variables are loaded
node -e "console.log(process.env.OPENAI_API_KEY)"

# Validate .env file format
cat .env | grep -E '^[A-Z_]+=.*$'
```

### Performance Issues

**Database Performance:**
```sql
-- Check slow queries
SELECT query, mean_time, rows, 100.0 * rows / total as "% of total"
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Check connection count
SELECT count(*) FROM pg_stat_activity;
```

**Redis Performance:**
```bash
# Check memory usage
redis-cli info memory

# Monitor commands
redis-cli monitor

# Check slow log
redis-cli slowlog get 10
```

### Security Checklist

- [ ] All secrets are using strong, random values
- [ ] API keys are properly secured and not exposed
- [ ] HTTPS is enforced in production
- [ ] Rate limiting is properly configured
- [ ] CORS is configured for specific domains
- [ ] Database credentials are secured
- [ ] File upload restrictions are in place
- [ ] Audit logging is enabled
- [ ] Error messages don't expose sensitive information

### Deployment Checklist

- [ ] Environment variables are properly set
- [ ] Database migrations are applied
- [ ] SSL certificates are installed and valid
- [ ] Health checks are responding
- [ ] Monitoring is configured and working
- [ ] Backups are configured and tested
- [ ] Log aggregation is working
- [ ] Performance monitoring is active
- [ ] Error tracking is configured
- [ ] Load balancing is properly configured

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🆘 Support

For additional support:

1. Check the troubleshooting section above
2. Review application logs
3. Consult the documentation for specific integrations
4. Contact your system administrator for infrastructure issues

## 🔐 Security Notice

**Important Security Reminders:**

- Never commit `.env` files to version control
- Rotate API keys and secrets regularly
- Use different credentials for each environment
- Monitor access logs for suspicious activity
- Enable 2FA on all third-party service accounts
- Keep all dependencies updated
- Regular security audits and penetration testing