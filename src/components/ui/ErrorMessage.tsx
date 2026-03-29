interface ErrorMessageProps {
  title?: string;
  message: string;
}

export default function ErrorMessage({ title = 'Error', message }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
      <h3 className="text-red-800 font-semibold">{title}</h3>
      <p className="text-red-600 text-sm mt-1">{message}</p>
    </div>
  );
}
