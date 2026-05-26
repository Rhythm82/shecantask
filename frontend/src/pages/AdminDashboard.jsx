import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AlertCircle,
  CheckCircle2,
  HeartHandshake,
  IndianRupee,
  LogOut,
  MailOpen,
  Search,
  Star,
  Users,
  UsersRound
} from "lucide-react";
import DonationCard from "../components/DonationCard.jsx";
import Loader from "../components/Loader.jsx";
import MessageCard from "../components/MessageCard.jsx";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  deleteMessageById,
  getMessages,
  getMessageStats,
  updateMessageStatus
} from "../services/messageService.js";
import { getDonations, getDonationStats } from "../services/donationService.js";

const messageFilters = [
  "All",
  "New",
  "Reviewed",
  "Important",
  "Donation Interest",
  "Volunteer",
  "Partnership",
  "Internship Query"
];

const donationFilters = ["All", "Success", "Created", "Failed"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [messageStats, setMessageStats] = useState({});
  const [donationStats, setDonationStats] = useState({});
  const [messageFilter, setMessageFilter] = useState("All");
  const [donationFilter, setDonationFilter] = useState("All");
  const [messageSearch, setMessageSearch] = useState("");
  const [donationSearch, setDonationSearch] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);
  const [activeId, setActiveId] = useState("");

  const messageParams = useMemo(() => {
    const params = {};
    const normalized = messageFilter.toLowerCase();

    if (["new", "reviewed", "important"].includes(normalized)) {
      params.status = normalized;
    } else if (messageFilter !== "All") {
      params.interestType = messageFilter;
    }

    if (messageSearch.trim()) {
      params.search = messageSearch.trim();
    }

    return params;
  }, [messageFilter, messageSearch]);

  const donationParams = useMemo(() => {
    const params = {};

    if (donationFilter !== "All") {
      params.status = donationFilter.toLowerCase();
    }

    if (donationSearch.trim()) {
      params.search = donationSearch.trim();
    }

    return params;
  }, [donationFilter, donationSearch]);

  const loadMessageData = async () => {
    try {
      setIsLoadingMessages(true);
      const [messagesResponse, statsResponse] = await Promise.all([
        getMessages(messageParams),
        getMessageStats()
      ]);
      setMessages(messagesResponse.data.data);
      setMessageStats(statsResponse.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const loadDonationData = async () => {
    try {
      setIsLoadingDonations(true);
      const [donationsResponse, statsResponse] = await Promise.all([
        getDonations(donationParams),
        getDonationStats()
      ]);
      setDonations(donationsResponse.data.data);
      setDonationStats(statsResponse.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load donations");
    } finally {
      setIsLoadingDonations(false);
    }
  };

  useEffect(() => {
    loadMessageData();
  }, [messageParams]);

  useEffect(() => {
    loadDonationData();
  }, [donationParams]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  const handleStatus = async (id, status) => {
    try {
      setActiveId(id);
      const { data } = await updateMessageStatus(id, status);
      setMessages((current) => current.map((message) => (message._id === id ? data.data : message)));
      await getMessageStats().then((response) => setMessageStats(response.data.data));
      toast.success(`Marked as ${status}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update message");
    } finally {
      setActiveId("");
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this message?");

    if (!shouldDelete) {
      return;
    }

    try {
      setActiveId(id);
      await deleteMessageById(id);
      setMessages((current) => current.filter((message) => message._id !== id));
      await getMessageStats().then((response) => setMessageStats(response.data.data));
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete message");
    } finally {
      setActiveId("");
    }
  };

  const dashboardCards = [
    { label: "Total Messages", value: messageStats.totalMessages || 0, icon: MailOpen, tone: "from-violet-500 to-purple-700" },
    { label: "New Messages", value: messageStats.newMessages || 0, icon: AlertCircle, tone: "from-blue-500 to-cyan-600" },
    { label: "Reviewed Messages", value: messageStats.reviewedMessages || 0, icon: CheckCircle2, tone: "from-emerald-500 to-teal-600" },
    { label: "Important Messages", value: messageStats.importantMessages || 0, icon: Star, tone: "from-amber-400 to-orange-500" },
    { label: "Donation Interest Leads", value: messageStats.donationInterestLeads || 0, icon: HeartHandshake, tone: "from-fuchsia-500 to-rose-600" },
    { label: "Volunteer Leads", value: messageStats.volunteerLeads || 0, icon: UsersRound, tone: "from-pink-500 to-violet-600" },
    { label: "Total Demo Donations", value: donationStats.successfulDonations || 0, icon: IndianRupee, tone: "from-emerald-500 to-green-700" },
    { label: "Demo Donation Amount", value: `₹${donationStats.totalDemoAmount || 0}`, icon: IndianRupee, tone: "from-rose-500 to-fuchsia-700" }
  ];

  return (
    <main className="min-h-screen bg-[#fff7fb]">
      <header className="border-b border-fuchsia-100 bg-white/84 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-white shadow-glow">
              <HeartHandshake size={23} />
            </span>
            <div>
              <p className="text-sm font-bold text-fuchsia-700">She Can Foundation</p>
              <h1 className="text-2xl font-black text-purple-950">Admin Dashboard</h1>
            </div>
          </Link>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="text-sm font-bold text-purple-900/70">{admin?.name || "Admin"} | {admin?.email || "admin"}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-950 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-fuchsia-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex rounded-2xl bg-fuchsia-50 p-1">
              {["messages", "donations"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-extrabold capitalize transition ${
                    activeTab === tab ? "bg-white text-fuchsia-700 shadow-sm" : "text-purple-900/62"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex w-full items-center gap-3 rounded-2xl border border-purple-100 bg-fuchsia-50/70 px-4 py-3 lg:max-w-sm">
              <Search size={18} className="text-fuchsia-600" />
              <input
                type="search"
                value={activeTab === "messages" ? messageSearch : donationSearch}
                onChange={(event) =>
                  activeTab === "messages"
                    ? setMessageSearch(event.target.value)
                    : setDonationSearch(event.target.value)
                }
                className="w-full bg-transparent text-sm text-purple-950 outline-none"
                placeholder={activeTab === "messages" ? "Search messages" : "Search donations"}
              />
            </div>
          </div>

          {activeTab === "messages" ? (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {messageFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setMessageFilter(filter)}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                      messageFilter === filter ? "bg-purple-950 text-white" : "bg-fuchsia-50 text-purple-900/72 hover:bg-fuchsia-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {isLoadingMessages ? (
                <Loader label="Loading messages..." />
              ) : messages.length === 0 ? (
                <div className="py-16 text-center">
                  <Users className="mx-auto text-fuchsia-500" size={34} />
                  <p className="mt-3 text-sm font-bold text-purple-900/70">No messages found.</p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {messages.map((message) => (
                    <MessageCard
                      key={message._id}
                      message={message}
                      activeId={activeId}
                      onDelete={handleDelete}
                      onStatus={handleStatus}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {donationFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setDonationFilter(filter)}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                      donationFilter === filter ? "bg-purple-950 text-white" : "bg-fuchsia-50 text-purple-900/72 hover:bg-fuchsia-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {isLoadingDonations ? (
                <Loader label="Loading donations..." />
              ) : donations.length === 0 ? (
                <div className="py-16 text-center">
                  <IndianRupee className="mx-auto text-fuchsia-500" size={34} />
                  <p className="mt-3 text-sm font-bold text-purple-900/70">No donations found.</p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {donations.map((donation) => (
                    <DonationCard key={donation._id} donation={donation} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
