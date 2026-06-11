class CostTracker:

    def estimate_generation_cost(
        self,
        provider: str,
    ):
        costs = {
            "runway": 0.80,
            "kling": 1.00,
            "ltx": 0.05,
            "flux": 0.01,
            "elevenlabs": 0.10,
        }

        return costs.get(provider, 0)