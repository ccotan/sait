import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-3 text-[40px] sm:text-[52px]">Здесь только туман</h1>
      <p className="mt-4 max-w-[520px] text-lg text-ink-2">Такой страницы нет — возможно, её снесло крипером. Вернитесь на тропу.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">На главную</Link>
        <Link href="/faq" className="btn btn-secondary">Вопросы и ответы</Link>
      </div>
    </div>
  );
}
