import { CheckCircle2, Star, Trash2 } from "lucide-react";

const statusStyles = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  reviewed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  important: "bg-amber-50 text-amber-700 border-amber-100"
};

const MessageCard = ({ message, activeId, onDelete, onStatus }) => {
  return (
    <article className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-purple-950">{message.name}</h3>
          <p className="mt-1 break-words text-sm font-semibold text-purple-900/70">{message.email}</p>
          <p className="mt-1 text-sm text-purple-900/62">{message.phone || "No phone"} | {message.interestType}</p>
        </div>
        <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-extrabold capitalize ${statusStyles[message.status]}`}>
          {message.status}
        </span>
      </div>

      <p className="mt-4 rounded-2xl bg-fuchsia-50/70 p-4 text-sm leading-6 text-purple-900/78">{message.message}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-purple-900/50">
          {new Date(message.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onStatus(message._id, "reviewed")}
            disabled={activeId === message._id || message.status === "reviewed"}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
          >
            <CheckCircle2 size={14} />
            Reviewed
          </button>
          <button
            type="button"
            onClick={() => onStatus(message._id, "important")}
            disabled={activeId === message._id || message.status === "important"}
            className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2 text-xs font-extrabold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
          >
            <Star size={14} />
            Important
          </button>
          <button
            type="button"
            onClick={() => onDelete(message._id)}
            disabled={activeId === message._id}
            className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-2 text-xs font-extrabold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default MessageCard;
