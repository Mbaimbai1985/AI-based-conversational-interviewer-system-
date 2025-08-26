# AI-Based Conversational Interviewer (ACS)

A modern, AI-powered interviewing platform that conducts natural conversations with candidates to assess their skills, experience, and cultural fit. Built with Next.js 14, OpenAI API, and advanced natural language processing.

## 🚀 Features

### Phase 1 (MVP) - ✅ Completed
- **Modern Tech Stack**: Next.js 14+ with TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: OpenAI GPT-4 for conversational interviews
- **Real-time Chat**: Interactive chat interface for candidates
- **WebSocket Communication**: Production-grade Socket.io integration
- **Candidate Profiles**: Automatic skill extraction and profile building
- **Recruiter Dashboard**: Interview management and candidate overview
- **Responsive Design**: Mobile and desktop optimized
- **Production Ready**: Full deployment guide and scaling architecture

### Coming Soon (Phase 2-8)
- Advanced ML-based scoring algorithms
- Bias detection and mitigation
- ATS integrations (Workday, Greenhouse, BambooHR)
- Multilingual support
- Advanced analytics and reporting

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Recruiter dashboard
│   ├── interview/         # Candidate interview interface
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── chat/             # Chat interface components
│   ├── ui/               # Reusable UI components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility libraries
│   ├── ai/              # AI/OpenAI integration
│   ├── auth.ts          # Authentication config
│   ├── db.ts            # Database client
│   └── utils.ts         # Helper functions
└── types/               # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Google OAuth credentials (optional)

### 1. Clone and Install

```bash
git clone <repository-url>
cd ai-conversational-interviewer
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/acs_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key-here"

# Application Settings
NODE_ENV="development"
APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
# Start with WebSocket support (recommended)
npm run dev

# Or start standard Next.js dev server (no WebSockets)
npm run dev:next
```

The application will be available at `http://localhost:3000` with full WebSocket real-time functionality.

## 📖 Usage

### For Recruiters

1. **Sign In**: Use Google OAuth or create an account
2. **Dashboard**: View all interviews and statistics
3. **Create Interview**: Set up new interview sessions
4. **Monitor**: Track candidate progress in real-time
5. **Review**: Analyze candidate profiles and scores

### For Candidates

1. **Access Interview**: Use provided interview link
2. **Chat Interface**: Engage in natural conversation with AI
3. **Answer Questions**: Respond naturally to AI interviewer
4. **Complete**: Finish interview when prompted

## 🤖 AI Features

### Conversational Intelligence
- **Natural Dialogue**: GPT-4 powered conversations
- **Context Awareness**: Maintains conversation context
- **Adaptive Questioning**: Dynamic follow-up questions
- **Role-Specific**: Tailored questions based on job requirements

### Candidate Assessment
- **Skill Extraction**: Automatically identifies mentioned skills
- **Experience Analysis**: Builds timeline of work experience
- **Communication Scoring**: Evaluates clarity and enthusiasm
- **Profile Building**: Creates comprehensive candidate profiles

### Real-time Processing
- **Live Analysis**: Instant response quality assessment
- **Progressive Profiling**: Updates candidate data during conversation
- **Confidence Scoring**: AI confidence levels for responses

## 🔧 API Endpoints

### Interviews
- `GET /api/interviews/{id}/messages` - Get interview messages
- `POST /api/interviews/{id}/messages` - Send new message
- `GET /api/interviews/{id}` - Get interview details
- `POST /api/interviews` - Create new interview

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

## 🗄️ Database Schema

### Core Models
- **User**: Recruiters and administrators
- **Candidate**: Interview candidates
- **JobRole**: Available positions
- **Interview**: Interview sessions
- **Message**: Chat messages
- **CandidateProfile**: Extracted candidate data

### Key Relationships
- Users create and manage Interviews
- Interviews belong to JobRoles and Candidates
- Messages are linked to Interviews
- CandidateProfiles are generated from Interviews

## 🎨 UI Components

Built with Radix UI and Tailwind CSS:
- **Chat Interface**: Real-time messaging components
- **Dashboard Cards**: Statistics and overview cards
- **Forms**: Interview creation and management
- **Navigation**: Responsive navigation system

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset and reseed database
```

### Code Structure
- **TypeScript**: Full type safety throughout
- **ESLint**: Code linting and formatting
- **Prisma**: Type-safe database operations
- **Tailwind**: Utility-first CSS styling

## 🔐 Security

- **Authentication**: Secure NextAuth.js implementation
- **Database**: Parameterized queries via Prisma
- **API**: Input validation and error handling
- **Environment**: Secure environment variable management

## 📈 Roadmap

### Phase 2: Advanced NLP (Weeks 4-7)
- Enhanced conversation flow
- Better intent recognition
- Improved skill extraction

### Phase 3: Scoring System (Weeks 8-10)
- Machine learning scoring
- Behavioral analysis
- Cultural fit assessment

### Phase 4: Recruiter Tools (Weeks 11-14)
- Advanced dashboard
- Comparison tools
- Export functionality

### Phase 5: Integrations (Weeks 15-18)
- ATS connectors
- Email automation
- Workflow tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Review existing issues
3. Create a new issue with details

---

**Built with ❤️ using Next.js, OpenAI, and modern web technologies**
