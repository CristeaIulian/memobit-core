# @memobit/core

React-free helpers shared by the Memobit apps, in the browser and in Node. React apps use it next to
[`@memobit/libs`](https://www.npmjs.com/package/@memobit/libs). Node servers use it on its own, so they don't
have to install React.

Ships ESM and CommonJS builds, so CommonJS servers can `require` it too.

## Error reporting

Errors and warnings are batched and sent to the hub's `errors/ingest` endpoint. The hub groups them, lists them
on its Errors page, and can switch reporting off globally, per app, or automatically on a spike.

```ts
// Browser app entry, before rendering
import { installErrorReporting } from '@memobit/core';

installErrorReporting({
    appId: 'garage',
    endpoint: 'https://hub.memobit.ro/api/errors/ingest',
    enabled: import.meta.env.PROD,
    environment: import.meta.env.MODE,
    release: __APP_COMMIT__,
});
```

```ts
// Node server startup
import { installNodeErrorReporting } from '@memobit/core';

installNodeErrorReporting(process, { appId: 'holdings', endpoint: 'https://hub.memobit.ro/api/errors/ingest', environment: 'local' });
```

- `reportError(error, context?)` reports an error you have handled.
- `logger` stands in for `console.*`. `warn` and `error` are reported too.
- `flushErrorReports()` sends whatever is queued right away.

The reporter keeps its state inside the module, so an app must load exactly one copy. Pin the same
`@memobit/core` version in the app as the one `@memobit/libs` expects.
