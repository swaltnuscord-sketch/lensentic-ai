class TimelineBuilder:

    def build(
        self,
        shots: list,
    ):
        return {
            "timeline": shots,
            "duration": len(shots) * 5,
        }