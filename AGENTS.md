

# Database Query Rules

- **Use Drizzle Relational Query API**: Always use Drizzle's Relational Query API (`db.query.<tableName>...`) for querying data instead of raw SQL syntax or SQL-like query builders (`db.select()`, `sql` templates, etc.).

