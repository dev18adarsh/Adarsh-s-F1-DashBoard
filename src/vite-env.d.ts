/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENF1_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
