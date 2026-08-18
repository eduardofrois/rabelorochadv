# GitNexus Workflow

Run after scaffold and meaningful source structure exist:

```bash
npx gitnexus analyze
```

If `.gitnexus/run.cjs` exists later, prefer:

```bash
node .gitnexus/run.cjs analyze
node .gitnexus/run.cjs status
```

Use GitNexus before refactors to inspect impact and after larger changes to refresh context.
