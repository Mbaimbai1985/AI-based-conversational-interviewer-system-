# Environment Configuration Guide

This document provides a comprehensive guide to configuring the AI Conversational Interviewer platform through environment variables.

## Quick Start

1. Copy the template file:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required values in `.env`

3. Ensure your database is running and accessible

## Required Configuration

### Core Requirements (Must Configure)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI functionality | ✅ Yes | - |
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes | - |
| `NEXTAUTH_SECRET` | NextAuth.js secret for sessions | ✅ Yes | - |
| `JWT_SECRET` | JWT signing secret | ✅ Yes | - |
| `APP_SECRET` | Application secret key | ✅ Yes | - |

### Database Setup

1. Install PostgreSQL
2. Create database and user:
   ```sql
   CREATE DATABASE ai_interviewer;
   CREATE USER ai_interviewer_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE ai_interviewer TO ai_interviewer_user;
   ```
3. Set `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://ai_interviewer_user:secure_password@localhost:5432/ai_interviewer"
   ```

### OpenAI API Setup

1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set in environment:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

## Optional Features

### Email Notifications

Choose one email provider:

**SendGrid (Recommended)**
```env
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@your-domain.com
```

**Mailgun**
```env
MAILGUN_API_KEY=key-your-mailgun-api-key
MAILGUN_DOMAIN=your-domain.com
```

**AWS SES**
```env
AWS_SES_ACCESS_KEY_ID=your-aws-access-key
AWS_SES_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_SES_REGION=us-east-1
```

### SMS Notifications

**Twilio (Recommended)**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

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

### OAuth Authentication

**Google OAuth**
```env
GOOGLE_CLIENT_ID=your-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

**Microsoft OAuth**
```env
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-secret
```

### Cloud Storage

**AWS S3**
```env
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
```

### Caching (Redis)

```env
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password
```

## Advanced Configuration

### AI/ML Configuration

```env
# OpenAI Settings
OPENAI_MODEL_GPT4=gpt-4-turbo-preview
OPENAI_MODEL_GPT35=gpt-3.5-turbo
OPENAI_MAX_TOKENS=4000
OPENAI_TEMPERATURE=0.3

# Alternative AI Providers
AZURE_OPENAI_API_KEY=your-azure-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Multilingual Support
GOOGLE_TRANSLATE_API_KEY=your-google-translate-key
```

### Security & Compliance

```env
# Encryption
ENCRYPTION_KEY=your-32-byte-encryption-key
HASH_SALT_ROUNDS=12

# GDPR Compliance
GDPR_COMPLIANCE_MODE=true
DATA_RETENTION_DAYS=2555
ANONYMIZATION_ENABLED=true
```

### Performance Optimization

```env
# Database Connection Pool
DB_POOL_MIN=5
DB_POOL_MAX=20
DB_TIMEOUT=30000

# Caching
CACHE_TTL_SHORT=300
CACHE_TTL_MEDIUM=3600
CACHE_TTL_LONG=86400

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW=900000
```

### Feature Flags

```env
ENABLE_ML_SCORING=true
ENABLE_BIAS_DETECTION=true
ENABLE_MULTILINGUAL=true
ENABLE_ADVANCED_ANALYTICS=true
ENABLE_ATS_INTEGRATION=true
ENABLE_REAL_TIME_NOTIFICATIONS=true
```

### Monitoring & Analytics

```env
# Error Tracking
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX-X
MIXPANEL_TOKEN=your-mixpanel-token
AMPLITUDE_API_KEY=your-amplitude-key
```

## Environment-Specific Settings

### Development
```env
NODE_ENV=development
DEBUG=true
VERBOSE_LOGGING=true
ENABLE_DEV_TOOLS=true
ENABLE_CORS=true
```

### Production
```env
NODE_ENV=production
DEBUG=false
VERBOSE_LOGGING=false
ENABLE_DEV_TOOLS=false
COMPRESSION_LEVEL=6
```

### Testing
```env
NODE_ENV=test
TEST_DATABASE_URL="postgresql://test_user:test_password@localhost:5432/ai_interviewer_test"
ENABLE_TEST_MODE=true
MOCK_AI_RESPONSES=true
```

## Security Best Practices

1. **Never commit `.env` to version control**
2. **Use strong, unique secrets** for all keys
3. **Rotate secrets regularly** in production
4. **Use environment-specific configurations**
5. **Enable encryption** for sensitive data
6. **Monitor access logs** and API usage

## Validation Script

Create a script to validate your configuration:

```javascript
// scripts/validate-env.js
const requiredVars = [
  'OPENAI_API_KEY',
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'JWT_SECRET',
  'APP_SECRET'
];

const missing = requiredVars.filter(varName => !process.env[varName]);

if (missing.length > 0) {
  console.error('Missing required environment variables:', missing);
  process.exit(1);
}

console.log('✅ All required environment variables are set');
```

Run with: `node scripts/validate-env.js`

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `DATABASE_URL` format
   - Ensure PostgreSQL is running
   - Verify credentials and permissions

2. **OpenAI API Errors**
   - Verify `OPENAI_API_KEY` is correct
   - Check API quota and billing
   - Ensure model names are valid

3. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check OAuth client credentials
   - Ensure callback URLs match

4. **Email/SMS Not Sending**
   - Verify provider API keys
   - Check rate limits and quotas
   - Validate sender addresses/numbers

### Getting Help

1. Check the application logs
2. Verify environment variable format
3. Test API connections individually
4. Review provider documentation
5. Check network connectivity and firewalls

## Configuration Templates

See `.env.example` for a complete template with all available configuration options.