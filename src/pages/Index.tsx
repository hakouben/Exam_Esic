
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanCard from "@/components/hosting/PlanCard";
import { hostingPlans } from "@/lib/data";
import { Database, Server, Shield, Clock, BarChart, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedType, setSelectedType] = useState<"all" | "MUTUALIZED" | "VPS">("all");
  const [activeTab, setActiveTab] = React.useState("all");
  
  const filteredPlans = selectedType === "all" 
    ? hostingPlans 
    : hostingPlans.filter(plan => plan.type === selectedType);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hosting-blue to-hosting-teal py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Reliable Hosting Solutions for Every Need
              </h1>
              <p className="text-lg mb-8">
                Whether you need shared hosting for your personal blog or a powerful VPS for your business, 
                we've got you covered with rock-solid infrastructure and 24/7 support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shared-hosting">
                  <Button 
                  size="lg" 
                  variant="secondary" 
                  className="font-semibold" 
                  onClick={() => {
                      // Update the tab state & scroll down
                      setSelectedType("MUTUALIZED");
                      setActiveTab("MUTUALIZED");
                      document.getElementById('featured-plans')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}>
                    Shared Hosting
                  </Button>
                </Link>
                <Link to="/vps">
                  <Button
                  size="lg"
                  className="bg-white text-hosting-blue hover:bg-gray-100 font-semibold"
                  onClick={() => {
                      // Update the tab state & scroll down
                      setSelectedType("VPS");
                      setActiveTab("VPS");
                      document.getElementById('featured-plans')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}>
                    VPS Hosting
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                alt="Server Room" 
                className="rounded-lg shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plans Section */}
      <section id="featured-plans" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Hosting Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect hosting solution for your needs.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setSelectedType("all")}>All Plans</TabsTrigger>
                <TabsTrigger value="MUTUALIZED" onClick={() => setSelectedType("MUTUALIZED")}>Shared Hosting</TabsTrigger>
                <TabsTrigger value="VPS" onClick={() => setSelectedType("VPS")}>VPS</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="MUTUALIZED" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="VPS" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide top-notch hosting solutions with unmatched reliability and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-hosting-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-hosting-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">High-Performance Servers</h3>
              <p className="text-gray-600">
                State-of-the-art infrastructure with SSD storage for lightning-fast website loading speeds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-hosting-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-hosting-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Security</h3>
              <p className="text-gray-600">
                Free SSL certificates, DDoS protection, and regular security updates to keep your data safe.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-hosting-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-hosting-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">99.9% Uptime Guarantee</h3>
              <p className="text-gray-600">
                Our redundant network ensures your website remains available to visitors around the clock.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-hosting-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-hosting-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scalable Resources</h3>
              <p className="text-gray-600">
                Easily upgrade your plan as your needs grow, without any downtime or technical hassle.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-hosting-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-hosting-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Backups</h3>
              <p className="text-gray-600">
                Regular automated backups keep your data safe and allow for quick recovery when needed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-hosting-blue/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-hosting-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Monitoring</h3>
              <p className="text-gray-600">
                Real-time server stats and resource monitoring to keep your applications running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hosting-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Choose your perfect hosting plan today and take your online presence to the next level.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/shared-hosting">
                <Button size="lg" variant="default">Explore Plans</Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-hosting-navy">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
