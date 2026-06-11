class ProjectMemoryService:

    def __init__(self):
        self.memory_store = {}

    def save(
        self,
        project_id: str,
        state: dict,
    ):
        self.memory_store[project_id] = state

    def load(
        self,
        project_id: str,
    ):
        return self.memory_store.get(
            project_id,
            {}
        )