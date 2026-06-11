class VideoEditor:

    async def assemble(
        self,
        clips: list,
    ):
        return {
            "status": "assembled",
            "clips": clips,
        }