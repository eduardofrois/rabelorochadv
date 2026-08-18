# Security Checklist

- `SESSION_SECRET` has at least 32 random characters.
- Cookies are HttpOnly, Secure and SameSite in production.
- `/admin` redirects anonymous users to `/admin/login`.
- Login and contact endpoints have rate limiting before production launch; contact is implemented in Task 8 and login must use `loginRateLimiter` when login submission is wired.
- Uploads validate MIME type, size and storage path.
- `.env` files are not committed.
- Database user has least required privilege.
- Backups cover PostgreSQL and uploaded media.
- Error logs do not expose passwords, session tokens or private lead messages.
