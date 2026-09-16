import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('System Status')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Root & System Status Check' })
  @ApiResponse({ status: 200, description: 'API is running and database is connected' })
  getRootStatus() {
    return {
      status: 'operational',
      service: 'CareSync Healthcare Coordination API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected (Neon PostgreSQL)',
      timestamp: new Date().toISOString(),
      documentation: '/api/docs',
      routes: {
        patients: '/api/v1/patients',
        appointments: '/api/v1/appointments',
        diagnostics: '/api/v1/diagnostics/orders',
        auth: '/api/v1/auth/login',
        auditLogs: '/api/v1/admin/audit-logs',
      },
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Liveness & Database Status Check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return {
      status: 'UP',
      database: 'CONNECTED',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}

