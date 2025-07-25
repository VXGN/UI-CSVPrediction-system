"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Droplets, Lock, Mail, User, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import usersData from "./users.json"

export default function AuthPage() {
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const loginFormRef = useRef(null)
  const registerFormRef = useRef(null)
  const logoRef = useRef(null)
  const backgroundRef = useRef(null)
  const cursorGlowRef = useRef(null)
  const containerRef = useRef(null)

  // State untuk form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [users, setUsers] = useState(() => {
    // Cek localStorage dulu, jika ada pakai itu, jika tidak pakai usersData
    const local = localStorage.getItem("users");
    return local ? JSON.parse(local) : usersData;
  });

  // Simpan ke localStorage setiap users berubah
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const navigate = useNavigate();

  // Handler login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); setSuccessMsg("");
    const user = users.find((u: any) => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setSuccessMsg("Login successful! Welcome, " + user.name);
      localStorage.setItem("session", JSON.stringify(user));
      setTimeout(() => navigate("/"), 1000);
    } else {
      setErrorMsg("Invalid email or password");
    }
  };

  // Handler register
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); setSuccessMsg("");
    if (!registerName || !registerEmail || !registerPassword || !registerConfirm) {
      setErrorMsg("Please fill all fields"); return;
    }
    if (registerPassword !== registerConfirm) {
      setErrorMsg("Passwords do not match"); return;
    }
    if (users.find((u: any) => u.email === registerEmail)) {
      setErrorMsg("Email already registered"); return;
    }
    const newUser = {
      id: users.length + 1,
      name: registerName,
      email: registerEmail,
      password: registerPassword
    };
    setUsers([...users, newUser]);
    setSuccessMsg("Registration successful! You can now login.");
    setRegisterName(""); setRegisterEmail(""); setRegisterPassword(""); setRegisterConfirm("");
  };

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
    document.addEventListener("mousemove", handleMouseMove)
    gsap.to(backgroundRef.current, {
      duration: 25,
      backgroundPosition: "100% 100%",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
    const logoTimeline = gsap.timeline()
    logoTimeline
      .from(logoRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      })
      .to(
        logoRef.current,
        {
          textShadow: "0 0 20px #a78bfa, 0 0 40px #7f5af0, 0 0 60px #c4b5fd",
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5",
      )
    gsap.from(containerRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      delay: 0.8,
      ease: "power3.out",
    })
    const floatingElements = document.querySelectorAll(".floating-element")
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      })
    })
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleTabChange = (value: string) => {
    const timeline = gsap.timeline()
    if (value === "login") {
      timeline
        .to(registerFormRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .fromTo(
          loginFormRef.current,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        )
    } else {
      timeline
        .to(loginFormRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .fromTo(
          registerFormRef.current,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        )
    }
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    })
    gsap.to(e.target.parentElement, {
      boxShadow: "0 0 20px rgba(127,90,240,0.3)",
      duration: 0.2,
    })
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    })
    gsap.to(e.target.parentElement, {
      boxShadow: "none",
      duration: 0.2,
    })
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.target, {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(127,90,240,0.25)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.target, {
      scale: 1,
      boxShadow: "0 4px 15px rgba(127,90,240,0.18)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  if (!mounted) return null

  return (
    <div
      ref={backgroundRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a1440] via-[#7f5af0] via-60% to-[#23235a] bg-[length:200%_200%] relative overflow-hidden"
    >
      
      <div
        ref={cursorGlowRef}
        className="fixed w-96 h-96 pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(127,90,240,0.18) 0%, rgba(167,139,250,0.12) 30%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(32px)",
          left: 0,
          top: 0,
        }}
      />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-element absolute rounded-full bg-gradient-to-r from-[#7f5af0] to-[#a78bfa] opacity-20"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(70px)",
            }}
          />
        ))}
        
        {[...Array(12)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute w-2 h-2 bg-[#a78bfa] rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 12px #a78bfa, 0 0 24px #7f5af0, 0 0 36px #c4b5fd",
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div ref={containerRef} className="w-full max-w-md z-10">
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
          <Tabs defaultValue="login" onValueChange={handleTabChange} className="w-full relative z-10">
            <TabsList className="flex w-full mb-10 bg-[#23235a]/80 border border-[#a78bfa]/20 rounded-2xl overflow-hidden gap-4 p-2 transition-all duration-300 shadow-lg">
              <TabsTrigger
                value="login"
                className="flex-1 text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#7f5af0] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 transition-all duration-300 font-semibold tracking-wide"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="flex-1 text-lg py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a78bfa] data-[state=active]:to-[#7f5af0] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 transition-all duration-300 font-semibold tracking-wide"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form ref={loginFormRef} className="space-y-6" onSubmit={handleLogin}>
                {errorMsg && <div className="text-red-400 text-sm mb-2">{errorMsg}</div>}
                {successMsg && <div className="text-green-400 text-sm mb-2">{successMsg}</div>}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa] transition-all duration-200 group-focus-within:scale-110" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>
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
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa] transition-all duration-200 group-focus-within:scale-110" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-[#a78bfa] hover:text-[#c4b5fd] transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#a78bfa] to-[#7f5af0] hover:from-[#7f5af0] hover:to-[#a78bfa] text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300"
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form ref={registerFormRef} className="space-y-6" onSubmit={handleRegister}>
                {errorMsg && <div className="text-red-400 text-sm mb-2">{errorMsg}</div>}
                {successMsg && <div className="text-green-400 text-sm mb-2">{successMsg}</div>}
                <div className="space-y-3">
                  <Label htmlFor="register-name" className="text-white/90 text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa] transition-all duration-200 group-focus-within:scale-110" />
                    <Input
                      id="register-name"
                      placeholder="John Doe"
                      className="pl-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={registerName}
                      onChange={e => setRegisterName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="register-email" className="text-white/90 text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa] transition-all duration-200 group-focus-within:scale-110" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={registerEmail}
                      onChange={e => setRegisterEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="register-password" className="text-white/90 text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa] transition-all duration-200 group-focus-within:scale-110" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={registerPassword}
                      onChange={e => setRegisterPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-[#a78bfa] hover:text-[#c4b5fd] transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="register-confirm" className="text-white/90 text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-[#a78bfa] transition-all duration-200 group-focus-within:scale-110" />
                    <Input
                      id="register-confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 bg-black/40 border-white/20 focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 text-white placeholder:text-white/50 rounded-xl transition-all duration-200"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      value={registerConfirm}
                      onChange={e => setRegisterConfirm(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3.5 text-[#a78bfa] hover:text-[#c4b5fd] transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#a78bfa] to-[#7f5af0] hover:from-[#7f5af0] hover:to-[#a78bfa] text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300"
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  Create Account
                </Button>
                <p className="text-xs text-center text-white/60 mt-6 leading-relaxed">
                  By registering, you agree to our{" "}
                  <button className="text-[#a78bfa] hover:text-[#c4b5fd] hover:underline transition-colors duration-200">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-[#a78bfa] hover:text-[#c4b5fd] hover:underline transition-colors duration-200">
                    Privacy Policy
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 