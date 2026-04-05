interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 text-xl font-bold text-white shadow-lg shadow-blue-950/40">
        N
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white md:text-3xl">{title}</h1>
        <p className="text-sm leading-6 text-slate-400 md:text-base">
          {subtitle}
        </p>
      </div>
    </div>
  );
}