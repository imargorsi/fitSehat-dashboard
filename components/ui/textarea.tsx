import * as React from "react";

import { fieldControlClass } from "@/lib/field-control";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        fieldControlClass,
        "h-auto min-h-24 py-3 leading-6",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
