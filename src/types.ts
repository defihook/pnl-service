declare module 'dotenv' {
    export function config(options?: {
      path?: string;
      encoding?: string;
      debug?: boolean;
      override?: boolean;
    }): { error?: Error; parsed?: Record<string, string> };
  }
  