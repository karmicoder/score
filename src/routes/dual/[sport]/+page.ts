export async function load({ params }: { params: { sport: string } }) {
  return { sport: params.sport };
}
