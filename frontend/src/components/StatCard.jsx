const StatCard = ({ icon: Icon, label, value, tone = "from-fuchsia-500 to-violet-700" }) => {
  return (
    <article className="rounded-3xl border border-fuchsia-100 bg-white p-5 shadow-sm">
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white`}>
        <Icon size={22} />
      </span>
      <p className="mt-5 text-3xl font-extrabold text-purple-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-purple-900/66">{label}</p>
    </article>
  );
};

export default StatCard;
