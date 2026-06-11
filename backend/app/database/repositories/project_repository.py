from app.database.models.project import Project


class ProjectRepository:

    def __init__(self, db):
        self.db = db

    def create_project(
        self,
        title: str,
        description: str,
        owner_id: int,
    ):
        project = Project(
            title=title,
            description=description,
            owner_id=owner_id,
        )

        self.db.add(project)

        self.db.commit()

        self.db.refresh(project)

        return project

    def get_user_projects(self, owner_id: int):
        return self.db.query(Project).filter(
            Project.owner_id == owner_id
        ).all()