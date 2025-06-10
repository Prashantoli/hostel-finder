"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Chrome, Facebook, Github, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function HostelFinderLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const validateForm = () => {
    const newErrors = { email: "", password: "" }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log("Login attempt:", { ...formData, rememberMe })
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <div className="text-white text-2xl font-bold">HF</div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hostel Finder
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Hello, welcome back to ultimate hostel finder.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-12 bg-gray-100 border-0 rounded-full text-gray-800 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              {errors.email && (
                <Alert className="py-2">
                  <AlertDescription className="text-sm text-red-600">{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 h-12 bg-gray-100 border-0 rounded-full text-gray-800 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <Alert className="py-2">
                  <AlertDescription className="text-sm text-red-600">{errors.password}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Forget Password?
              </button>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold transition-all transform hover:scale-[1.02] disabled:scale-100"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full font-semibold transition-all transform hover:scale-[1.02]"
              >
                Register now
              </Button>
            </div>
          </form>

          <div className="relative">
            <Separator className="my-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="h-12 bg-gray-100 hover:bg-gray-200 border-0 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              <Chrome className="h-5 w-5 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Facebook")}
              className="h-12 bg-gray-100 hover:bg-gray-200 border-0 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              <Facebook className="h-5 w-5 mr-2" />
              Facebook
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("GitHub")}
              className="h-12 bg-gray-100 hover:bg-gray-200 border-0 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("Apple")}
              className="h-12 bg-gray-100 hover:bg-gray-200 border-0 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              <Apple className="h-5 w-5 mr-2" />
              Apple
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign up here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
