from app.services.story.story_parser import (
    StoryParser,
)

from app.services.story.screenplay_service import (
    ScreenplayService,
)

from app.services.orchestrator.provider_selector import (
    ProviderSelector,
)

from app.services.continuity.continuity_engine import (
    ContinuityEngine,
)

from app.services.timeline.timeline_builder import (
    TimelineBuilder,
)

from app.services.editor.video_editor import (
    VideoEditor,
)


class MoviePipeline:

    def __init__(self):
        self.story_parser = StoryParser()

        self.screenplay_service = ScreenplayService()

        self.provider_selector = ProviderSelector()

        self.continuity_engine = ContinuityEngine()

        self.timeline_builder = TimelineBuilder()

        self.video_editor = VideoEditor()

    async def execute(
        self,
        raw_story: str,
    ):
        parsed_story = self.story_parser.parse_text(
            raw_story
        )

        screenplay = await self.screenplay_service.generate_screenplay(
            parsed_story
        )

        provider = self.provider_selector.select_video_provider(
            quality="draft"
        )

        continuity = self.continuity_engine.validate_scene(
            parsed_story
        )

        timeline = self.timeline_builder.build([])

        final_edit = await self.video_editor.assemble([])

        return {
            "parsed_story": parsed_story,
            "screenplay": screenplay,
            "provider": provider.capabilities().dict(),
            "continuity": continuity,
            "timeline": timeline,
            "final_edit": final_edit,
        }