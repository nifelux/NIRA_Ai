export function normalizeRetrievedQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}