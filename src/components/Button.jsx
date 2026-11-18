const VARIANTS = {
  primary: "bg-violet-600 text-white hover:bg-violet-700",
  secondary: "border border-[#ddd] bg-white text-[#222] hover:bg-slate-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
