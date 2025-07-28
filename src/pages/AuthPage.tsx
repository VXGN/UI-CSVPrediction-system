import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Droplets, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import initialUsers from "./users.json";
import { motion, AnimatePresence } from "framer-motion";

// Helper function untuk mendapatkan data pengguna dari localStorage atau data awal
const getInitialUsers = () => {
  try {
    const localData = localStorage.getItem("users");
    return localData ? JSON.parse(localData) : initialUsers;
  } catch (error) {
    console.error("Failed to parse users from localStorage", error);
    return initialUsers;
  }
};

// Varian Framer Motion untuk transisi form
const formVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

type AnimatedInputProps = {
  id: string;
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
};

const AnimatedInput = ({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  showToggle,
  togglePasswordVisibility,
  showPassword,
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-white/90 text-sm font-medium">
        {label}
      </Label>
      <div className="relative group">
        <motion.div
          animate={{ x: isFocused ? -2 : 0, scale: isFocused ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
          className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa]"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <Input
          ref={inputRef}
          id={id}
          type={showToggle && !showPassword ? "password" : type}
          placeholder={placeholder}
          className="pl-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
        />
        {showToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-3.5 text-[#a78bfa] hover:text-[#c4b5fd] transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [users, setUsers] = useState(getInitialUsers);
  const navigate = useNavigate();

  const logoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.id]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validasi sederhana
    if (!loginForm.email || !loginForm.password) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    const user = users.find(
      (u: any) => u.email === loginForm.email && u.password === loginForm.password,
    );

    if (user) {
      setMessage({ type: "success", text: `Login successful! Welcome, ${user.name}` });
      localStorage.setItem("session", JSON.stringify(user));
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage({ type: "error", text: "Invalid email or password." });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    const { name, email, password, confirmPassword } = registerForm;

    // Validasi sederhana
    if (!name || !email || !password || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (users.find((u: any) => u.email === email)) {
      setMessage({ type: "error", text: "Email already registered." });
      return;
    }

    const newUser = { id: users.length + 1, name, email, password };
    setUsers([...users, newUser]);
    setMessage({
      type: "success",
      text: "Registration successful! You can now login.",
    });
    setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" });
    setActiveTab("login"); // Pindah ke tab login setelah registrasi berhasil
  };

  // Efek GSAP untuk logo dan form saat mounting
  useEffect(() => {
    setMounted(true);

    const logoTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    logoTimeline
      .from(logoRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 2,
      })
      .to(
        logoRef.current,
        {
          textShadow: "0 0 20px #a78bfa, 0 0 40px #7f5af0, 0 0 60px #c4b5fd",
          duration: 0.8,
        },
        "-=1",
      );

    gsap.from(containerRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      delay: 1,
    });
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(127,90,240,0.25)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 4px 15px rgba(127,90,240,0.18)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a1440] via-[#7f5af0] via-60% to-[#23235a] bg-[length:200%_200%] relative overflow-hidden">
      <style>{`
        @keyframes glowing-border {
          0% { box-shadow: 0 0 5px #a78bfa; }
          50% { box-shadow: 0 0 20px #7f5af0, 0 0 30px #c4b5fd; }
          100% { box-shadow: 0 0 5px #a78bfa; }
        }
        .btn-glow:hover {
          animation: glowing-border 1.5s infinite ease-in-out;
        }
      `}</style>
      
      {/* Background statis */}
      <div className="fixed inset-0 z-0 opacity-40" style={{
        background: 'radial-gradient(circle at 10% 15%, #a78bfa 0%, transparent 40%), radial-gradient(circle at 80% 90%, #7f5af0 0%, transparent 50%), radial-gradient(circle at 60% 40%, #c4b5fd 0%, transparent 60%)',
        filter: 'blur(100px)'
      }} />

      <div ref={containerRef} className="w-full max-w-md z-10 relative">
        <div className="flex justify-center mb-8">
          <div ref={logoRef} className="flex items-center gap-3 text-4xl font-bold text-white">
            <Droplets className="h-12 w-12 text-[#a78bfa] drop-shadow-[0_0_18px_rgba(167,139,250,0.8)]" />
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#7f5af0] to-[#c4b5fd] text-transparent bg-clip-text drop-shadow-lg">
              Predict
            </span>
          </div>
        </div>

        <div className="bg-[#1a1440]/80 backdrop-blur-2xl rounded-3xl border border-[#a78bfa]/20 shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a78bfa]/10 via-transparent to-[#7f5af0]/10 rounded-3xl" />
          <Tabs
            defaultValue="login"
            onValueChange={setActiveTab}
            className="w-full relative z-10"
          >
            <TabsList className="flex w-full mb-10 bg-[#23235a]/80 border border-[#a78bfa]/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg">
              <TabsTrigger
                value="login"
                className="flex-1 text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#7f5af0] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-x-105 transition-all duration-300 font-semibold tracking-wide"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#7f5af0] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-x-105git transition-all duration-300 font-semibold tracking-wide"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value={activeTab} forceMount className="mt-0">
                <motion.div
                  key={activeTab}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {activeTab === "login" ? (
                    <form className="space-y-6" onSubmit={handleLogin}>
                      {message.text && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`${
                            message.type === "error" ? "text-red-400" : "text-green-400"
                          } text-sm mb-2`}
                        >
                          {message.text}
                        </motion.div>
                      )}
                      <AnimatedInput
                        id="email"
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                      />

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                            Password
                          </Label>
                          <button
                            type="button"
                            className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] transition-colors duration-200 hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <AnimatedInput
                          id="password"
                          label=""
                          icon={Lock}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          showToggle={true}
                          showPassword={showPassword}
                          togglePasswordVisibility={() => setShowPassword(!showPassword)}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="btn-glow w-full h-12 bg-gradient-to-r from-[#a78bfa] to-[#7f5af0] text-white font-semibold text-lg rounded-xl transition-all duration-300"
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                      >
                        Sign In
                      </Button>
                    </form>
                  ) : (
                    <form className="space-y-6" onSubmit={handleRegister}>
                      {message.text && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`${
                            message.type === "error" ? "text-red-400" : "text-green-400"
                          } text-sm mb-2`}
                        >
                          {message.text}
                        </motion.div>
                      )}
                      <AnimatedInput
                        id="name"
                        label="Full Name"
                        icon={User}
                        placeholder="John Doe"
                        value={registerForm.name}
                        onChange={handleRegisterChange}
                      />
                      <AnimatedInput
                        id="email"
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        placeholder="your@email.com"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                      />
                      <AnimatedInput
                        id="password"
                        label="Password"
                        icon={Lock}
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        showToggle={true}
                        showPassword={showPassword}
                        togglePasswordVisibility={() => setShowPassword(!showPassword)}
                      />
                      <AnimatedInput
                        id="confirmPassword"
                        label="Confirm Password"
                        icon={Lock}
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        showToggle={true}
                        showPassword={showConfirmPassword}
                        togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                      <Button
                        type="submit"
                        className="btn-glow w-full h-12 bg-gradient-to-r from-[#a78bfa] to-[#7f5af0] text-white font-semibold text-lg rounded-xl transition-all duration-300"
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                      >
                        Create Account
                      </Button>
                      <p className="text-xs text-center text-white/60 mt-6 leading-relaxed">
                        By registering, you agree to our{" "}
                        <button type="button" className="text-[#a78bfa] hover:text-[#c4b5fd] hover:underline transition-colors duration-200">
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button type="button" className="text-[#a78bfa] hover:text-[#c4b5fd] hover:underline transition-colors duration-200">
                          Privacy Policy
                        </button>
                      </p>
                    </form>
                  )}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
}