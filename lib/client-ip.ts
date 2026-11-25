/** IP de quem fez o pedido, como a Vercel informa nos cabeçalhos. `null` quando não vem. */
export const clientIp = (headers: Pick<Headers, "get">): string | null => {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || null;
};
