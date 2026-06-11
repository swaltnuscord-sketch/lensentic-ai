from app.database.repositories.project_repository import (
    ProjectRepository,
)


class ProjectService:

    def __init__(self, db):
        self.repository = ProjectRepository(db)

    def create_project(
        self,
        title,
        description,
        owner_id,
    ):
        return self.repository.create_project(
            title=title,
            description=description,
            owner_id=owner_id,
        )

    def get_user_projects(self, owner_id):
        return self.repository.get_user_projects(
            owner_id=owner_id,
        )