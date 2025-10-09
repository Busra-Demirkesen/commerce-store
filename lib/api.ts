export const apiBase = () => (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export type FetchOpts = RequestInit & { json?: any };

export async function authFetch(path: string, opts: FetchOpts = {}, getToken?: () => Promise<string | null>) {
  const base = apiBase();
  if (!base) throw new Error("API base URL is not configured");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string> | undefined),
  };

  if (getToken) {
    const token = await getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${base}${path}`, {
    ...opts,
    headers,
    body: opts.json !== undefined ? JSON.stringify(opts.json) : opts.body,
  });

  return res;
}

