export type EmailState = {
  success: boolean;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};
