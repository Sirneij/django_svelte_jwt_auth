interface ImportMetaEnv {
    readonly VITE_BASE_API_URI_PROD: string,
    readonly VITE_BASE_API_URI_DEV: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}