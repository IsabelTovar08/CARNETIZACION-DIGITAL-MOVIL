// Conéctalo a tu API real cuando la tengas.
export async function requestPasswordReset(email: string): Promise<void> {
  // Ejemplo real:
  // const res = await fetch(`${API_URL}/auth/forgot-password`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email }),
  // });
  // if (!res.ok) throw new Error('Fallo enviando el correo de recuperación');

  // Simulación:
  await new Promise((r) => setTimeout(r, 800));
}
