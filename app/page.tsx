import { HeroSection } from "@/components/HeroSection";
import { LatestPosts } from "@/components/LatestPosts";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SocialLinks } from "@/components/SocialLinks";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { getProfile, getProjects, getSocialLinks, getTechStack } from "@/lib/data";
import { getAllPostMeta } from "@/lib/posts";

export default function HomePage() {
  const profile = getProfile();
  const socialLinks = getSocialLinks();
  const projects = getProjects();
  const techStack = getTechStack();
  const latestPosts = getAllPostMeta();

  return (
    <>
      <HeroSection profile={profile} />
      <section>
        <h2 className="section-title">Links</h2>
        <SocialLinks links={socialLinks} />
      </section>
      <TechStackMarquee items={techStack.items} />
      <LatestPosts posts={latestPosts} limit={3} />
      <ProjectsSection projects={projects} />
    </>
  );
}
