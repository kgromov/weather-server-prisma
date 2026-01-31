# Weather Server - Prisma & Express

A RESTful API server for tracking and analyzing daily temperature data using Express.js, Prisma ORM, and MariaDB/MySQL.

## Features

- **Daily Temperature Tracking**: Store temperature measurements for different times of day (morning, afternoon, evening, night)
- **Historical Analysis**: Query temperature data by years, seasons, and months
- **Temperature Aggregations**: Calculate min, max, and average temperatures across different time periods
- **Health Monitoring**: Built-in health check and sync status endpoints
- **Database Management**: Prisma ORM for type-safe database operations

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.x
- **ORM**: Prisma 7.x with MariaDB adapter
- **Database**: MariaDB/MySQL
- **Development**: Nodemon for hot-reloading

## Prerequisites

- Node.js 18+ (required by Prisma 7.x)
- MariaDB or MySQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-server-prisma
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_HOST=localhost
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=weather_db
DATABASE_URL=mysql://user:password@localhost:3306/weather_db
APP_NAME=WeatherServer
PORT=9000
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma Client:
```bash
npx prisma generate
```

## Running the Server

### Development Mode
```bash
npm run dev
```
The server will start on port 9000 (or your configured PORT) with hot-reloading enabled.

### Production Mode
```bash
node index.js
```

## API Endpoints

### System Endpoints

#### Health Check
```
GET /health
```
Returns server health status and application name.

**Response:**
```json
{
  "status": "OK",
  "app": "WeatherServer"
}
```

#### Check Sync Status
```
GET /api/isSynced
```
Checks if temperature data is up-to-date for today.

#### Manual Sync
```
POST /api/sync
```
Manually trigger a data synchronization.

### Weather Endpoints

#### Get Current Weather
```
GET /api/weather/current
```
Returns temperature data for today.

#### Get Weather for Specific Day
```
GET /api/weather/single/:day
```
Returns temperature data for a specific date.

**Parameters:**
- `day`: Date in ISO format (YYYY-MM-DD)

#### Get Historical Weather by Day
```
GET /api/weather/:day
```
Returns all historical temperature records for a specific day across years.

**Parameters:**
- `day`: Date in ISO format (YYYY-MM-DD)

#### Get Available Years
```
GET /api/weather/yearsToShow
```
Returns the count of distinct years with temperature data.

#### Get Temperature by Seasons
```
GET /api/weather/seasons
```
Returns aggregated temperature data grouped by season and year.

**Response Fields:**
- `yearSeason`: Season and year label
- `minTemp`: Minimum temperature
- `maxTemp`: Maximum temperature
- `avgTemp`: Average temperature

#### Get Temperature by Months
```
GET /api/weather/months
```
Returns aggregated temperature data grouped by month and year.

**Response Fields:**
- `yearMonth`: Month and year label (e.g., "January, 2024")
- `minTemp`: Minimum temperature
- `maxTemp`: Maximum temperature
- `avgTemp`: Average temperature

#### Get Temperature by Years
```
GET /api/weather/years
```
Returns aggregated temperature data grouped by year.

**Response Fields:**
- `year`: Year
- `minTemp`: Minimum temperature for the year
- `maxTemp`: Maximum temperature for the year
- `avgTemp`: Average temperature for the year

## Database Schema

### DailyTemperature Model
```prisma
model DailyTemperature {
  id                   BigInt    @id @default(autoincrement())
  afternoonTemperature Float?
  date                 DateTime? @db.Date @unique
  eveningTemperature   Float?
  morningTemperature   Float?
  nightTemperature     Float?
}
```

## Project Structure

```
weather-server-prisma/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── client.js              # Prisma client configuration
├── routes/
│   └── index.router.js        # Main router
├── system/
│   ├── system.controller.js   # System endpoints controller
│   ├── system.router.js       # System routes
│   └── system.service.js      # System business logic
├── weather/
│   ├── models/
│   │   └── weather.models.js  # Data models and DTOs
│   ├── weather.controller.js  # Weather endpoints controller
│   ├── weather.router.js      # Weather routes
│   └── weather.service.js     # Weather business logic
├── .gitignore
├── index.js                   # Application entry point
├── package.json
└── prisma.config.js          # Prisma configuration
```

## Features in Detail

### Temperature Calculation
The system divides each day into four periods:
- **Night**: 0:00 - 6:00
- **Morning**: 6:00 - 12:00
- **Afternoon**: 12:00 - 18:00
- **Evening**: 18:00 - 24:00

Each period's temperature is calculated as an average of hourly measurements within that time range.

### Query Logging
The Prisma client is configured to log all queries, including:
- Query execution
- Query parameters
- Execution duration
- Warnings and errors

## Development

### Adding New Migrations
```bash
npx prisma migrate dev --name <migration-name>
```

### Viewing Database in Prisma Studio
```bash
npx prisma studio
```

### Resetting Database
```bash
npx prisma migrate reset
```

## Error Handling

All endpoints include error handling that:
- Catches exceptions in controllers
- Logs errors to console
- Returns appropriate HTTP status codes
- Provides error messages in JSON format

## Performance Considerations

- Database connection pooling (limit: 5 connections)
- Query optimization using Prisma's raw SQL for complex aggregations
- Unique index on date field for efficient lookups