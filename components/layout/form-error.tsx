import { ErrorText } from "@/components/ui/typography";

export function FormError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <ErrorText role="alert">{error}</ErrorText>;
}
