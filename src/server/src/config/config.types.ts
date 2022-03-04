// config.*.json
type AppSection = {
  version: string;
  release_date: string;
  title: string;
  description: string;

  environment: string;
  port: string;

  year: number;
  copyright?: string;
};

export type SecuritySection = {
  duration_in_minutes: number;
  secret_key: string;
  passphrase: string;
};

/**
 * Model representing the <config.json> file.
 */
export type ConfigurationFile = {
  app: AppSection;
  allowed_guests: string;
  security: SecuritySection;
};
