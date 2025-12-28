export type AuthPayload = {
    id?: string;
    email?: string;
    password?: string | null | undefined;
    confirmPassword?: string;
    token?: string;
    refreshToken?: string;
}