const BASE_URL = 'https://34.124.214.214:2423';
const APP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGl_YWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo'; 

export const fetchMovies = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        // CHỈ dùng x-app-token (viết thường toàn bộ key)
        'x-app-token': APP_TOKEN, 
      },
    });

    if (response.status === 403) {
      throw new Error('Token bị Server từ chối (403 Forbidden)');
    }

    if (!response.ok) throw new Error(`Lỗi kết nối: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error("Lỗi API:", error.message);
    return null;
  }
};