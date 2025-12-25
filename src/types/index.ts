export type Language = "en" | "zh" | "ar" | "es" | "fr" | "ja" | "rus";

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
}

export type View =
    | "dashboard"
    | "chat"
    | "contracts"
    | "profile"
    | "blog-admin";
