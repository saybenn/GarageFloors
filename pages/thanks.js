export default function Thanks() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-gray-900">
        Thanks! We got your request.
      </h1>
      <p className="mt-3 text-gray-700">
        We’ll reach out within one business day. If this is urgent, call us now.
      </p>
      <div className="mt-6">
        <a
          href="/"
          className="text-[var(--color-primary,theme(colors.blue.700))] underline"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
