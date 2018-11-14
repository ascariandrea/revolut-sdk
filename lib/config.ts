export interface RequiredConfig {
  apiKey: string
}

export interface OptionalConfig {
  sandbox: boolean
  apiVersion: '1.0'
}

export interface Config extends RequiredConfig, OptionalConfig {}

export interface RevolutClientConfig
  extends RequiredConfig,
    Partial<OptionalConfig> {}
