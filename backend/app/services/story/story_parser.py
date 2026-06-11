class StoryParser:

    def parse_text(
        self,
        raw_text: str,
    ):
        return {
            "title": "Generated Story",
            "summary": raw_text[:500],
            "characters": [],
            "scenes": [],
        }