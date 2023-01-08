import * as React from "react";

export interface IBrowserOnlyProps {
  children: any;
  renderAfter?: number;
}

export default function BrowserOnly({
  children,
  renderAfter,
}: IBrowserOnlyProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!mounted) {
      if (renderAfter) {
        setTimeout(() => {
          setMounted(true);
        }, renderAfter);
      } else {
        setMounted(true);
      }
    }
  }, [mounted, renderAfter]);

  if (!mounted) return null;

  return children;
}
