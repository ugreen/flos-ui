import { useRef } from "react";

/**
 * A hook to returns an id if your component need it but you doesn't want to make it as mandatory props
 *
 * This hook is preferred than using `getId` in your React component as it will lazily get the default id only when it is needed.
 * @param providedId id provided to your component
 * @param idPrefix prefix of the id, default to `"migration-flos-react-"`
 */
let id = new Date().getMilliseconds();

/**
 * generate an unique id for the Javascript session, this is useful when you need an temporary id that will not be persisted
 * @param prefix prefix to be prepended to the id, default to `flos-ui-`
 */
const getId = (prefix: string = "flos-ui-") => `${prefix}${id++}`;

export function useId(
  providedId: string | undefined,
  idPrefix?: string
): string {
  const generatedIdRef = useRef<string | null>(null);
  if (providedId) {
    return providedId;
  }

  if (!generatedIdRef.current) {
    generatedIdRef.current = getId(idPrefix);
  }

  return generatedIdRef.current;
}
