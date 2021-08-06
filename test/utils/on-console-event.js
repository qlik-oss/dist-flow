const logLevels = [
  // 'info',
  // 'log',
  'warn',
  'error',
];

export default async (msg) => {
  if (logLevels.indexOf(msg.type()) >= 0) {
    const resolvedArgs = await Promise.all(msg.args().map((arg) => arg.jsonValue()));
    // eslint-disable-next-line no-console
    console[msg.type()](...resolvedArgs);
  }
};
