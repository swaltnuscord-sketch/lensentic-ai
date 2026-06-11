import { GenerationModes } from "../components/dashboard/GenerationModes";
import { HeroSection } from "../components/dashboard/HeroSection";
import { PreviewShowcase } from "../components/dashboard/PreviewShowcase";
import { ProjectGrid } from "../components/dashboard/ProjectGrid";
import { PromptComposer } from "../components/dashboard/PromptComposer";

export default function DashboardPage({
  onPromptSubmit,
}: { onPromptSubmit?: (prompt: string) => void }) {
  return (
    <div data-ocid="dashboard.page" className="relative min-h-screen">
      {/* Hero */}
      <HeroSection />
      {/* Prompt Composer */}
      <div className="mb-6">
        <PromptComposer onSubmit={onPromptSubmit} />
      </div>
      {/* Generation Modes */}
      <div className="mb-12">
        <GenerationModes />
      </div>
      {/* Preview Showcase */}
      <div className="mb-12">
        <PreviewShowcase />
      </div>
      {/* Project Grid */}
      <ProjectGrid />
    </div>
  );
}
