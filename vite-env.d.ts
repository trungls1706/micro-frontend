interface ImportMetaEnv {
  readonly VITE_YOUR_URL: string;
  readonly VITE_REALM: string;
  readonly VITE_CLIENT_ID: string;
  readonly MODE: "development" | "production" | "test";
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly VITE_PROD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}