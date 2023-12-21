import 'colors';

type Labels =
  | 'error'
  | 'success'
  | 'debug'
  | 'express'
  | 'info'
  | 'routes'
  | 'websocket'
  | 'paypal'
  | 'discord'
  | 'addons'
  | 'update'
  | 'mongoose'
  | 'manager'
  | 'pterodactyl'
  | 'licence';

const labels: Record<Labels, string> = {
  error: '[ERROR]'.red,
  success: '[SUCCESS]'.green,
  debug: '[DEBUG]'.blue,
  express: '[EXPRESS]'.magenta,
  info: '[INFO]'.green,
  discord: '[DISCORD]'.black,
  paypal: '[PAYPAL]'.grey,
  routes: '[ROUTES]'.white,
  websocket: '[WEBSOCKET]'.gray,
  addons: '[ADDONS]'.blue,
  manager: '[MANAGER]'.yellow,
  update: '[UPDATE]'.cyan,
  mongoose: '[MONGOOSE]'.white,
  licence: '[LICENCE]'.red,
  pterodactyl: '[PTERODACTYL]'.yellow,
};

export function logWithLabel(label: Labels, message: string) {
  const formattedLabel = labels[label] || label || '';
  console.log(`${formattedLabel} ${message}`);
}
