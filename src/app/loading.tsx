export default function Loading() {
  return (
    <div className="container-wide flex min-h-[40vh] items-center justify-center px-4" aria-busy="true" aria-label="Ładowanie">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyber-cyan/30 border-t-cyber-cyan" />
    </div>
  );
}
