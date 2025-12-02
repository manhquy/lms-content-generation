// Auth Request Types
export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Auth Response Types
export interface RegisterResponse {
  email: string;
  id: string;
  is_active: boolean;
  full_name: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

// Decoded JWT Token Type
export interface DecodedToken {
  sub: string; // email
  exp: number; // expiration timestamp
}
