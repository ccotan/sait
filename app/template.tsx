/** template.tsx пересоздаётся при каждой навигации — даёт мягкий переход между страницами. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
