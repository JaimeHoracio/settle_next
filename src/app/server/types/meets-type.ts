import { UserDto } from "./users-type"

export interface MeetSelectedDto {
    idMeet: string
    nameMeet: string
    primary?: boolean
}

export interface MeetDto {
    idMeet: string
    createdBy: UserDto
    name: string
    primary?: boolean
    details?: string
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
}
