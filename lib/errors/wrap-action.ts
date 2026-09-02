import { captureError } from "@/lib/errors/capture-error";
import { isNextNavigationError } from "@/lib/errors/next.utils";
import { FALLBACK_FORM_ERROR, userFacingMessage } from "@/lib/errors/normalize-error";

type TFormResult = { error: string } | { ok: true } | null;

/** Wrap server actions that return form state — catches unexpected throws. */
export function wrapFormAction<TArgs extends unknown[], TState extends TFormResult>(
  name: string,
  fn: (...args: TArgs) => Promise<TState>
) {
  const wrapped = async (...args: TArgs): Promise<TState> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (isNextNavigationError(error)) {
        throw error;
      }
      captureError(error, { source: "action", name });
      return { error: userFacingMessage(error) ?? FALLBACK_FORM_ERROR } as TState;
    }
  };

  Object.defineProperty(wrapped, "name", { value: name });
  return wrapped;
}

/** Wrap void server actions (deletes, sign-out) — logs failures centrally. */
export function wrapVoidAction<TArgs extends unknown[]>(
  name: string,
  fn: (...args: TArgs) => Promise<void>
) {
  const wrapped = async (...args: TArgs): Promise<void> => {
    try {
      await fn(...args);
    } catch (error) {
      if (isNextNavigationError(error)) {
        throw error;
      }
      captureError(error, { source: "action", name });
    }
  };

  Object.defineProperty(wrapped, "name", { value: name });
  return wrapped;
}

/** Wrap auth actions that return `{ error } | null` and may redirect. */
export function wrapAuthAction<TArgs extends unknown[], TState extends { error: string } | null>(
  name: string,
  fn: (...args: TArgs) => Promise<TState>
) {
  return wrapFormAction(name, fn);
}
