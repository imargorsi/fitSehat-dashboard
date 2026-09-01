import { Button } from "@/components/ui/button";

export function DeleteRowButton({
  action,
  id,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground hover:text-rose">
        Remove
      </Button>
    </form>
  );
}
