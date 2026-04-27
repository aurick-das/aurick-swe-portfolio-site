import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SocialLinks } from "@/components/SocialLinks";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { getProfile, getProjects, getSocialLinks, getTechStack } from "@/lib/data";

export default function HomePage() {
  const profile = getProfile();
  const socialLinks = getSocialLinks();
  const projects = getProjects();
  const techStack = getTechStack();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <HeroSection profile={profile} />
      <section>
        <h2 className="section-title">Links</h2>
        <SocialLinks links={socialLinks} />
      </section>
      <TechStackMarquee items={techStack.items} />
      <ProjectsSection projects={projects} />
    </main>
  );
}
