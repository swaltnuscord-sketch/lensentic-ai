from pydantic import BaseModel, EmailStr, field_validator


class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @field_validator('password')
    @classmethod
    def validate_password_length(cls, v):
        if len(v.encode('utf-8')) > 72:
            raise ValueError('password cannot be longer than 72 bytes')
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    @field_validator('password')
    @classmethod
    def validate_password_length(cls, v):
        if len(v.encode('utf-8')) > 72:
            raise ValueError('password cannot be longer than 72 bytes')
        return v


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True