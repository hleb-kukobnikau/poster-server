import {Field, InputType, ObjectType} from "type-graphql";
import {User} from "../entities";

@InputType()
export class UsernamePasswordInput {

    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class FieldError {

    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class UserResponse {

    @Field(() => [FieldError ], { nullable: true  })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}
