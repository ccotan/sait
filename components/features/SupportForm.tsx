"use client";

import { useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import { site } from "@/lib/site";

type Errors = Partial<Record<"nick" | "contact" | "message", string>>;

/**
 * Форма обращения. Отправка пока не подключена к бэкенду: подключите её к
 * Route Handler (например, app/api/support/route.ts → Discord webhook) в функции submit.
 */
export function SupportForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nick = String(data.get("nick") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};
    if (!/^[A-Za-z0-9_]{3,16}$/.test(nick)) next.nick = "Ник Minecraft: 3–16 символов, латиница, цифры и _";
    if (contact.length < 3) next.contact = "Укажите Discord или email, чтобы мы могли ответить";
    if (message.length < 10) next.message = "Опишите вопрос чуть подробнее — хотя бы пару предложений";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      e.currentTarget.reset();
    } else {
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
  }

  return (
    <>
      <form onSubmit={submit} noValidate className="card space-y-5 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="nick" label="Ник в игре" error={errors.nick}>
            <input id="nick" name="nick" autoComplete="username" className="field" aria-invalid={!!errors.nick} aria-describedby={errors.nick ? "nick-error" : undefined} placeholder="Steve_42" />
          </Field>
          <Field id="contact" label="Discord или email" error={errors.contact}>
            <input id="contact" name="contact" className="field" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-error" : undefined} placeholder="steve#0000 или почта" />
          </Field>
        </div>
        <Field id="topic" label="Тема">
          <select id="topic" name="topic" className="field">
            <option>Вопрос по доступу / whitelist</option>
            <option>Жалоба на игрока</option>
            <option>Гриф или пропажа вещей</option>
            <option>Технические проблемы</option>
            <option>Предложение</option>
          </select>
        </Field>
        <Field id="message" label="Сообщение" error={errors.message}>
          <textarea id="message" name="message" rows={5} className="field resize-y" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Что случилось? Если это гриф — добавьте координаты." />
        </Field>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-2">Срочно? Быстрее всего — тикет в <a href={site.links.discord} className="font-semibold text-moss underline underline-offset-4" target="_blank" rel="noopener noreferrer">Discord</a>.</p>
          <button type="submit" className="btn btn-primary">Отправить</button>
        </div>
      </form>

      <Modal open={sent} onClose={() => setSent(false)} label="Форма в демо-режиме">
        <h2 className="pr-10 text-[26px]">Спасибо за обращение</h2>
        <Alert tone="warning" className="mt-5" title="Сообщение пока не отправляется">
          Отправка ещё не подключена к серверу. Пока что напишите нам в Discord — подключение описано в README.
        </Alert>
        <div className="mt-6 flex justify-end">
          <button type="button" className="btn btn-primary" onClick={() => setSent(false)}>Понятно</button>
        </div>
      </Modal>
    </>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}
