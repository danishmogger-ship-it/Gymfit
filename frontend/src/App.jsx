import { useState, useEffect } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { api } from "./api";

function Shell({ children }) {
  const { user, logout } = useAuth();
  return <div className="app-shell">
    <header className="topbar"><Link className="brand" to="/">GYMFIT</Link>
      <nav><Link to="/">Dashboard</Link><Link to="/plans">Plans</Link>
        {user && <button className="link-button" onClick={logout}>Log out</button>}
        {!user && <Link to="/login">Login</Link>}
      </nav>
    </header>{children}
  </div>;
}
function AuthPage({ mode }) {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  if (user) return <Navigate to="/" />;
  async function submit(e) {
    e.preventDefault(); setError("");
    try {
      if (mode === "register") await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      navigate("/");
    } catch (err) { setError(err.message); }
  }
  return <main className="auth-card"><p className="eyebrow">WELCOME TO GYMFIT</p><h1>{mode === "login" ? "Sign in" : "Create your account"}</h1>
    <form onSubmit={submit}>
      {mode === "register" && <input placeholder="Full name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}
      <input type="email" placeholder="Email address" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password (min. 8 characters)" minLength="8" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="primary">{mode === "login" ? "Login" : "Register"}</button>
    </form>{error && <p className="error">{error}</p>}
    <p className="muted">{mode === "login" ? <>New here? <Link to="/register">Create account</Link></> : <>Already registered? <Link to="/login">Login</Link></>}</p>
  </main>;
}
function Dashboard() {
  const { user } = useAuth();
  const [message, setMessage] = useState("Loading your dashboard...");
  useEffect(() => {
    if (!user) return;
    api("/auth/me").then(d=>setMessage(`Welcome back, ${d.user.name}. Your role is ${d.user.role}.`))
      .catch(e=>setMessage(e.message));
  }, [user]);
  if (!user) return <main className="hero"><p className="eyebrow">TRAIN SMARTER. LIVE STRONGER.</p><h1>Your fitness journey,<br/> all in one place.</h1><p className="muted">Manage memberships, build routines and track your progress with GymFit.</p><div className="actions"><Link className="primary" to="/register">Get started</Link><Link className="secondary" to="/login">Login</Link></div></main>;
  return <main className="content"><p className="eyebrow">{user.role.toUpperCase()} DASHBOARD</p><h1>Welcome, {user.name}</h1><p className="muted">{message}</p>
    <div className="cards"><section className="panel"><h3>Membership plans</h3><p>Explore available plans and subscribe.</p><Link to="/plans">View plans →</Link></section>
      <section className="panel"><h3>Your account</h3><p>{user.email}</p><span className="pill">{user.role}</span></section>
      <section className="panel"><h3>Next step</h3><p>Use the navigation to explore the current project features.</p></section></div>
  </main>;
}
function Plans() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function load() { try { setPlans(await api("/plans")); } catch(e) { setError(e.message); } }
  useEffect(()=>{ load(); },[]);
  async function subscribe(planId) {
    try { await api("/subscriptions", { method:"POST", body:JSON.stringify({planId}) }); setNotice("Subscription created successfully."); }
    catch(e) { setNotice(e.message); }
  }
  return <main className="content"><p className="eyebrow">MEMBERSHIPS</p><h1>Choose your plan</h1>
    {error && <p className="error">{error}</p>}{notice && <p className="notice">{notice}</p>}
    <div className="cards">{plans.map(p=><section className="panel" key={p._id}><h2>{p.name}</h2><p className="price">₹{p.price}</p><p>{p.durationDays} days</p><p>{p.description}</p><ul>{p.benefits?.map((b,i)=><li key={i}>{b}</li>)}</ul>
      {user?.role === "member" && <button className="primary" onClick={()=>subscribe(p._id)}>Subscribe</button>}</section>)}
    {!plans.length && !error && <p className="muted">No active plans are available yet. An admin can create plans through the API.</p>}</div>
  </main>;
}
export default function App() {
  return <Shell><Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/login" element={<AuthPage mode="login"/>}/>
    <Route path="/register" element={<AuthPage mode="register"/>}/>
    <Route path="/plans" element={<Plans/>}/>
    <Route path="*" element={<main className="content"><h1>Page not found</h1><Link to="/">Go home</Link></main>}/>
  </Routes></Shell>;
}
