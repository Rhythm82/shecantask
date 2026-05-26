const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-sm font-bold text-purple-900/70">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-fuchsia-200 border-t-fuchsia-600" />
      {label}
    </div>
  );
};

export default Loader;
