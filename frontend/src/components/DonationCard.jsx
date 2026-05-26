const DonationCard = ({ donation }) => {
  const statusStyles = {
    created: "bg-blue-50 text-blue-700 border-blue-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    failed: "bg-rose-50 text-rose-700 border-rose-100"
  };

  return (
    <article className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-purple-950">{donation.name}</h3>
          <p className="mt-1 break-words text-sm font-semibold text-purple-900/70">{donation.email}</p>
        </div>
        <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-extrabold capitalize ${statusStyles[donation.status]}`}>
          {donation.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-purple-900/72 md:grid-cols-2">
        <p><strong>Amount:</strong> {donation.currency || "INR"} {donation.amount}</p>
        <p><strong>Date:</strong> {new Date(donation.createdAt).toLocaleString("en-IN")}</p>
        <p className="break-words"><strong>Order ID:</strong> {donation.razorpayOrderId || "Not available"}</p>
        <p className="break-words"><strong>Payment ID:</strong> {donation.razorpayPaymentId || "Not completed"}</p>
      </div>
    </article>
  );
};

export default DonationCard;
