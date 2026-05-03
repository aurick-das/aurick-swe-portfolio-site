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
    <>
      <HeroSection profile={profile} />
      <section>
        <h2 className="section-title">Zeldas</h2>
        <SocialLinks links={socialLinks} />
      </section>
      <TechStackMarquee items={techStack.items} />
      <ProjectsSection projects={projects} />
    </>
  );
}
