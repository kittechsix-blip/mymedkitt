/**
 * Simple logging utility
 */

type LogLevel = 'debug' | 'info' | 'success' | 'warn' | 'error';

const colors = {
  debug: '\x1b[90m',   // Gray
  info: '\x1b[36m',    // Cyan
  success: '\x1b[32m', // Green
  warn: '\x1b[33m',    // Yellow
  error: '\x1b[31m',   // Red
  reset: '\x1b[0m'
};

const icons = {
  debug: '  ',
  info: 'i ',
  success: '+ ',
  warn: '! ',
  error: 'x '
};

export function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString().slice(11, 19);
  const color = colors[level];
  const icon = icons[level];

  console.log(`${colors.debug}[${timestamp}]${colors.reset} ${color}${icon}${message}${colors.reset}`);
}

export function logSection(title: string): void {
  console.log('');
  console.log(`${colors.info}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.info}  ${title}${colors.reset}`);
  console.log(`${colors.info}${'='.repeat(60)}${colors.reset}`);
  console.log('');
}

export function logProgress(current: number, total: number, message: string): void {
  const percent = Math.round((current / total) * 100);
  const bar = '='.repeat(Math.floor(percent / 5)) + ' '.repeat(20 - Math.floor(percent / 5));
  process.stdout.write(`\r${colors.info}[${bar}] ${percent}% ${message}${colors.reset}`);
  if (current === total) console.log('');
}
