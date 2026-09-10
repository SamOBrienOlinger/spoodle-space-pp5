// Keep the established auth/brand regression suite intact, then verify the new UX.
const { spawnSync } = require('child_process');
for (const script of ['scripts/verify-auth-brand-core.cjs', 'scripts/verify-experience.cjs']) {
  const result = spawnSync(process.execPath, [script], { stdio: 'inherit', env: process.env });
  if (result.error) { console.error(result.error); process.exit(1); }
  if (result.status !== 0) process.exit(result.status || 1);
}
