export const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return await res.json();
};

export const registerUser = async (userData: { name: string, email: string, password: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await res.json();
};