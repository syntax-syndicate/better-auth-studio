import { Hero } from "@/components/ui/void-hero";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="h-svh w-screen relative">
      {/* Shared Navigation */}
      <Navigation currentPage="home" />
      
      <Hero 
        title="Better Auth Studio"
        description="A powerful admin dashboard for Better Auth. Manage users, sessions, organizations, and more with an intuitive interface. Built with modern web technologies and designed for developers who demand excellence."
        links={[]}
      />
    </div>
  );
}