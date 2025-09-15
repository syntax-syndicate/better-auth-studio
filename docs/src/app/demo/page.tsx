import { Hero } from "@/components/ui/void-hero";

export default function DemoPage() {
  const navigationLinks = [
    { name: 'HOME', href: '/' },
    { name: 'INSTALLATION', href: '/installation' },
    { name: 'CHANGELOG', href: '/changelog' },
    { name: 'GITHUB', href: 'https://github.com/Kinfe123/better-auth-studio' }
  ];
  
  return (
    <div className="h-svh w-screen relative">
      <Hero 
        title="Sculpted Light and Shadow"
        description="A dynamic form drifts through luminous voids — edges curve, surfaces gleam, and subtle glow pulses like a heartbeat. Motion and material merge, revealing the art hidden within geometry."
        links={navigationLinks}
      />
    </div>
  );
}