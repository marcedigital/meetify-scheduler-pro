
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useBooking } from '@/context/BookingContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { bookingData } = useBooking();

  // Redirect if no booking data
  React.useEffect(() => {
    if (!bookingData) {
      navigate('/');
    }
  }, [bookingData, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, accept any login credentials
    if (email && password) {
      toast.success("Login successful");
      // Navigate to confirmation page
      navigate('/confirmation');
    } else {
      toast.error("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent/90 to-accent text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Music Rehearsal Room Scheduler</h1>
          <p className="mt-2 opacity-90">Complete su reserva</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-black">Iniciar sesión</CardTitle>
            <CardDescription className="text-gray-600">
              Inicie sesión para completar su reserva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">Correo electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/80">
                Iniciar sesión
              </Button>
            </form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-gray-600">O continúe con</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 text-black"
              onClick={() => {
                toast.success("Google login successful");
                navigate('/confirmation');
              }}
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <div className="text-sm text-gray-600">
              ¿No tiene una cuenta?{" "}
              <Link to="/register" className="text-accent hover:underline">
                Regístrese
              </Link>
            </div>
            <Link to="/" className="text-sm text-accent hover:underline">
              Volver al calendario
            </Link>
          </CardFooter>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-border py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          Music Rehearsal Scheduler &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Login;
