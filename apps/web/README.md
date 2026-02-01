# Nexura Web App

This is the public-facing storefront for Nexura.

## Development

This app is part of a monorepo. To start development, go to the root directory and run:

```bash
npm run dev:web
```

Or use Docker from the root:

```bash
docker-compose up
```

## Modular Dependencies

- **Database**: Uses `@nexura/database` for Supabase interaction.
- **Types**: Uses `@nexura/types` for data definitions.
