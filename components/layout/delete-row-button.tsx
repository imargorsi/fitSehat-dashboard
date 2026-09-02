import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import { HiddenInput } from "@/components/ui/form-controls";

export function DeleteRowButton({
  action,
  id,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
}) {
  return (
    <form action={action}>
      <HiddenInput name="id" value={id} />
      <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground hover:text-rose">
        <UiIcon name="close" size={14} className="text-current" />
        Let go
      </Button>
    </form>
  );
}
